import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import {
  fetchNativePremiumProducts,
  type NativeIapOptions,
  purchaseNativeProduct,
  restoreNativePremiumPurchases,
} from '../core/monetization/nativeIap';
import type {
  NativeStoreProductInfo,
  PremiumEntitlement,
  PremiumProductId,
  PurchaseResult,
  PurchaseStatus,
} from '../core/monetization/types';

const PREMIUM_PURCHASES_STORAGE_KEY = 'saju.premiumPurchases';

interface StoredPremiumPurchases {
  premiumEntitlements: PremiumEntitlement[];
  purchaseHistory: PurchaseResult[];
}

function persistPremiumPurchases(state: StoredPremiumPurchases) {
  AsyncStorage.setItem(PREMIUM_PURCHASES_STORAGE_KEY, JSON.stringify(state)).catch(() => undefined);
}

function isStoredPremiumPurchases(value: unknown): value is StoredPremiumPurchases {
  if (!value || typeof value !== 'object') {
    return false;
  }

  const candidate = value as Partial<StoredPremiumPurchases>;

  return Array.isArray(candidate.premiumEntitlements) && Array.isArray(candidate.purchaseHistory);
}

export interface MonetizationStoreState {
  premiumEntitlements: PremiumEntitlement[];
  purchaseHistory: PurchaseResult[];
  storeProducts: Record<string, NativeStoreProductInfo>;
  lastPurchaseStatus: PurchaseStatus;
  hasEntitlement: (entitlement: PremiumEntitlement) => boolean;
  loadSavedPurchases: () => Promise<void>;
  loadProducts: () => Promise<void>;
  purchaseProduct: (productId: PremiumProductId) => Promise<PurchaseResult>;
  restorePurchases: (options?: NativeIapOptions) => Promise<PurchaseResult[]>;
  markPurchaseResult: (result: PurchaseResult) => void;
  resetPurchases: () => void;
}

export const useMonetizationStore = create<MonetizationStoreState>((set, get) => ({
  premiumEntitlements: [],
  purchaseHistory: [],
  storeProducts: {},
  lastPurchaseStatus: 'idle',
  hasEntitlement: entitlement => get().premiumEntitlements.includes(entitlement),
  loadSavedPurchases: async () => {
    const stored = await AsyncStorage.getItem(PREMIUM_PURCHASES_STORAGE_KEY);

    if (!stored) {
      return;
    }

    try {
      const parsed: unknown = JSON.parse(stored);

      if (isStoredPremiumPurchases(parsed)) {
        set({
          premiumEntitlements: parsed.premiumEntitlements,
          purchaseHistory: parsed.purchaseHistory,
          lastPurchaseStatus: parsed.purchaseHistory.length > 0 ? 'purchased' : 'idle',
        });
      }
    } catch {
      await AsyncStorage.removeItem(PREMIUM_PURCHASES_STORAGE_KEY);
    }
  },
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
  restorePurchases: async options => {
    const results = await restoreNativePremiumPurchases(options);

    results.forEach(result => get().markPurchaseResult(result));

    return results;
  },
  markPurchaseResult: result =>
    set(state => {
      const nextState = {
        lastPurchaseStatus: result.status,
        purchaseHistory:
          result.status === 'purchased' ? [...state.purchaseHistory, result] : state.purchaseHistory,
        premiumEntitlements:
          result.status === 'purchased' && !state.premiumEntitlements.includes(result.entitlement)
            ? [...state.premiumEntitlements, result.entitlement]
            : state.premiumEntitlements,
      };

      if (result.status === 'purchased') {
        persistPremiumPurchases({
          premiumEntitlements: nextState.premiumEntitlements,
          purchaseHistory: nextState.purchaseHistory,
        });
      }

      return nextState;
    }),
  resetPurchases: () =>
    set({
      premiumEntitlements: [],
      purchaseHistory: [],
      storeProducts: {},
      lastPurchaseStatus: 'idle',
    }),
}));
