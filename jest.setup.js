/* eslint-env jest */

jest.mock('react-native-reanimated', () => {
  const ReactNative = require('react-native');
  const Reanimated = {
    View: ReactNative.Animated.View,
    Text: ReactNative.Animated.Text,
    Image: ReactNative.Animated.Image,
    ScrollView: ReactNative.Animated.ScrollView,
    createAnimatedComponent: component => component,
  };

  return {
    __esModule: true,
    default: Reanimated,
    useSharedValue: initial => ({ value: initial }),
    useAnimatedStyle: updater => updater(),
    withTiming: value => value,
    withRepeat: value => value,
    withDelay: (_delay, value) => value,
    Easing: {
      out: easing => easing,
      exp: value => value,
    },
  };
});
jest.mock('react-native-gesture-handler', () => {
  const React = require('react');
  const { View } = require('react-native');

  return {
    GestureHandlerRootView: ({ children, style }) => React.createElement(View, { style }, children),
  };
});
jest.mock(
  '@react-native-async-storage/async-storage',
  () => ({
    __esModule: true,
    default: {
      getItem: jest.fn(() => Promise.resolve(null)),
      setItem: jest.fn(() => Promise.resolve(null)),
      removeItem: jest.fn(() => Promise.resolve(null)),
      clear: jest.fn(() => Promise.resolve(null)),
    },
  }),
);
jest.mock('react-native-google-mobile-ads', () => {
  const React = require('react');

  const TestIds = {
    APP_OPEN: 'ca-app-pub-3940256099942544/3419835294',
    ADAPTIVE_BANNER: 'ca-app-pub-3940256099942544/9214589741',
    BANNER: 'ca-app-pub-3940256099942544/6300978111',
    INTERSTITIAL: 'ca-app-pub-3940256099942544/1033173712',
    REWARDED: 'ca-app-pub-3940256099942544/5224354917',
    REWARDED_INTERSTITIAL: 'ca-app-pub-3940256099942544/5354046379',
    NATIVE: 'ca-app-pub-3940256099942544/2247696110',
    NATIVE_VIDEO: 'ca-app-pub-3940256099942544/1044960115',
  };
  const AdEventType = {
    LOADED: 'loaded',
    ERROR: 'error',
    CLOSED: 'closed',
  };
  const RewardedAdEventType = {
    LOADED: 'rewarded_loaded',
    EARNED_REWARD: 'rewarded_earned_reward',
  };
  const BannerAdSize = {
    ANCHORED_ADAPTIVE_BANNER: 'ANCHORED_ADAPTIVE_BANNER',
  };

  return {
    __esModule: true,
    default: () => ({
      initialize: jest.fn(() => Promise.resolve([])),
    }),
    TestIds,
    AdEventType,
    RewardedAdEventType,
    BannerAdSize,
    BannerAd: props => React.createElement('BannerAd', props),
    RewardedAd: {
      createForAdRequest: jest.fn(() => ({
        addAdEventListener: jest.fn(() => jest.fn()),
        removeAllListeners: jest.fn(),
        load: jest.fn(),
        show: jest.fn(() => Promise.resolve()),
      })),
    },
  };
});
jest.mock('react-native-iap', () => {
  const subscription = { remove: jest.fn() };

  return {
    initConnection: jest.fn(() => Promise.resolve(true)),
    fetchProducts: jest.fn(() => Promise.resolve([])),
    getAvailablePurchases: jest.fn(() => Promise.resolve([])),
    finishTransaction: jest.fn(() => Promise.resolve()),
    purchaseUpdatedListener: jest.fn(() => subscription),
    purchaseErrorListener: jest.fn(() => subscription),
    requestPurchase: jest.fn(() => Promise.resolve(null)),
  };
});
