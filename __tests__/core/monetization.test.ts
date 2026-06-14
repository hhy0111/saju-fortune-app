import AsyncStorage from '@react-native-async-storage/async-storage';
import { getPremiumProducts } from '../../src/core/monetization/products';
import { mockPurchaseProduct } from '../../src/core/monetization/mockPurchase';
import {
  fetchNativePremiumProducts,
  getStoreProductIds,
  purchaseNativeProduct,
  restoreNativePremiumPurchases,
} from '../../src/core/monetization/nativeIap';
import { useMonetizationStore } from '../../src/store/monetizationStore';

describe('monetization', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (AsyncStorage.getItem as jest.Mock).mockResolvedValue(null);
    useMonetizationStore.setState({
      premiumEntitlements: [],
      purchaseHistory: [],
      storeProducts: {},
      lastPurchaseStatus: 'idle',
    });
  });

  it('exposes premium products without requiring store SDK setup', () => {
    const products = getPremiumProducts();

    expect(products).toEqual([
      expect.objectContaining({
        id: 'premium_monthly_report',
        storeProductId: 'premium_monthly_report',
        title: '월간 운세 리포트',
        priceLabel: '3,900원',
        entitlement: 'monthlyFortune',
      }),
      expect.objectContaining({
        id: 'premium_yearly_fortune',
        storeProductId: 'premium_yearly_fortune',
        title: '올해 운세 리포트',
        priceLabel: '9,900원',
        entitlement: 'yearlyFortune',
      }),
      expect.objectContaining({
        id: 'premium_compatibility',
        storeProductId: 'premium_compatibility',
        title: '궁합 리포트',
        priceLabel: '4,900원',
        entitlement: 'compatibility',
      }),
      expect.objectContaining({
        id: 'premium_wealth_career_bundle',
        storeProductId: 'premium_wealth_career_bundle',
        title: '재물/직장 심화팩',
        priceLabel: '6,900원',
        entitlement: 'wealthDetail',
      }),
      expect.objectContaining({
        id: 'premium_element_guide',
        storeProductId: 'premium_element_guide',
        title: '오행 보완 가이드',
        priceLabel: '2,900원',
        entitlement: 'elementGuide',
      }),
    ]);
    expect(getStoreProductIds()).toEqual([
      'premium_monthly_report',
      'premium_yearly_fortune',
      'premium_compatibility',
      'premium_wealth_career_bundle',
      'premium_element_guide',
    ]);
  });

  it('describes rich unlocked content for every premium product', () => {
    getPremiumProducts().forEach(product => {
      expect(product.includes.length).toBeGreaterThanOrEqual(3);
      expect(product.contentSections.length).toBeGreaterThanOrEqual(3);
      product.contentSections.forEach(section => {
        expect(section.title.length).toBeGreaterThanOrEqual(4);
        expect(section.body.length).toBeGreaterThanOrEqual(60);
      });
    });
  });

  it('can complete a mock purchase for a premium product', async () => {
    const product = getPremiumProducts()[0];

    await expect(mockPurchaseProduct(product.id)).resolves.toEqual({
      status: 'purchased',
      productId: product.id,
      entitlement: product.entitlement,
    });
  });

  it('can simulate a cancelled purchase', async () => {
    const product = getPremiumProducts()[0];

    await expect(mockPurchaseProduct(product.id, 'cancelled')).resolves.toEqual({
      status: 'cancelled',
      productId: product.id,
      entitlement: product.entitlement,
    });
  });

  it('activates premium entitlement after purchase', async () => {
    const product = getPremiumProducts()[0];

    await useMonetizationStore.getState().purchaseProduct(product.id);

    expect(useMonetizationStore.getState().premiumEntitlements).toContain(product.entitlement);
    expect(useMonetizationStore.getState().purchaseHistory).toHaveLength(1);
    expect(useMonetizationStore.getState().lastPurchaseStatus).toBe('purchased');
  });

  it('persists premium entitlement after a completed purchase', async () => {
    const product = getPremiumProducts()[0];

    await useMonetizationStore.getState().purchaseProduct(product.id);

    expect(AsyncStorage.setItem).toHaveBeenCalledWith(
      'saju.premiumPurchases',
      JSON.stringify({
        premiumEntitlements: [product.entitlement],
        purchaseHistory: [
          {
            status: 'purchased',
            productId: product.id,
            entitlement: product.entitlement,
          },
        ],
      }),
    );
  });

  it('loads persisted premium entitlement on app startup', async () => {
    const product = getPremiumProducts()[0];
    (AsyncStorage.getItem as jest.Mock).mockResolvedValueOnce(
      JSON.stringify({
        premiumEntitlements: [product.entitlement],
        purchaseHistory: [
          {
            status: 'purchased',
            productId: product.id,
            entitlement: product.entitlement,
          },
        ],
      }),
    );

    await useMonetizationStore.getState().loadSavedPurchases();

    expect(useMonetizationStore.getState().premiumEntitlements).toEqual([product.entitlement]);
    expect(useMonetizationStore.getState().purchaseHistory).toEqual([
      {
        status: 'purchased',
        productId: product.id,
        entitlement: product.entitlement,
      },
    ]);
   });

  it('has native IAP fetch and purchase fallbacks for development builds', async () => {
    const product = getPremiumProducts()[0];

    await expect(fetchNativePremiumProducts({ forceMock: true })).resolves.toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          productId: product.id,
          storeProductId: product.storeProductId,
          localizedPrice: product.priceLabel,
        }),
      ]),
    );

    await expect(purchaseNativeProduct(product.id, { forceMock: true })).resolves.toEqual({
      status: 'purchased',
      productId: product.id,
      entitlement: product.entitlement,
    });
  });

  it('can restore previous premium purchases for non-consumable products', async () => {
    await expect(restoreNativePremiumPurchases({ forceMock: true })).resolves.toEqual(
      getPremiumProducts().map(product => ({
        status: 'purchased',
        productId: product.id,
        entitlement: product.entitlement,
      })),
    );
  });

  it('activates restored premium entitlements in the store', async () => {
    await useMonetizationStore.getState().restorePurchases({ forceMock: true });

    expect(useMonetizationStore.getState().premiumEntitlements).toEqual([
      'monthlyFortune',
      'yearlyFortune',
      'compatibility',
      'wealthDetail',
      'elementGuide',
    ]);
    expect(useMonetizationStore.getState().purchaseHistory).toHaveLength(5);
    expect(useMonetizationStore.getState().lastPurchaseStatus).toBe('purchased');
  });
});
