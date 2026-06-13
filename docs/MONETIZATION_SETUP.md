# Monetization Setup

이 앱은 React Native CLI 기준으로 AdMob 광고와 인앱 결제 코드를 포함합니다. 서버 검증은 MVP 범위 밖이므로, 현재 결제 권한은 기기 내 상태로 활성화됩니다.

## AdMob

- SDK: `react-native-google-mobile-ads`
- Android App ID: `android/app/src/main/AndroidManifest.xml`
- iOS App ID: `ios/SajuFortuneApp/Info.plist`
- 광고 단위 ID: `src/core/ads/adUnits.ts`

현재 App ID와 광고 단위는 Google 공식 테스트 ID를 사용합니다. 출시 전 `src/core/ads/adUnits.ts`의 `ca-app-pub-xxxxxxxx...` 값을 실제 AdMob 광고 단위 ID로 교체하세요.

## In-App Purchase

- SDK: `react-native-iap`
- 상품 SKU: `src/core/monetization/products.ts`의 `storeProductId`
- 구매 실행: `src/core/monetization/nativeIap.ts`
- 권한 저장: `src/store/monetizationStore.ts`

Google Play Console과 App Store Connect에 아래 SKU를 동일하게 등록해야 합니다.

- `premium_monthly_report`
- `premium_yearly_fortune`
- `premium_compatibility`
- `premium_wealth_career_bundle`
- `premium_element_guide`

개발 중 스토어에 상품이 없으면 앱 흐름 점검을 위해 mock fallback이 동작합니다. 스토어 상품이 등록된 빌드에서는 실제 구매 플로우가 열리고, 성공 시 `finishTransaction`까지 호출합니다.
