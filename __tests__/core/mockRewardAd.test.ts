import { mockRewardAd } from '../../src/core/ads/mockRewardAd';
import { getBannerAdUnitId, getRewardedAdUnitId } from '../../src/core/ads/adUnits';
import { showRewardedReportAd } from '../../src/core/ads/rewardedAd';

describe('mockRewardAd', () => {
  it('resolves rewarded state by default', async () => {
    await expect(mockRewardAd()).resolves.toEqual({ status: 'rewarded', rewarded: true });
  });

  it('can simulate cancellation', async () => {
    await expect(mockRewardAd('cancelled')).resolves.toEqual({
      status: 'cancelled',
      rewarded: false,
    });
  });

  it('exposes build-safe AdMob unit IDs and rewarded ad fallback', async () => {
    expect(getBannerAdUnitId('detail')).toContain('ca-app-pub-');
    expect(getRewardedAdUnitId()).toContain('ca-app-pub-');

    await expect(showRewardedReportAd({ forceMock: true })).resolves.toEqual({
      status: 'rewarded',
      rewarded: true,
    });
  });
});
