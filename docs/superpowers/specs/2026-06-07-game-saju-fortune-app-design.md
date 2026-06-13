# 게임형 사주 운세 앱 개발 설계서

## 확정 방향

- 앱 형태: React Native CLI + TypeScript 기반 모바일 앱
- 핵심 방향: A. MVP Core First
- UI 방향: 게임 로비 중심, 동양 판타지, 오행 구슬과 사주 기둥 연출 중심
- 서버/API: 사용하지 않음
- Expo: 사용하지 않음
- 개인정보: 이름 입력 없음, 서버 전송 없음, 기본 자동 저장 없음
- 달력: 양력 기본, 음력 선택 지원. 음력은 내부 변환 로직으로 처리하고 절기 기준 월주 정밀화는 추후 확장
- 수익화: MVP에서는 mockRewardAd와 mock premium state만 구현
- 시각 에셋 보강 문서: `docs/superpowers/specs/2026-06-07-game-saju-visual-asset-brief.md`
- 이미지/이펙트 생성 프롬프트: `docs/assets/game-saju-image-prompts.md`

---

## 1. 요구사항 분석

* 담당 에이전트: Command Agent / PM, Communication Agent, Planning Lead
* 목표: 게임형 사주 운세 앱의 필수 제약과 MVP 성공 조건을 확정한다.
* 구현/기획 범위: React Native CLI + TypeScript, 서버/API 없음, 이름 입력 없음, 내부 계산/JSON 데이터 기반, Android/iOS 네이티브 빌드 가능 구조.
* 산출물: 게임 로비형 사주 앱 방향 확정, Expo/서버/외부 AI API 금지, 개인정보 서버 전송 금지.
* 발견된 문제: 음력 지원은 정확도와 구현 난도가 높다.
* 수정 지시: 양력 기본값으로 제공하되 음력 선택과 내부 변환 기능을 포함한다. 절기 기준 월주 정밀화는 추후 확장 포인트로 분리한다.
* 성공 기준: 앱이 로컬 입력값만으로 사주 기둥, 오행, 십성 초안, 리포트를 생성한다.
* 검증 방법: 의존성 목록에서 Expo/API 클라이언트 제거 확인, 계산 함수 단위 테스트, 입력-결과 플로우 QA.
* 승인 상태: Approved

## 2. MVP 범위 확정

* 담당 에이전트: Command Agent / PM, Product Planner, Planning Lead, Monetization Lead
* 목표: 개인 개발자가 완성 가능한 1차 출시 범위를 확정한다.
* 구현/기획 범위: Home, BirthInput, AnalysisLoading, ResultSummary, DetailReport, PremiumUnlock, Collection 기본 화면. Zustand store, 내부 JSON, 기본 계산, 풍부한 리포트, mockRewardAd.
* 산출물: MVP Core First 범위.
* 발견된 문제: 수집형 요소와 프리미엄 리포트를 모두 깊게 구현하면 초기 범위가 커진다.
* 수정 지시: 수집형 요소는 CollectionScreen에서 오늘의 부적/오행 구슬/7일 출석 구조만 보여주고, 실제 보상 경제는 MVP 이후로 둔다. 광고/IAP는 mock만 구현한다.
* 성공 기준: 광고나 결제 없이도 기본 결과와 일부 상세 리포트를 충분히 읽을 수 있다.
* 검증 방법: 무료 사용자 기준 결과 요약 + 상세 일부가 1회 플로우에서 표시되는지 확인한다.
* 승인 상태: Approved

## 3. 전체 폴더 구조 작성

* 담당 에이전트: Dev Lead, Dev Agent A, Dev Agent B, Communication Agent
* 목표: React Native CLI 신규 프로젝트에서 바로 구현 가능한 `src/` 구조를 확정한다.
* 구현/기획 범위: 화면, 컴포넌트, 계산 로직, 데이터, 상태관리, 유틸을 분리한다.
* 산출물:

```txt
src/
  app/
    App.tsx
  navigation/
    RootNavigator.tsx
    types.ts
  screens/
    HomeScreen.tsx
    BirthInputScreen.tsx
    AnalysisLoadingScreen.tsx
    ResultSummaryScreen.tsx
    DetailReportScreen.tsx
    PremiumUnlockScreen.tsx
    CollectionScreen.tsx
  components/
    GameButton.tsx
    FortuneCard.tsx
    PillarTable.tsx
    ElementOrb.tsx
    ElementBalanceChart.tsx
    LuckyInfoBox.tsx
    ReportSection.tsx
    UnlockPanel.tsx
    DailyMissionBox.tsx
  core/
    saju/
      calculatePillars.ts
      calculateElements.ts
      calculateTenGods.ts
      lunarCalendar.ts
      types.ts
    fortune/
      generateFortune.ts
      generateReport.ts
      seededRandom.ts
      types.ts
    ads/
      mockRewardAd.ts
  data/
    saju/
      elements.json
      tenGods.json
      heavenlyStems.json
      earthlyBranches.json
    fortune/
      reportSections.json
      fortuneTexts.json
      luckyData.json
      dailyMissions.json
  store/
    fortuneStore.ts
    collectionStore.ts
  utils/
    dateUtils.ts
    vibration.ts
```

* 발견된 문제: 음력 기능을 포함하려면 원래 요구사항보다 계산 계층이 조금 늘어난다.
* 수정 지시: `lunarCalendar.ts`를 추가하되, 외부 API 없이 내부 변환 테이블/알고리즘 기반으로 제한한다. 절기 월주 정밀 계산은 `calculatePillars.ts`에 확장 주석과 타입만 남긴다.
* 성공 기준: 화면은 UI만, `core`는 계산만, `data`는 문장/상수만 담당한다.
* 검증 방법: 서버/API 호출 코드가 없고, 계산 로직과 JSON 문장이 분리되어 있는지 코드 리뷰한다.
* 승인 상태: Approved

## 4. 타입 정의

* 담당 에이전트: Dev Lead, Dev Agent B
* 목표: 입력값, 사주 계산 결과, 리포트, 해금 상태를 타입으로 명확히 고정한다.
* 구현/기획 범위: `src/core/saju/types.ts`, `src/core/fortune/types.ts`, `src/navigation/types.ts` 중심.
* 산출물:

```ts
export type CalendarType = 'solar' | 'lunar';
export type Gender = 'female' | 'male' | 'unspecified';
export type ElementKey = 'wood' | 'fire' | 'earth' | 'metal' | 'water';

export interface BirthInput {
  birthDate: string;
  birthHour: number | null;
  calendarType: CalendarType;
  gender: Gender;
  saveConsent: boolean;
}

export interface SajuPillar {
  stem: string;
  stemHanja: string;
  branch: string;
  branchHanja: string;
  element: ElementKey;
}

export interface SajuPillars {
  year: SajuPillar;
  month: SajuPillar;
  day: SajuPillar;
  hour: SajuPillar | null;
  accuracyNote: string;
}

export interface ElementBalance {
  wood: number;
  fire: number;
  earth: number;
  metal: number;
  water: number;
  strongest: ElementKey[];
  weakest: ElementKey[];
}

export interface TenGodResult {
  primary: string;
  secondary: string[];
  description: string;
}
```

```ts
export interface LuckyInfo {
  color: string;
  colorHex: string;
  number: number;
  direction: string;
}

export interface ReportSection {
  id: string;
  title: string;
  body: string;
  locked: boolean;
}

export interface FortuneResult {
  id: string;
  generatedDate: string;
  summaryTitle: string;
  score: number;
  grade: 'S' | 'A' | 'B' | 'C';
  keywords: string[];
  lucky: LuckyInfo;
  oneLineAdvice: string;
  pillars: SajuPillars;
  elementBalance: ElementBalance;
  tenGods: TenGodResult;
  sections: ReportSection[];
  disclaimer: string;
}
```

* 발견된 문제: 태어난 시간을 모르는 사용자가 있을 수 있다.
* 수정 지시: `birthHour`는 `null` 허용, 시주는 `null` 가능하게 설계한다. UI에서는 "시간 모름"을 선택할 수 있고 결과에는 정확도 안내를 표시한다.
* 성공 기준: 입력 누락, 시간 모름, 음력 선택, 광고 해금 상태가 타입상 안전하게 처리된다.
* 검증 방법: TypeScript strict mode에서 화면 navigation params와 store 접근이 컴파일된다.
* 승인 상태: Approved

## 5. 내부 JSON 데이터 설계

* 담당 에이전트: Dev Agent B, Content Agent, Content Lead
* 목표: 서버 없이 풍부한 리포트를 만들 수 있는 내부 데이터 구조를 설계한다.
* 구현/기획 범위: 오행, 십성, 천간/지지, 리포트 문장 후보, 행운 데이터, 오늘의 미션.
* 산출물:

```json
{
  "wood": {
    "label": "목",
    "hanja": "木",
    "keywords": ["성장", "기획", "관계 확장"],
    "personality": ["새로운 흐름을 잘 받아들이고 가능성을 키우는 기운이 강합니다."],
    "strongDescription": ["목의 기운이 강하면 시작과 확장에 민감하게 반응합니다."],
    "weakDescription": ["목의 기운이 약하면 새 계획을 시작하기 전 준비 시간이 더 필요할 수 있습니다."],
    "money": ["돈을 성장의 도구로 보는 경향이 있습니다."],
    "love": ["관계에서 대화와 발전 가능성을 중요하게 봅니다."],
    "work": ["기획, 교육, 브랜딩, 성장형 업무와 잘 맞습니다."],
    "balanceGuide": ["작은 식물 돌보기, 산책, 계획 정리가 목의 균형을 돕습니다."]
  }
}
```

* 발견된 문제: 리포트가 길어지려면 단순 고정 문장만으로는 반복감이 생긴다.
* 수정 지시: 섹션별 문장 후보를 여러 개 두고, `오행 + 십성 + 일간 + 날짜 seed`로 선택한다. 각 섹션은 최소 3문장 이상이 되도록 생성 함수에서 보장한다.
* 성공 기준: 같은 생년월일이라도 날짜별 오늘 운세와 미션은 달라지고, 기본 기질은 일관성을 유지한다.
* 검증 방법: 동일 입력/동일 날짜는 같은 결과, 동일 입력/다른 날짜는 일부 문장이 달라지는지 테스트한다.
* 승인 상태: Approved

## 6. 사주 계산 로직 설계

* 담당 에이전트: Dev Agent B, Dev Lead, QA Agent A
* 목표: MVP 수준의 사주 기둥과 오행 계산을 내부 로직으로 생성한다.
* 구현/기획 범위: 양력 기본 계산, 음력 선택 시 내부 변환, 년주/월주/일주/시주 생성, 정확도 안내.
* 산출물:

```ts
export function calculatePillars(input: BirthInput): SajuPillars {
  const solarDate =
    input.calendarType === 'lunar'
      ? convertLunarToSolar(input.birthDate)
      : parseSolarDate(input.birthDate);

  return {
    year: calculateYearPillar(solarDate),
    month: calculateMonthPillar(solarDate),
    day: calculateDayPillar(solarDate),
    hour: input.birthHour === null ? null : calculateHourPillar(solarDate, input.birthHour),
    accuracyNote:
      input.calendarType === 'lunar'
        ? '음력 날짜는 내부 변환 기준으로 계산되며, 절기 기준 세부 월주는 추후 정밀화될 수 있습니다.'
        : 'MVP 계산은 양력 날짜 기준이며, 절기 기준 세부 월주는 추후 정밀화될 수 있습니다.',
  };
}
```

* 발견된 문제: 사주 명리학의 정밀 월주는 절기 기준이 필요하다.
* 수정 지시: UI와 `accuracyNote`에 MVP 정확도 한계를 명시한다. 코드에는 절기 계산 확장 함수를 위한 인터페이스를 남긴다.
* 성공 기준: 모든 유효 입력이 크래시 없이 4기둥 또는 시간 모름 시 3기둥+안내를 생성한다.
* 검증 방법: 양력 입력, 음력 입력, 시간 모름, 윤달 범위 오류, 잘못된 날짜를 단위 테스트한다.
* 승인 상태: Approved

## 7. 리포트 생성 로직 설계

* 담당 에이전트: Dev Agent B, Content Agent, Content Lead
* 목표: 짧은 운세가 아니라 읽을거리가 충분한 리포트를 생성한다.
* 구현/기획 범위: 15개 상세 섹션, 요약 문구, 점수/등급, 키워드, 행운 정보, 오늘의 미션.
* 산출물:

```ts
export function generateFortune(input: BirthInput, today: Date): FortuneResult {
  const pillars = calculatePillars(input);
  const elementBalance = calculateElements(pillars);
  const tenGods = calculateTenGods(pillars);
  const seed = createFortuneSeed(input, today, pillars.day.stem);

  return {
    id: createFortuneId(input, today),
    generatedDate: formatDate(today),
    summaryTitle: pickSummaryTitle(seed, elementBalance, tenGods),
    score: calculateFortuneScore(seed, elementBalance),
    grade: calculateGrade(score),
    keywords: pickKeywords(seed, elementBalance, tenGods),
    lucky: pickLuckyInfo(seed),
    oneLineAdvice: pickOneLineAdvice(seed),
    pillars,
    elementBalance,
    tenGods,
    sections: generateReport({ seed, pillars, elementBalance, tenGods }),
    disclaimer: '운세 결과는 참고용입니다. 중요한 결정은 현실적인 정보와 본인의 판단을 함께 고려해 주세요.',
  };
}
```

* 발견된 문제: 리포트 잠금이 과하면 무료 사용 가치가 낮아진다.
* 수정 지시: 기본 기질, 강점, 오늘의 흐름, 행운 포인트, 하루 루틴 일부는 무료 제공한다. 광고 해금 후 나머지 상세 섹션을 모두 공개한다.
* 성공 기준: 무료 상태에서도 5개 이상 섹션을 읽을 수 있고, 해금 후 15개 섹션이 표시된다.
* 검증 방법: lock state별 표시 섹션 수와 문장 수를 테스트한다.
* 승인 상태: Approved

## 8. Navigation 구조 설계

* 담당 에이전트: Dev Agent A, Dev Lead
* 목표: 사용자가 로비에서 입력, 분석, 결과, 상세, 해금, 수집 화면으로 자연스럽게 이동하도록 한다.
* 구현/기획 범위: React Navigation native stack 기반.
* 산출물:

```ts
export type RootStackParamList = {
  Home: undefined;
  BirthInput: undefined;
  AnalysisLoading: { birthInput: BirthInput };
  ResultSummary: { fortuneId: string };
  DetailReport: { fortuneId: string };
  PremiumUnlock: { fortuneId: string };
  Collection: undefined;
};
```

* 발견된 문제: 분석 중 결과를 생성하고 이동할 때 중복 생성될 수 있다.
* 수정 지시: `AnalysisLoadingScreen`에서 1회 생성 후 store에 저장하고 `fortuneId`만 다음 화면으로 전달한다.
* 성공 기준: 뒤로 가기/재진입 시 중복 결과가 불필요하게 생성되지 않는다.
* 검증 방법: 같은 입력으로 분석 화면을 반복 진입할 때 store 결과 수를 확인한다.
* 승인 상태: Approved

## 9. 화면별 UI 설계

* 담당 에이전트: Dev Agent A, UI / Motion Designer, Design Lead
* 목표: 게임 로비형 사주 앱의 핵심 화면을 MVP 수준으로 완성한다.
* 구현/기획 범위: 7개 주요 화면.
* 산출물:

- HomeScreen: 중앙 오행 구슬, 큰 "오늘의 사주 보기" 버튼, 운세 메뉴, 수집 상태 요약
- BirthInputScreen: 생년월일, 시간, 양력/음력, 선택 성별, 저장 동의 체크
- AnalysisLoadingScreen: 년주/월주/일주/시주 순차 생성, 오행 구슬 회전
- ResultSummaryScreen: 점수/등급, 사주 기둥, 오행 비율, 키워드, 행운 정보
- DetailReportScreen: 15개 섹션 리포트, 잠금 상태, 참고용 안내
- PremiumUnlockScreen: mock 광고 해금, 보물상자/부적 해금 연출
- CollectionScreen: 오늘의 부적, 오행 구슬, 7일 출석, 미션 체크 구조

* 발견된 문제: 화면이 많아도 각 화면이 너무 복잡하면 MVP 일정이 늘어난다.
* 수정 지시: 첫 구현은 모든 화면을 연결하되, Collection은 구조 위주로 제한한다.
* 성공 기준: 사용자가 Home부터 DetailReport까지 막힘 없이 완료한다.
* 검증 방법: React Navigation 플로우 수동 QA와 스냅샷 확인.
* 승인 상태: Approved

## 10. 애니메이션 설계

* 담당 에이전트: UI / Motion Designer, Design Lead, Dev Agent A
* 목표: 저사양 기기에서도 부담 없는 2D 게임형 연출을 구현한다.
* 구현/기획 범위: Reanimated 기반 버튼 반응, 카드 등장, 기둥 낙하, 오행 차트 차오름, 해금 연출.
* 산출물:

- GameButton: press scale, glow opacity, optional vibration
- FortuneCard: flip-like Y rotation 대신 opacity/scale 조합 우선, 성능 부담 최소화
- PillarTable: 각 기둥이 위에서 내려오며 고정
- ElementBalanceChart: 원형 또는 막대형 차트가 0에서 목표값까지 증가
- UnlockPanel: 광고 해금 후 금빛 overlay와 카드 reveal
- Screen transition: fade/slide

* 발견된 문제: 과한 3D/파티클은 네이티브 성능 부담이 크다.
* 수정 지시: 파티클은 작은 View 8~12개를 짧게 흩뿌리는 수준으로 제한한다. Lottie는 선택사항으로 남긴다.
* 성공 기준: 저사양 Android에서도 핵심 플로우가 끊기지 않는다.
* 검증 방법: Android debug/release에서 프레임 드랍 체감 QA, 불필요한 무한 애니메이션 수 확인.
* 승인 상태: Approved

## 11. 상태관리 설계

* 담당 에이전트: Dev Agent B, Dev Lead
* 목표: 운세 결과, 입력값, 해금 상태, 수집 상태를 단순하게 관리한다.
* 구현/기획 범위: Zustand + AsyncStorage 또는 MMKV.
* 산출물:

```ts
interface FortuneStoreState {
  currentInput: BirthInput | null;
  fortunesById: Record<string, FortuneResult>;
  unlockedFortuneIds: string[];
  setBirthInput(input: BirthInput): void;
  generateTodayFortune(input: BirthInput): string;
  unlockFortune(fortuneId: string): void;
  clearSavedBirthInput(): void;
}

interface CollectionStoreState {
  checkInDates: string[];
  talismans: string[];
  elementOrbs: ElementKey[];
  completedMissionIds: string[];
  markTodayCheckIn(date: string): void;
  completeMission(missionId: string): void;
}
```

* 발견된 문제: 개인정보 자동 저장은 요구사항에 어긋난다.
* 수정 지시: `saveConsent`가 true일 때만 생년월일/시간을 저장한다. 운세 결과 자체는 로컬 캐시로 저장 가능하되 삭제 기능을 제공한다.
* 성공 기준: 사용자가 저장 동의하지 않아도 앱이 정상 동작하고, 재실행 시 민감 입력값은 남지 않는다.
* 검증 방법: 저장 동의 false/true 각각 재시작 시 상태를 확인한다.
* 승인 상태: Approved

## 12. mockRewardAd 설계

* 담당 에이전트: Balance / Monetization Agent, Dev Agent B, Monetization Lead
* 목표: 실제 광고 연동 없이 해금 흐름을 검증한다.
* 구현/기획 범위: Promise 기반 mock 광고 함수와 해금 상태 업데이트.
* 산출물:

```ts
export async function mockRewardAd(): Promise<{ rewarded: boolean }> {
  await delay(1200);
  return { rewarded: true };
}
```

* 발견된 문제: 광고 해금 실패 케이스를 설계하지 않으면 실제 AdMob 전환 때 깨질 수 있다.
* 수정 지시: mock에서도 success, cancelled, failed 상태를 타입으로 열어두고 MVP UI는 success/cancelled만 처리한다.
* 성공 기준: 광고 보기 버튼 클릭 후 오늘의 상세 풀이가 해금된다.
* 검증 방법: mock success/cancelled 결과별 UI 상태 테스트.
* 승인 상태: Approved

## 13. 내부 검수

* 담당 에이전트: Dev Lead, Planning Lead, Design Lead, Content Lead
* 목표: 구현 전 설계가 금지 조건과 품질 기준을 만족하는지 검수한다.
* 구현/기획 범위: 기술, 개인정보, UI, 콘텐츠, 수익화 검수.
* 산출물:

- Expo 미사용 확인
- 서버/API 미사용 확인
- 이름 입력 없음 확인
- 계산/문장 데이터 분리 확인
- 기본 결과 무료 가치 확인
- 리포트 문장 불안 조장 표현 금지 확인

* 발견된 문제: 리포트 콘텐츠가 부족하면 앱 가치가 낮다.
* 수정 지시: `reportSections.json`은 15개 섹션 각각 최소 4개 후보 템플릿을 가진다.
* 성공 기준: MVP 데이터만으로도 상세 리포트가 충분히 길고 반복감이 낮다.
* 검증 방법: 샘플 생년월일 5개로 리포트 생성 후 문장 반복률과 금지어 확인.
* 승인 상태: Approved

## 14. QA 1차

* 담당 에이전트: QA Agent A
* 목표: 핵심 기능 플로우가 정상 동작하는지 확인한다.
* 구현/기획 범위: 입력, 계산, 결과 생성, 해금.
* 산출물:

- 양력 생년월일 입력 테스트
- 음력 생년월일 입력 테스트
- 태어난 시간 선택/시간 모름 테스트
- 사주 기둥 생성 테스트
- 오행 계산 테스트
- 상세 리포트 생성 테스트
- mock 광고 해금 테스트

* 발견된 문제: 입력 누락 시 크래시 가능성이 가장 큰 리스크다.
* 수정 지시: BirthInputScreen에서 완료 버튼 활성 조건과 에러 문구를 명확히 둔다.
* 성공 기준: 유효하지 않은 입력은 결과 생성으로 넘어가지 않는다.
* 검증 방법: 날짜 누락, 시간 모름, 음력 변환 실패 케이스 수동/단위 테스트.
* 승인 상태: Approved

## 15. 수정

* 담당 에이전트: Dev Agent A, Dev Agent B, Dev Lead
* 목표: QA 1차에서 발견된 기능 오류를 수정한다.
* 구현/기획 범위: 입력 validation, 계산 fallback, store 중복 생성 방지, unlock state 보정.
* 산출물: QA 1차 수정 패치.
* 발견된 문제: 음력 변환 실패 시 사용자에게 설명이 필요하다.
* 수정 지시: 변환 범위 밖 날짜는 "지원 범위 밖 날짜입니다. 양력으로 다시 선택해 주세요."로 안내한다.
* 성공 기준: 실패 입력이 조용히 크래시로 이어지지 않는다.
* 검증 방법: QA 1차 실패 케이스 재실행.
* 승인 상태: Approved

## 16. QA 2차

* 담당 에이전트: QA Agent B, Design Lead
* 목표: UX, 가독성, 연출 부담을 확인한다.
* 구현/기획 범위: 로비 몰입감, 분석 로딩, 리포트 가독성, 해금 연출, 저사양 체감.
* 산출물:

- 로비 화면이 게임형인지 확인
- 분석 로딩이 2~3초 내 끝나는지 확인
- 상세 리포트 텍스트 줄간격/대비 확인
- 해금 연출이 과하지 않은지 확인
- CollectionScreen이 미완성처럼 보이지 않는지 확인

* 발견된 문제: 어두운 배경과 금색 라인은 대비가 낮아질 수 있다.
* 수정 지시: 본문 텍스트는 밝은 아이보리, 보조 텍스트는 투명도 70% 이상, 카드 배경은 충분히 어둡게 둔다.
* 성공 기준: 긴 리포트를 읽는 동안 눈 피로가 과하지 않다.
* 검증 방법: 모바일 세로 화면 기준 스크롤 읽기 QA.
* 승인 상태: Approved

## 17. 수정

* 담당 에이전트: Dev Agent A, UI / Motion Designer, Content Agent
* 목표: QA 2차에서 발견된 UX/문장 문제를 수정한다.
* 구현/기획 범위: 텍스트 대비, 카드 간격, 잠금 안내, 리포트 문장 반복 제거.
* 산출물: QA 2차 수정 패치.
* 발견된 문제: 잠금 섹션이 너무 많아 보이면 과금 압박처럼 느껴질 수 있다.
* 수정 지시: 잠금 섹션은 하단으로 배치하고, 무료 섹션을 먼저 충분히 보여준다.
* 성공 기준: 광고를 보지 않아도 앱의 기본 가치를 느낀다.
* 검증 방법: 무료 상태 상세 리포트 UX 리뷰.
* 승인 상태: Approved

## 18. QA 3차

* 담당 에이전트: QA Lead, QA Agent A, QA Agent B
* 목표: 출시 전 차단 이슈를 최종 확인한다.
* 구현/기획 범위: 크래시, 결과 생성 실패, 저장/삭제, 해금, 개인정보, 빌드 가능성.
* 산출물:

- Android 빌드 확인
- iOS 빌드 구조 확인
- TypeScript compile 확인
- 서버/API 호출 없음 확인
- 이름 입력 없음 확인
- 저장 동의 false 재시작 확인
- mockRewardAd 해금 확인

* 발견된 문제: 네이티브 의존성 설치 누락이 빌드 실패 원인이 될 수 있다.
* 수정 지시: React Navigation, Reanimated, Gesture Handler 설치/설정 체크리스트를 별도로 유지한다.
* 성공 기준: QA Lead 기준 출시 차단 이슈 없음.
* 검증 방법: `yarn tsc`, `yarn test`, Android debug build, iOS pod install/build 구조 확인.
* 승인 상태: Approved

## 19. 출시 전 체크리스트 작성

* 담당 에이전트: Command Agent / PM, Dev Lead, QA Lead, Monetization Lead
* 목표: 개인 개발자가 출시 직전 확인할 항목을 명확히 한다.
* 구현/기획 범위: 빌드, 개인정보, 콘텐츠, UX, 수익화 확장 준비.
* 산출물:

- Expo 의존성 없음
- 서버/API 호출 없음
- 개인정보 서버 전송 없음
- 이름 입력 없음
- 저장 동의 UX 있음
- 운세 참고용 안내 있음
- 리포트 금지 표현 없음
- mock 광고 해금 정상
- 실제 AdMob/IAP는 비활성
- Android/iOS 네이티브 빌드 설정 확인

* 발견된 문제: "운세" 앱은 과도한 확정 표현이 리뷰 리스크가 될 수 있다.
* 수정 지시: 리포트 문구는 참고/조언/경향 중심으로 유지한다.
* 성공 기준: 스토어 리뷰에서 개인정보/과장 표현/결제 압박 리스크가 낮다.
* 검증 방법: 출시 전 체크리스트 수동 점검.
* 승인 상태: Approved

## 20. 승인 후 구현 시작

* 담당 에이전트: Command Agent / PM, Dev Lead
* 목표: 설계 승인 후 실제 React Native CLI 프로젝트 구현 단계로 전환한다.
* 구현/기획 범위: 신규 RN CLI 프로젝트 생성, TypeScript, 필수 의존성, `src/` 구조 구현, 테스트 작성.
* 산출물: 구현 계획서와 실제 앱 코드.
* 발견된 문제: 현재 작업공간은 빈 폴더이며 git 저장소가 아니다.
* 수정 지시: 구현 단계에서는 React Native CLI 신규 프로젝트를 생성하고, 필요한 경우 git 초기화를 함께 수행한다. Expo는 사용하지 않는다.
* 성공 기준: Android/iOS 네이티브 빌드 가능한 프로젝트가 생성된다.
* 검증 방법: `npx @react-native-community/cli init` 기반 스캐폴딩, 의존성 설치, TypeScript compile, Android 실행 확인.
* 승인 상태: Approved

---

# 최종 산출물

## 1. 앱 한 줄 소개

이름 없이 생년월일과 태어난 시간만으로 오늘의 사주 기운을 열어보는 동양 판타지 게임형 운세 앱.

## 2. 핵심 재미 요소

- 오행 구슬이 회전하는 게임 로비
- 년주/월주/일주/시주 봉인 해제 연출
- 사주 기둥과 오행 차트 기반 결과 요약
- 광고 mock 해금으로 열리는 상세 리포트
- 오늘의 부적, 오행 구슬, 7일 출석, 미션 기반 반복 요소

## 3. 전체 사용자 플로우

```txt
Home
  -> BirthInput
  -> AnalysisLoading
  -> ResultSummary
  -> DetailReport
  -> PremiumUnlock
  -> DetailReport(unlocked)
  -> Collection
```

## 4. MVP 범위

- React Native CLI + TypeScript 구조
- 기본 Navigation
- 7개 주요 화면
- Zustand store
- 내부 JSON 데이터
- 양력/음력 입력
- 기본 사주 계산
- 오행 계산
- 십성 구조 초안
- 풍부한 리포트 생성
- mockRewardAd
- 광고 해금 흐름
- 기본 애니메이션

## 5. 전체 폴더 구조

3단계의 `src/` 구조를 기준으로 한다. 구현 시 React Native CLI 기본 파일 위에 `src/app/App.tsx`를 앱 진입점으로 연결한다.

## 6. TypeScript 타입 정의

4단계의 `BirthInput`, `SajuPillars`, `ElementBalance`, `TenGodResult`, `FortuneResult`, `RootStackParamList`를 기준 타입으로 사용한다.

## 7. 사주 계산 로직 설계

- 입력값을 검증한다.
- 음력 입력은 내부 변환으로 양력 날짜로 바꾼다.
- 년주/월주/일주/시주를 산출한다.
- 시간 모름이면 시주는 `null`로 둔다.
- 절기 기준 정밀 월주는 확장 포인트로 남긴다.
- 결과에는 정확도 안내를 포함한다.

## 8. 오행/십성 데이터 구조

- 오행 데이터는 성향, 강약 설명, 재물/연애/일/보완 가이드를 가진다.
- 십성 데이터는 키워드, 기본 설명, 재물/연애/일 스타일을 가진다.
- 계산 결과는 오행/십성 key만 만들고, 문장 데이터는 JSON에서 읽는다.

## 9. 리포트 생성 로직

- seed는 생년월일, 날짜, 일간, 오행 정보를 조합한다.
- 같은 입력과 같은 날짜는 같은 결과를 만든다.
- 날짜가 바뀌면 오늘의 흐름, 미션, 행운 정보 일부가 바뀐다.
- 15개 섹션을 생성하고, 무료/잠금 상태를 section 단위로 관리한다.

## 10. 화면 설계도

- HomeScreen: 게임 로비와 큰 CTA
- BirthInputScreen: 입력과 저장 동의
- AnalysisLoadingScreen: 분석 연출
- ResultSummaryScreen: 요약 결과
- DetailReportScreen: 긴 리포트
- PremiumUnlockScreen: mock 광고 해금
- CollectionScreen: 수집 구조

## 11. 애니메이션 설계

- 버튼 glow/scale
- 사주 기둥 낙하
- 오행 구슬 회전
- 카드 등장/뒤집힘 느낌
- 오행 차트 차오름
- 해금 금빛 reveal
- 화면 fade/slide

## 12. 광고/프리미엄 해금 구조

- 기본 결과와 일부 상세 리포트는 무료
- 광고 mock 성공 시 오늘의 상세 리포트 전체 해금
- 프리미엄 상품 구조는 타입과 화면 문구만 준비
- 실제 AdMob/IAP 연동은 MVP 제외

## 13. 상태관리 구조

- `fortuneStore`: 입력값, 결과, 해금 상태, 저장 동의 처리
- `collectionStore`: 출석, 부적, 오행 구슬, 미션 완료 상태
- 생년월일/시간은 저장 동의가 있을 때만 persistence 대상

## 14. QA 체크리스트

- 생년월일 입력 누락 방지
- 양력/음력 선택 동작
- 시간 선택/시간 모름 동작
- 사주 기둥 생성
- 오행 계산
- 리포트 15개 섹션 생성
- mock 광고 해금
- 저장 동의 false 재실행
- 긴 리포트 가독성
- 서버/API 호출 없음

## 15. 출시 전 체크리스트

- Expo 미사용
- React Native CLI 기반
- Android/iOS 네이티브 빌드 가능
- 서버 API 없음
- 개인정보 서버 전송 없음
- 이름 입력 없음
- 운세 참고용 안내 표시
- 콘텐츠 금지 표현 제거
- 무료 사용자 가치 확보
- 실제 광고/IAP 비활성 또는 명확한 mock 상태

## 16. 추후 확장 포인트

- 절기 기준 월주 정밀 계산
- 음력 윤달 정밀 보강
- 실제 AdMob 보상형 광고
- 실제 IAP 프리미엄 상품
- 월간/연간 운세
- 궁합 리포트
- 재물/직장/사업운 심화 리포트
- 부적 스킨과 행운 카드 도감 확장
- 푸시 알림은 개인정보/동의 UX 검토 후 별도 설계
