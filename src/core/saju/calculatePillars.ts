import { diffDaysUtc, parseDateStrict } from '../../utils/dateUtils';
import { convertLunarToSolar } from './lunarCalendar';
import type { BirthInput, ElementKey, SajuPillar, SajuPillars } from './types';

const STEMS = [
  { label: '갑', hanja: '甲', element: 'wood' },
  { label: '을', hanja: '乙', element: 'wood' },
  { label: '병', hanja: '丙', element: 'fire' },
  { label: '정', hanja: '丁', element: 'fire' },
  { label: '무', hanja: '戊', element: 'earth' },
  { label: '기', hanja: '己', element: 'earth' },
  { label: '경', hanja: '庚', element: 'metal' },
  { label: '신', hanja: '辛', element: 'metal' },
  { label: '임', hanja: '壬', element: 'water' },
  { label: '계', hanja: '癸', element: 'water' },
] as const;

const BRANCHES = [
  { label: '자', hanja: '子' },
  { label: '축', hanja: '丑' },
  { label: '인', hanja: '寅' },
  { label: '묘', hanja: '卯' },
  { label: '진', hanja: '辰' },
  { label: '사', hanja: '巳' },
  { label: '오', hanja: '午' },
  { label: '미', hanja: '未' },
  { label: '신', hanja: '申' },
  { label: '유', hanja: '酉' },
  { label: '술', hanja: '戌' },
  { label: '해', hanja: '亥' },
] as const;

function positiveMod(value: number, divisor: number): number {
  return ((value % divisor) + divisor) % divisor;
}

function createPillar(stemIndex: number, branchIndex: number): SajuPillar {
  const stem = STEMS[positiveMod(stemIndex, STEMS.length)];
  const branch = BRANCHES[positiveMod(branchIndex, BRANCHES.length)];

  return {
    stem: stem.label,
    stemHanja: stem.hanja,
    branch: branch.label,
    branchHanja: branch.hanja,
    element: stem.element as ElementKey,
  };
}

function calculateYearPillar(date: Date): SajuPillar {
  const year = date.getUTCFullYear();
  const offset = year - 1984;

  return createPillar(offset, offset);
}

function calculateMonthPillar(date: Date): SajuPillar {
  const yearOffset = date.getUTCFullYear() - 1984;
  const month = date.getUTCMonth() + 1;
  const branchIndex = positiveMod(month + 1, 12);
  const stemIndex = positiveMod(yearOffset * 12 + month + 2, 10);

  return createPillar(stemIndex, branchIndex);
}

function calculateDayPillar(date: Date): SajuPillar {
  const base = new Date(Date.UTC(1984, 1, 2));
  const offset = diffDaysUtc(base, date);

  return createPillar(offset, offset);
}

function calculateHourPillar(day: SajuPillar, birthHour: number): SajuPillar {
  if (birthHour < 0 || birthHour > 23) {
    throw new Error('Invalid birth hour');
  }

  const branchIndex = positiveMod(Math.floor((birthHour + 1) / 2), 12);
  const dayStemIndex = STEMS.findIndex(stem => stem.label === day.stem);
  const stemIndex = positiveMod(dayStemIndex * 2 + branchIndex, 10);

  return createPillar(stemIndex, branchIndex);
}

export function calculatePillars(input: BirthInput): SajuPillars {
  if (
    input.birthMinute !== undefined &&
    input.birthMinute !== null &&
    (!Number.isInteger(input.birthMinute) || input.birthMinute < 0 || input.birthMinute > 59)
  ) {
    throw new Error('Invalid birth minute');
  }

  const solarDate =
    input.calendarType === 'lunar'
      ? convertLunarToSolar(input.birthDate)
      : parseDateStrict(input.birthDate);
  const day = calculateDayPillar(solarDate);
  const hour = input.birthHour === null ? null : calculateHourPillar(day, input.birthHour);
  const calendarNote =
    input.calendarType === 'lunar'
      ? '음력 날짜는 내부 변환 기준으로 계산되며, 절기 기준 세부 월주는 추후 정밀화될 수 있습니다.'
      : 'MVP 계산은 양력 날짜 기준이며, 절기 기준 세부 월주는 추후 정밀화될 수 있습니다.';
  const timeNote =
    input.birthHour === null ? ' 태어난 시간을 모르는 경우 시주는 제외되어 정확도가 낮아질 수 있습니다.' : '';

  return {
    year: calculateYearPillar(solarDate),
    month: calculateMonthPillar(solarDate),
    day,
    hour,
    accuracyNote: `${calendarNote}${timeNote}`,
  };
}
