import { createSeed, createSeededRandom, pickSeeded } from '../../src/core/fortune/seededRandom';

describe('seededRandom', () => {
  it('returns the same sequence for the same seed', () => {
    const first = createSeededRandom('same-seed');
    const second = createSeededRandom('same-seed');

    expect([first(), first(), first()]).toEqual([second(), second(), second()]);
  });

  it('creates different seed values for different inputs', () => {
    expect(createSeed(['1990-01-01', '2026-06-07'])).not.toBe(
      createSeed(['1990-01-01', '2026-06-08']),
    );
  });

  it('picks an item deterministically', () => {
    const values = ['wood', 'fire', 'earth', 'metal', 'water'];

    expect(pickSeeded(values, 'daily-key')).toBe(pickSeeded(values, 'daily-key'));
  });
});
