import type { PremiumProduct, PremiumProductId } from './types';

const products: PremiumProduct[] = [
  {
    id: 'premium_monthly_report',
    storeProductId: 'premium_monthly_report',
    title: '월간 운세 리포트',
    description: '이번 달의 흐름, 기회, 조심할 말과 행동을 긴 리포트로 확인합니다.',
    includes: ['이번 달 핵심 흐름', '주간별 운세 포인트', '말과 행동 주의점', '월말 정리 루틴'],
    contentSections: [
      {
        title: '이번 달 핵심 흐름',
        body:
          '이번 달은 하루 운세보다 긴 호흡으로 반복되는 선택 패턴을 보는 리포트입니다. 사주 기둥의 기준 기운과 오늘 생성된 오행 균형을 바탕으로 초반에는 무엇을 정리하고, 중반에는 어떤 관계를 조율하며, 후반에는 어떤 결정을 미루거나 확정하면 좋은지 단계별로 읽을 수 있습니다.',
      },
      {
        title: '주간별 운세 포인트',
        body:
          '1주차는 몸과 마음의 속도를 맞추는 시기, 2주차는 주변 사람과 약속을 조정하는 시기, 3주차는 일과 돈의 우선순위를 다시 세우는 시기, 4주차는 남은 일을 정리하고 다음 달의 시작점을 만드는 시기로 나누어 안내합니다.',
      },
      {
        title: '활용 순서',
        body:
          '먼저 이번 달에 피해야 할 말과 행동을 확인한 뒤, 중요한 일정 앞에서는 행운 색상과 방향을 참고하세요. 마지막에는 월말 정리 루틴을 따라 지출, 약속, 건강 관리 항목을 점검하면 리포트를 단순한 읽을거리보다 실제 생활 체크리스트로 쓸 수 있습니다.',
      },
    ],
    priceLabel: '3,900원',
    entitlement: 'monthlyFortune',
    badge: '인기',
  },
  {
    id: 'premium_yearly_fortune',
    storeProductId: 'premium_yearly_fortune',
    title: '올해 운세 리포트',
    description: '연간 흐름과 계절별 조언을 사주 기운에 맞춰 정리합니다.',
    includes: ['연간 큰 흐름', '계절별 기회와 주의점', '관계/일/돈 균형표', '올해의 기준 문장'],
    contentSections: [
      {
        title: '연간 큰 흐름',
        body:
          '올해 리포트는 한 해 동안 반복될 가능성이 높은 선택의 리듬을 정리합니다. 빠르게 움직여야 할 시기와 한 박자 쉬어야 할 시기를 구분하고, 강한 기운이 과해질 때 생길 수 있는 피로감과 부족한 기운을 보완하는 생활 기준을 함께 제안합니다.',
      },
      {
        title: '계절별 조언',
        body:
          '봄에는 새 관계와 새 일의 씨앗을 관리하고, 여름에는 확장보다 체력과 말의 온도를 조절합니다. 가을에는 성과를 숫자로 정리하기 좋고, 겨울에는 다음 해로 가져갈 습관과 버릴 약속을 분리하는 데 초점을 둡니다.',
      },
      {
        title: '활용 순서',
        body:
          '연초에는 전체 흐름을 한 번 읽고, 분기마다 계절별 조언만 다시 확인하세요. 중요한 계약, 이직, 관계 변화처럼 큰 결정을 앞둔 시점에는 올해의 기준 문장을 먼저 보고 결정 속도를 조절하는 용도로 쓰는 것이 좋습니다.',
      },
    ],
    priceLabel: '9,900원',
    entitlement: 'yearlyFortune',
  },
  {
    id: 'premium_compatibility',
    storeProductId: 'premium_compatibility',
    title: '궁합 리포트',
    description: '두 사람의 오행 흐름과 관계 패턴을 부드러운 조언 중심으로 해석합니다.',
    includes: ['관계 온도 읽기', '대화 충돌 포인트', '서로에게 편한 거리', '화해 루틴'],
    contentSections: [
      {
        title: '관계 온도 읽기',
        body:
          '궁합 리포트는 맞고 틀림을 단정하지 않고 두 사람이 편해지는 거리와 속도를 찾는 데 초점을 둡니다. 내 오행 흐름이 강하게 드러날 때 상대가 어떻게 받아들일 수 있는지, 상대의 반응을 오해하지 않으려면 어떤 표현을 줄이면 좋은지 안내합니다.',
      },
      {
        title: '대화 충돌 포인트',
        body:
          '관계에서 반복되는 갈등은 대부분 말의 내용보다 타이밍과 강도에서 시작됩니다. 이 섹션은 재촉, 침묵, 설명 과다, 감정 회피처럼 자주 생기는 패턴을 나누고, 오늘 바로 써볼 수 있는 부드러운 문장 예시를 제공합니다.',
      },
      {
        title: '활용 순서',
        body:
          '중요한 대화를 하기 전에는 먼저 상대에게 편한 거리와 피해야 할 표현을 확인하세요. 다툼 뒤에는 화해 루틴을 따라 사과, 설명, 다음 약속을 분리해서 말하면 관계를 더 안정적으로 회복하는 데 도움이 됩니다.',
      },
    ],
    priceLabel: '4,900원',
    entitlement: 'compatibility',
  },
  {
    id: 'premium_wealth_career_bundle',
    storeProductId: 'premium_wealth_career_bundle',
    title: '재물/직장 심화팩',
    description: '돈을 대하는 방식과 일할 때의 강점을 상세 리포트로 확장합니다.',
    includes: ['재물 흐름 점검', '업무 강점 해석', '지출/협상 주의점', '직장 루틴 카드'],
    contentSections: [
      {
        title: '재물 흐름 점검',
        body:
          '재물/직장 심화팩은 돈을 많이 버는 단정형 풀이가 아니라 돈을 대하는 습관과 판단 속도를 점검하는 콘텐츠입니다. 충동 지출이 늘어나는 조건, 좋은 제안을 고를 때 확인해야 할 기준, 미루면 손해가 되는 정리 항목을 구체적으로 나눕니다.',
      },
      {
        title: '업무 강점 해석',
        body:
          '일할 때 드러나는 강점은 사주 기운의 균형에 따라 정리형, 추진형, 조율형, 탐색형으로 달라질 수 있습니다. 이 섹션은 오늘의 기운에서 잘 맞는 업무 방식과 피로가 쌓일 때 줄여야 할 역할을 함께 제안합니다.',
      },
      {
        title: '활용 순서',
        body:
          '월급날이나 큰 결제 전에는 재물 흐름 점검을 먼저 보고, 회의나 협상 전에는 업무 강점 해석을 확인하세요. 하루 마지막에는 직장 루틴 카드에 맞춰 완료한 일, 넘길 일, 말하지 않아도 되는 일을 구분하면 과로를 줄이는 데 도움이 됩니다.',
      },
    ],
    priceLabel: '6,900원',
    entitlement: 'wealthDetail',
    badge: '묶음',
  },
  {
    id: 'premium_element_guide',
    storeProductId: 'premium_element_guide',
    title: '오행 보완 가이드',
    description: '부족한 기운을 하루 루틴, 색상, 습관으로 보완하는 가이드입니다.',
    includes: ['부족한 기운 해석', '색상/방향 활용법', '하루 루틴 제안', '피해야 할 과보완'],
    contentSections: [
      {
        title: '부족한 기운 해석',
        body:
          '오행 보완 가이드는 부족한 기운을 단점으로 보지 않고 하루의 균형을 맞추는 실용 정보로 풀어냅니다. 목, 화, 토, 금, 수 중 약하게 잡힌 기운이 생각, 대화, 일정 관리에서 어떻게 나타날 수 있는지 부드럽게 설명합니다.',
      },
      {
        title: '색상과 방향',
        body:
          '행운 색상과 방향은 결정을 대신해 주는 규칙이 아니라 마음을 정돈하는 작은 신호로 사용합니다. 옷, 배경화면, 책상 위 물건처럼 부담 없는 곳에 적용하고, 중요한 날에는 과하게 바꾸기보다 익숙한 루틴에 한 가지 요소만 더하는 방식을 추천합니다.',
      },
      {
        title: '활용 순서',
        body:
          '아침에는 오늘 보완할 기운을 하나 고르고, 낮에는 그 기운에 맞는 행동을 작게 실행하세요. 밤에는 과하게 밀어붙인 부분이 있었는지 확인하면 오행 보완을 미신적 규칙이 아니라 자기 점검 루틴으로 사용할 수 있습니다.',
      },
    ],
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
