export type MockRewardAdStatus = 'rewarded' | 'cancelled' | 'failed';

export interface MockRewardAdResult {
  status: MockRewardAdStatus;
  rewarded: boolean;
}

export async function mockRewardAd(
  status: MockRewardAdStatus = 'rewarded',
): Promise<MockRewardAdResult> {
  await new Promise(resolve => setTimeout(resolve, 20));

  if (status === 'failed') {
    return { status, rewarded: false };
  }

  return { status, rewarded: status === 'rewarded' };
}
