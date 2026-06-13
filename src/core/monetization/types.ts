export type PremiumEntitlement =
  | 'monthlyFortune'
  | 'yearlyFortune'
  | 'compatibility'
  | 'wealthDetail'
  | 'careerBusiness'
  | 'elementGuide';

export type PremiumProductId =
  | 'premium_monthly_report'
  | 'premium_yearly_fortune'
  | 'premium_compatibility'
  | 'premium_wealth_career_bundle'
  | 'premium_element_guide';

export interface PremiumProduct {
  id: PremiumProductId;
  storeProductId: string;
  title: string;
  description: string;
  priceLabel: string;
  entitlement: PremiumEntitlement;
  badge?: string;
}

export type PurchaseStatus = 'idle' | 'purchased' | 'cancelled' | 'failed';

export interface PurchaseResult {
  status: Exclude<PurchaseStatus, 'idle'>;
  productId: PremiumProductId;
  entitlement: PremiumEntitlement;
  transactionId?: string | null;
  purchaseToken?: string | null;
  message?: string;
}

export interface NativeStoreProductInfo {
  productId: PremiumProductId;
  storeProductId: string;
  title: string;
  description: string;
  localizedPrice: string;
}
