export type FortuneCategoryId =
  | 'elements'
  | 'today'
  | 'money'
  | 'love'
  | 'work'
  | 'health'
  | 'lotto'
  | 'compatibility'
  | 'monthly';

export interface FortuneCategory {
  id: FortuneCategoryId;
  label: string;
}

export const fortuneMenuItems: FortuneCategory[] = [
  { id: 'elements', label: '내 오행 분석' },
  { id: 'today', label: '오늘의 운세' },
  { id: 'money', label: '재물운' },
  { id: 'love', label: '연애운' },
  { id: 'work', label: '직장운' },
  { id: 'health', label: '건강운' },
  { id: 'lotto', label: '로또번호 운세' },
  { id: 'compatibility', label: '궁합' },
  { id: 'monthly', label: '월간 운세' },
];
