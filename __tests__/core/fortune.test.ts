import { generateFortune } from '../../src/core/fortune/generateFortune';
import type { BirthInput } from '../../src/core/saju/types';

const input: BirthInput = {
  birthDate: '1990-05-17',
  birthHour: 9,
  calendarType: 'solar',
  gender: 'unspecified',
  saveConsent: false,
};

describe('fortune generation', () => {
  it('generates deterministic fortune for the same input and date', () => {
    const first = generateFortune(input, new Date('2026-06-07T00:00:00+09:00'));
    const second = generateFortune(input, new Date('2026-06-07T00:00:00+09:00'));

    expect(first).toEqual(second);
  });

  it('changes daily content when the date changes', () => {
    const first = generateFortune(input, new Date('2026-06-07T00:00:00+09:00'));
    const second = generateFortune(input, new Date('2026-06-08T00:00:00+09:00'));

    expect(first.id).not.toBe(second.id);
    expect(first.oneLineAdvice).not.toBe(second.oneLineAdvice);
  });

  it('creates rich report sections with free and locked content', () => {
    const result = generateFortune(input, new Date('2026-06-07T00:00:00+09:00'));
    const unlocked = result.sections.filter(section => !section.locked);
    const locked = result.sections.filter(section => section.locked);

    expect(result.sections).toHaveLength(15);
    expect(unlocked.length).toBeGreaterThanOrEqual(5);
    expect(locked.length).toBeGreaterThan(0);
    expect(result.sections.every(section => countSentences(section.body) >= 7)).toBe(true);
    expect(result.sections.every(section => section.body.length >= 260)).toBe(true);
    expect(result.sections.every(section => section.body.includes('\n\n'))).toBe(true);
  });

  it('does not repeat the same report sentences across most sections', () => {
    const result = generateFortune(input, new Date('2026-06-07T00:00:00+09:00'));
    const sentenceCounts = new Map<string, number>();

    result.sections.forEach(section => {
      section.body
        .split(/[.!?。]/)
        .map(sentence => sentence.trim())
        .filter(sentence => sentence.length >= 16)
        .forEach(sentence => sentenceCounts.set(sentence, (sentenceCounts.get(sentence) ?? 0) + 1));
    });

    const maxRepeatCount = Math.max(...sentenceCounts.values());

    expect(maxRepeatCount).toBeLessThanOrEqual(3);
  });

  it('includes non-alarming disclaimer text', () => {
    const result = generateFortune(input, new Date('2026-06-07T00:00:00+09:00'));

    expect(result.disclaimer).toContain('참고용');
    expect(result.disclaimer).not.toContain('반드시');
  });

  it('creates weekly lotto numbers from the saju input and current week', () => {
    const monday = generateFortune(input, new Date('2026-06-08T00:00:00+09:00'));
    const sunday = generateFortune(input, new Date('2026-06-14T00:00:00+09:00'));
    const nextMonday = generateFortune(input, new Date('2026-06-15T00:00:00+09:00'));

    expect(monday.lucky.lottoNumbers).toHaveLength(6);
    expect(new Set(monday.lucky.lottoNumbers).size).toBe(6);
    expect(monday.lucky.lottoNumbers).toEqual([...monday.lucky.lottoNumbers].sort((a, b) => a - b));
    expect(monday.lucky.lottoNumbers.every(number => number >= 1 && number <= 45)).toBe(true);
    expect(monday.lucky.lottoWeekLabel).toBe('2026-06-08 주간');
    expect(monday.lucky.lottoNumbers).toEqual(sunday.lucky.lottoNumbers);
    expect(monday.lucky.lottoNumbers).not.toEqual(nextMonday.lucky.lottoNumbers);
  });

  it('changes weekly lotto numbers when the birth saju input changes', () => {
    const first = generateFortune(input, new Date('2026-06-08T00:00:00+09:00'));
    const second = generateFortune(
      {
        ...input,
        birthDate: '1992-11-03',
        birthHour: 21,
      },
      new Date('2026-06-08T00:00:00+09:00'),
    );

    expect(first.lucky.lottoNumbers).not.toEqual(second.lucky.lottoNumbers);
  });
});

function countSentences(body: string) {
  return body.split(/[.!?。]/).filter(sentence => sentence.trim().length > 0).length;
}
