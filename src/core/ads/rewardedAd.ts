import { AdEventType, RewardedAd, RewardedAdEventType } from 'react-native-google-mobile-ads';
import { getRewardedAdUnitId } from './adUnits';
import { initializeMobileAds } from './mobileAds';
import { mockRewardAd, type MockRewardAdResult } from './mockRewardAd';

export interface RewardedAdOptions {
  forceMock?: boolean;
  timeoutMs?: number;
}

const DEFAULT_REWARDED_TIMEOUT_MS = 18000;

function shouldUseDevelopmentFallback() {
  return typeof __DEV__ !== 'undefined' && __DEV__;
}

export async function showRewardedReportAd(
  options: RewardedAdOptions = {},
): Promise<MockRewardAdResult> {
  if (options.forceMock) {
    return mockRewardAd();
  }

  try {
    await initializeMobileAds();
    return await showNativeRewardedAd(options.timeoutMs ?? DEFAULT_REWARDED_TIMEOUT_MS);
  } catch {
    if (shouldUseDevelopmentFallback()) {
      return mockRewardAd();
    }

    return {
      status: 'failed',
      rewarded: false,
    };
  }
}

function showNativeRewardedAd(timeoutMs: number): Promise<MockRewardAdResult> {
  return new Promise(resolve => {
    const ad = RewardedAd.createForAdRequest(getRewardedAdUnitId(), {
      requestNonPersonalizedAdsOnly: true,
      keywords: ['fortune', 'lifestyle'],
    });
    const unsubscribers: Array<() => void> = [];
    let rewarded = false;
    let settled = false;

    const cleanup = () => {
      unsubscribers.forEach(unsubscribe => unsubscribe());
      ad.removeAllListeners();
    };

    const settle = (result: MockRewardAdResult) => {
      if (settled) {
        return;
      }

      settled = true;
      clearTimeout(timeout);
      cleanup();
      resolve(result);
    };

    const timeout = setTimeout(() => {
      settle({
        status: 'failed',
        rewarded: false,
      });
    }, timeoutMs);

    unsubscribers.push(
      ad.addAdEventListener(RewardedAdEventType.LOADED, () => {
        ad.show().catch(() => {
          settle({
            status: 'failed',
            rewarded: false,
          });
        });
      }),
      ad.addAdEventListener(RewardedAdEventType.EARNED_REWARD, () => {
        rewarded = true;
      }),
      ad.addAdEventListener(AdEventType.CLOSED, () => {
        settle({
          status: rewarded ? 'rewarded' : 'cancelled',
          rewarded,
        });
      }),
      ad.addAdEventListener(AdEventType.ERROR, () => {
        settle({
          status: 'failed',
          rewarded: false,
        });
      }),
    );

    ad.load();
  });
}
