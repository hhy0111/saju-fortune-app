import { readFileSync } from 'fs';
import {
  getAdMobRegistrationItems,
  getBannerAdUnitId,
  getRewardedAdUnitId,
} from '../../src/core/ads/adUnits';

describe('adUnits', () => {
  it('keeps a registration item for every in-app ad placement', () => {
    const items = getAdMobRegistrationItems();

    expect(items).toHaveLength(5);
    expect(items.map(item => item.key)).toEqual([
      'home_banner',
      'summary_banner',
      'detail_banner',
      'collection_banner',
      'rewarded_report',
    ]);
    expect(items.filter(item => item.format === 'banner')).toHaveLength(4);
    expect(items.filter(item => item.format === 'rewarded')).toHaveLength(1);
    expect(items.find(item => item.key === 'rewarded_report')).toMatchObject({
      admobName: '운명전_rewarded_report',
      placement: '상세 리포트 광고 해금 버튼',
      codeReference: 'src/core/ads/rewardedAd.ts',
    });
  });

  it('uses the registered Android AdMob production IDs', () => {
    const items = getAdMobRegistrationItems();

    expect(Object.fromEntries(items.map(item => [item.key, item.androidUnitId]))).toEqual({
      home_banner: 'ca-app-pub-4402708884038037/7879055241',
      summary_banner: 'ca-app-pub-4402708884038037/3328306845',
      detail_banner: 'ca-app-pub-4402708884038037/9702143508',
      collection_banner: 'ca-app-pub-4402708884038037/2846261972',
      rewarded_report: 'ca-app-pub-4402708884038037/4808909472',
    });
  });

  it('uses the registered Android AdMob app ID in the manifest', () => {
    const manifest = readFileSync('android/app/src/main/AndroidManifest.xml', 'utf8');

    expect(manifest).toContain('android:value="ca-app-pub-4402708884038037~4641388517"');
  });

  it('declares Android permissions required by runtime monetization and feedback features', () => {
    const manifest = readFileSync('android/app/src/main/AndroidManifest.xml', 'utf8');

    expect(manifest).toContain('android.permission.INTERNET');
    expect(manifest).toContain('com.android.vending.BILLING');
    expect(manifest).toContain('com.google.android.gms.permission.AD_ID');
    expect(manifest).toContain('android.permission.VIBRATE');
  });

  it('uses the registered Android AdMob app ID in app.json', () => {
    const appConfig = JSON.parse(readFileSync('app.json', 'utf8'));

    expect(appConfig['react-native-google-mobile-ads'].android_app_id).toBe(
      'ca-app-pub-4402708884038037~4641388517',
    );
  });

  it('exposes build-safe AdMob unit IDs', () => {
    expect(getBannerAdUnitId('detail')).toContain('ca-app-pub-');
    expect(getRewardedAdUnitId()).toContain('ca-app-pub-');
  });
});
