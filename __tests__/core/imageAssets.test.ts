import { sajuImages } from '../../src/assets/imageAssets';

describe('sajuImages', () => {
  it('maps required background assets', () => {
    expect(Object.keys(sajuImages.backgrounds).sort()).toEqual([
      'analysis',
      'collection',
      'home',
      'result',
    ]);
  });

  it('maps all five element orb assets', () => {
    expect(Object.keys(sajuImages.orbs).sort()).toEqual([
      'earth',
      'fire',
      'metal',
      'water',
      'wood',
    ]);
  });

  it('maps reveal and particle effect assets', () => {
    expect(sajuImages.effects.goldBurst).toBeTruthy();
    expect(sajuImages.effects.particles).toBeTruthy();
    expect(sajuImages.effects.orbTrail).toBeTruthy();
    expect(sajuImages.effects.mist).toBeTruthy();
    expect(sajuImages.effects.stars).toBeTruthy();
  });
});
