# Monetization Setup

이 앱은 React Native CLI 기반이며 광고는 `react-native-google-mobile-ads`, 인앱 결제는 `react-native-iap`를 사용합니다. 현재 Android 릴리즈 대상에는 실제 발급된 AdMob 앱 ID와 광고 단위 ID가 적용되어 있습니다. iOS 광고 ID는 이번 Android 출시 범위에 포함하지 않습니다.

## AdMob Android 앱

- 앱 이름: `운명전`
- 패키지 이름: `com.app101.sajufortune`
- Android AdMob App ID: `ca-app-pub-4402708884038037~4641388517`
- 코드 위치:
  - `android/app/src/main/AndroidManifest.xml`
  - `app.json`

## AdMob Android 광고 단위

| 코드 키 | AdMob 광고 단위 이름 | 형식 | Android 광고 단위 ID | 앱 내 위치 |
| --- | --- | --- | --- | --- |
| `home_banner` | `운명전_home_banner` | 배너 | `ca-app-pub-4402708884038037/7879055241` | 홈 화면 하단 |
| `summary_banner` | `운명전_summary_banner` | 배너 | `ca-app-pub-4402708884038037/3328306845` | 결과 요약 화면 하단 |
| `detail_banner` | `운명전_detail_banner` | 배너 | `ca-app-pub-4402708884038037/9702143508` | 프리미엄/상세 리포트 해금 화면 |
| `collection_banner` | `운명전_collection_banner` | 배너 | `ca-app-pub-4402708884038037/2846261972` | 도감 화면 하단 |
| `rewarded_report` | `운명전_rewarded_report` | 보상형 | `ca-app-pub-4402708884038037/4808909472` | 상세 리포트 광고 해금 버튼 |

광고 단위 ID는 `src/core/ads/adUnits.ts`에 정의되어 있습니다. 배너 광고는 `ANCHORED_ADAPTIVE_BANNER` 크기로 요청하고, 보상형 광고는 사용자가 광고 시청을 완료하면 상세 리포트 잠금을 해제하는 용도입니다.

## 현재 코드 상태

- SDK 초기화: `src/core/ads/mobileAds.ts`
- 앱 시작 시 초기화 호출: `src/app/App.tsx`
- 배너 컴포넌트: `src/components/AdBannerSlot.tsx`
- 보상형 광고 호출: `src/core/ads/rewardedAd.ts`
- 광고 단위 ID 및 등록표: `src/core/ads/adUnits.ts`

## 주의

실제 광고 ID가 적용된 빌드에서는 개발자가 광고를 반복 클릭하거나 보상형 광고를 수익 목적으로 테스트하면 AdMob 정책 위반이 될 수 있습니다. 검증 시에는 가능한 테스트 기기를 등록하거나 테스트 광고 ID를 사용하세요.

## Google Play Console 데이터 보안

AdMob SDK 사용 시 Google Mobile Ads SDK가 IP 주소, 앱 상호작용, 진단 정보, 기기/계정 식별자를 광고, 분석, 사기 방지 목적으로 자동 수집/공유할 수 있습니다. Google Play Console의 데이터 보안 양식에는 이 SDK 수집 항목까지 반영해야 합니다.

## In-App Purchase

- SDK: `react-native-iap`
- 상품 SKU 위치: `src/core/monetization/products.ts`의 `storeProductId`
- 구매 실행: `src/core/monetization/nativeIap.ts`
- 권한 저장: `src/store/monetizationStore.ts`

Google Play Console에는 아래 상품을 `일회성 상품`으로 등록합니다. 앱에서는 구매 후 계속 보유하는 프리미엄 권한으로 처리하므로 소비성 상품이 아니라 비소비성 해금 상품으로 운영합니다. 제품 ID는 앱 코드와 반드시 같아야 하며, 구매 옵션 ID는 Play Console 내부 ID이므로 아래처럼 하이픈 형식으로 둡니다.

| 상품 ID | 구매 옵션 ID | 상품 이름 | 기본 가격 | 앱에서 열리는 콘텐츠 |
| --- | --- | --- | --- | --- |
| `premium_monthly_report` | `monthly-report` | 월간 운세 리포트 | 3,900원 | 이번 달 핵심 흐름, 주간별 운세 포인트, 말과 행동 주의점, 월말 정리 루틴 |
| `premium_yearly_fortune` | `yearly-fortune` | 올해 운세 리포트 | 9,900원 | 연간 큰 흐름, 계절별 기회와 주의점, 관계/일/돈 균형표, 올해의 기준 문장 |
| `premium_compatibility` | `compatibility` | 궁합 리포트 | 4,900원 | 관계 온도 읽기, 대화 충돌 포인트, 서로에게 편한 거리, 화해 루틴 |
| `premium_wealth_career_bundle` | `wealth-career-bundle` | 재물/직장 심화팩 | 6,900원 | 재물 흐름 점검, 업무 강점 해석, 지출/협상 주의점, 직장 루틴 카드 |
| `premium_element_guide` | `element-guide` | 오행 보완 가이드 | 2,900원 | 부족한 기운 해석, 색상/방향 활용법, 하루 루틴 제안, 피해야 할 과보완 |

결제 성공 시 앱은 해당 상품 권한을 저장하고 `PremiumContent` 화면으로 이동합니다. 이미 구매한 상품은 프리미엄 상품 목록에서 `콘텐츠 보기` 버튼으로 다시 열 수 있습니다.

상품 등록 화면에서 `세금 및 규정 준수`, `가격`, `국가/지역` 항목을 활성화한 뒤 상품을 `활성` 상태로 저장해야 실제 결제 화면에 노출됩니다.
