import type { ElementBalance, SajuPillars, TenGodResult } from '../saju/types';

export interface LuckyInfo {
  color: string;
  colorHex: string;
  number: number;
  direction: string;
  lottoNumbers: number[];
  lottoWeekLabel: string;
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

export interface ReportGenerationInput {
  seed: string;
  pillars: SajuPillars;
  elementBalance: ElementBalance;
  tenGods: TenGodResult;
}
