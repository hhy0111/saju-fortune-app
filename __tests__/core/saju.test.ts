import { calculateElements } from '../../src/core/saju/calculateElements';
import { calculatePillars } from '../../src/core/saju/calculatePillars';

describe('saju calculation', () => {
  it('calculates four pillars for a solar birth input', () => {
    const pillars = calculatePillars({
      birthDate: '1990-05-17',
      birthHour: 9,
      calendarType: 'solar',
      gender: 'unspecified',
      saveConsent: false,
    });

    expect(pillars.year.stem).toBeTruthy();
    expect(pillars.month.branch).toBeTruthy();
    expect(pillars.day.stemHanja).toBeTruthy();
    expect(pillars.hour).not.toBeNull();
    expect(pillars.accuracyNote).toContain('양력 날짜 기준');
    expect(pillars.accuracyNote).not.toContain('MVP');
    expect(pillars.accuracyNote).not.toContain('추후');
  });

  it('keeps hour pillar null when birth time is unknown', () => {
    const pillars = calculatePillars({
      birthDate: '1990-05-17',
      birthHour: null,
      calendarType: 'solar',
      gender: 'unspecified',
      saveConsent: false,
    });

    expect(pillars.hour).toBeNull();
    expect(pillars.accuracyNote).toContain('시간');
  });

  it('accepts lunar birth input through local conversion path', () => {
    const pillars = calculatePillars({
      birthDate: '1990-04-23',
      birthHour: 9,
      calendarType: 'lunar',
      gender: 'unspecified',
      saveConsent: false,
    });

    expect(pillars.accuracyNote).toContain('음력');
    expect(pillars.accuracyNote).not.toContain('추후');
    expect(pillars.year.branch).toBeTruthy();
  });

  it('throws for invalid dates', () => {
    expect(() =>
      calculatePillars({
        birthDate: '1990-99-99',
        birthHour: 9,
        calendarType: 'solar',
        gender: 'unspecified',
        saveConsent: false,
      }),
    ).toThrow('Invalid birth date');
  });

  it('calculates element balance totals from available pillars', () => {
    const pillars = calculatePillars({
      birthDate: '1990-05-17',
      birthHour: null,
      calendarType: 'solar',
      gender: 'unspecified',
      saveConsent: false,
    });

    const balance = calculateElements(pillars);
    const total = balance.wood + balance.fire + balance.earth + balance.metal + balance.water;

    expect(total).toBe(3);
    expect(balance.strongest.length).toBeGreaterThan(0);
    expect(balance.weakest.length).toBeGreaterThan(0);
  });
});
