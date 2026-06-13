import React from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AdBannerSlot } from '../components/AdBannerSlot';
import { ElementBalanceChart } from '../components/ElementBalanceChart';
import { FortuneCard } from '../components/FortuneCard';
import { GameButton } from '../components/GameButton';
import { LuckyInfoBox } from '../components/LuckyInfoBox';
import { MysticBackground } from '../components/MysticBackground';
import { PillarTable } from '../components/PillarTable';
import type { RootStackParamList } from '../navigation/types';
import { useFortuneStore } from '../store/fortuneStore';

type Props = NativeStackScreenProps<RootStackParamList, 'ResultSummary'>;

function StickyResultHeader({ onBack }: { onBack: () => void }) {
  return (
    <View style={styles.header}>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel="뒤로가기"
        accessibilityHint="홈 화면으로 돌아갑니다."
        hitSlop={10}
        android_ripple={{ color: 'rgba(255, 240, 188, 0.14)' }}
        onPress={onBack}
        style={({ pressed }) => [styles.backButton, pressed && styles.backButtonPressed]}>
        <Text style={styles.backIcon}>‹</Text>
      </Pressable>
      <Text accessibilityRole="header" maxFontSizeMultiplier={1.25} style={styles.headerTitle}>
        오늘의 결과
      </Text>
      <View style={styles.headerSpacer} />
    </View>
  );
}

export function ResultSummaryScreen({ navigation, route }: Props) {
  const fortune = useFortuneStore(state => state.fortunesById[route.params.fortuneId]);
  const showLotto = route.params.categoryId === 'lotto';

  if (!fortune) {
    return (
      <MysticBackground variant="result">
        <SafeAreaView style={styles.safe}>
          <StickyResultHeader onBack={() => navigation.navigate('Home')} />
          <Text style={styles.empty}>결과를 찾을 수 없습니다.</Text>
        </SafeAreaView>
      </MysticBackground>
    );
  }

  return (
    <MysticBackground variant="result">
      <SafeAreaView style={styles.safe}>
      <ScrollView
        directionalLockEnabled
        keyboardShouldPersistTaps="handled"
        nestedScrollEnabled
        overScrollMode="never"
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
        stickyHeaderIndices={[0]}
        contentContainerStyle={styles.container}>
        <StickyResultHeader onBack={() => navigation.navigate('Home')} />
        {route.params.categoryLabel ? (
          <Text accessibilityLabel={`${route.params.categoryLabel} 결과`} style={styles.categoryChip}>
            {route.params.categoryLabel}
          </Text>
        ) : null}
        <FortuneCard title={fortune.summaryTitle}>
          <Text accessibilityLabel={`운세 등급 ${fortune.grade}`} style={styles.grade}>
            {fortune.grade}
          </Text>
          <Text accessibilityLabel={`운세 점수 ${fortune.score}점`} style={styles.score}>
            {fortune.score}점
          </Text>
          <Text style={styles.advice}>{fortune.oneLineAdvice}</Text>
        </FortuneCard>

        <FortuneCard title="사주 기둥">
          <PillarTable pillars={fortune.pillars} />
          <Text style={styles.note}>{fortune.pillars.accuracyNote}</Text>
        </FortuneCard>

        <FortuneCard title="오행 균형">
          <ElementBalanceChart balance={fortune.elementBalance} />
        </FortuneCard>

        <FortuneCard title="오늘의 행운">
          <LuckyInfoBox lucky={fortune.lucky} showLotto={showLotto} />
        </FortuneCard>

        <AdBannerSlot placement="summary" />
        <Text style={styles.disclaimer}>{fortune.disclaimer}</Text>
        <GameButton
          label="상세 리포트 보기"
          accessibilityHint="자세한 운세 해석 화면으로 이동합니다."
          onPress={() => navigation.navigate('DetailReport', route.params)}
        />
      </ScrollView>
      </SafeAreaView>
    </MysticBackground>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
  },
  container: {
    paddingHorizontal: 18,
    paddingBottom: 34,
  },
  header: {
    marginHorizontal: -18,
    paddingHorizontal: 18,
    paddingTop: 8,
    paddingBottom: 12,
    minHeight: 58,
    backgroundColor: 'rgba(7, 11, 31, 0.94)',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(240, 197, 107, 0.24)',
    flexDirection: 'row',
    alignItems: 'center',
    zIndex: 5,
    elevation: 6,
  },
  backButton: {
    width: 42,
    height: 42,
    borderRadius: 21,
    borderWidth: 1,
    borderColor: 'rgba(240, 197, 107, 0.42)',
    backgroundColor: 'rgba(255, 255, 255, 0.06)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  backButtonPressed: {
    opacity: 0.72,
    transform: [{ scale: 0.97 }],
  },
  backIcon: {
    color: '#F7E7BB',
    fontSize: 32,
    fontWeight: '700',
    lineHeight: 34,
  },
  headerTitle: {
    flex: 1,
    color: '#F7E7BB',
    fontSize: 18,
    fontWeight: '900',
    textAlign: 'center',
  },
  headerSpacer: {
    width: 42,
  },
  categoryChip: {
    alignSelf: 'center',
    color: '#241307',
    backgroundColor: '#E4B75A',
    borderRadius: 999,
    paddingHorizontal: 14,
    paddingVertical: 6,
    fontWeight: '900',
    marginBottom: 12,
  },
  grade: {
    color: '#F6D58A',
    fontSize: 56,
    fontWeight: '900',
    lineHeight: 62,
  },
  score: {
    color: '#F7E7BB',
    fontSize: 20,
    fontWeight: '800',
    marginBottom: 8,
  },
  advice: {
    color: '#F5E6C8',
    fontSize: 15,
    lineHeight: 23,
  },
  note: {
    color: '#B9AD91',
    fontSize: 12,
    lineHeight: 18,
    marginTop: 12,
  },
  disclaimer: {
    color: '#B9AD91',
    fontSize: 12,
    lineHeight: 18,
    marginBottom: 16,
    textAlign: 'center',
  },
  empty: {
    color: '#F7E7BB',
    margin: 20,
  },
});
