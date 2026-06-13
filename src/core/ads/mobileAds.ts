import mobileAds from 'react-native-google-mobile-ads';

let initializationPromise: Promise<void> | null = null;

export function initializeMobileAds(): Promise<void> {
  if (!initializationPromise) {
    initializationPromise = mobileAds()
      .initialize()
      .then(() => undefined);
  }

  return initializationPromise;
}
