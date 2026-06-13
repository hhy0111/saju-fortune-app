# Privacy Policy Screen Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add an app-registration-ready privacy policy screen inside the React Native app and a standalone web privacy page for store submission.

**Architecture:** Reuse the existing navigation, screen, and visual patterns. Keep the privacy text duplicated intentionally between native and web surfaces so the web page can be hosted independently without a JS runtime dependency.

**Tech Stack:** React Native CLI, TypeScript, React Navigation, Jest, Vite static web assets.

---

## File Structure

- Modify `src/navigation/types.ts` to add `PrivacyPolicy`.
- Modify `src/navigation/RootNavigator.tsx` to register `PrivacyPolicyScreen`.
- Modify `src/screens/HomeScreen.tsx` to add the first-screen privacy policy entry point.
- Create `src/screens/PrivacyPolicyScreen.tsx` for the native policy.
- Modify `web/src/main.tsx` to add a privacy view and home link in the web preview.
- Create `web/privacy.html` for the standalone store URL page.
- Modify `__tests__/screens/HomeScreen.test.tsx` for home access coverage.
- Create `__tests__/screens/PrivacyPolicyScreen.test.tsx` for native policy coverage.
- Modify `__tests__/web/webSource.test.ts` for standalone web page coverage.

## Task 1: Failing Native Access Tests

- [ ] Add a test in `__tests__/screens/HomeScreen.test.tsx` that renders `HomeScreen` and expects `개인정보처리방침` to be present.
- [ ] Create `__tests__/screens/PrivacyPolicyScreen.test.tsx` and expect `운명전 개인정보처리방침`, `수집하는 정보`, `기기 내 저장`, `제3자 SDK`, and `문의` to render.
- [ ] Run `npm test -- --runInBand __tests__/screens/HomeScreen.test.tsx __tests__/screens/PrivacyPolicyScreen.test.tsx`.
- [ ] Confirm the new tests fail because the button/screen do not exist yet.

## Task 2: Native Privacy Screen Implementation

- [ ] Add `PrivacyPolicy` to `RootStackParamList`.
- [ ] Create `src/screens/PrivacyPolicyScreen.tsx` with the approved privacy policy content.
- [ ] Register the screen in `src/navigation/RootNavigator.tsx`.
- [ ] Add a home-screen privacy button that navigates to `PrivacyPolicy`.
- [ ] Run `npm test -- --runInBand __tests__/screens/HomeScreen.test.tsx __tests__/screens/PrivacyPolicyScreen.test.tsx`.
- [ ] Confirm the targeted native tests pass.

## Task 3: Failing Web Privacy Tests

- [ ] Extend `__tests__/web/webSource.test.ts` to assert that `web/privacy.html` exists.
- [ ] Assert the file contains `운명전 개인정보처리방침`, `서버로 전송하지 않습니다`, `Google AdMob`, and `support@app101.local`.
- [ ] Run `npm test -- --runInBand __tests__/web/webSource.test.ts`.
- [ ] Confirm the test fails because `web/privacy.html` does not exist yet.

## Task 4: Web Privacy Page Implementation

- [ ] Create `web/privacy.html` with the approved Korean privacy policy.
- [ ] Modify `web/src/main.tsx` to include a `privacy` view and a home-screen privacy link for preview parity.
- [ ] Run `npm test -- --runInBand __tests__/web/webSource.test.ts`.
- [ ] Confirm the web privacy tests pass.

## Task 5: Full Verification

- [ ] Run `npm test -- --runInBand`.
- [ ] Run `npx tsc --noEmit`.
- [ ] Run `npm run web:build`.
- [ ] Report remaining store-registration follow-ups: replace placeholder support email and host `dist/privacy.html` at an active HTTPS URL.

