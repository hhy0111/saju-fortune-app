import type { PremiumProduct, PremiumProductId } from './types';

const products: PremiumProduct[] = [
  {
    id: 'premium_monthly_report',
    storeProductId: 'premium_monthly_report',
    title: '월간 운세 리포트',
    description: '이번 달의 흐름, 기회, 조심할 말과 행동을 긴 리포트로 확인합니다.',
    priceLabel: '3,900원',
    entitlement: 'monthlyFortune',
    badge: '인기',
  },
  {
    id: 'premium_yearly_fortune',
    storeProductId: 'premium_yearly_fortune',
    title: '올해 운세 리포트',
    description: '연간 흐름과 계절별 조언을 사주 기운에 맞춰 정리합니다.',
    priceLabel: '9,900원',
    entitlement: 'yearlyFortune',
  },
  {
    id: 'premium_compatibility',
    storeProductId: 'premium_compatibility',
    title: '궁합 리포트',
    description: '두 사람의 오행 흐름과 관계 패턴을 부드러운 조언 중심으로 해석합니다.',
    priceLabel: '4,900원',
    entitlement: 'compatibility',
  },
  {
    id: 'premium_wealth_career_bundle',
    storeProductId: 'premium_wealth_career_bundle',
    title: '재물/직장 심화팩',
    description: '돈을 대하는 방식과 일할 때의 강점을 상세 리포트로 확장합니다.',
    priceLabel: '6,900원',
    entitlement: 'wealthDetail',
    badge: '묶음',
  },
  {
    id: 'premium_element_guide',
    storeProductId: 'premium_element_guide',
    title: '오행 보완 가이드',
    description: '부족한 기운을 하루 루틴, 색상, 습관으로 보완하는 가이드입니다.',
    priceLabel: '2,900원',
    entitlement: 'elementGuide',
  },
];

export function getPremiumProducts(): PremiumProduct[] {
  return products;
}

export function findPremiumProduct(productId: PremiumProductId): PremiumProduct {
  const product = products.find(item => item.id === productId);

  if (!product) {
    throw new Error(`Unknown premium product: ${productId}`);
  }

  return product;
}
