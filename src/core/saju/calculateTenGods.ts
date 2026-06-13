import type { SajuPillars, TenGodResult } from './types';

const TEN_GODS = [
  '비견',
  '겁재',
  '식신',
  '상관',
  '편재',
  '정재',
  '편관',
  '정관',
  '편인',
  '정인',
];

export function calculateTenGods(pillars: SajuPillars): TenGodResult {
  const dayStemCode = pillars.day.stem.charCodeAt(0);
  const primary = TEN_GODS[dayStemCode % TEN_GODS.length];
  const secondary = [pillars.year.stem, pillars.month.stem, pillars.hour?.stem]
    .filter(Boolean)
    .map((stem, index) => TEN_GODS[(stem!.charCodeAt(0) + index) % TEN_GODS.length])
    .slice(0, 3);

  return {
    primary,
    secondary,
    description: `${primary}의 기운은 오늘의 선택에서 자신만의 기준을 세우는 방식으로 드러납니다.`,
  };
}
