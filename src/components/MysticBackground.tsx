import React from 'react';
import { Image, ImageBackground, StyleSheet, View } from 'react-native';
import { sajuImages } from '../assets/imageAssets';

type MysticBackgroundVariant = 'home' | 'analysis' | 'result' | 'collection';

interface MysticBackgroundProps {
  variant: MysticBackgroundVariant;
  children: React.ReactNode;
}

const backgrounds = {
  home: sajuImages.backgrounds.home,
  analysis: sajuImages.backgrounds.analysis,
  result: sajuImages.backgrounds.result,
  collection: sajuImages.backgrounds.collection,
};

export function MysticBackground({ variant, children }: MysticBackgroundProps) {
  return (
    <ImageBackground source={backgrounds[variant]} resizeMode="cover" style={styles.root}>
      <View style={styles.scrim} />
      <Image
        accessible={false}
        importantForAccessibility="no"
        source={sajuImages.effects.mist}
        resizeMode="cover"
        style={styles.mist}
      />
      <Image
        accessible={false}
        importantForAccessibility="no"
        source={sajuImages.effects.stars}
        resizeMode="cover"
        style={styles.stars}
      />
      <View style={styles.content}>{children}</View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#070B1F',
  },
  scrim: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(5, 8, 22, 0.5)',
  },
  mist: {
    ...StyleSheet.absoluteFillObject,
    opacity: 0.2,
  },
  stars: {
    ...StyleSheet.absoluteFillObject,
    opacity: 0.26,
  },
  content: {
    flex: 1,
  },
});
