# Privacy Policy Screen Design

## Goal

Add an app-registration-ready privacy policy surface that is available inside the React Native app and as a standalone web page URL for store submission.

## Scope

- Add a native `PrivacyPolicy` screen reachable from the home screen.
- Add a standalone `web/privacy.html` page that can be hosted and submitted to Google Play Console or App Store Connect.
- Keep the policy text aligned with the current app behavior: no name collection, no server transfer of birth data, local-only optional input storage, AdMob/IAP SDK disclosure, and contact/update information.
- Add tests for native access, native content, and web privacy page content.

## Native App Design

The app adds `PrivacyPolicyScreen` under `src/screens/`. `RootStackParamList` receives a `PrivacyPolicy` route with no params, and `RootNavigator` registers it with the title `개인정보처리방침`. `HomeScreen` adds a small secondary text button near the bottom after the existing ad slot so reviewers can find the policy from the first screen.

The screen uses the existing `MysticBackground`, `SafeAreaView`, and dark/gold visual language. Content is structured as readable sections with headings and paragraphs rather than a dense legal wall. The policy states what the app collects, what stays on-device, what third-party SDKs may process, and how users can delete locally saved birth input by turning off saved data or clearing app data.

## Web Design

`web/privacy.html` is a static HTML page with the same policy content. Because Vite copies root public HTML files when building from the web root, the page remains easy to host as `/privacy.html` after `npm run web:build`. The HTML includes Korean language metadata, app name, effective date, the active contact email, and all store-relevant sections.

## Policy Content

The policy includes:

- App name: `운명전`
- Effective date: `2026-06-13`
- Collected input: birth date, birth time/minute, calendar type, optional gender
- Not collected: name, account/login information, contact list, precise location
- Storage: optional local device storage only when the user enables save consent
- Network: no server API for fortune generation or birth information transfer
- Third parties: Google AdMob and store billing/IAP SDKs may process advertising, purchase, device, diagnostic, or transaction data according to their own policies
- Purpose: fortune calculation, report generation, ad unlock, purchase entitlement, app stability
- Contact: `young02hwi@gmail.com`

## Testing

- `__tests__/screens/HomeScreen.test.tsx` verifies the home screen exposes a privacy policy button.
- `__tests__/screens/PrivacyPolicyScreen.test.tsx` verifies the native screen renders the main privacy sections.
- `__tests__/web/webSource.test.ts` verifies `web/privacy.html` exists and contains the key registration statements.
