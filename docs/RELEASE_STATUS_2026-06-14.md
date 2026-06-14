# Release Status - 2026-06-14

## Current Release

- App name: 운명전
- Package name: `com.app101.sajufortune`
- Android version code: `4`
- Android version name: `1.0.1`
- Latest AAB: `android/app/build/outputs/bundle/release/app-release.aab`
- GitHub repository: `https://github.com/hhy0111/saju-fortune-app.git`
- Privacy policy page: `https://hhy0111.github.io/saju-fortune-app/privacy.html`

## Google Play Console Progress

- App creation details were prepared for Google Play Console.
- Privacy policy page was created, built, and published through GitHub Pages.
- Store listing text, release name, and release notes were prepared.
- Android App Bundle upload was handled through Play Console.
- The version code conflict from re-uploading `versionCode 3` was resolved by building `versionCode 4`.
- The advertising ID declaration should be set to `Yes` because the Android manifest declares `com.google.android.gms.permission.AD_ID` and the app uses AdMob.

## Release Name And Notes

Release name:

```text
1.0.1
```

Release notes:

```text
<ko-KR>
- 생년월일 달력에서 연도를 빠르게 이동할 수 있도록 -10년, -1년, +1년, +10년 버튼을 추가했습니다.
- 사주 입력과 결과 안내 문구를 출시용 표현으로 정리했습니다.
- 광고 보상 및 프리미엄 결제 후 화면 이동 흐름을 안정화했습니다.
</ko-KR>
```

## Monetization

AdMob Android app ID:

```text
ca-app-pub-4402708884038037~4641388517
```

AdMob unit IDs:

| Placement | AdMob unit ID |
| --- | --- |
| Home banner | `ca-app-pub-4402708884038037/7879055241` |
| Summary banner | `ca-app-pub-4402708884038037/3328306845` |
| Detail banner | `ca-app-pub-4402708884038037/9702143508` |
| Collection banner | `ca-app-pub-4402708884038037/2846261972` |
| Rewarded report | `ca-app-pub-4402708884038037/4808909472` |

Google Play one-time products:

| Product ID | Product name | Price |
| --- | --- | --- |
| `premium_monthly_report` | 월간 운세 리포트 | 3,900원 |
| `premium_yearly_fortune` | 올해 운세 리포트 | 9,900원 |
| `premium_compatibility` | 궁합 리포트 | 4,900원 |
| `premium_wealth_career_bundle` | 재물/직장 심화팩 | 6,900원 |
| `premium_element_guide` | 오행 보완 가이드 | 2,900원 |

Implementation status:

- Banner and rewarded ad IDs are wired through `src/core/ads/adUnits.ts`.
- Rewarded ad flow unlocks the detailed report after the reward is earned.
- In-app purchase product IDs are wired through `src/core/monetization/products.ts`.
- Purchase success opens premium content and stores the entitlement locally.
- Restore purchase flow is available from the premium unlock screen.

## Privacy And Data Safety

- The app does not require login or name input.
- Birth date, birth time, calendar type, and gender selection are used locally for fortune report generation.
- Birth input is saved only when the user opts in to local device storage.
- AdMob and Google Mobile Ads SDK data handling is documented in the privacy policy and monetization setup notes.
- GitHub Pages privacy file exists at `docs/privacy.html`.

## UX And Release Fixes Completed

- Added a native privacy policy screen and web privacy page.
- Added release signing configuration using local `keystore.properties` when available.
- Added AdMob app ID and Android ad unit IDs.
- Added native IAP integration and premium content screen.
- Added purchase persistence with AsyncStorage.
- Added year jump controls to the birth date calendar modal.
- Removed user-facing MVP/future-work wording from release screens.
- Adjusted detail report title sizing and premium unlock layout.
- Added automated tests for ad units, monetization, premium content, privacy, birth date calendar, and web preview behavior.

## Verification Run

Latest local verification before this status document:

```text
npm test -- --runInBand
npx tsc --noEmit
npm run lint
npm run web:build
cd android && .\gradlew.bat --no-daemon --max-workers=1 :app:bundleRelease --stacktrace
jarsigner -verify -certs -verbose android/app/build/outputs/bundle/release/app-release.aab
```

Observed result:

- Jest: 20 test suites, 76 tests passed.
- TypeScript: passed.
- ESLint: passed.
- Web build: passed.
- Android release bundle: built successfully.
- AAB signing verification: passed.

## Notes

- `output/` contains local verification screenshots and XML dumps and is intentionally ignored by Git.
- iOS AdMob placeholders remain outside the current Android release scope.
- Past planning files under `docs/superpowers/` preserve earlier planning history and may mention MVP or mock states that are no longer the Android release behavior.
