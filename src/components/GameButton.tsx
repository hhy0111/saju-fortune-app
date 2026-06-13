import React, { useEffect, useMemo, useState } from 'react';
import { AccessibilityInfo, Pressable, StyleSheet, Text, ViewStyle } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import type { SharedValue } from 'react-native-reanimated';
import { lightImpact } from '../utils/vibration';

interface GameButtonProps {
  label: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'danger';
  style?: ViewStyle;
  disabled?: boolean;
  busy?: boolean;
  accessibilityLabel?: string;
  accessibilityHint?: string;
}

export function GameButton({
  label,
  onPress,
  variant = 'primary',
  style,
  disabled = false,
  busy = false,
  accessibilityLabel,
  accessibilityHint,
}: GameButtonProps) {
  const scale = useSharedValue(1);
  const glow = useSharedValue(0);
  const reduceMotion = useReduceMotionPreference();
  const inactive = disabled || busy;
  const colors = useMemo(() => stylesByVariant[variant], [variant]);
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    shadowOpacity: 0.18 + glow.value * 0.35,
  }));

  return (
    <Animated.View style={[styles.wrapper, colors.wrapper, inactive && styles.wrapperDisabled, animatedStyle, style]}>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={accessibilityLabel ?? label}
        accessibilityHint={accessibilityHint}
        accessibilityState={{ disabled: inactive, busy }}
        disabled={inactive}
        hitSlop={8}
        android_ripple={inactive ? undefined : { color: 'rgba(255, 240, 188, 0.18)' }}
        onPressIn={() => {
          if (inactive) {
            return;
          }

          scale.value = withTiming(reduceMotion ? 1 : 0.96, { duration: 90 });
          glow.value = withTiming(reduceMotion ? 0 : 1, { duration: 90 });
          lightImpact();
        }}
        onPressOut={() => {
          scale.value = withTiming(1, { duration: 120 });
          glow.value = withTiming(0, { duration: 260 });
        }}
        onPress={() => {
          if (!inactive) {
            onPress();
          }
        }}
        style={[styles.pressable, colors.pressable, inactive && styles.pressableDisabled]}>
        <Text maxFontSizeMultiplier={1.25} numberOfLines={2} style={[styles.label, colors.label]}>
          {label}
        </Text>
        {!reduceMotion && !inactive
          ? particles.map(particle => (
              <ButtonParticle key={particle.id} glow={glow} x={particle.x} y={particle.y} />
            ))
          : null}
      </Pressable>
    </Animated.View>
  );
}

function useReduceMotionPreference() {
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    let mounted = true;

    AccessibilityInfo.isReduceMotionEnabled?.()
      .then(value => {
        if (mounted) {
          setReduceMotion(Boolean(value));
        }
      })
      .catch(() => undefined);

    const subscription = AccessibilityInfo.addEventListener?.('reduceMotionChanged', value => {
      setReduceMotion(Boolean(value));
    });

    return () => {
      mounted = false;
      subscription?.remove?.();
    };
  }, []);

  return reduceMotion;
}

function ButtonParticle({
  glow,
  x,
  y,
}: {
  glow: SharedValue<number>;
  x: number;
  y: number;
}) {
  const animatedStyle = useAnimatedStyle(() => ({
    opacity: glow.value,
    transform: [
      { translateX: x * glow.value },
      { translateY: y * glow.value },
      { scale: 0.45 + glow.value * 0.8 },
    ],
  }));

  return <Animated.View pointerEvents="none" style={[styles.particle, animatedStyle]} />;
}

const particles = [
  { id: 'p1', x: -68, y: -18 },
  { id: 'p2', x: -44, y: 26 },
  { id: 'p3', x: -12, y: -34 },
  { id: 'p4', x: 28, y: -30 },
  { id: 'p5', x: 58, y: 12 },
  { id: 'p6', x: 42, y: 34 },
  { id: 'p7', x: 4, y: 38 },
  { id: 'p8', x: -58, y: 6 },
];

const styles = StyleSheet.create({
  wrapper: {
    borderRadius: 14,
    shadowColor: '#F0C56B',
    shadowOffset: { width: 0, height: 8 },
    shadowRadius: 18,
    elevation: 5,
  },
  wrapperDisabled: {
    shadowOpacity: 0.04,
    elevation: 0,
  },
  pressable: {
    minHeight: 56,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderWidth: 1,
    overflow: 'hidden',
  },
  pressableDisabled: {
    opacity: 0.54,
  },
  label: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: '900',
    textAlign: 'center',
    zIndex: 2,
  },
  particle: {
    position: 'absolute',
    left: '50%',
    top: '50%',
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#FFF0BC',
    shadowColor: '#F0C56B',
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 8,
    shadowOpacity: 0.6,
  },
});

const stylesByVariant = {
  primary: StyleSheet.create({
    wrapper: {},
    pressable: {
      backgroundColor: '#E4B75A',
      borderColor: '#FFF0BC',
    },
    label: {
      color: '#241307',
    },
  }),
  secondary: StyleSheet.create({
    wrapper: {},
    pressable: {
      backgroundColor: '#182044',
      borderColor: '#C9984A',
    },
    label: {
      color: '#F7E7BB',
    },
  }),
  danger: StyleSheet.create({
    wrapper: {},
    pressable: {
      backgroundColor: '#8E2634',
      borderColor: '#F0C56B',
    },
    label: {
      color: '#FBE8C0',
    },
  }),
};
