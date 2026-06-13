import React from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AdBannerSlot } from '../components/AdBannerSlot';
import { ElementOrb } from '../components/ElementOrb';
import { GameButton } from '../components/GameButton';
import { MysticBackground } from '../components/MysticBackground';
import { fortuneMenuItems } from '../core/fortune/fortuneCategories';
import type { RootStackParamList } from '../navigation/types';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

export function HomeScreen({ navigation }: Props) {
  return (
    <MysticBackground variant="home">
      <SafeAreaView style={styles.safe}>
      <ScrollView
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}>
        <Text style={styles.eyebrow}>오늘의 기운</Text>
        <Text accessibilityRole="header" maxFontSizeMultiplier={1.25} style={styles.title}>
          운명전
        </Text>
        <Text style={styles.subtitle}>오행의 빛을 모아 오늘의 사주를 열어보세요.</Text>

        <View style={styles.orbRing}>
          <View style={styles.orbRow}>
            <ElementOrb element="wood" animated />
            <ElementOrb element="fire" animated />
          </View>
          <View style={styles.centerSeal}>
            <Text style={styles.sealText}>命</Text>
          </View>
          <View style={styles.orbRow}>
            <ElementOrb element="water" animated />
            <ElementOrb element="earth" animated />
            <ElementOrb element="metal" animated />
          </View>
        </View>

        <GameButton
          label="오늘의 사주 보기"
          accessibilityHint="생년월일과 태어난 시간을 입력하는 화면으로 이동합니다."
          onPress={() => navigation.navigate('BirthInput')}
        />
        <GameButton
          label="행운 도감"
          variant="secondary"
          style={styles.secondaryButton}
          accessibilityHint="오늘의 부적과 오행 구슬 수집 화면으로 이동합니다."
          onPress={() => navigation.navigate('Collection')}
        />

        <View style={styles.menuGrid}>
          {fortuneMenuItems.map(item => (
            <Pressable
              key={item.id}
              accessibilityRole="button"
              accessibilityLabel={item.label}
              accessibilityHint={`${item.label} 결과를 보기 위한 입력 화면으로 이동합니다.`}
              hitSlop={6}
              android_ripple={{ color: 'rgba(255, 240, 188, 0.14)' }}
              onPress={() =>
                navigation.navigate('BirthInput', {
                  categoryId: item.id,
                  categoryLabel: item.label,
                })
              }
              style={({ pressed }) => [styles.menuItem, pressed && styles.menuItemPressed]}>
              <Text maxFontSizeMultiplier={1.2} numberOfLines={2} style={styles.menuText}>
                {item.label}
              </Text>
            </Pressable>
          ))}
        </View>
        <AdBannerSlot placement="home" />
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="개인정보처리방침"
          accessibilityHint="앱의 개인정보 처리 내용을 확인합니다."
          hitSlop={8}
          onPress={() => navigation.navigate('PrivacyPolicy')}
          style={({ pressed }) => [styles.privacyLink, pressed && styles.privacyLinkPressed]}>
          <Text style={styles.privacyLinkText}>개인정보처리방침</Text>
        </Pressable>
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
    paddingHorizontal: 20,
    paddingTop: 18,
    paddingBottom: 38,
  },
  eyebrow: {
    color: '#CDBB8D',
    textAlign: 'center',
    fontSize: 13,
    marginTop: 8,
  },
  title: {
    color: '#F7E7BB',
    fontSize: 38,
    fontWeight: '900',
    textAlign: 'center',
    marginTop: 6,
  },
  subtitle: {
    color: '#D8C8A2',
    textAlign: 'center',
    lineHeight: 21,
    marginTop: 8,
    marginHorizontal: 10,
  },
  orbRing: {
    minHeight: 260,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: 'rgba(240,197,107,0.34)',
    backgroundColor: 'rgba(11, 16, 42, 0.78)',
    marginVertical: 22,
    padding: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  orbRow: {
    flexDirection: 'row',
    gap: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  centerSeal: {
    width: 112,
    height: 112,
    borderRadius: 56,
    borderWidth: 1,
    borderColor: '#F0C56B',
    backgroundColor: 'rgba(142, 38, 52, 0.5)',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 12,
  },
  sealText: {
    color: '#F6D58A',
    fontSize: 52,
    fontWeight: '900',
  },
  secondaryButton: {
    marginTop: 12,
  },
  menuGrid: {
    marginTop: 18,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  menuItem: {
    width: '48%',
    minHeight: 54,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(240,197,107,0.3)',
    backgroundColor: 'rgba(255,255,255,0.07)',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 8,
    paddingVertical: 8,
  },
  menuItemPressed: {
    borderColor: '#FFF0BC',
    backgroundColor: 'rgba(228,183,90,0.22)',
    transform: [{ scale: 0.98 }],
  },
  menuText: {
    color: '#F5E6C8',
    fontWeight: '900',
    textAlign: 'center',
    lineHeight: 20,
  },
  privacyLink: {
    minHeight: 44,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  privacyLinkPressed: {
    opacity: 0.72,
  },
  privacyLinkText: {
    color: '#CDBB8D',
    fontSize: 12,
    fontWeight: '800',
    textDecorationLine: 'underline',
  },
});
