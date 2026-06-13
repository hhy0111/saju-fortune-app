import dailyMissions from '../../data/fortune/dailyMissions.json';
import fortuneTexts from '../../data/fortune/fortuneTexts.json';
import luckyData from '../../data/fortune/luckyData.json';
import { formatDate, getMondayWeekStart } from '../../utils/dateUtils';
import { calculateElements } from '../saju/calculateElements';
import { calculatePillars } from '../saju/calculatePillars';
import { calculateTenGods } from '../saju/calculateTenGods';
import type { BirthInput, SajuPillars } from '../saju/types';
import { generateReport } from './generateReport';
import { createSeed, createSeededRandom, pickSeeded } from './seededRandom';
import type { FortuneResult, LuckyInfo } from './types';

function gradeFromScore(score: number): FortuneResult['grade'] {
  if (score >= 90) {
    return 'S';
  }

  if (score >= 76) {
    return 'A';
  }

  if (score >= 58) {
    return 'B';
  }

  return 'C';
}

function pickLottoNumbers(seed: string): number[] {
  const random = createSeededRandom(`${seed}|lotto`);
  const pool = Array.from({ length: 45 }, (_, index) => index + 1);

  for (let index = pool.length - 1; index > 0; index -= 1) {
    const target = Math.floor(random() * (index + 1));
    [pool[index], pool[target]] = [pool[target], pool[index]];
  }

  return pool.slice(0, 6).sort((a, b) => a - b);
}

function createWeeklyLottoSeed(input: BirthInput, pillars: SajuPillars, weekStart: string): string {
  return createSeed([
    input.birthDate,
    input.birthHour,
    input.birthMinute,
    input.calendarType,
    pillars.year.stem,
    pillars.year.branch,
    pillars.month.stem,
    pillars.month.branch,
    pillars.day.stem,
    pillars.day.branch,
    pillars.hour?.stem,
    pillars.hour?.branch,
    weekStart,
  ]);
}

function pickLucky(seed: string, lottoSeed: string, lottoWeekStart: string): LuckyInfo {
  const color = pickSeeded(luckyData.colors, `${seed}|color`);

  return {
    ...color,
    number: Math.floor(createSeededRandom(`${seed}|number`)() * 9) + 1,
    direction: pickSeeded(luckyData.directions, `${seed}|direction`),
    lottoNumbers: pickLottoNumbers(lottoSeed),
    lottoWeekLabel: `${lottoWeekStart} 주간`,
  };
}

export function generateFortune(input: BirthInput, today: Date = new Date()): FortuneResult {
  const generatedDate = formatDate(today);
  const pillars = calculatePillars(input);
  const elementBalance = calculateElements(pillars);
  const tenGods = calculateTenGods(pillars);
  const lottoWeekStart = getMondayWeekStart(today);
  const lottoSeed = createWeeklyLottoSeed(input, pillars, lottoWeekStart);
  const seed = createSeed([
    input.birthDate,
    input.birthHour,
    input.birthMinute,
    input.calendarType,
    generatedDate,
    pillars.day.stem,
  ]);
  const random = createSeededRandom(seed);
  const score = Math.floor(random() * 34) + 60;
  const mission = pickSeeded(dailyMissions, `${seed}|mission`);

  return {
    id: createSeed([input.birthDate, input.birthHour, input.birthMinute, input.calendarType, generatedDate]),
    generatedDate,
    summaryTitle: pickSeeded(fortuneTexts.summaryTitles, `${seed}|summary`),
    score,
    grade: gradeFromScore(score),
    keywords: [
      pillars.day.stem,
      tenGods.primary,
      elementBalance.strongest[0],
    ],
    lucky: pickLucky(seed, lottoSeed, lottoWeekStart),
    oneLineAdvice: `${pickSeeded(fortuneTexts.oneLineAdvice, `${seed}|advice`)} ${mission}`,
    pillars,
    elementBalance,
    tenGods,
    sections: generateReport({ seed, pillars, elementBalance, tenGods }),
    disclaimer: '운세 결과는 참고용입니다. 중요한 결정은 현실적인 정보와 본인의 판단을 함께 고려해 주세요.',
  };
}
