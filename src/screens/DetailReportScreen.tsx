import React from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { SafeAreaView } from 'react-native-safe-area-context';
import { GameButton } from '../components/GameButton';
import { MysticBackground } from '../components/MysticBackground';
import { ReportSection } from '../components/ReportSection';
import type { RootStackParamList } from '../navigation/types';
import { useFortuneStore } from '../store/fortuneStore';

type Props = NativeStackScreenProps<RootStackParamList, 'DetailReport'>;

function StickyReportHeader({ onBack }: { onBack: () => void }) {
  return (
    <View style={styles.header}>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel="뒤로가기"
        accessibilityHint="이전 화면으로 돌아갑니다."
        hitSlop={10}
        android_ripple={{ color: 'rgba(255, 240, 188, 0.14)' }}
        onPress={onBack}
        style={({ pressed }) => [styles.backButton, pressed && styles.backButtonPressed]}>
        <Text style={styles.backIcon}>‹</Text>
      </Pressable>
      <Text accessibilityRole="header" maxFontSizeMultiplier={1.25} style={styles.headerTitle}>
        상세 리포트
      </Text>
      <View style={styles.headerSpacer} />
    </View>
  );
}

export function DetailReportScreen({ navigation, route }: Props) {
  const fortune = useFortuneStore(state => state.fortunesById[route.params.fortuneId]);
  const unlocked = useFortuneStore(state => state.unlockedFortuneIds.includes(route.params.fortuneId));

  if (!fortune) {
    return (
      <MysticBackground variant="result">
        <SafeAreaView style={styles.safe}>
          <StickyReportHeader onBack={navigation.goBack} />
          <Text style={styles.empty}>상세 리포트를 찾을 수 없습니다.</Text>
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
          <StickyReportHeader onBack={navigation.goBack} />
          <Text accessibilityRole="header" maxFontSizeMultiplier={1.25} style={styles.title}>
            {fortune.summaryTitle}
          </Text>
          {fortune.sections.map(section => (
            <ReportSection key={section.id} section={section} unlocked={unlocked} />
          ))}
          {!unlocked ? (
            <GameButton
              label="오늘의 상세 풀이 해금"
              accessibilityHint="광고 해금 또는 프리미엄 화면으로 이동합니다."
              onPress={() => navigation.navigate('PremiumUnlock', route.params)}
            />
          ) : null}
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
  title: {
    color: '#F7E7BB',
    fontSize: 24,
    lineHeight: 30,
    fontWeight: '900',
    marginBottom: 14,
  },
  empty: {
    color: '#F7E7BB',
    margin: 20,
  },
});
