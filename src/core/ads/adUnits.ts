import { Platform } from 'react-native';
import { TestIds } from 'react-native-google-mobile-ads';

export type AdPlacement = 'home' | 'summary' | 'detail' | 'collection';

type PlatformAdIds = Record<'android' | 'ios', string>;
type PlacementAdIds = Record<AdPlacement, PlatformAdIds>;

const productionBannerUnitIds: PlacementAdIds = {
  home: {
    android: 'ca-app-pub-xxxxxxxxxxxxxxxx/home_banner',
    ios: 'ca-app-pub-xxxxxxxxxxxxxxxx/home_banner_ios',
  },
  summary: {
    android: 'ca-app-pub-xxxxxxxxxxxxxxxx/summary_banner',
    ios: 'ca-app-pub-xxxxxxxxxxxxxxxx/summary_banner_ios',
  },
  detail: {
    android: 'ca-app-pub-xxxxxxxxxxxxxxxx/detail_banner',
    ios: 'ca-app-pub-xxxxxxxxxxxxxxxx/detail_banner_ios',
  },
  collection: {
    android: 'ca-app-pub-xxxxxxxxxxxxxxxx/collection_banner',
    ios: 'ca-app-pub-xxxxxxxxxxxxxxxx/collection_banner_ios',
  },
};

const productionRewardedUnitIds: PlatformAdIds = {
  android: 'ca-app-pub-xxxxxxxxxxxxxxxx/rewarded_report',
  ios: 'ca-app-pub-xxxxxxxxxxxxxxxx/rewarded_report_ios',
};

function isConfiguredAdUnit(unitId: string | undefined): unitId is string {
  return Boolean(unitId && !unitId.includes('xxxxxxxx'));
}

function selectPlatformUnitId(ids: PlatformAdIds, testUnitId: string): string {
  const platformId = Platform.select({
    android: ids.android,
    ios: ids.ios,
    default: testUnitId,
  });

  return isConfiguredAdUnit(platformId) ? platformId : testUnitId;
}

export function getBannerAdUnitId(placement: AdPlacement): string {
  return selectPlatformUnitId(productionBannerUnitIds[placement], TestIds.ADAPTIVE_BANNER);
}

export function getRewardedAdUnitId(): string {
  return selectPlatformUnitId(productionRewardedUnitIds, TestIds.REWARDED);
}
