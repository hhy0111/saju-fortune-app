# Game Saju Fortune App Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a React Native CLI + TypeScript MVP for a game-like Korean saju fortune app that runs without Expo, server APIs, login, or name input.

**Architecture:** Create a native React Native CLI app in the repository root. Keep saju calculation and report generation in pure TypeScript modules with Jest tests, keep interpretation copy in JSON, and connect the app through React Navigation and Zustand. Image assets are referenced through stable folders but the UI uses gradient/color placeholders until final images arrive.

**Tech Stack:** React Native CLI, TypeScript, React Navigation, Zustand, react-native-reanimated, react-native-gesture-handler, AsyncStorage, Jest.

---

## File Structure

- Create/modify React Native CLI root files: `package.json`, `App.tsx`, `index.js`, `android/`, `ios/`, `babel.config.js`, `jest.config.js`, `tsconfig.json`.
- Create source files under `src/` exactly as defined in `docs/superpowers/specs/2026-06-07-game-saju-fortune-app-design.md`.
- Create tests under `__tests__/core/` for seeded randomness, saju pillar generation, element calculation, report generation, reward mock, and store-safe privacy behavior.
- Keep prompt and visual planning docs under `docs/`; do not block implementation on final image files.

## Task 1: Repository And Native Scaffold

- [ ] Initialize git in `D:\dev\app101` if `.git` is missing.
- [ ] Generate a React Native CLI TypeScript project in a temporary sibling folder.
- [ ] Move generated files into `D:\dev\app101` without deleting `docs/` or `.superpowers/`.
- [ ] Confirm no Expo dependency exists in `package.json`.
- [ ] Install required runtime dependencies with npm.

Commands:

```powershell
git init
npx @react-native-community/cli init SajuFortuneApp --version latest
```

Validation:

```powershell
npm ls expo
npm ls react-native
```

## Task 2: TDD Core Utilities

- [ ] Write failing Jest tests for `seededRandom`, date formatting, and mock reward ad behavior.
- [ ] Implement the minimal pure TypeScript utilities.
- [ ] Verify tests pass.

Files:

- `src/core/fortune/seededRandom.ts`
- `src/core/ads/mockRewardAd.ts`
- `src/utils/dateUtils.ts`
- `__tests__/core/seededRandom.test.ts`
- `__tests__/core/mockRewardAd.test.ts`

Validation:

```powershell
npm test -- --runInBand __tests__/core/seededRandom.test.ts __tests__/core/mockRewardAd.test.ts
```

## Task 3: TDD Saju Calculation

- [ ] Write failing tests for solar input, lunar input path, unknown birth hour, invalid dates, and element balance.
- [ ] Implement typed saju calculation modules.
- [ ] Verify tests pass.

Files:

- `src/core/saju/types.ts`
- `src/core/saju/lunarCalendar.ts`
- `src/core/saju/calculatePillars.ts`
- `src/core/saju/calculateElements.ts`
- `src/core/saju/calculateTenGods.ts`
- `__tests__/core/saju.test.ts`

Validation:

```powershell
npm test -- --runInBand __tests__/core/saju.test.ts
```

## Task 4: TDD Fortune Report Generation

- [ ] Write failing tests for deterministic same-day output, date-varying daily content, free/locked section counts, and required disclaimer.
- [ ] Add JSON data for elements, ten gods, report sections, lucky data, and daily missions.
- [ ] Implement report generation.
- [ ] Verify tests pass.

Files:

- `src/core/fortune/types.ts`
- `src/core/fortune/generateReport.ts`
- `src/core/fortune/generateFortune.ts`
- `src/data/saju/*.json`
- `src/data/fortune/*.json`
- `__tests__/core/fortune.test.ts`

Validation:

```powershell
npm test -- --runInBand __tests__/core/fortune.test.ts
```

## Task 5: Navigation, Store, And UI Shell

- [ ] Add typed root navigator.
- [ ] Add Zustand stores with privacy-safe persistence behavior.
- [ ] Add image-ready UI components that work without final raster assets.
- [ ] Add seven MVP screens and connect the full flow.
- [ ] Add Reanimated/Gesture Handler setup.

Files:

- `src/app/App.tsx`
- `App.tsx`
- `src/navigation/RootNavigator.tsx`
- `src/navigation/types.ts`
- `src/store/fortuneStore.ts`
- `src/store/collectionStore.ts`
- `src/components/*.tsx`
- `src/screens/*.tsx`

Validation:

```powershell
npm test -- --runInBand
npx tsc --noEmit
```

## Task 6: Verification And Build Readiness

- [ ] Run full test suite.
- [ ] Run TypeScript compile.
- [ ] Check package dependencies for Expo/API clients.
- [ ] Attempt Android project dependency listing or build if local Android SDK is available.
- [ ] Record any blocked native build requirement clearly.

Commands:

```powershell
npm test -- --runInBand
npx tsc --noEmit
npm ls expo
cd android
.\gradlew.bat tasks
```

