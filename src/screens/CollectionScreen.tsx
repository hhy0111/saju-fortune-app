import React from 'react';
import { ImageBackground, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AdBannerSlot } from '../components/AdBannerSlot';
import { DailyMissionBox } from '../components/DailyMissionBox';
import { ElementOrb } from '../components/ElementOrb';
import { FortuneCard } from '../components/FortuneCard';
import { GameButton } from '../components/GameButton';
import { MysticBackground } from '../components/MysticBackground';
import { formatDate } from '../utils/dateUtils';
import { useCollectionStore } from '../store/collectionStore';

export function CollectionScreen() {
  const today = formatDate(new Date());
  const checkInDates = useCollectionStore(state => state.checkInDates);
  const markTodayCheckIn = useCollectionStore(state => state.markTodayCheckIn);
  const checkedIn = checkInDates.includes(today);

  return (
    <MysticBackground variant="collection">
      <SafeAreaView style={styles.safe}>
      <ScrollView
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}>
        <FortuneCard title="오늘의 부적">
          <ImageBackground
            accessible
            accessibilityLabel="오늘의 붉은 부적"
            source={require('../assets/images/talismans/talisman_red.png')}
            resizeMode="contain"
            style={styles.talisman}>
            <Text style={styles.talismanText}>福</Text>
          </ImageBackground>
          <Text style={styles.body}>오늘의 부적은 관계의 온도를 편안하게 잡아주는 붉은 부적입니다.</Text>
        </FortuneCard>

        <FortuneCard title="오행 구슬 수집">
          <View style={styles.orbRow}>
            <ElementOrb element="wood" animated />
            <ElementOrb element="fire" animated />
            <ElementOrb element="earth" animated />
            <ElementOrb element="metal" animated />
            <ElementOrb element="water" animated />
          </View>
        </FortuneCard>

        <FortuneCard title="7일 연속 출석">
          <Text style={styles.body}>현재 출석 {checkInDates.length}/7일</Text>
          <GameButton
            label={checkedIn ? '오늘 출석 완료' : '오늘 출석 체크'}
            variant="secondary"
            disabled={checkedIn}
            accessibilityHint={checkedIn ? '오늘은 이미 출석했습니다.' : '오늘 날짜의 출석을 기록합니다.'}
            onPress={() => markTodayCheckIn(today)}
          />
        </FortuneCard>

        <DailyMissionBox mission="고마운 사람 한 명에게 짧은 인사를 보내보세요." completed={false} />
        <AdBannerSlot placement="collection" />
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
    padding: 18,
    paddingBottom: 34,
  },
  talisman: {
    width: 96,
    height: 128,
    borderRadius: 14,
    backgroundColor: '#8E2634',
    borderWidth: 1,
    borderColor: '#F0C56B',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  talismanText: {
    color: '#F6D58A',
    fontSize: 44,
    fontWeight: '900',
  },
  body: {
    color: '#F5E6C8',
    fontSize: 15,
    lineHeight: 23,
    marginBottom: 12,
  },
  orbRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 8,
  },
});
