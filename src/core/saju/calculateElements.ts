import type { ElementBalance, ElementKey, SajuPillars } from './types';

const ELEMENTS: ElementKey[] = ['wood', 'fire', 'earth', 'metal', 'water'];

export function calculateElements(pillars: SajuPillars): ElementBalance {
  const counts: Record<ElementKey, number> = {
    wood: 0,
    fire: 0,
    earth: 0,
    metal: 0,
    water: 0,
  };
  const available = [pillars.year, pillars.month, pillars.day, pillars.hour].filter(Boolean);

  available.forEach(pillar => {
    counts[pillar!.element] += 1;
  });

  const values = ELEMENTS.map(element => counts[element]);
  const max = Math.max(...values);
  const min = Math.min(...values);

  return {
    ...counts,
    strongest: ELEMENTS.filter(element => counts[element] === max),
    weakest: ELEMENTS.filter(element => counts[element] === min),
  };
}
