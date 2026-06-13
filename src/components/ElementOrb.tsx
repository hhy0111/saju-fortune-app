import React, { useEffect } from 'react';
import { ImageBackground, StyleSheet, Text, View } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';
import { sajuImages } from '../assets/imageAssets';
import type { ElementKey } from '../core/saju/types';

interface ElementOrbProps {
  element: ElementKey;
  value?: number;
  animated?: boolean;
  size?: number;
}

const config = {
  wood: { label: '木', color: '#4EAA73', trail: 'rgba(78,170,115,0.58)' },
  fire: { label: '火', color: '#C94843', trail: 'rgba(201,72,67,0.58)' },
  earth: { label: '土', color: '#C69B50', trail: 'rgba(198,155,80,0.58)' },
  metal: { label: '金', color: '#DDE2EA', trail: 'rgba(221,226,234,0.58)' },
  water: { label: '水', color: '#4E88D9', trail: 'rgba(78,136,217,0.58)' },
};

export function ElementOrb({ element, value, animated = false, size = 64 }: ElementOrbProps) {
  const item = config[element];
  const rotation = useSharedValue(0);
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotation.value}deg` }],
  }));

  useEffect(() => {
    if (animated) {
      rotation.value = withRepeat(withTiming(360, { duration: 22000 }), -1, false);
    }
  }, [animated, rotation]);

  return (
    <View style={[styles.frame, { width: size, height: size }]}>
      {animated ? (
        <Animated.View style={[{ borderColor: item.trail }, styles.trail, animatedStyle]} />
      ) : null}
      <ImageBackground source={sajuImages.orbs[element]} resizeMode="contain" style={styles.orb}>
        <Text style={[styles.label, { color: item.color }]}>{item.label}</Text>
        {typeof value === 'number' ? <Text style={styles.value}>{value}</Text> : null}
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  frame: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  trail: {
    position: 'absolute',
    width: '118%',
    height: '118%',
    borderRadius: 999,
    borderWidth: 2,
    borderTopColor: 'rgba(255,240,188,0.14)',
    borderRightColor: 'transparent',
  },
  orb: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    fontSize: 20,
    fontWeight: '900',
  },
  value: {
    color: '#F7E7BB',
    fontSize: 11,
    marginTop: 1,
  },
});
