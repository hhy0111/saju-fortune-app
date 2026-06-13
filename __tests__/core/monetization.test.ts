import { getPremiumProducts } from '../../src/core/monetization/products';
import { mockPurchaseProduct } from '../../src/core/monetization/mockPurchase';
import {
  fetchNativePremiumProducts,
  getStoreProductIds,
  purchaseNativeProduct,
} from '../../src/core/monetization/nativeIap';
import { useMonetizationStore } from '../../src/store/monetizationStore';

describe('monetization', () => {
  beforeEach(() => {
    useMonetizationStore.setState({
      premiumEntitlements: [],
      purchaseHistory: [],
      storeProducts: {},
      lastPurchaseStatus: 'idle',
    });
  });

  it('exposes premium products without requiring store SDK setup', () => {
    const products = getPremiumProducts();

    expect(products.length).toBeGreaterThanOrEqual(3);
    expect(products[0]).toEqual(
      expect.objectContaining({
        id: expect.any(String),
        title: expect.any(String),
        priceLabel: expect.any(String),
        entitlement: expect.any(String),
      }),
    );
    expect(products[0].storeProductId).toEqual(expect.stringContaining('premium'));
    expect(getStoreProductIds()).toContain(products[0].storeProductId);
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
});
