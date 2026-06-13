import reportSections from '../../data/fortune/reportSections.json';
import elements from '../../data/saju/elements.json';
import tenGodTexts from '../../data/saju/tenGods.json';
import type { ElementKey } from '../saju/types';
import type { ReportGenerationInput, ReportSection } from './types';
import { createSeededRandom } from './seededRandom';

interface ElementText {
  label: string;
  hanja: string;
  keywords: string[];
  balanceGuide: string;
}

const elementTexts = elements as Record<ElementKey, ElementText>;
const tenGodKeywords = tenGodTexts as Record<string, string[]>;

const rhythmTexts = [
  '급하게 결론을 내리기보다 한 번 더 정리하고 움직이는 흐름',
  '작은 신호를 놓치지 않고 천천히 방향을 맞추는 흐름',
  '말보다 태도와 선택의 순서를 부드럽게 다듬는 흐름',
  '익숙한 방식을 유지하되 필요한 부분만 가볍게 바꾸는 흐름',
];

const focusTexts = [
  '오늘은 큰 변화보다 작은 조율에서 만족감이 생기기 쉽습니다',
  '주변의 반응을 살피되 내 기준을 잃지 않는 태도가 도움이 됩니다',
  '해야 할 일을 한 번에 밀어붙이기보다 순서를 나누면 마음이 가벼워집니다',
  '사람들과의 대화에서는 속도보다 온도를 맞추는 쪽이 더 편안합니다',
];

const sectionGuides: Record<string, string> = {
  corePersonality: '기본 기질은 평소 선택의 방향을 읽는 부분입니다',
  strength: '강점은 오늘 활용하면 좋은 능력을 보여줍니다',
  weakness: '약점은 고쳐야 할 단점보다 잠시 살펴볼 습관에 가깝습니다',
  publicImage: '사람들에게 보이는 이미지는 첫인상과 대화 분위기를 설명합니다',
  hiddenPersonality: '혼자 있을 때의 성향은 에너지를 회복하는 방식을 알려줍니다',
  moneyStyle: '돈을 대하는 방식은 지출과 선택의 리듬을 살피는 구간입니다',
  loveStyle: '연애에서의 특징은 마음을 표현하는 속도와 안정감을 봅니다',
  workStyle: '일할 때의 스타일은 집중 방식과 협업에서의 태도를 읽습니다',
  relationshipPattern: '인간관계 패턴은 가까워지는 방식과 거리를 조절하는 감각을 봅니다',
  todayFlow: '오늘의 흐름은 하루 안에서 우선순위를 잡는 데 도움을 줍니다',
  weeklyAdvice: '이번 주 조언은 며칠 동안 반복해서 의식하면 좋은 방향입니다',
  warning: '조심해야 할 말과 행동은 불안을 주기보다 실수를 줄이는 안내입니다',
  luckyGuide: '오늘의 행운 포인트는 기분을 가볍게 전환하는 장치입니다',
  elementBalanceGuide: '부족한 기운을 보완하는 방법은 생활 속 작은 균형을 제안합니다',
  actionMission: '나에게 맞는 하루 루틴은 오늘 바로 실천할 수 있는 움직임입니다',
};

function sectionBody(title: string, input: ReportGenerationInput, index: number): string {
  const random = createSeededRandom(`${input.seed}|${title}|${index}`);
  const dominant = input.elementBalance.strongest[0];
  const weak = input.elementBalance.weakest[0];
  const dominantText = elementTexts[dominant];
  const weakText = elementTexts[weak];
  const primaryKeywords = tenGodKeywords[input.tenGods.primary] ?? [input.tenGods.description];
  const secondary = input.tenGods.secondary[0] ?? input.tenGods.primary;
  const secondaryKeywords = tenGodKeywords[secondary] ?? primaryKeywords;
  const rhythm = pick(rhythmTexts, random);
  const focus = pick(focusTexts, random);
  const dominantKeyword = pick(dominantText.keywords, random);
  const weakKeyword = pick(weakText.keywords, random);
  const tenGodKeyword = pick(primaryKeywords, random);
  const secondaryKeyword = pick(secondaryKeywords, random);
  const dayPillar = `${input.pillars.day.stemHanja}${input.pillars.day.branchHanja}`;
  const hourHint = input.pillars.hour
    ? `시주의 ${input.pillars.hour.stemHanja}${input.pillars.hour.branchHanja} 기운은 실제 행동의 속도를 조금 더 구체적으로 보여줍니다`
    : '태어난 시간을 비워 둔 경우에는 시주의 세부 흐름을 제외하고 큰 방향 중심으로 읽습니다';
  const guide = sectionGuides[reportSections[index]?.id] ?? `${title}은 오늘의 흐름을 편안하게 살피는 구간입니다`;

  const bodies: Record<string, string[]> = {
    corePersonality: [
      `${guide}.`,
      `일간 ${dayPillar}을 기준으로 보면 ${dominantText.label}의 ${dominantKeyword} 기운이 먼저 눈에 들어옵니다.`,
      `${input.tenGods.primary}의 ${tenGodKeyword} 성향이 함께 있어 스스로 판단하고 움직이려는 마음이 비교적 선명합니다.`,
      `다만 ${weakText.label}의 ${weakKeyword} 흐름이 약하게 잡히면 시작은 빠르지만 감정의 여백을 놓치기 쉽습니다.`,
      `${focus}.`,
      `${hourHint}.`,
      `기질을 부드럽게 쓰고 싶다면 ${weakText.balanceGuide}`,
      `이 부분은 성격을 단정하는 해석이 아니라 오늘 나를 조금 더 편하게 다루기 위한 참고용 안내입니다.`,
    ],
    strength: [
      `${guide}.`,
      `${dominantText.label}의 기운이 살아 있을 때는 ${dominantKeyword}을 붙잡고 끝까지 정리하는 힘이 좋아집니다.`,
      `${input.tenGods.primary}은 ${tenGodKeyword} 키워드처럼 스스로의 기준을 세우는 데 도움을 줍니다.`,
      `사람들이 막연하게 고민하는 상황에서도 당신은 무엇을 먼저 처리해야 하는지 비교적 빨리 감을 잡을 수 있습니다.`,
      `${secondary}의 ${secondaryKeyword} 흐름은 주변 자원을 활용하거나 조용히 도움을 받는 감각을 더합니다.`,
      `오늘은 완벽한 결과보다 작은 선택을 깔끔하게 마무리하는 쪽에서 장점이 잘 드러납니다.`,
      `강한 기운을 무리하게 밀어붙이기보다 상대가 받아들이기 쉬운 표현으로 바꾸면 신뢰가 더 오래 갑니다.`,
      `이 장점은 게임의 카드처럼 필요할 때 꺼내 쓰는 능력으로 바라보면 부담이 줄어듭니다.`,
    ],
    weakness: [
      `${guide}.`,
      `부족한 ${weakText.label} 기운은 ${weakKeyword}을 충분히 느끼기 전에 결론부터 정하려는 모습으로 나타날 수 있습니다.`,
      `${input.tenGods.primary}의 ${tenGodKeyword} 성향이 강해지면 내 방식이 맞다는 확신이 커져 말이 짧아질 수 있습니다.`,
      `이것은 나쁘다는 뜻이 아니라 피곤하거나 바쁜 날에 자주 나타나는 반응에 가깝습니다.`,
      `오늘은 대답을 바로 정하기 전에 잠시 멈추고 상대의 의도를 확인하면 불필요한 오해가 줄어듭니다.`,
      `약점 보완에는 ${weakText.balanceGuide}`,
      `${rhythm}을 의식하면 약한 기운이 자연스럽게 보완됩니다.`,
      `약점은 고정된 운명이 아니라 하루의 리듬을 조절하는 힌트로 보는 편이 좋습니다.`,
    ],
    publicImage: [
      `${guide}.`,
      `겉으로는 ${dominantText.label}의 ${dominantKeyword} 기운 때문에 또렷하고 정돈된 사람처럼 보이기 쉽습니다.`,
      `${input.tenGods.primary}의 ${tenGodKeyword} 성향은 말이나 태도에서 자기 기준이 분명하다는 인상을 남깁니다.`,
      `처음 만난 사람은 당신을 쉽게 흔들리지 않는 사람으로 느낄 수 있습니다.`,
      `다만 ${weakText.label}의 ${weakKeyword} 흐름이 약하면 부드러운 설명이 부족하게 전달될 수 있습니다.`,
      `오늘은 결론을 말한 뒤 이유를 한 문장 덧붙이면 이미지가 훨씬 편안해집니다.`,
      `표정과 말투를 조금 느리게 가져가면 강한 기운이 부담보다 신뢰로 읽힙니다.`,
      `사람들에게 보이는 모습은 바꿔야 할 가면이 아니라 상황에 맞게 조절할 수 있는 연출 카드입니다.`,
    ],
    hiddenPersonality: [
      `${guide}.`,
      `혼자 있을 때는 ${dominantText.label}의 ${dominantKeyword} 기운이 안쪽에서 조용히 기준을 정리합니다.`,
      `밖에서는 담담해 보여도 안에서는 해야 할 일과 미뤄 둔 감정을 계속 분류하고 있을 수 있습니다.`,
      `${secondary}의 ${secondaryKeyword} 흐름은 혼자만의 몰입이나 생각 정리에 힘을 보탭니다.`,
      `부족한 ${weakText.label} 기운은 쉬는 시간에도 완전히 놓지 못하는 긴장으로 나타날 수 있습니다.`,
      `오늘은 조용한 음악, 짧은 산책, 물 한 잔처럼 부담 없는 루틴이 회복에 잘 맞습니다.`,
      `혼자 있는 시간에는 ${weakText.balanceGuide}`,
      `혼자 있는 시간은 게으름이 아니라 다음 선택을 부드럽게 만들기 위한 충전 구간으로 보는 편이 좋습니다.`,
    ],
    moneyStyle: [
      `${guide}.`,
      `돈을 대할 때는 ${dominantText.label}의 ${dominantKeyword} 기운이 기준과 효율을 먼저 따지게 만듭니다.`,
      `${input.tenGods.primary}의 ${tenGodKeyword} 성향은 내가 납득한 지출에는 과감하지만 애매한 소비에는 마음이 쉽게 닫히게 합니다.`,
      `오늘은 작은 결제라도 목적을 분명히 적어 보면 재물 흐름이 안정적으로 느껴집니다.`,
      `${secondary}의 ${secondaryKeyword} 키워드는 사람, 정보, 타이밍에서 기회를 발견하는 감각을 더합니다.`,
      `부족한 ${weakText.label} 기운이 올라오면 만족보다 비교가 앞서 지출 후 마음이 복잡해질 수 있습니다.`,
      `큰 판단이 필요한 돈 문제는 운세만으로 정하지 말고 현실적인 정보와 함께 천천히 보세요.`,
      `오늘의 재물운은 아끼는 것보다 쓸 이유를 또렷하게 만드는 데 초점을 두면 좋습니다.`,
    ],
    loveStyle: [
      `${guide}.`,
      `연애에서는 ${dominantText.label}의 ${dominantKeyword} 기운 때문에 마음을 쉽게 흐트러뜨리기보다 신중하게 확인하려는 편입니다.`,
      `${input.tenGods.primary}의 ${tenGodKeyword} 성향은 나다운 방식으로 관계를 지키고 싶다는 마음을 키웁니다.`,
      `좋아하는 마음이 있어도 표현은 한 박자 늦게 나오거나, 말보다 행동으로 먼저 드러날 수 있습니다.`,
      `부족한 ${weakText.label}의 ${weakKeyword} 흐름은 상대의 감정 속도를 읽는 데 잠시 시간이 필요하다는 뜻으로 볼 수 있습니다.`,
      `오늘은 긴 설명보다 짧고 따뜻한 문장이 관계의 분위기를 부드럽게 만듭니다.`,
      `상대에게 맞추느라 나를 잃는 것도, 내 기준만 앞세우는 것도 잠시 내려놓는 균형이 좋습니다.`,
      `연애운은 확정된 결과보다 서로 편해지는 작은 장면을 만드는 쪽으로 활용해 주세요.`,
    ],
    workStyle: [
      `${guide}.`,
      `일할 때는 ${dominantText.label}의 ${dominantKeyword} 기운이 기준, 마감, 완성도를 중요하게 보게 합니다.`,
      `${input.tenGods.primary}의 ${tenGodKeyword} 성향은 책임을 맡았을 때 스스로 밀고 가는 힘으로 나타납니다.`,
      `오늘은 큰 업무를 한 번에 처리하기보다 기준을 먼저 정하고 작은 단위로 나누는 방식이 잘 맞습니다.`,
      `${secondary}의 ${secondaryKeyword} 흐름은 동료와 역할을 나누거나 필요한 정보를 빠르게 찾는 데 도움을 줍니다.`,
      `부족한 ${weakText.label} 기운이 약하게 잡히면 중간 공유를 미루고 혼자 해결하려는 경향이 생길 수 있습니다.`,
      `진행 상황을 짧게 공유하면 능력이 약해 보이는 것이 아니라 오히려 신뢰가 쌓입니다.`,
      `오늘의 직장운은 성과를 크게 과시하기보다 정확하고 편안하게 완성하는 쪽에 힘이 있습니다.`,
    ],
    relationshipPattern: [
      `${guide}.`,
      `인간관계에서는 ${dominantText.label}의 ${dominantKeyword} 기운 때문에 분명한 사람, 약속을 지키는 사람에게 마음이 갑니다.`,
      `${input.tenGods.primary}의 ${tenGodKeyword} 성향은 친해져도 내 영역을 지키고 싶게 만듭니다.`,
      `가까운 관계일수록 말하지 않아도 알아주길 바라는 마음이 생길 수 있습니다.`,
      `부족한 ${weakText.label}의 ${weakKeyword} 흐름은 감정의 완충 시간을 충분히 두라는 신호입니다.`,
      `오늘은 부탁이나 거절을 돌려 말하기보다 부드럽고 짧게 표현하는 편이 좋습니다.`,
      `관계를 잘 풀고 싶다면 먼저 분위기를 낮추고, 그다음에 원하는 바를 말해 보세요.`,
      `이 패턴을 알고 있으면 사람 사이의 거리 조절이 훨씬 덜 피곤해집니다.`,
    ],
    todayFlow: [
      `${guide}.`,
      `오늘은 ${dominantText.label}의 ${dominantKeyword} 기운이 먼저 열려 선택과 정리에 힘이 붙습니다.`,
      `${input.tenGods.primary}의 ${tenGodKeyword} 성향은 해야 할 일을 뒤로 미루지 않게 도와줍니다.`,
      `${focus}.`,
      `오전에는 기준을 세우고, 오후에는 사람과의 온도를 맞추는 방식이 무난합니다.`,
      `부족한 ${weakText.label} 기운은 ${weakKeyword}을 의식하는 작은 행동으로 보완해 보세요.`,
      `${rhythm}이 오늘의 핵심 리듬입니다.`,
      `오늘의 흐름은 대단한 사건보다 작은 선택이 쌓여 기분을 바꾸는 쪽에 가깝습니다.`,
    ],
    weeklyAdvice: [
      `${guide}.`,
      `이번 주에는 ${dominantText.label}의 ${dominantKeyword} 기운을 꾸준히 쓰되 속도를 너무 높이지 않는 편이 좋습니다.`,
      `${input.tenGods.primary}의 ${tenGodKeyword} 성향은 계획을 지키는 힘을 주지만, 여백이 없으면 쉽게 피로해질 수 있습니다.`,
      `초반에는 해야 할 일을 줄이고, 중반에는 관계의 약속을 확인하고, 후반에는 정리 시간을 만드는 흐름이 편합니다.`,
      `${secondary}의 ${secondaryKeyword} 키워드는 예상 밖의 도움이나 정보를 받아들이는 태도와 잘 맞습니다.`,
      `부족한 ${weakText.label} 기운은 한 번에 해결하려 하기보다 매일 작은 루틴으로 보완하는 편이 자연스럽습니다.`,
      `이번 주 조언은 무리한 결심보다 지킬 수 있는 약속 하나를 고르는 것입니다.`,
      `그 약속이 작아도 반복되면 마음의 중심이 훨씬 안정적으로 느껴질 수 있습니다.`,
    ],
    warning: [
      `${guide}.`,
      `오늘 조심할 부분은 나쁜 일이 아니라 말과 행동의 속도가 살짝 빨라지는 장면입니다.`,
      `${dominantText.label}의 ${dominantKeyword} 기운이 강하면 판단은 빠르지만 설명이 짧아질 수 있습니다.`,
      `${input.tenGods.primary}의 ${tenGodKeyword} 성향은 내 기준을 지키게 해 주지만, 상대에게는 단호하게 들릴 때가 있습니다.`,
      `부족한 ${weakText.label}의 ${weakKeyword} 흐름은 감정의 완충 장치를 하나 더 만들라는 신호로 보면 좋습니다.`,
      `중요한 메시지는 보내기 전 한 번 더 읽고, 부탁은 이유를 함께 적어 보세요.`,
      `오늘은 이기고 지는 대화보다 서로 덜 피곤한 대화를 선택하는 쪽이 운의 흐름을 편안하게 만듭니다.`,
      `이 안내는 불안을 만들기 위한 경고가 아니라 하루를 부드럽게 지나가기 위한 체크 포인트입니다.`,
    ],
    luckyGuide: [
      `${guide}.`,
      `오늘의 행운은 ${dominantText.label}의 ${dominantKeyword} 기운을 부담 없이 켜는 작은 장면에서 시작됩니다.`,
      `${input.tenGods.primary}의 ${tenGodKeyword} 성향은 내가 고른 물건, 색상, 방향에 의미를 부여할 때 더 선명하게 느껴집니다.`,
      `행운 색상이나 숫자는 결과를 보장하는 표식이 아니라 기분을 전환하는 스위치로 활용하면 좋습니다.`,
      `부족한 ${weakText.label} 기운을 의식하고 싶다면 ${weakText.balanceGuide}`,
      `오늘은 가방 속 작은 물건 하나를 정리하거나, 책상 위에서 가장 눈에 띄는 것을 치워 보세요.`,
      `그 행동이 하루의 중심을 다시 잡아 주는 작은 의식처럼 느껴질 수 있습니다.`,
      `행운 포인트는 거창한 선택보다 내가 컨트롤할 수 있는 작은 감각에서 더 잘 살아납니다.`,
    ],
    elementBalanceGuide: [
      `${guide}.`,
      `현재 흐름에서는 ${dominantText.label}의 ${dominantKeyword} 기운이 강하고 ${weakText.label}의 ${weakKeyword} 기운은 상대적으로 조용합니다.`,
      `강한 기운은 장점이지만 계속 같은 방향으로만 쓰면 몸과 마음이 딱딱하게 느껴질 수 있습니다.`,
      `부족한 기운은 억지로 채우기보다 생활 속에서 작게 자주 불러오는 편이 좋습니다.`,
      `균형을 다시 맞추고 싶을 때는 ${weakText.balanceGuide}`,
      `${dominantText.label}의 힘을 낮추는 것이 아니라 ${weakText.label}의 여백을 더해 균형을 맞춘다고 생각해 보세요.`,
      `오늘은 한 가지 루틴을 오래 하기보다 짧게 끝낼 수 있는 행동을 선택하는 편이 지속하기 쉽습니다.`,
      `오행 균형은 점수표가 아니라 하루를 덜 피곤하게 만드는 사용 설명서에 가깝습니다.`,
    ],
    actionMission: [
      `${guide}.`,
      `오늘의 루틴은 ${dominantText.label}의 ${dominantKeyword} 기운을 살리면서 ${weakText.label}의 ${weakKeyword} 흐름을 조금 보완하는 방향이 좋습니다.`,
      `아침에는 해야 할 일을 세 가지 이하로 줄여 적어 보세요.`,
      `점심 이후에는 자리에서 잠시 일어나 주변을 정리하거나 짧게 걸어 보세요.`,
      `저녁에는 오늘 잘한 선택 하나와 내일 줄이고 싶은 부담 하나를 간단히 적는 것으로 충분합니다.`,
      `${input.tenGods.primary}의 ${tenGodKeyword} 성향은 루틴이 너무 복잡하면 오히려 피로해질 수 있으니 단순한 형식이 잘 맞습니다.`,
      `${rhythm}을 하루의 기준으로 삼으면 작은 행동도 운의 흐름을 가볍게 만드는 장면이 됩니다.`,
      `이 루틴은 숙제가 아니라 내가 나를 편하게 돌보는 작은 게임 미션처럼 활용해 주세요.`,
    ],
  };

  return formatBody(bodies[reportSections[index]?.id] ?? [
    `${title}은 오늘의 기운을 여러 각도에서 살피는 구간입니다.`,
    `${dominantText.label}의 ${dominantKeyword} 흐름이 먼저 드러납니다.`,
    `${input.tenGods.primary}의 ${tenGodKeyword} 성향이 선택의 기준을 만들어 줍니다.`,
    `${focus}.`,
    `${weakText.label}의 ${weakKeyword} 기운은 작은 루틴으로 보완해 보세요.`,
    `가벼운 보완 행동으로는 ${weakText.balanceGuide}`,
    `이 해석은 참고용 조언으로 편안하게 활용해 주세요.`,
  ]);
}

export function generateReport(input: ReportGenerationInput): ReportSection[] {
  return reportSections.map((section, index) => ({
    id: section.id,
    title: section.title,
    locked: section.locked,
    body: sectionBody(section.title, input, index),
  }));
}

function pick<T>(items: T[], random: () => number): T {
  return items[Math.floor(random() * items.length) % items.length];
}

function formatBody(sentences: string[]) {
  const midpoint = Math.ceil(sentences.length / 2);

  return `${sentences.slice(0, midpoint).join(' ')}\n\n${sentences.slice(midpoint).join(' ')}`;
}
