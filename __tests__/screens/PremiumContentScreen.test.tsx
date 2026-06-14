import React from 'react';
import { Text } from 'react-native';
import ReactTestRenderer from 'react-test-renderer';
import { PremiumContentScreen } from '../../src/screens/PremiumContentScreen';
import { useMonetizationStore } from '../../src/store/monetizationStore';

describe('PremiumContentScreen', () => {
  beforeEach(() => {
    useMonetizationStore.setState({
      premiumEntitlements: ['monthlyFortune'],
      purchaseHistory: [],
      storeProducts: {},
      lastPurchaseStatus: 'idle',
    });
  });

  it('renders the purchased product guide and next-step actions', async () => {
    const navigation = {
      navigate: jest.fn(),
      replace: jest.fn(),
      goBack: jest.fn(),
    };
    let renderer: ReactTestRenderer.ReactTestRenderer | undefined;

    await ReactTestRenderer.act(() => {
      renderer = ReactTestRenderer.create(
        <PremiumContentScreen
          navigation={navigation as never}
          route={{
            name: 'PremiumContent',
            params: { productId: 'premium_monthly_report', fortuneId: 'fortune-1' },
          } as never}
        />,
      );
    });

    const text = renderer!.root.findAllByType(Text).map(node => node.props.children).join(' ');

    expect(text).toContain('월간 운세 리포트');
    expect(text).toContain('이번 달 핵심 흐름');
    expect(text).toContain('활용 순서');
    expect(text).toContain('오늘 상세 리포트로 돌아가기');
  });
});
