# 게임형 사주 운세 앱 시각 에셋 브리프

## 목적

기존 앱 설계를 이미지 중심의 모바일 게임 UI로 강화한다. 앱은 운세 리포트를 읽는 도구이면서도, 첫 화면부터 "사주의 기운을 여는 게임 로비"처럼 보여야 한다. 정적인 운세 앱 느낌을 피하고, 배경 이미지, 부적, 오행 구슬, 사주 기둥, 카드, 빛 이펙트, 해금 연출을 조합해 몰입감을 만든다.

## 핵심 방향

- 화면 첫인상: 어두운 남색/보라 밤하늘, 금색 라인, 붉은 부적, 오행 색상 포인트
- 조작 감각: 버튼을 누르면 빛 번짐, 작은 파티클, 짧은 진동이 발생
- 결과 감각: 카드가 열리고 사주 기둥이 봉인 해제되는 느낌
- 리포트 감각: 긴 텍스트를 읽기 좋게 카드/패널로 정리하되, 배경과 장식은 게임 UI처럼 유지
- 분위기 제한: 무섭거나 공포스럽지 않음. 신비롭고 편안하며 고급스러운 운세관 느낌

## 에셋 구현 원칙

- 배경은 큰 이미지 1장 + 느리게 움직이는 안개/별빛 overlay를 조합한다.
- 오행 구슬, 부적, 카드, 보물상자, 사주 기둥은 PNG/WebP 컷아웃으로 만든다.
- 화면 전환, scale, opacity, rotate, translate는 Reanimated로 구현한다.
- 파티클은 복잡한 물리 엔진 없이 작은 PNG 또는 View 여러 개를 짧게 흩뿌린다.
- 이펙트 애니메이션은 가능하면 6~12프레임 sprite sheet 또는 2~3장의 overlay 이미지를 사용한다.
- Lottie는 선택사항이다. MVP에서는 PNG/WebP + Reanimated만으로 동작하게 설계한다.
- 모든 이미지에는 텍스트를 넣지 않는다. 앱 텍스트는 React Native Text로 렌더링한다.

## 권장 에셋 폴더

```txt
src/assets/
  images/
    backgrounds/
    ui/
    cards/
    pillars/
    orbs/
    talismans/
    collection/
    effects/
  animations/
```

## MVP 우선순위

### P0: MVP 첫 구현 필수

- `bg_home_celestial.webp`: HomeScreen 메인 배경
- `bg_analysis_altar.webp`: AnalysisLoadingScreen 배경
- `bg_result_chamber.webp`: ResultSummary/DetailReport 배경
- `orb_wood.png`, `orb_fire.png`, `orb_earth.png`, `orb_metal.png`, `orb_water.png`: 오행 구슬
- `pillar_sealed.png`, `pillar_unsealed.png`: 사주 기둥 봉인/해제 상태
- `card_back_fortune.png`, `card_front_gold.png`: 결과 카드 앞/뒤
- `talisman_red.png`: 기본 부적
- `ui_gold_panel.png`: 리포트/요약 패널 배경
- `fx_gold_burst_sheet.png`: 해금/결과 등장 빛 이펙트
- `fx_small_particles.png`: 버튼/해금 파티클

### P1: 몰입감 강화

- `bg_collection_archive.webp`: CollectionScreen 배경
- `chest_closed.png`, `chest_open.png`: PremiumUnlockScreen 보물상자
- `seal_break_sheet.png`: 부적 봉인 해제 sprite sheet
- `orb_trail.png`: 오행 구슬 회전 trail
- `mist_overlay.webp`: 천천히 움직이는 안개 레이어
- `star_overlay.webp`: 별빛 overlay
- `collection_card_frame.png`: 행운 카드 도감 프레임

### P2: 출시 후 확장

- 프리미엄 부적 스킨
- 월간 운세 전용 배경
- 궁합 화면용 쌍부적/쌍구슬 이미지
- 재물운/연애운/직장운/건강운 별도 결과 카드
- 시즌 이벤트 배경

## 화면별 에셋 매핑

| 화면 | 주요 이미지 | 애니메이션 |
| --- | --- | --- |
| HomeScreen | `bg_home_celestial`, 오행 구슬 5종, `talisman_red`, `ui_gold_panel` | 구슬 느린 회전, 별빛 twinkle, 버튼 glow, 작은 파티클 |
| BirthInputScreen | `bg_result_chamber`, `talisman_red`, `pillar_sealed` | 입력 완료마다 부적 glow, 완료 시 기둥 봉인 해제 |
| AnalysisLoadingScreen | `bg_analysis_altar`, 기둥 2종, 오행 구슬 5종, `fx_gold_burst_sheet` | 년/월/일/시 기둥 순차 낙하, 구슬 회전, 마지막 빛 모임 |
| ResultSummaryScreen | `bg_result_chamber`, `card_front_gold`, `ui_gold_panel`, 오행 구슬 | 결과 카드 등장, 차트 차오름, 카드 flip 느낌 |
| DetailReportScreen | `bg_result_chamber`, `ui_gold_panel`, `card_front_gold` | 섹션 fade/slide, 잠금 패널 glow |
| PremiumUnlockScreen | `chest_closed`, `chest_open`, `talisman_red`, `seal_break_sheet` | mock 광고 후 보물상자 열림, 금빛 파티클, 봉인 해제 |
| CollectionScreen | `bg_collection_archive`, 부적, 카드 프레임, 오행 구슬 | 도감 카드 pop-in, 출석 스탬프 glow |

## 애니메이션 설계 요약

- Home 구슬 회전: 20~30초 무한 rotate, scale 변화는 0.98~1.02로 제한
- 버튼 효과: press 시 scale 0.96, glow opacity 1.0 -> 0, particle 8~12개
- 분석 로딩: 2.4초 내 완료. 0.4초 간격으로 년주/월주/일주/시주 등장
- 카드 등장: scale 0.92 -> 1.0, opacity 0 -> 1, translateY 16 -> 0
- 카드 flip 느낌: 실제 3D flip보다 front/back opacity crossfade + rotateY 소폭 사용
- 차트 차오름: 800ms easeOut, 숫자도 함께 증가
- 해금 연출: mockRewardAd 완료 후 1.2초 reveal. 금빛 burst 1회, particles 12개 이하

## 성능 기준

- 배경 이미지는 WebP 우선, 1440x2560 기준에서 앱 번들 크기를 보며 필요 시 1080x1920으로 축소한다.
- 투명 컷아웃은 PNG로 시작하고, 품질 확인 후 WebP alpha로 전환 가능하다.
- sprite sheet는 1024x1024 또는 1536x1024 이내를 우선한다.
- 한 화면의 무한 애니메이션은 3개 이하로 제한한다.
- blur, shadow, large transparent layer를 과하게 중첩하지 않는다.
- 실제 텍스트는 이미지에 포함하지 않는다. 다국어/가독성/접근성을 위해 RN Text로 처리한다.

## 이미지 생성 프롬프트 파일

구체적인 생성 프롬프트는 다음 문서에 정리한다.

```txt
docs/assets/game-saju-image-prompts.md
```

