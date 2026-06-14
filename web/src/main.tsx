import React, { useMemo, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { mockRewardAd } from '../../src/core/ads/mockRewardAd';
import { generateFortune } from '../../src/core/fortune/generateFortune';
import { fortuneMenuItems } from '../../src/core/fortune/fortuneCategories';
import type { FortuneCategory } from '../../src/core/fortune/fortuneCategories';
import type { FortuneResult } from '../../src/core/fortune/types';
import { findPremiumProduct, getPremiumProducts } from '../../src/core/monetization/products';
import { mockPurchaseProduct } from '../../src/core/monetization/mockPurchase';
import type { PremiumEntitlement, PremiumProductId } from '../../src/core/monetization/types';
import type { BirthInput, ElementKey } from '../../src/core/saju/types';
import './styles.css';

type ViewName =
  | 'home'
  | 'input'
  | 'loading'
  | 'summary'
  | 'detail'
  | 'unlock'
  | 'premiumContent'
  | 'collection'
  | 'privacy';

const defaultInput: BirthInput = {
  birthDate: '1990-05-17',
  birthHour: 9,
  birthMinute: 0,
  calendarType: 'solar',
  gender: 'unspecified',
  saveConsent: false,
};

const hourOptions = Array.from({ length: 24 }, (_, index) => index);
const minuteOptions = Array.from({ length: 60 }, (_, index) => index);

const elementLabels: Record<ElementKey, string> = {
  wood: '木',
  fire: '火',
  earth: '土',
  metal: '金',
  water: '水',
};

const assets = {
  effects: {
    goldBurst: '/assets/images/effects/fx_gold_burst_sheet.png',
  },
  collection: {
    chestClosed: '/assets/images/collection/chest_closed.png',
    chestOpen: '/assets/images/collection/chest_open.png',
  },
  talismanRed: '/assets/images/talismans/talisman_red.png',
};

function ElementOrb({ element, value }: { element: ElementKey; value?: number }) {
  return (
    <div className={`orb orb-${element}`}>
      <span className="orb-core" />
      <span className="orb-shine" />
      <span className="orb-symbol">{elementLabels[element]}</span>
      {typeof value === 'number' ? <small>{value}</small> : null}
    </div>
  );
}

function AdSlot({ label }: { label: string }) {
  return (
    <div className="ad-slot">
      <strong>광고 영역</strong>
      <span>{label}</span>
      <small>웹 미리보기에서는 광고 표시 영역만 확인합니다.</small>
    </div>
  );
}

interface DragScrollState {
  screen: HTMLElement;
  pointerId: number;
  startY: number;
  startScrollTop: number;
  dragging: boolean;
}

function useDragScroll() {
  const dragState = useRef<DragScrollState | null>(null);
  const lastDragAt = useRef(0);

  const finishDrag = (event: React.PointerEvent<HTMLDivElement>) => {
    const state = dragState.current;

    if (state?.dragging) {
      lastDragAt.current = Date.now();
    }

    dragState.current = null;
    event.currentTarget.classList.remove('is-dragging-scroll');

    if (state && event.currentTarget.hasPointerCapture(state.pointerId)) {
      event.currentTarget.releasePointerCapture(state.pointerId);
    }
  };

  return {
    onPointerDown: (event: React.PointerEvent<HTMLDivElement>) => {
      if (event.pointerType === 'mouse' && event.button !== 0) {
        return;
      }

      const target = event.target as HTMLElement;

      if (target.closest('button,input,textarea,select,a')) {
        return;
      }

      const screen = target.closest('.screen') as HTMLElement | null;

      if (!screen) {
        return;
      }

      dragState.current = {
        screen,
        pointerId: event.pointerId,
        startY: event.clientY,
        startScrollTop: screen.scrollTop,
        dragging: false,
      };
      event.currentTarget.setPointerCapture(event.pointerId);
    },
    onPointerMove: (event: React.PointerEvent<HTMLDivElement>) => {
      const state = dragState.current;

      if (!state || state.pointerId !== event.pointerId) {
        return;
      }

      const deltaY = event.clientY - state.startY;

      if (!state.dragging && Math.abs(deltaY) < 6) {
        return;
      }

      state.dragging = true;
      state.screen.scrollTop = state.startScrollTop - deltaY;
      event.currentTarget.classList.add('is-dragging-scroll');
      event.preventDefault();
    },
    onPointerUp: finishDrag,
    onPointerCancel: finishDrag,
    onClickCapture: (event: React.MouseEvent<HTMLDivElement>) => {
      if (Date.now() - lastDragAt.current < 160) {
        event.preventDefault();
        event.stopPropagation();
      }
    },
  };
}

function App() {
  const [view, setView] = useState<ViewName>('home');
  const [input, setInput] = useState<BirthInput>(defaultInput);
  const [fortune, setFortune] = useState<FortuneResult | null>(null);
  const [unlocked, setUnlocked] = useState(false);
  const [entitlements, setEntitlements] = useState<PremiumEntitlement[]>([]);
  const [busy, setBusy] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<FortuneCategory | null>(null);
  const [selectedProductId, setSelectedProductId] = useState<PremiumProductId>('premium_monthly_report');
  const products = useMemo(() => getPremiumProducts(), []);
  const selectedProduct = findPremiumProduct(selectedProductId);
  const dragScrollHandlers = useDragScroll();

  const openInput = (category: FortuneCategory | null = null) => {
    setSelectedCategory(category);
    setView('input');
  };

  const startAnalysis = () => {
    setView('loading');
    window.setTimeout(() => {
      setFortune(generateFortune(input, new Date()));
      setUnlocked(false);
      setView('summary');
    }, 1200);
  };

  const unlockByAd = async () => {
    setBusy(true);
    const result = await mockRewardAd();
    setBusy(false);
    if (result.rewarded) {
      setUnlocked(true);
      setView('detail');
    }
  };

  const purchase = async (productId: PremiumProductId) => {
    setBusy(true);
    const result = await mockPurchaseProduct(productId);
    setBusy(false);
    setSelectedProductId(productId);
    if (result.status === 'purchased' && !entitlements.includes(result.entitlement)) {
      setEntitlements([...entitlements, result.entitlement]);
    }
    if (result.status === 'purchased') {
      setView('premiumContent');
    }
  };

  return (
    <main className="app-shell">
      <div className="phone-frame" {...dragScrollHandlers}>
        {view === 'home' ? (
          <section className="screen home-screen">
            <p className="eyebrow">오늘의 기운</p>
            <h1>운명전</h1>
            <p className="subtitle">오행의 빛을 모아 오늘의 사주를 여는 게임형 운세 앱</p>
            <div className="orb-altar">
              <ElementOrb element="wood" />
              <ElementOrb element="fire" />
              <div className="fate-seal">命</div>
              <ElementOrb element="water" />
              <ElementOrb element="earth" />
              <ElementOrb element="metal" />
            </div>
            <button className="primary-button" onClick={() => openInput(null)}>오늘의 사주 보기</button>
            <button className="secondary-button" onClick={() => setView('collection')}>행운 도감</button>
            <div className="menu-grid">
              {fortuneMenuItems.map(item => (
                <button key={item.id} onClick={() => openInput(item)}>{item.label}</button>
              ))}
            </div>
            <AdSlot label="로비 하단 광고 영역" />
            <button className="privacy-link" onClick={() => setView('privacy')}>개인정보처리방침</button>
          </section>
        ) : null}

        {view === 'input' ? (
          <section className="screen input-screen">
            <Header title={selectedCategory ? `${selectedCategory.label} 입력` : '사주 입력'} onBack={() => setView('home')} />
            <div className="card">
              <label>생년월일</label>
              <input
                type="date"
                value={input.birthDate}
                onChange={event => setInput({ ...input, birthDate: event.currentTarget.value })}
              />
              <div className="select-row">
                <label>
                  태어난 시간
                  <select
                    value={input.birthHour ?? 'unknown'}
                    onChange={event => {
                      const value = event.currentTarget.value;

                      setInput({
                        ...input,
                        birthHour: value === 'unknown' ? null : Number(value),
                        birthMinute: value === 'unknown' ? null : input.birthMinute ?? 0,
                      });
                    }}>
                    <option value="unknown">시간 모름</option>
                    {hourOptions.map(hour => (
                      <option key={hour} value={hour}>{String(hour).padStart(2, '0')}시</option>
                    ))}
                  </select>
                </label>
                <label>
                  태어난 분
                  <select
                    value={input.birthMinute ?? 0}
                    disabled={input.birthHour === null}
                    onChange={event => setInput({ ...input, birthMinute: Number(event.currentTarget.value) })}>
                    {minuteOptions.map(minute => (
                      <option key={minute} value={minute}>{String(minute).padStart(2, '0')}분</option>
                    ))}
                  </select>
                </label>
              </div>
              <div className="segmented">
                <button
                  className={input.calendarType === 'solar' ? 'active' : ''}
                  onClick={() => setInput({ ...input, calendarType: 'solar' })}>
                  양력
                </button>
                <button
                  className={input.calendarType === 'lunar' ? 'active' : ''}
                  onClick={() => setInput({ ...input, calendarType: 'lunar' })}>
                  음력
                </button>
              </div>
              <label className="check-row">
                <input
                  type="checkbox"
                  checked={input.saveConsent}
                  onChange={event => setInput({ ...input, saveConsent: event.currentTarget.checked })}
                />
                이 기기에만 입력값 저장
              </label>
            </div>
            <button className="primary-button" onClick={startAnalysis}>사주 기둥 봉인 해제</button>
          </section>
        ) : null}

        {view === 'loading' ? (
          <section className="screen loading-screen" aria-live="polite">
            <h2>사주의 기운을 읽는 중...</h2>
            <div className="pillar-row">
              {['년주', '월주', '일주', '시주'].map(label => (
                <div key={label} className="pillar pillar-unsealed">
                  <span>{label}</span>
                </div>
              ))}
            </div>
            <div className="orb-strip">
              {(['wood', 'fire', 'earth', 'metal', 'water'] as ElementKey[]).map(element => (
                <ElementOrb key={element} element={element} />
              ))}
            </div>
          </section>
        ) : null}

        {view === 'summary' && fortune ? (
          <section className="screen result-screen">
            <Header title="오늘의 결과" onBack={() => setView('home')} sticky />
            {selectedCategory ? <div className="category-chip">{selectedCategory.label}</div> : null}
            <div className="card result-card">
              <h2>{fortune.summaryTitle}</h2>
              <div className="grade">{fortune.grade}</div>
              <strong>{fortune.score}점</strong>
              <p>{fortune.oneLineAdvice}</p>
            </div>
            <Pillars fortune={fortune} />
            <ElementChart fortune={fortune} />
            <div className="lucky-grid">
              <span>색상<br /><b>{fortune.lucky.color}</b></span>
              <span>숫자<br /><b>{fortune.lucky.number}</b></span>
              <span>방향<br /><b>{fortune.lucky.direction}</b></span>
            </div>
            {selectedCategory?.id === 'lotto' ? (
              <div className="lotto-box">
                <strong>이번주 로또 행운</strong>
                <small>{fortune.lucky.lottoWeekLabel}</small>
                <div className="lotto-row">
                  {fortune.lucky.lottoNumbers.map(number => (
                    <i key={number} className="lotto-ball">{number}</i>
                  ))}
                </div>
                <p>사주와 선택한 생년월일, 이번 주의 흐름을 조합한 참고용 행운 번호입니다.</p>
              </div>
            ) : null}
            <AdSlot label="결과 요약 광고 영역" />
            <p className="disclaimer">{fortune.disclaimer}</p>
            <button className="primary-button" onClick={() => setView('detail')}>상세 리포트 보기</button>
          </section>
        ) : null}

        {view === 'detail' && fortune ? (
          <section className="screen detail-screen">
            <Header title="상세 리포트" onBack={() => setView('summary')} sticky />
            {fortune.sections.map(section => {
              const locked = section.locked && !unlocked;
              return (
                <article key={section.id} className={`report-section ${locked ? 'locked' : ''}`}>
                  <h3>{section.title}</h3>
                  <p>
                    {locked
                      ? '금빛 봉인이 걸린 상세 리포트입니다. 해금 후에는 이 주제에 맞춘 성향, 오늘의 흐름, 말과 행동의 조절 포인트를 더 길게 이어서 볼 수 있습니다. 기본 결과만으로도 오늘의 큰 방향은 확인할 수 있고, 상세 풀이는 읽을거리와 하루 루틴을 더해 주는 보너스 영역입니다.'
                      : section.body}
                  </p>
                </article>
              );
            })}
            {!unlocked ? <button className="primary-button" onClick={() => setView('unlock')}>오늘의 상세 풀이 해금</button> : null}
          </section>
        ) : null}

        {view === 'unlock' && fortune ? (
          <section className="screen unlock-screen">
            <Header title="해금/프리미엄" onBack={() => setView('detail')} />
            <div className="unlock-panel">
              <img
                className={`chest ${busy ? 'opening' : ''}`}
                src={busy ? assets.collection.chestOpen : assets.collection.chestClosed}
                alt=""
              />
              {busy ? <img className="unlock-burst" src={assets.effects.goldBurst} alt="" /> : null}
              <div className="seal">封</div>
              <h2>광고 해금 영역</h2>
              <p>보상형 광고를 완료하면 오늘의 상세 리포트가 열립니다.</p>
              <button className="primary-button" disabled={busy} onClick={unlockByAd}>
                {busy ? '처리 중...' : '광고 보고 오늘 리포트 해금'}
              </button>
            </div>
            <AdSlot label="상세 리포트 광고 영역" />
            <h2 className="section-title">프리미엄 상품 영역</h2>
            {products.map(product => {
              const owned = entitlements.includes(product.entitlement);
              return (
                <div key={product.id} className={`product-card ${owned ? 'owned' : ''}`}>
                  <h3>{product.title}</h3>
                  <p>{product.description}</p>
                  <div className="product-footer">
                    <strong>{owned ? '보유 중' : product.priceLabel}</strong>
                    <button
                      disabled={busy}
                      onClick={() => {
                        if (owned) {
                          setSelectedProductId(product.id);
                          setView('premiumContent');
                          return;
                        }

                        purchase(product.id);
                      }}>
                      {owned ? '콘텐츠 보기' : '프리미엄 해금'}
                    </button>
                  </div>
                </div>
              );
            })}
          </section>
        ) : null}

        {view === 'premiumContent' ? (
          <section className="screen premium-content-screen">
            <Header title="프리미엄 콘텐츠" onBack={() => setView('unlock')} sticky />
            <div className="card product-content-card">
              <p className="eyebrow">구매 완료</p>
              <h2>{selectedProduct.title}</h2>
              <p>{selectedProduct.description}</p>
              <div className="include-list">
                {selectedProduct.includes.map(item => (
                  <span key={item}>• {item}</span>
                ))}
              </div>
            </div>
            {selectedProduct.contentSections.map(section => (
              <article key={section.title} className="report-section">
                <h3>{section.title}</h3>
                <p>{section.body}</p>
              </article>
            ))}
            <button className="primary-button" onClick={() => setView(fortune ? 'detail' : 'home')}>
              {fortune ? '오늘 상세 리포트로 돌아가기' : '홈으로 돌아가기'}
            </button>
          </section>
        ) : null}

        {view === 'collection' ? (
          <section className="screen collection-screen">
            <Header title="행운 도감" onBack={() => setView('home')} />
            <div className="card talisman-card">
              <div className="talisman">
                <img className="talisman-image" src={assets.talismanRed} alt="" />
                <span>福</span>
              </div>
              <p>오늘의 부적은 관계의 온도를 편안하게 잡아주는 붉은 부적입니다.</p>
            </div>
            <div className="orb-strip">
              {(['wood', 'fire', 'earth', 'metal', 'water'] as ElementKey[]).map(element => (
                <ElementOrb key={element} element={element} />
              ))}
            </div>
            <AdSlot label="도감 광고 영역" />
          </section>
        ) : null}

        {view === 'privacy' ? (
          <section className="screen privacy-screen">
            <Header title="개인정보처리방침" onBack={() => setView('home')} sticky />
            <div className="card privacy-card">
              <h2>운명전 개인정보처리방침</h2>
              <p className="privacy-date">시행일: 2026-06-13</p>
              <p>
                운명전은 이름 입력이나 계정 가입 없이 생년월일과 태어난 시간만으로 운세 리포트를 만드는 앱입니다.
                개인정보는 필요한 범위에서 최소한으로 사용하고, 사주 입력값은 자체 서버로 전송하지 않습니다.
              </p>
            </div>
            <PrivacySection
              title="수집하는 정보"
              body="운명전은 사주 리포트 생성을 위해 생년월일, 태어난 시간과 분, 양력/음력 선택, 선택 성별을 앱 안에서 사용합니다. 이름, 로그인 정보, 연락처, 정확한 위치 정보는 수집하지 않습니다."
            />
            <PrivacySection
              title="이용 목적"
              body="입력값은 사주 기둥 계산, 오행 균형 계산, 오늘의 운세 리포트 생성, 광고 해금 및 프리미엄 권한 표시를 위해 사용됩니다. 운세 결과는 참고용 콘텐츠이며 중요한 결정의 단독 근거로 사용되지 않아야 합니다."
            />
            <PrivacySection
              title="기기 내 저장"
              body="생년월일과 태어난 시간은 사용자가 저장에 동의한 경우에만 이 기기에 저장됩니다. 저장 동의가 없으면 민감한 입력값은 기본적으로 보관하지 않습니다. 저장된 정보는 앱 설정 또는 기기 앱 데이터 삭제를 통해 제거할 수 있습니다."
            />
            <PrivacySection
              title="서버 전송"
              body="운명전은 사주 계산과 리포트 생성을 자체 앱 로직과 내장 데이터로 처리하며, 생년월일과 태어난 시간 정보를 자체 서버로 전송하지 않습니다."
            />
            <PrivacySection
              title="제3자 SDK"
              body="앱에는 Google AdMob 광고 SDK와 스토어 결제/IAP SDK가 포함될 수 있습니다. 이 SDK들은 광고 제공, 구매 처리, 부정 사용 방지, 진단을 위해 기기 정보, 광고 식별자, 구매 또는 진단 데이터를 각 제공사의 정책에 따라 처리할 수 있습니다."
            />
            <PrivacySection
              title="문의"
              body="개인정보 처리와 관련한 문의는 young02hwi@gmail.com 로 연락해 주세요."
            />
          </section>
        ) : null}
      </div>
    </main>
  );
}

function PrivacySection({ title, body }: { title: string; body: string }) {
  return (
    <article className="report-section privacy-section">
      <h3>{title}</h3>
      <p>{body}</p>
    </article>
  );
}

function Header({ title, onBack, sticky = false }: { title: string; onBack: () => void; sticky?: boolean }) {
  return (
    <header className={`topbar${sticky ? ' sticky-topbar' : ''}`}>
      <button aria-label="뒤로가기" onClick={onBack}>←</button>
      <strong>{title}</strong>
      <span />
    </header>
  );
}

function Pillars({ fortune }: { fortune: FortuneResult }) {
  const items = [
    ['년주', fortune.pillars.year],
    ['월주', fortune.pillars.month],
    ['일주', fortune.pillars.day],
    ['시주', fortune.pillars.hour],
  ] as const;
  return (
    <div className="pillar-grid">
      {items.map(([label, pillar]) => (
        <div key={label} className="pillar-mini">
          <small>{label}</small>
          <b>{pillar ? `${pillar.stemHanja}${pillar.branchHanja}` : '--'}</b>
          <span>{pillar ? `${pillar.stem}${pillar.branch}` : '시간 모름'}</span>
        </div>
      ))}
    </div>
  );
}

function ElementChart({ fortune }: { fortune: FortuneResult }) {
  const entries: ElementKey[] = ['wood', 'fire', 'earth', 'metal', 'water'];
  const max = Math.max(...entries.map(key => fortune.elementBalance[key]), 1);
  return (
    <div className="card">
      <h3>오행 균형</h3>
      {entries.map(key => (
        <div key={key} className="element-bar">
          <span>{elementLabels[key]}</span>
          <i><b style={{ width: `${(fortune.elementBalance[key] / max) * 100}%` }} /></i>
          <em>{fortune.elementBalance[key]}</em>
        </div>
      ))}
    </div>
  );
}

createRoot(document.getElementById('root')!).render(<App />);
