import { Platform } from 'react-native';
import { TestIds } from 'react-native-google-mobile-ads';

export type AdPlacement = 'home' | 'summary' | 'detail' | 'collection';
export type AdMobAdFormat = 'banner' | 'rewarded';

type PlatformAdIds = Record<'android' | 'ios', string>;
type PlacementAdIds = Record<AdPlacement, PlatformAdIds>;

export interface AdMobRegistrationItem {
  key: string;
  format: AdMobAdFormat;
  admobName: string;
  placement: string;
  codeReference: string;
  androidUnitId: string;
  iosUnitId: string;
}

const productionBannerUnitIds: PlacementAdIds = {
  home: {
    android: 'ca-app-pub-4402708884038037/7879055241',
    ios: 'ca-app-pub-xxxxxxxxxxxxxxxx/home_banner_ios',
  },
  summary: {
    android: 'ca-app-pub-4402708884038037/3328306845',
    ios: 'ca-app-pub-xxxxxxxxxxxxxxxx/summary_banner_ios',
  },
  detail: {
    android: 'ca-app-pub-4402708884038037/9702143508',
    ios: 'ca-app-pub-xxxxxxxxxxxxxxxx/detail_banner_ios',
  },
  collection: {
    android: 'ca-app-pub-4402708884038037/2846261972',
    ios: 'ca-app-pub-xxxxxxxxxxxxxxxx/collection_banner_ios',
  },
};

const productionRewardedUnitIds: PlatformAdIds = {
  android: 'ca-app-pub-4402708884038037/4808909472',
  ios: 'ca-app-pub-xxxxxxxxxxxxxxxx/rewarded_report_ios',
};

const adMobRegistrationItems: AdMobRegistrationItem[] = [
  {
    key: 'home_banner',
    format: 'banner',
    admobName: '운명전_home_banner',
    placement: '홈 화면 하단',
    codeReference: 'src/screens/HomeScreen.tsx',
    androidUnitId: productionBannerUnitIds.home.android,
    iosUnitId: productionBannerUnitIds.home.ios,
  },
  {
    key: 'summary_banner',
    format: 'banner',
    admobName: '운명전_summary_banner',
    placement: '결과 요약 화면 하단',
    codeReference: 'src/screens/ResultSummaryScreen.tsx',
    androidUnitId: productionBannerUnitIds.summary.android,
    iosUnitId: productionBannerUnitIds.summary.ios,
  },
  {
    key: 'detail_banner',
    format: 'banner',
    admobName: '운명전_detail_banner',
    placement: '프리미엄/상세 리포트 해금 화면',
    codeReference: 'src/screens/PremiumUnlockScreen.tsx',
    androidUnitId: productionBannerUnitIds.detail.android,
    iosUnitId: productionBannerUnitIds.detail.ios,
  },
  {
    key: 'collection_banner',
    format: 'banner',
    admobName: '운명전_collection_banner',
    placement: '도감 화면 하단',
    codeReference: 'src/screens/CollectionScreen.tsx',
    androidUnitId: productionBannerUnitIds.collection.android,
    iosUnitId: productionBannerUnitIds.collection.ios,
  },
  {
    key: 'rewarded_report',
    format: 'rewarded',
    admobName: '운명전_rewarded_report',
    placement: '상세 리포트 광고 해금 버튼',
    codeReference: 'src/core/ads/rewardedAd.ts',
    androidUnitId: productionRewardedUnitIds.android,
    iosUnitId: productionRewardedUnitIds.ios,
  },
];

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

export function getAdMobRegistrationItems(): AdMobRegistrationItem[] {
  return adMobRegistrationItems.map(item => ({ ...item }));
}
