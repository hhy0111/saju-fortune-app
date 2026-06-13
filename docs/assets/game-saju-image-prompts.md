# 게임형 사주 운세 앱 이미지/이펙트 생성 프롬프트

이 문서는 `docs/superpowers/specs/2026-06-07-game-saju-visual-asset-brief.md`에 맞춘 이미지 생성용 프롬프트 모음이다. 프롬프트는 복사해서 이미지 생성 도구에 바로 넣기 쉽도록 영어로 작성했다.

## 공통 제작 규칙

- 앱 텍스트는 이미지에 넣지 않는다. 텍스트는 React Native `Text`로 렌더링한다.
- 공포, 귀신, 피, 해골, 과도한 종교 상징은 피한다.
- 분위기는 "신비로운 동양 판타지 + 고급 모바일 게임 UI"로 유지한다.
- 배경은 UI가 올라갈 공간을 남긴다. 중앙 CTA와 카드 영역이 묻히지 않게 한다.
- 투명 컷아웃이 필요한 이미지는 true transparent PNG가 가능하면 투명 배경으로 생성한다.
- 투명 배경을 지원하지 않는 도구에서는 flat `#00ff00` chroma-key background로 생성한 뒤 배경 제거한다.
- 모든 에셋은 no text, no letters, no watermark, no logo를 명시한다.

## 공통 네거티브 프롬프트

```text
Avoid horror, skulls, ghosts, blood, weapons, aggressive religious imagery, photorealistic people, faces, readable text, letters, numbers, logos, watermarks, messy clutter, cheap casino style, cartoonish childish look, harsh neon overload, low-resolution artifacts.
```

## 권장 저장 구조

```txt
src/assets/images/backgrounds/
src/assets/images/ui/
src/assets/images/cards/
src/assets/images/pillars/
src/assets/images/orbs/
src/assets/images/talismans/
src/assets/images/collection/
src/assets/images/effects/
```

---

# P0 필수 에셋

## BG_HOME_CELESTIAL

- 파일명: `src/assets/images/backgrounds/bg_home_celestial.webp`
- 용도: HomeScreen 게임 로비 배경
- 권장 크기: 1440x2560 portrait
- 형식: WebP

```text
Use case: stylized-concept
Asset type: mobile game lobby background, portrait 9:16
Primary request: A mystical East Asian fantasy fortune-telling hall at night, designed as a premium mobile game lobby background.
Scene/backdrop: deep navy and royal purple night sky, soft clouds, subtle stars, distant palace silhouettes, faint golden constellation lines, calm magical atmosphere.
Subject: empty central space for a large circular five-element orb UI and a main button, decorative gold line details around the edges.
Style/medium: high-quality 2D game background illustration, polished fantasy mobile RPG UI mood, elegant and immersive.
Composition/framing: portrait 9:16, central area intentionally less busy, decorative details around top and edges, bottom area suitable for menu buttons.
Lighting/mood: soft moonlight, warm gold highlights, mysterious but comfortable, not scary.
Color palette: dark navy, deep violet, muted indigo, antique gold, small accents of red talisman color.
Constraints: no text, no characters, no faces, no logo, no watermark, leave readable UI space in the center.
Avoid: horror, ghosts, skulls, bright casino style, crowded details in the center.
```

## BG_ANALYSIS_ALTAR

- 파일명: `src/assets/images/backgrounds/bg_analysis_altar.webp`
- 용도: AnalysisLoadingScreen 배경
- 권장 크기: 1440x2560 portrait
- 형식: WebP

```text
Use case: stylized-concept
Asset type: mobile game analysis loading background, portrait 9:16
Primary request: A mystical fortune analysis altar where four saju pillars can appear one by one.
Scene/backdrop: dark celestial chamber, circular stone altar, faint gold engraved rings, floating dust of light, gentle purple mist, distant stars.
Subject: empty vertical center space for four falling pillars, subtle five-element energy glow around the altar.
Style/medium: premium 2D fantasy game background illustration, East Asian occult-inspired but friendly and elegant.
Composition/framing: portrait 9:16, center column clear, top-to-bottom visual path for falling pillar animation.
Lighting/mood: focused golden light from the altar, soft blue-violet ambient shadows, calm anticipation.
Color palette: navy, violet, antique gold, soft red, subtle green/blue/yellow element accents.
Constraints: no text, no people, no faces, no logo, no watermark.
Avoid: scary ritual, horror, flames that feel dangerous, cluttered center.
```

## BG_RESULT_CHAMBER

- 파일명: `src/assets/images/backgrounds/bg_result_chamber.webp`
- 용도: ResultSummaryScreen, DetailReportScreen 공통 배경
- 권장 크기: 1440x2560 portrait
- 형식: WebP

```text
Use case: stylized-concept
Asset type: mobile game result/report background, portrait 9:16
Primary request: A refined East Asian fantasy report chamber background for reading a long fortune report.
Scene/backdrop: dark navy silk-like atmosphere, subtle cloud layers, gold ornamental borders, faint circular zodiac pattern, soft star particles.
Subject: calm empty content area in the middle for report cards and text panels.
Style/medium: high-end 2D mobile game UI background, elegant fortune-telling room, readable and not too busy.
Composition/framing: portrait 9:16, center and lower area clean for scrollable report cards, decorative corners and top glow.
Lighting/mood: warm gold highlights, cool purple shadows, peaceful and premium.
Color palette: deep navy, muted purple, antique gold, soft ivory highlights.
Constraints: no text, no characters, no faces, no watermark, no logo, keep contrast suitable for ivory text overlays.
Avoid: clutter, very bright center, horror, cheap casino look.
```

## ORB_WOOD

- 파일명: `src/assets/images/orbs/orb_wood.png`
- 용도: 목(木) 오행 구슬
- 권장 크기: 1024x1024
- 형식: PNG alpha

```text
Use case: stylized-concept
Asset type: transparent mobile game icon cutout
Primary request: A magical five-elements orb representing Wood energy for an East Asian fantasy fortune app.
Subject: single floating orb, jade green core, subtle leaf-like energy veins, small golden rim details, polished glass surface.
Style/medium: high-quality 2D game item icon, premium fantasy RPG UI, semi-realistic painted style.
Composition/framing: centered object with generous padding, circular silhouette, no background elements.
Lighting/mood: soft inner glow, gentle and alive, calm magical energy.
Color palette: jade green, emerald, warm gold, tiny ivory highlights.
Constraints: transparent PNG if supported; otherwise perfectly flat solid #00ff00 chroma-key background with no shadows or gradients. No text, no letters, no watermark.
Avoid: using #00ff00 inside the orb, leaves protruding too far, scary or toxic look.
```

## ORB_FIRE

- 파일명: `src/assets/images/orbs/orb_fire.png`
- 용도: 화(火) 오행 구슬
- 권장 크기: 1024x1024
- 형식: PNG alpha

```text
Use case: stylized-concept
Asset type: transparent mobile game icon cutout
Primary request: A magical five-elements orb representing Fire energy for an East Asian fantasy fortune app.
Subject: single floating orb, ruby red and warm orange core, contained flame-like swirls inside glass, small golden rim details.
Style/medium: high-quality 2D game item icon, premium fantasy RPG UI, semi-realistic painted style.
Composition/framing: centered object with generous padding, circular silhouette, no background elements.
Lighting/mood: warm inner glow, energetic but safe and elegant.
Color palette: deep red, crimson, orange gold, warm ivory highlights.
Constraints: transparent PNG if supported; otherwise perfectly flat solid #00ff00 chroma-key background with no shadows or gradients. No text, no letters, no watermark.
Avoid: wild external flames, dangerous fire, horror, burnt textures.
```

## ORB_EARTH

- 파일명: `src/assets/images/orbs/orb_earth.png`
- 용도: 토(土) 오행 구슬
- 권장 크기: 1024x1024
- 형식: PNG alpha

```text
Use case: stylized-concept
Asset type: transparent mobile game icon cutout
Primary request: A magical five-elements orb representing Earth energy for an East Asian fantasy fortune app.
Subject: single floating orb, amber and ochre core, subtle mineral layers and soft sand-like patterns inside, small golden rim details.
Style/medium: high-quality 2D game item icon, premium fantasy RPG UI, semi-realistic painted style.
Composition/framing: centered object with generous padding, circular silhouette, no background elements.
Lighting/mood: stable, warm, grounded, refined.
Color palette: amber, ochre, muted gold, soft brown, ivory highlights.
Constraints: transparent PNG if supported; otherwise perfectly flat solid #00ff00 chroma-key background with no shadows or gradients. No text, no letters, no watermark.
Avoid: muddy dull look, cracked disaster imagery, horror.
```

## ORB_METAL

- 파일명: `src/assets/images/orbs/orb_metal.png`
- 용도: 금(金) 오행 구슬
- 권장 크기: 1024x1024
- 형식: PNG alpha

```text
Use case: stylized-concept
Asset type: transparent mobile game icon cutout
Primary request: A magical five-elements orb representing Metal energy for an East Asian fantasy fortune app.
Subject: single floating orb, silver-white core, refined metallic shine, subtle blade-like geometric light patterns inside, small golden rim details.
Style/medium: high-quality 2D game item icon, premium fantasy RPG UI, semi-realistic painted style.
Composition/framing: centered object with generous padding, circular silhouette, no background elements.
Lighting/mood: clean, precise, elegant, not cold or harsh.
Color palette: silver, pearl white, pale blue-gray, antique gold accents.
Constraints: transparent PNG if supported; otherwise perfectly flat solid #00ff00 chroma-key background with no shadows or gradients. No text, no letters, no watermark.
Avoid: weapon-like object, aggressive spikes, gray dullness.
```

## ORB_WATER

- 파일명: `src/assets/images/orbs/orb_water.png`
- 용도: 수(水) 오행 구슬
- 권장 크기: 1024x1024
- 형식: PNG alpha

```text
Use case: stylized-concept
Asset type: transparent mobile game icon cutout
Primary request: A magical five-elements orb representing Water energy for an East Asian fantasy fortune app.
Subject: single floating orb, deep blue and aqua core, subtle flowing water ribbons inside glass, small golden rim details.
Style/medium: high-quality 2D game item icon, premium fantasy RPG UI, semi-realistic painted style.
Composition/framing: centered object with generous padding, circular silhouette, no background elements.
Lighting/mood: calm, intuitive, flowing, elegant.
Color palette: deep blue, teal, aqua, antique gold, ivory highlights.
Constraints: transparent PNG if supported; otherwise perfectly flat solid #00ff00 chroma-key background with no shadows or gradients. No text, no letters, no watermark.
Avoid: storm, flood, gloomy sadness, horror.
```

## PILLAR_SEALED

- 파일명: `src/assets/images/pillars/pillar_sealed.png`
- 용도: 봉인된 사주 기둥
- 권장 크기: 768x1536
- 형식: PNG alpha

```text
Use case: stylized-concept
Asset type: transparent mobile game prop cutout
Primary request: A sealed saju fortune pillar for a mystical East Asian mobile game UI.
Subject: tall vertical jade-stone and dark lacquer pillar, wrapped with a red talisman strip, gold engraved ornamental lines, faint locked glow.
Style/medium: premium 2D fantasy game prop, detailed but readable at mobile size.
Composition/framing: centered vertical object, full pillar visible, generous transparent padding.
Lighting/mood: mysterious but gentle, sealed energy, elegant gold accents.
Color palette: dark navy stone, jade shadow, antique gold, red talisman paper.
Constraints: transparent PNG if supported; otherwise perfectly flat solid #00ff00 chroma-key background with no shadows or gradients. No readable text, no letters, no watermark.
Avoid: scary curse, horror, broken stone, aggressive symbols.
```

## PILLAR_UNSEALED

- 파일명: `src/assets/images/pillars/pillar_unsealed.png`
- 용도: 해제된 사주 기둥
- 권장 크기: 768x1536
- 형식: PNG alpha

```text
Use case: stylized-concept
Asset type: transparent mobile game prop cutout
Primary request: An unsealed glowing saju fortune pillar for a mystical East Asian mobile game UI.
Subject: tall vertical jade-stone and dark lacquer pillar, gold engraved ornamental lines glowing softly, red talisman ribbon loosened, warm light emerging from inside.
Style/medium: premium 2D fantasy game prop, detailed but readable at mobile size.
Composition/framing: centered vertical object, full pillar visible, generous transparent padding.
Lighting/mood: revealed fortune energy, warm gold glow, calm and satisfying.
Color palette: dark navy stone, jade, antique gold, soft ivory light, subtle red talisman.
Constraints: transparent PNG if supported; otherwise perfectly flat solid #00ff00 chroma-key background with no shadows or gradients. No readable text, no letters, no watermark.
Avoid: explosion, horror, broken violent fragments, unreadable clutter.
```

## CARD_BACK_FORTUNE

- 파일명: `src/assets/images/cards/card_back_fortune.png`
- 용도: 결과 카드 뒷면
- 권장 크기: 1024x1536
- 형식: PNG alpha

```text
Use case: stylized-concept
Asset type: transparent mobile game card asset
Primary request: A premium fortune card back design for an East Asian fantasy mobile game.
Subject: vertical card with dark navy lacquer surface, antique gold border, subtle five-element circular motif, small red talisman accent, ornate corners.
Style/medium: polished 2D mobile game card art, premium fantasy UI, clean and readable.
Composition/framing: centered vertical card, full card visible with transparent outside.
Lighting/mood: mysterious, collectible, elegant.
Color palette: dark navy, royal purple, antique gold, muted red.
Constraints: transparent PNG if supported; otherwise perfectly flat solid #00ff00 chroma-key background outside the card. No text, no letters, no watermark.
Avoid: playing card suits, casino style, clutter, scary symbols.
```

## CARD_FRONT_GOLD

- 파일명: `src/assets/images/cards/card_front_gold.png`
- 용도: 결과 카드 앞면/요약 카드
- 권장 크기: 1024x1536
- 형식: PNG alpha

```text
Use case: stylized-concept
Asset type: transparent mobile game card asset
Primary request: A premium fortune report card front frame for an East Asian fantasy mobile game.
Subject: vertical card frame with antique gold border, dark translucent navy inner panel, subtle cloud ornament, small five-element gem accents.
Style/medium: polished 2D mobile game UI card, elegant and readable.
Composition/framing: centered vertical card, large empty inner area for app-rendered text, transparent outside.
Lighting/mood: revealed result, warm golden glow, calm premium feel.
Color palette: antique gold, dark navy, muted violet, ivory glow, small red accents.
Constraints: transparent PNG if supported; otherwise perfectly flat solid #00ff00 chroma-key background outside the card. No text, no letters, no watermark.
Avoid: busy inner area, casino look, cheap gradients.
```

## TALISMAN_RED

- 파일명: `src/assets/images/talismans/talisman_red.png`
- 용도: 기본 부적, 입력/해금 장식
- 권장 크기: 768x1024
- 형식: PNG alpha

```text
Use case: stylized-concept
Asset type: transparent mobile game prop cutout
Primary request: A red East Asian fantasy talisman paper for a friendly fortune app.
Subject: vertical red talisman paper with gold ornamental strokes and abstract seal patterns, slightly worn premium paper texture, no readable characters.
Style/medium: 2D game prop illustration, clean mobile UI asset, elegant and magical.
Composition/framing: centered object with generous padding, full talisman visible.
Lighting/mood: warm, protective, mystical but not scary.
Color palette: deep red, antique gold, subtle orange highlights.
Constraints: transparent PNG if supported; otherwise perfectly flat solid #00ff00 chroma-key background with no shadows or gradients. No readable text, no letters, no watermark.
Avoid: religious text, horror symbols, dirty or torn horror look.
```

## UI_GOLD_PANEL

- 파일명: `src/assets/images/ui/ui_gold_panel.png`
- 용도: 리포트/요약 공통 패널
- 권장 크기: 1536x1024
- 형식: PNG alpha 또는 9-slice용 PNG

```text
Use case: stylized-concept
Asset type: mobile game UI panel frame
Primary request: A reusable premium gold UI panel for an East Asian fantasy fortune app.
Subject: wide rounded rectangle panel, antique gold ornamental border, dark translucent navy inner fill, subtle cloud corner decorations, clean empty center.
Style/medium: polished 2D game UI asset, suitable for mobile report cards and summary boxes.
Composition/framing: centered horizontal panel, transparent outside the panel, enough clean interior space for app-rendered text.
Lighting/mood: refined, calm, premium, readable.
Color palette: antique gold, dark navy, muted violet, soft ivory highlights.
Constraints: transparent PNG if supported; otherwise perfectly flat solid #00ff00 chroma-key background outside the panel. No text, no letters, no watermark.
Avoid: overly thick frame, cluttered center, casino style, glossy toy look.
```

## FX_GOLD_BURST_SHEET

- 파일명: `src/assets/images/effects/fx_gold_burst_sheet.png`
- 용도: 결과 등장/해금 시 빛 폭발 sprite sheet
- 권장 크기: 2048x1024, 8 frames horizontal
- 형식: PNG alpha

```text
Use case: stylized-concept
Asset type: 2D game VFX sprite sheet
Primary request: A horizontal 8-frame sprite sheet of a golden magical light burst for a mobile game reward reveal.
Subject: radial gold light burst growing from small glow to bright ring and fading into spark particles, elegant East Asian fantasy feeling.
Style/medium: 2D game VFX, clean sprite sheet, additive glow style.
Composition/framing: 8 equal frames in one horizontal row, each frame centered, consistent size, generous padding, no frame numbers.
Lighting/mood: satisfying reward reveal, warm gold, premium, not explosive or dangerous.
Color palette: gold, ivory, soft amber, subtle violet edge glow.
Constraints: transparent PNG if supported; otherwise perfectly flat solid #00ff00 chroma-key background. No text, no letters, no watermark, no grid lines.
Avoid: smoke, fireball, violent explosion, cluttered particles.
```

## FX_SMALL_PARTICLES

- 파일명: `src/assets/images/effects/fx_small_particles.png`
- 용도: 버튼 터치/해금 파티클 텍스처
- 권장 크기: 1024x1024
- 형식: PNG alpha

```text
Use case: stylized-concept
Asset type: transparent 2D game particle texture sheet
Primary request: A small collection of golden magical particle sprites for mobile game UI button effects.
Subject: 20 to 30 separate tiny sparkles, dots, small diamond glints, and soft star particles arranged with spacing.
Style/medium: clean 2D game VFX particles, additive glow style.
Composition/framing: particles separated on a transparent canvas, no overlapping, each particle readable as a small sprite.
Lighting/mood: warm, magical, premium, subtle.
Color palette: gold, ivory, amber, tiny red-orange accents.
Constraints: transparent PNG if supported; otherwise perfectly flat solid #00ff00 chroma-key background. No text, no letters, no watermark.
Avoid: large fireworks, noisy clutter, hard black outlines.
```

---

# P1 몰입감 강화 에셋

## BG_COLLECTION_ARCHIVE

- 파일명: `src/assets/images/backgrounds/bg_collection_archive.webp`
- 용도: CollectionScreen 배경
- 권장 크기: 1440x2560 portrait
- 형식: WebP

```text
Use case: stylized-concept
Asset type: mobile game collection screen background, portrait 9:16
Primary request: A mystical archive room for collected talismans and five-element orbs in an East Asian fantasy mobile game.
Scene/backdrop: dark wooden shelves, soft navy-purple atmosphere, gold display frames, floating dust of light, subtle cloud patterns.
Subject: empty display wall and clean center area for collection cards and stamps.
Style/medium: premium 2D mobile game background, elegant fantasy archive, not too detailed.
Composition/framing: portrait 9:16, clean middle area, decorative shelves around sides, bottom area suitable for reward UI.
Lighting/mood: warm gold lamps, calm collectible satisfaction, magical but friendly.
Color palette: dark navy, muted purple, antique gold, deep red, soft ivory.
Constraints: no text, no people, no faces, no logo, no watermark.
Avoid: cluttered shelves, horror, dusty abandoned look.
```

## CHEST_CLOSED

- 파일명: `src/assets/images/collection/chest_closed.png`
- 용도: PremiumUnlockScreen 보물상자 닫힘
- 권장 크기: 1024x1024
- 형식: PNG alpha

```text
Use case: stylized-concept
Asset type: transparent mobile game reward prop
Primary request: A closed premium reward chest for an East Asian fantasy fortune app.
Subject: ornate dark lacquer treasure chest, antique gold trim, small red talisman seal on the latch, subtle five-element gem accents.
Style/medium: polished 2D mobile game reward item, premium fantasy UI.
Composition/framing: centered object with generous padding, three-quarter front view.
Lighting/mood: mysterious reward waiting to open, warm highlights.
Color palette: dark navy lacquer, antique gold, deep red talisman, small jade/ruby/blue gem accents.
Constraints: transparent PNG if supported; otherwise perfectly flat solid #00ff00 chroma-key background. No text, no letters, no watermark.
Avoid: pirate style, skull, horror, cheap toy look.
```

## CHEST_OPEN

- 파일명: `src/assets/images/collection/chest_open.png`
- 용도: PremiumUnlockScreen 보물상자 열림
- 권장 크기: 1024x1024
- 형식: PNG alpha

```text
Use case: stylized-concept
Asset type: transparent mobile game reward prop
Primary request: An opened premium reward chest releasing warm golden fortune light for an East Asian fantasy fortune app.
Subject: ornate dark lacquer treasure chest open, antique gold trim, soft gold light emerging from inside, small red talisman seal loosened.
Style/medium: polished 2D mobile game reward item, premium fantasy UI.
Composition/framing: centered object with generous padding, three-quarter front view, light contained enough for UI layering.
Lighting/mood: satisfying unlock reward, warm gold, magical and calm.
Color palette: dark navy lacquer, antique gold, ivory glow, deep red talisman.
Constraints: transparent PNG if supported; otherwise perfectly flat solid #00ff00 chroma-key background. No text, no letters, no watermark.
Avoid: coin pile casino look, violent explosion, horror.
```

## SEAL_BREAK_SHEET

- 파일명: `src/assets/images/effects/seal_break_sheet.png`
- 용도: 부적 봉인 해제 sprite sheet
- 권장 크기: 2048x1024, 8 frames horizontal
- 형식: PNG alpha

```text
Use case: stylized-concept
Asset type: 2D game VFX sprite sheet
Primary request: A horizontal 8-frame sprite sheet of a red talisman seal gently breaking and dissolving into gold particles.
Subject: abstract red paper seal mark opens from center, small red paper flakes and gold dust appear, then fade.
Style/medium: clean 2D game VFX, East Asian fantasy UI effect, readable at mobile size.
Composition/framing: 8 equal frames in one horizontal row, centered effect in each frame, no frame numbers, no grid lines.
Lighting/mood: satisfying unlock, magical, not destructive or scary.
Color palette: deep red, antique gold, warm ivory glow.
Constraints: transparent PNG if supported; otherwise perfectly flat solid #00ff00 chroma-key background. No readable text, no letters, no watermark.
Avoid: violent tearing, blood-like red, scary symbols, fire explosion.
```

## ORB_TRAIL

- 파일명: `src/assets/images/effects/orb_trail.png`
- 용도: 오행 구슬 회전 trail overlay
- 권장 크기: 1024x1024
- 형식: PNG alpha

```text
Use case: stylized-concept
Asset type: transparent mobile game VFX overlay
Primary request: A circular magical trail ring for five-element orbs rotating in a mobile game lobby.
Subject: thin elegant circular light trail, broken into soft glowing arcs, subtle five-color hints for wood fire earth metal water, gold outline accents.
Style/medium: clean 2D game VFX overlay, premium fantasy UI.
Composition/framing: centered circular ring with transparent center and outside, generous padding.
Lighting/mood: calm rotating energy, refined, not too bright.
Color palette: antique gold with subtle green, red, amber, silver, blue accents.
Constraints: transparent PNG if supported; otherwise perfectly flat solid #00ff00 chroma-key background. No text, no letters, no watermark.
Avoid: thick noisy ring, sci-fi neon, harsh glow.
```

## MIST_OVERLAY

- 파일명: `src/assets/images/effects/mist_overlay.webp`
- 용도: 배경 위에 천천히 이동하는 안개
- 권장 크기: 1440x2560 portrait
- 형식: WebP

```text
Use case: stylized-concept
Asset type: mobile game atmospheric overlay, portrait 9:16
Primary request: A soft transparent-feeling mist overlay for a mystical East Asian fantasy fortune app.
Scene/backdrop: dark navy transparent-like canvas with soft violet-blue cloud wisps and gentle smoky gradients.
Subject: sparse mist bands around edges and lower third, center kept readable for UI.
Style/medium: subtle 2D atmospheric overlay, soft painterly game effect.
Composition/framing: portrait 9:16, mist mostly at sides and bottom, center not too bright.
Lighting/mood: calm, mysterious, comfortable.
Color palette: deep navy, muted violet, soft blue, faint gold dust.
Constraints: no text, no characters, no watermark, no sharp shapes. If alpha is supported, use transparent background; otherwise use very dark navy background for screen blending.
Avoid: thick fog hiding UI, horror smoke, bright white center.
```

## STAR_OVERLAY

- 파일명: `src/assets/images/effects/star_overlay.webp`
- 용도: 별빛 twinkle overlay
- 권장 크기: 1440x2560 portrait
- 형식: WebP 또는 PNG alpha

```text
Use case: stylized-concept
Asset type: mobile game star particle overlay, portrait 9:16
Primary request: A sparse magical star sparkle overlay for a dark East Asian fantasy mobile game UI.
Subject: tiny gold and ivory star points, small dust glints, very sparse distribution, center not crowded.
Style/medium: subtle 2D game overlay, clean and premium.
Composition/framing: portrait 9:16, more sparkles near top and edges, fewer in central text area.
Lighting/mood: soft twinkle, elegant, calm.
Color palette: ivory, antique gold, faint blue-violet.
Constraints: transparent PNG if supported; otherwise very dark navy background for screen blending. No text, no letters, no watermark.
Avoid: fireworks, dense glitter, noisy starfield.
```

## COLLECTION_CARD_FRAME

- 파일명: `src/assets/images/collection/collection_card_frame.png`
- 용도: 행운 카드 도감 프레임
- 권장 크기: 1024x1536
- 형식: PNG alpha

```text
Use case: stylized-concept
Asset type: transparent mobile game collection card frame
Primary request: A collectible fortune card frame for an East Asian fantasy mobile game collection screen.
Subject: vertical empty card frame, antique gold border, dark navy inner panel, subtle five-element gem slots, premium archive style.
Style/medium: polished 2D mobile game UI card frame.
Composition/framing: centered vertical card, transparent outside, large empty inner area for app-rendered icon or text.
Lighting/mood: collectible, refined, satisfying.
Color palette: antique gold, dark navy, muted purple, small red and jade accents.
Constraints: transparent PNG if supported; otherwise perfectly flat solid #00ff00 chroma-key background outside the card. No text, no letters, no watermark.
Avoid: playing card suits, casino style, cluttered center.
```

---

# 화면 컨셉 확인용 프롬프트

이 프롬프트는 실제 앱에 넣을 에셋이 아니라, 전체 방향을 확인하는 컨셉 이미지 생성용이다.

## CONCEPT_HOME_SCREEN

- 파일명 예시: `docs/assets/reference/concept_home_screen.png`
- 용도: HomeScreen 시각 방향 확인
- 권장 크기: 1440x2560 portrait

```text
Use case: ui-mockup
Asset type: high-fidelity mobile app concept mockup, portrait 9:16
Primary request: A game-like Korean saju fortune app home lobby concept screen with image-heavy fantasy UI.
Scene/backdrop: mystical East Asian fantasy night hall with navy and violet background, gold ornamental lines, soft stars, red talisman accents.
Subject: central large five-element orb ring, big premium gold main button area without readable text, surrounding menu button slots, collection progress area.
Style/medium: polished mobile game UI mockup, premium 2D RPG interface, elegant fortune-telling theme.
Composition/framing: portrait mobile screen, central CTA hierarchy, bottom and side menu buttons, readable spacing.
Lighting/mood: mysterious, comfortable, exciting, not scary.
Color palette: dark navy, deep purple, antique gold, red talisman, five-element accent colors.
Constraints: no readable text, no actual Korean letters, no logo, no watermark. Use blank button shapes and panels only.
Avoid: generic horoscope app, flat business UI, casino look, horror.
```

## CONCEPT_RESULT_SCREEN

- 파일명 예시: `docs/assets/reference/concept_result_screen.png`
- 용도: ResultSummary/DetailReport 시각 방향 확인
- 권장 크기: 1440x2560 portrait

```text
Use case: ui-mockup
Asset type: high-fidelity mobile app concept mockup, portrait 9:16
Primary request: A game-like Korean saju fortune result screen concept with rich report cards and mystical effects.
Scene/backdrop: dark fantasy report chamber, gold ornamental frame, subtle zodiac ring, soft star particles.
Subject: large result card at top, four pillar display slots, five-element balance chart area, lucky info boxes, long report section panels below.
Style/medium: premium 2D mobile game UI mockup, elegant fortune report interface.
Composition/framing: portrait mobile screen, scrollable report layout, strong top result hierarchy, readable panel spacing.
Lighting/mood: revealed fortune result, warm gold glow, calm and trustworthy.
Color palette: dark navy, muted violet, antique gold, ivory text placeholders, red talisman accents.
Constraints: no readable text, no actual Korean letters, no logo, no watermark. Use abstract placeholder lines only.
Avoid: plain document app, cluttered dashboard, horror, casino look.
```

