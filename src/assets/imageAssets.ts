import type { ImageSourcePropType } from 'react-native';
import type { ElementKey } from '../core/saju/types';

interface SajuImageRegistry {
  backgrounds: {
    home: ImageSourcePropType;
    analysis: ImageSourcePropType;
    result: ImageSourcePropType;
    collection: ImageSourcePropType;
  };
  orbs: Record<ElementKey, ImageSourcePropType>;
  pillars: {
    sealed: ImageSourcePropType;
    unsealed: ImageSourcePropType;
  };
  cards: {
    back: ImageSourcePropType;
    front: ImageSourcePropType;
  };
  talismans: {
    red: ImageSourcePropType;
  };
  ui: {
    goldPanel: ImageSourcePropType;
  };
  effects: {
    goldBurst: ImageSourcePropType;
    particles: ImageSourcePropType;
    sealBreak: ImageSourcePropType;
    orbTrail: ImageSourcePropType;
    mist: ImageSourcePropType;
    stars: ImageSourcePropType;
  };
  collection: {
    chestClosed: ImageSourcePropType;
    chestOpen: ImageSourcePropType;
    cardFrame: ImageSourcePropType;
  };
}

export const sajuImages: SajuImageRegistry = {
  backgrounds: {
    home: require('./images/backgrounds/bg_home_celestial.webp'),
    analysis: require('./images/backgrounds/bg_analysis_altar.webp'),
    result: require('./images/backgrounds/bg_result_chamber.webp'),
    collection: require('./images/backgrounds/bg_collection_archive.webp'),
  },
  orbs: {
    wood: require('./images/orbs/orb_wood.png'),
    fire: require('./images/orbs/orb_fire.png'),
    earth: require('./images/orbs/orb_earth.png'),
    metal: require('./images/orbs/orb_metal.png'),
    water: require('./images/orbs/orb_water.png'),
  },
  pillars: {
    sealed: require('./images/pillars/pillar_sealed.png'),
    unsealed: require('./images/pillars/pillar_unsealed.png'),
  },
  cards: {
    back: require('./images/cards/card_back_fortune.png'),
    front: require('./images/cards/card_front_gold.png'),
  },
  talismans: {
    red: require('./images/talismans/talisman_red.png'),
  },
  ui: {
    goldPanel: require('./images/ui/ui_gold_panel.png'),
  },
  effects: {
    goldBurst: require('./images/effects/fx_gold_burst_sheet.png'),
    particles: require('./images/effects/fx_small_particles.png'),
    sealBreak: require('./images/effects/seal_break_sheet.png'),
    orbTrail: require('./images/effects/orb_trail.png'),
    mist: require('./images/effects/mist_overlay.webp'),
    stars: require('./images/effects/star_overlay.webp'),
  },
  collection: {
    chestClosed: require('./images/collection/chest_closed.png'),
    chestOpen: require('./images/collection/chest_open.png'),
    cardFrame: require('./images/collection/collection_card_frame.png'),
  },
};
