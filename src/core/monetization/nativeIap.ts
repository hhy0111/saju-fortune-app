import {
  fetchProducts,
  finishTransaction,
  initConnection,
  purchaseErrorListener,
  purchaseUpdatedListener,
  requestPurchase,
  type ProductOrSubscription,
  type Purchase,
  type PurchaseError,
} from 'react-native-iap';
import { findPremiumProduct, getPremiumProducts } from './products';
import { mockPurchaseProduct } from './mockPurchase';
import type {
  NativeStoreProductInfo,
  PremiumProduct,
  PremiumProductId,
  PurchaseResult,
} from './types';

export interface NativeIapOptions {
  forceMock?: boolean;
  timeoutMs?: number;
}

const DEFAULT_PURCHASE_TIMEOUT_MS = 45000;

let connectionPromise: Promise<boolean> | null = null;

function shouldUseDevelopmentFallback() {
  return typeof __DEV__ !== 'undefined' && __DEV__;
}

function ensureIapConnection() {
  if (!connectionPromise) {
    connectionPromise = initConnection();
  }

  return connectionPromise;
}

function toStoreInfo(product: PremiumProduct): NativeStoreProductInfo {
  return {
    productId: product.id,
    storeProductId: product.storeProductId,
    title: product.title,
    description: product.description,
    localizedPrice: product.priceLabel,
  };
}

function normalizeStoreProduct(product: ProductOrSubscription): NativeStoreProductInfo | null {
  const premiumProduct = getPremiumProducts().find(item => item.storeProductId === product.id);

  if (!premiumProduct) {
    return null;
  }

  return {
    productId: premiumProduct.id,
    storeProductId: product.id,
    title: product.title || premiumProduct.title,
    description: product.description || premiumProduct.description,
    localizedPrice: product.displayPrice || premiumProduct.priceLabel,
  };
}

function isStoreProductInfo(product: NativeStoreProductInfo | null): product is NativeStoreProductInfo {
  return product !== null;
}

function toFailedPurchase(productId: PremiumProductId, message: string): PurchaseResult {
  const product = findPremiumProduct(productId);

  return {
    status: 'failed',
    productId,
    entitlement: product.entitlement,
    message,
  };
}

function isPurchaseForSku(purchase: Purchase, sku: string) {
  return purchase.productId === sku || purchase.ids?.includes(sku);
}

function toPurchaseResult(productId: PremiumProductId, purchase: Purchase): PurchaseResult {
  const product = findPremiumProduct(productId);

  return {
    status: 'purchased',
    productId,
    entitlement: product.entitlement,
    transactionId: purchase.transactionId,
    purchaseToken: purchase.purchaseToken,
  };
}

export function getStoreProductIds(): string[] {
  return getPremiumProducts().map(product => product.storeProductId);
}

export async function fetchNativePremiumProducts(
  options: NativeIapOptions = {},
): Promise<NativeStoreProductInfo[]> {
  if (options.forceMock) {
    return getPremiumProducts().map(toStoreInfo);
  }

  try {
    await ensureIapConnection();
    const products = await fetchProducts({
      skus: getStoreProductIds(),
      type: 'in-app',
    });
    const normalized = products?.map(normalizeStoreProduct).filter(isStoreProductInfo) ?? [];

    if (normalized.length > 0) {
      return normalized;
    }

    return shouldUseDevelopmentFallback() ? getPremiumProducts().map(toStoreInfo) : [];
  } catch {
    return shouldUseDevelopmentFallback() ? getPremiumProducts().map(toStoreInfo) : [];
  }
}

export async function purchaseNativeProduct(
  productId: PremiumProductId,
  options: NativeIapOptions = {},
): Promise<PurchaseResult> {
  if (options.forceMock) {
    return mockPurchaseProduct(productId);
  }

  const product = findPremiumProduct(productId);

  try {
    await ensureIapConnection();
    const products = await fetchProducts({
      skus: [product.storeProductId],
      type: 'in-app',
    });
    const productAvailable = products?.some(storeProduct => storeProduct.id === product.storeProductId) ?? false;

    if (!productAvailable) {
      return shouldUseDevelopmentFallback()
        ? mockPurchaseProduct(productId)
        : toFailedPurchase(productId, '스토어에 등록된 상품을 찾지 못했습니다.');
    }

    return await waitForPurchaseResult(product, options.timeoutMs ?? DEFAULT_PURCHASE_TIMEOUT_MS);
  } catch (error) {
    if (shouldUseDevelopmentFallback()) {
      return mockPurchaseProduct(productId);
    }

    return toFailedPurchase(productId, error instanceof Error ? error.message : '결제를 시작하지 못했습니다.');
  }
}

function waitForPurchaseResult(product: PremiumProduct, timeoutMs: number): Promise<PurchaseResult> {
  return new Promise(resolve => {
    let settled = false;

    const cleanup = () => {
      purchaseSubscription.remove();
      errorSubscription.remove();
    };

    const settle = (result: PurchaseResult) => {
      if (settled) {
        return;
      }

      settled = true;
      clearTimeout(timeout);
      cleanup();
      resolve(result);
    };

    const timeout = setTimeout(() => {
      settle(toFailedPurchase(product.id, '결제 응답 시간이 초과되었습니다.'));
    }, timeoutMs);

    const purchaseSubscription = purchaseUpdatedListener(async purchase => {
      if (!isPurchaseForSku(purchase, product.storeProductId)) {
        return;
      }

      try {
        await finishTransaction({
          purchase,
          isConsumable: false,
        });
        settle(toPurchaseResult(product.id, purchase));
      } catch (error) {
        settle(
          toFailedPurchase(
            product.id,
            error instanceof Error ? error.message : '결제 완료 처리에 실패했습니다.',
          ),
        );
      }
    });

    const errorSubscription = purchaseErrorListener((error: PurchaseError) => {
      const isSameProduct =
        error.productId === product.storeProductId || error.productIds?.includes(product.storeProductId);

      if (!isSameProduct && error.productId) {
        return;
      }

      settle({
        status: 'cancelled',
        productId: product.id,
        entitlement: product.entitlement,
        message: error.message,
      });
    });

    requestPurchase({
      request: {
        apple: { sku: product.storeProductId },
        google: { skus: [product.storeProductId] },
      },
      type: 'in-app',
    }).catch(error => {
      settle(
        toFailedPurchase(
          product.id,
          error instanceof Error ? error.message : '결제를 시작하지 못했습니다.',
        ),
      );
    });
  });
}
