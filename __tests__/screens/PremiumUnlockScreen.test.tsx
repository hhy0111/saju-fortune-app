import React from 'react';
import { Alert, Pressable } from 'react-native';
import ReactTestRenderer from 'react-test-renderer';
import { showRewardedReportAd } from '../../src/core/ads/rewardedAd';
import { findPremiumProduct } from '../../src/core/monetization/products';
import type { PurchaseResult } from '../../src/core/monetization/types';
import { PremiumUnlockScreen } from '../../src/screens/PremiumUnlockScreen';
import { useFortuneStore } from '../../src/store/fortuneStore';
import { useMonetizationStore } from '../../src/store/monetizationStore';

jest.mock('../../src/core/ads/rewardedAd', () => ({
  showRewardedReportAd: jest.fn(),
}));

const birthInput = {
  birthDate: '1990-05-17',
  birthHour: 9,
  birthMinute: 0,
  calendarType: 'solar' as const,
  gender: 'unspecified' as const,
  saveConsent: false,
};

let renderer: ReactTestRenderer.ReactTestRenderer | undefined;

describe('PremiumUnlockScreen purchase flow', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.spyOn(Alert, 'alert').mockImplementation(jest.fn());
    (showRewardedReportAd as jest.Mock).mockResolvedValue({ status: 'cancelled', rewarded: false });
    useFortuneStore.setState({
      currentInput: null,
      savedBirthInput: null,
      fortunesById: {},
      unlockedFortuneIds: [],
    });
    useMonetizationStore.setState({
      premiumEntitlements: [],
      purchaseHistory: [],
      storeProducts: {},
      lastPurchaseStatus: 'idle',
    });
  });

  afterEach(() => {
    if (renderer) {
      ReactTestRenderer.act(() => {
        renderer!.unmount();
      });
      renderer = undefined;
    }
    jest.restoreAllMocks();
  });

  it('opens the purchased premium content after a successful product purchase', async () => {
    const product = findPremiumProduct('premium_monthly_report');
    const fortuneId = useFortuneStore
      .getState()
      .generateTodayFortune(birthInput, new Date('2026-06-08T00:00:00+09:00'));
    useMonetizationStore.setState({
      purchaseProduct: jest.fn(async (): Promise<PurchaseResult> => ({
        status: 'purchased',
        productId: product.id,
        entitlement: product.entitlement,
      })),
    });
    const navigation = {
      navigate: jest.fn(),
      replace: jest.fn(),
      goBack: jest.fn(),
    };

    await ReactTestRenderer.act(() => {
      renderer = ReactTestRenderer.create(
        <PremiumUnlockScreen
          navigation={navigation as never}
          route={{
            name: 'PremiumUnlock',
            params: { fortuneId, categoryId: 'today', categoryLabel: '오늘의 운세' },
          } as never}
        />,
      );
    });

    const purchaseButton = renderer!.root
      .findAllByType(Pressable)
      .find(node => node.props.accessibilityLabel === '결제하기');

    expect(purchaseButton).toBeTruthy();

    await ReactTestRenderer.act(async () => {
      purchaseButton!.props.onPress();
      await new Promise(resolve => setTimeout(resolve, 10));
    });

    expect(navigation.replace).toHaveBeenCalledWith('PremiumContent', {
      fortuneId,
      categoryId: 'today',
      categoryLabel: '오늘의 운세',
      productId: 'premium_monthly_report',
    });
  });

  it('unlocks the detail report and moves to it after a rewarded ad is completed', async () => {
    (showRewardedReportAd as jest.Mock).mockResolvedValueOnce({ status: 'rewarded', rewarded: true });
    const fortuneId = useFortuneStore
      .getState()
      .generateTodayFortune(birthInput, new Date('2026-06-08T00:00:00+09:00'));
    const navigation = {
      navigate: jest.fn(),
      replace: jest.fn(),
      goBack: jest.fn(),
    };

    await ReactTestRenderer.act(() => {
      renderer = ReactTestRenderer.create(
        <PremiumUnlockScreen
          navigation={navigation as never}
          route={{
            name: 'PremiumUnlock',
            params: { fortuneId, categoryId: 'today', categoryLabel: '오늘의 운세' },
          } as never}
        />,
      );
    });

    const adButton = renderer!.root
      .findAllByType(Pressable)
      .find(node => node.props.accessibilityLabel === '광고 보고 오늘 리포트 해금');

    expect(adButton).toBeTruthy();

    await ReactTestRenderer.act(async () => {
      adButton!.props.onPress();
      await new Promise(resolve => setTimeout(resolve, 10));
    });

    expect(useFortuneStore.getState().unlockedFortuneIds).toContain(fortuneId);
    expect(navigation.replace).toHaveBeenCalledWith('DetailReport', {
      fortuneId,
      categoryId: 'today',
      categoryLabel: '오늘의 운세',
    });
  });

  it('keeps the detail report locked when the rewarded ad is not completed', async () => {
    (showRewardedReportAd as jest.Mock).mockResolvedValueOnce({ status: 'cancelled', rewarded: false });
    const fortuneId = useFortuneStore
      .getState()
      .generateTodayFortune(birthInput, new Date('2026-06-08T00:00:00+09:00'));
    const navigation = {
      navigate: jest.fn(),
      replace: jest.fn(),
      goBack: jest.fn(),
    };

    await ReactTestRenderer.act(() => {
      renderer = ReactTestRenderer.create(
        <PremiumUnlockScreen
          navigation={navigation as never}
          route={{
            name: 'PremiumUnlock',
            params: { fortuneId, categoryId: 'today', categoryLabel: '오늘의 운세' },
          } as never}
        />,
      );
    });

    const adButton = renderer!.root
      .findAllByType(Pressable)
      .find(node => node.props.accessibilityLabel === '광고 보고 오늘 리포트 해금');

    await ReactTestRenderer.act(async () => {
      adButton!.props.onPress();
      await new Promise(resolve => setTimeout(resolve, 10));
    });

    expect(useFortuneStore.getState().unlockedFortuneIds).not.toContain(fortuneId);
    expect(navigation.replace).not.toHaveBeenCalled();
    expect(Alert.alert).toHaveBeenCalledWith(
      '해금 취소',
      '광고 시청이 완료되지 않아 리포트가 잠긴 상태입니다.',
    );
  });
});
