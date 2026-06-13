import type { BirthInput } from '../core/saju/types';
import type { FortuneCategoryId } from '../core/fortune/fortuneCategories';

export interface FortuneCategoryParams {
  categoryId?: FortuneCategoryId;
  categoryLabel?: string;
}

export type RootStackParamList = {
  Home: undefined;
  BirthInput: FortuneCategoryParams | undefined;
  AnalysisLoading: { birthInput: BirthInput } & FortuneCategoryParams;
  ResultSummary: { fortuneId: string } & FortuneCategoryParams;
  DetailReport: { fortuneId: string } & FortuneCategoryParams;
  PremiumUnlock: { fortuneId: string } & FortuneCategoryParams;
  Collection: undefined;
  PrivacyPolicy: undefined;
};
