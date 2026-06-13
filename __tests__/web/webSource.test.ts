import fs from 'fs';
import path from 'path';

describe('web preview source', () => {
  it('renders element orbs without foreground image tags', () => {
    const mainSource = fs.readFileSync(path.join(process.cwd(), 'web/src/main.tsx'), 'utf8');

    expect(mainSource).not.toContain('orb-image');
    expect(mainSource).not.toContain('assets.orbs');
    expect(mainSource).toContain('orb-core');
  });

  it('adds readable emphasis to pillar text', () => {
    const styles = fs.readFileSync(path.join(process.cwd(), 'web/src/styles.css'), 'utf8');

    expect(styles).toContain('.pillar-mini b');
    expect(styles).toContain('text-shadow');
    expect(styles).toContain('background: rgba(5, 8, 22');
  });

  it('uses app-like drag scrolling and keeps the detail header sticky', () => {
    const mainSource = fs.readFileSync(path.join(process.cwd(), 'web/src/main.tsx'), 'utf8');
    const styles = fs.readFileSync(path.join(process.cwd(), 'web/src/styles.css'), 'utf8');

    expect(mainSource).toContain('useDragScroll');
    expect(mainSource).toContain('<Header title="상세 리포트"');
    expect(mainSource).toContain('sticky');
    expect(styles).toContain('touch-action: pan-y');
    expect(styles).toContain('.topbar.sticky-topbar');
    expect(styles).toContain('position: sticky');
  });

  it('uses app-ready input controls and result scrolling rules', () => {
    const mainSource = fs.readFileSync(path.join(process.cwd(), 'web/src/main.tsx'), 'utf8');
    const styles = fs.readFileSync(path.join(process.cwd(), 'web/src/styles.css'), 'utf8');

    expect(mainSource).toContain('type="date"');
    expect(mainSource).toContain('<select');
    expect(mainSource).toContain('birthMinute');
    expect(mainSource).toContain("selectedCategory?.id === 'lotto'");
    expect(mainSource).toContain('<Header title="오늘의 결과"');
    expect(mainSource).toContain('sticky');
    expect(styles).toContain('.screen::-webkit-scrollbar');
    expect(styles).toContain('scrollbar-width: none');
  });

  it('includes accessibility polish for focus, reduced motion, and mobile safe areas', () => {
    const mainSource = fs.readFileSync(path.join(process.cwd(), 'web/src/main.tsx'), 'utf8');
    const styles = fs.readFileSync(path.join(process.cwd(), 'web/src/styles.css'), 'utf8');

    expect(mainSource).toContain('aria-label="뒤로가기"');
    expect(mainSource).toContain('aria-live="polite"');
    expect(styles).toContain(':focus-visible');
    expect(styles).toContain('@media (prefers-reduced-motion: reduce)');
    expect(styles).toContain('env(safe-area-inset');
  });

  it('ships a standalone privacy policy page for app registration', () => {
    const privacyPath = path.join(process.cwd(), 'web/privacy.html');
    const mainSource = fs.readFileSync(path.join(process.cwd(), 'web/src/main.tsx'), 'utf8');
    const viteConfig = fs.readFileSync(path.join(process.cwd(), 'vite.config.ts'), 'utf8');
    const privacySource = fs.readFileSync(privacyPath, 'utf8');

    expect(mainSource).toContain("'privacy'");
    expect(mainSource).toContain("setView('privacy')");
    expect(mainSource).toContain('개인정보처리방침');
    expect(viteConfig).toContain('privacy.html');
    expect(privacySource).toContain('운명전 개인정보처리방침');
    expect(privacySource).toContain('rel="icon"');
    expect(privacySource).toContain('서버로 전송하지 않습니다');
    expect(privacySource).toContain('Google AdMob');
    expect(privacySource).toContain('support@app101.local');
  });
});
