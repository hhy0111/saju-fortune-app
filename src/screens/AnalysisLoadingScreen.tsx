import React, { useEffect, useState } from 'react';
import { ImageBackground, StyleSheet, Text, View } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { SafeAreaView } from 'react-native-safe-area-context';
import { sajuImages } from '../assets/imageAssets';
import { ElementOrb } from '../components/ElementOrb';
import { MysticBackground } from '../components/MysticBackground';
import type { RootStackParamList } from '../navigation/types';
import { useFortuneStore } from '../store/fortuneStore';

type Props = NativeStackScreenProps<RootStackParamList, 'AnalysisLoading'>;

export function AnalysisLoadingScreen({ navigation, route }: Props) {
  const [revealedCount, setRevealedCount] = useState(0);
  const generateTodayFortune = useFortuneStore(state => state.generateTodayFortune);
  const { birthInput, categoryId, categoryLabel } = route.params;

  useEffect(() => {
    const revealTimers = [0, 1, 2, 3].map(index =>
      setTimeout(() => setRevealedCount(index + 1), 360 + index * 360),
    );
    const timer = setTimeout(() => {
      const fortuneId = generateTodayFortune(birthInput);
      navigation.replace('ResultSummary', {
        fortuneId,
        categoryId,
        categoryLabel,
      });
    }, 2200);

    return () => {
      clearTimeout(timer);
      revealTimers.forEach(clearTimeout);
    };
  }, [birthInput, categoryId, categoryLabel, generateTodayFortune, navigation]);

  return (
    <MysticBackground variant="analysis">
      <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        <Text
          accessibilityLiveRegion="polite"
          accessibilityRole="header"
          maxFontSizeMultiplier={1.25}
          style={styles.title}>
          사주의 기운을 읽는 중...
        </Text>
        <View style={styles.pillarRow}>
          {['년주', '월주', '일주', '시주'].map((label, index) => (
            <ImageBackground
              key={label}
              accessible
              accessibilityLabel={`${label} ${index < revealedCount ? '생성 완료' : '생성 대기 중'}`}
              source={index < revealedCount ? sajuImages.pillars.unsealed : sajuImages.pillars.sealed}
              resizeMode="contain"
              style={[styles.pillar, index < revealedCount && styles.pillarRevealed]}>
              <Text style={styles.pillarText}>{label}</Text>
            </ImageBackground>
          ))}
        </View>
        <View style={styles.orbs}>
          <ElementOrb element="wood" animated />
          <ElementOrb element="fire" animated />
          <ElementOrb element="earth" animated />
          <ElementOrb element="metal" animated />
          <ElementOrb element="water" animated />
        </View>
        <Text style={styles.note}>오행 구슬이 모이며 오늘의 흐름을 열고 있습니다.</Text>
      </View>
      </SafeAreaView>
    </MysticBackground>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    color: '#F7E7BB',
    fontSize: 24,
    lineHeight: 31,
    fontWeight: '900',
    marginBottom: 28,
    textAlign: 'center',
  },
  pillarRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 32,
  },
  pillar: {
    width: 68,
    height: 120,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#F0C56B',
    backgroundColor: 'rgba(120,36,48,0.34)',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  pillarRevealed: {
    shadowColor: '#F0C56B',
    shadowOpacity: 0.7,
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 12,
    elevation: 5,
  },
  pillarText: {
    color: '#F6D58A',
    fontWeight: '800',
  },
  orbs: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 12,
    marginBottom: 22,
  },
  note: {
    color: '#D8C8A2',
    textAlign: 'center',
  },
});
