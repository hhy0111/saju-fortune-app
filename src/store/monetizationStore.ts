import { create } from 'zustand';
import {
  fetchNativePremiumProducts,
  purchaseNativeProduct,
} from '../core/monetization/nativeIap';
import type {
  NativeStoreProductInfo,
  PremiumEntitlement,
  PremiumProductId,
  PurchaseResult,
  PurchaseStatus,
} from '../core/monetization/types';

export interface MonetizationStoreState {
  premiumEntitlements: PremiumEntitlement[];
  purchaseHistory: PurchaseResult[];
  storeProducts: Record<string, NativeStoreProductInfo>;
  lastPurchaseStatus: PurchaseStatus;
  hasEntitlement: (entitlement: PremiumEntitlement) => boolean;
  loadProducts: () => Promise<void>;
  purchaseProduct: (productId: PremiumProductId) => Promise<PurchaseResult>;
  markPurchaseResult: (result: PurchaseResult) => void;
  resetPurchases: () => void;
}

export const useMonetizationStore = create<MonetizationStoreState>((set, get) => ({
  premiumEntitlements: [],
  purchaseHistory: [],
  storeProducts: {},
  lastPurchaseStatus: 'idle',
  hasEntitlement: entitlement => get().premiumEntitlements.includes(entitlement),
  loadProducts: async () => {
    const products = await fetchNativePremiumProducts();

    set({
      storeProducts: products.reduce<Record<string, NativeStoreProductInfo>>((acc, product) => {
        acc[product.productId] = product;
        return acc;
      }, {}),
    });
  },
  purchaseProduct: async productId => {
    const result = await purchaseNativeProduct(productId);
    get().markPurchaseResult(result);

    return result;
  },
  markPurchaseResult: result =>
    set(state => ({
      lastPurchaseStatus: result.status,
      purchaseHistory:
        result.status === 'purchased' ? [...state.purchaseHistory, result] : state.purchaseHistory,
      premiumEntitlements:
        result.status === 'purchased' && !state.premiumEntitlements.includes(result.entitlement)
          ? [...state.premiumEntitlements, result.entitlement]
          : state.premiumEntitlements,
    })),
  resetPurchases: () =>
    set({
      premiumEntitlements: [],
      purchaseHistory: [],
      storeProducts: {},
      lastPurchaseStatus: 'idle',
    }),
}));
