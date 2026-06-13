export type CalendarType = 'solar' | 'lunar';
export type Gender = 'female' | 'male' | 'unspecified';
export type ElementKey = 'wood' | 'fire' | 'earth' | 'metal' | 'water';

export interface BirthInput {
  birthDate: string;
  birthHour: number | null;
  birthMinute?: number | null;
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
