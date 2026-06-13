import { findPremiumProduct } from './products';
import type { PremiumProductId, PurchaseResult } from './types';

export async function mockPurchaseProduct(
  productId: PremiumProductId,
  status: PurchaseResult['status'] = 'purchased',
): Promise<PurchaseResult> {
  const product = findPremiumProduct(productId);
  await new Promise(resolve => setTimeout(resolve, 20));

  return {
    status,
    productId,
    entitlement: product.entitlement,
  };
}
