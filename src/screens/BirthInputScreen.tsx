import React, { useMemo, useState } from 'react';
import { Alert, Image, Modal, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { SafeAreaView } from 'react-native-safe-area-context';
import { sajuImages } from '../assets/imageAssets';
import { FortuneCard } from '../components/FortuneCard';
import { GameButton } from '../components/GameButton';
import { MysticBackground } from '../components/MysticBackground';
import type { CalendarType, Gender } from '../core/saju/types';
import type { RootStackParamList } from '../navigation/types';
import { useFortuneStore } from '../store/fortuneStore';

type Props = NativeStackScreenProps<RootStackParamList, 'BirthInput'>;

const HOURS = Array.from({ length: 24 }, (_, index) => index);
const MINUTES = Array.from({ length: 60 }, (_, index) => index);
const WEEK_DAYS = ['일', '월', '화', '수', '목', '금', '토'];

function pad2(value: number): string {
  return String(value).padStart(2, '0');
}

function formatIsoDate(date: Date): string {
  return `${date.getFullYear()}-${pad2(date.getMonth() + 1)}-${pad2(date.getDate())}`;
}

function parseIsoDate(value: string): Date | null {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value);

  if (!match) {
    return null;
  }

  const year = Number(match[1]);
  const month = Number(match[2]);
  const day = Number(match[3]);
  const date = new Date(year, month - 1, day);

  if (date.getFullYear() !== year || date.getMonth() !== month - 1 || date.getDate() !== day) {
    return null;
  }

  return date;
}

function getMonthCells(monthDate: Date) {
  const year = monthDate.getFullYear();
  const month = monthDate.getMonth();
  const firstDate = new Date(year, month, 1);
  const lastDate = new Date(year, month + 1, 0);
  const cells: Array<Date | null> = [];

  for (let index = 0; index < firstDate.getDay(); index += 1) {
    cells.push(null);
  }

  for (let day = 1; day <= lastDate.getDate(); day += 1) {
    cells.push(new Date(year, month, day));
  }

  while (cells.length % 7 !== 0) {
    cells.push(null);
  }

  return cells;
}

export function BirthInputScreen({ navigation, route }: Props) {
  const [birthDate, setBirthDate] = useState('1990-05-17');
  const [birthHour, setBirthHour] = useState<number | null>(9);
  const [birthMinute, setBirthMinute] = useState<number | null>(0);
  const [calendarType, setCalendarType] = useState<CalendarType>('solar');
  const [gender, setGender] = useState<Gender>('unspecified');
  const [saveConsent, setSaveConsent] = useState(false);
  const [calendarVisible, setCalendarVisible] = useState(false);
  const [timePicker, setTimePicker] = useState<'hour' | 'minute' | null>(null);
  const [calendarMonth, setCalendarMonth] = useState(() => parseIsoDate('1990-05-17') ?? new Date());
  const setBirthInput = useFortuneStore(state => state.setBirthInput);
  const calendarCells = useMemo(() => getMonthCells(calendarMonth), [calendarMonth]);
  const birthDateLabel = birthDate.replace(/-/g, '.');
  const birthTimeLabel =
    birthHour === null ? '시간 모름' : `${pad2(birthHour)}시 ${pad2(birthMinute ?? 0)}분`;

  const moveCalendarMonth = (delta: number) => {
    setCalendarMonth(current => new Date(current.getFullYear(), current.getMonth() + delta, 1));
  };

  const selectBirthDate = (date: Date) => {
    setBirthDate(formatIsoDate(date));
    setCalendarMonth(new Date(date.getFullYear(), date.getMonth(), 1));
    setCalendarVisible(false);
  };

  const selectHour = (hour: number | null) => {
    setBirthHour(hour);
    setBirthMinute(current => (hour === null ? null : current ?? 0));
    setTimePicker(null);
  };

  const selectMinute = (minute: number) => {
    setBirthMinute(minute);
    setTimePicker(null);
  };

  const submit = () => {
    if (!parseIsoDate(birthDate)) {
      Alert.alert('입력 확인', '캘린더에서 올바른 생년월일을 선택해 주세요.');
      return;
    }

    if (birthHour !== null && birthMinute === null) {
      Alert.alert('입력 확인', '태어난 분을 선택해 주세요.');
      return;
    }

    const input = { birthDate, birthHour, birthMinute, calendarType, gender, saveConsent };
    setBirthInput(input);
    navigation.navigate('AnalysisLoading', {
      birthInput: input,
      categoryId: route.params?.categoryId,
      categoryLabel: route.params?.categoryLabel,
    });
  };

  return (
    <MysticBackground variant="result">
      <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        <FortuneCard title={route.params?.categoryLabel ? `${route.params.categoryLabel} 사주 입력` : '사주 봉인 입력'}>
          <Image
            accessible={false}
            importantForAccessibility="no"
            source={sajuImages.talismans.red}
            resizeMode="contain"
            style={styles.talisman}
          />
          <Text style={styles.label}>생년월일</Text>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="생년월일 선택"
            accessibilityHint="캘린더에서 생년월일을 선택합니다."
            hitSlop={6}
            onPress={() => setCalendarVisible(true)}
            style={({ pressed }) => [styles.selectBox, pressed && styles.selectBoxPressed]}>
            <View>
              <Text style={styles.selectValue}>{birthDateLabel}</Text>
              <Text style={styles.selectHelp}>캘린더로 선택</Text>
            </View>
            <Text style={styles.selectArrow}>▾</Text>
          </Pressable>
          <Text style={styles.label}>태어난 시간</Text>
          <View style={styles.timeSelectRow}>
            <Pressable
              accessibilityRole="button"
              accessibilityLabel="태어난 시간 선택"
              accessibilityHint="0시부터 23시까지 선택하거나 시간 모름을 선택합니다."
              hitSlop={6}
              onPress={() => setTimePicker('hour')}
              style={({ pressed }) => [styles.selectBox, styles.timeSelectBox, pressed && styles.selectBoxPressed]}>
              <Text style={styles.selectValue}>{birthHour === null ? '시간 모름' : `${pad2(birthHour)}시`}</Text>
              <Text style={styles.selectArrow}>▾</Text>
            </Pressable>
            <Pressable
              accessibilityRole="button"
              accessibilityLabel="태어난 분 선택"
              accessibilityHint="0분부터 59분까지 선택합니다."
              accessibilityState={{ disabled: birthHour === null }}
              hitSlop={6}
              onPress={() => {
                if (birthHour !== null) {
                  setTimePicker('minute');
                }
              }}
              style={({ pressed }) => [
                styles.selectBox,
                styles.timeSelectBox,
                birthHour === null && styles.selectBoxDisabled,
                pressed && birthHour !== null && styles.selectBoxPressed,
              ]}>
              <Text style={[styles.selectValue, birthHour === null && styles.selectValueDisabled]}>
                {birthHour === null ? '--분' : `${pad2(birthMinute ?? 0)}분`}
              </Text>
              <Text style={styles.selectArrow}>▾</Text>
            </Pressable>
          </View>
          <Text style={styles.timePreview}>{birthTimeLabel}</Text>
          <Text style={styles.help}>시간을 모르면 시주는 제외하고 결과에 안내를 표시합니다.</Text>

          <View style={styles.segmentRow}>
            {(['solar', 'lunar'] as CalendarType[]).map(type => (
              <Pressable
                key={type}
                onPress={() => setCalendarType(type)}
                style={[styles.segment, calendarType === type && styles.segmentActive]}>
                <Text style={[styles.segmentText, calendarType === type && styles.segmentTextActive]}>
                  {type === 'solar' ? '양력' : '음력'}
                </Text>
              </Pressable>
            ))}
          </View>

          <View style={styles.segmentRow}>
            {(['unspecified', 'female', 'male'] as Gender[]).map(type => (
              <Pressable
                key={type}
                onPress={() => setGender(type)}
                style={[styles.segment, gender === type && styles.segmentActive]}>
                <Text style={[styles.segmentText, gender === type && styles.segmentTextActive]}>
                  {type === 'unspecified' ? '선택 안 함' : type === 'female' ? '여성' : '남성'}
                </Text>
              </Pressable>
            ))}
          </View>

          <Pressable
            accessibilityRole="checkbox"
            accessibilityLabel="이 기기에만 입력값 저장"
            accessibilityState={{ checked: saveConsent }}
            hitSlop={6}
            onPress={() => setSaveConsent(value => !value)}
            style={styles.consent}>
            <View style={[styles.checkbox, saveConsent && styles.checkboxActive]} />
            <Text style={styles.consentText}>입력값을 이 기기에만 저장합니다.</Text>
          </Pressable>
        </FortuneCard>

        <GameButton label="사주 기둥 봉인 해제" onPress={submit} />
      </ScrollView>

      <Modal
        transparent
        visible={calendarVisible}
        animationType="fade"
        accessibilityViewIsModal
        onRequestClose={() => setCalendarVisible(false)}>
        <View style={styles.modalBackdrop}>
          <View style={styles.modalPanel}>
            <Text style={styles.modalTitle}>생년월일 선택</Text>
            <View style={styles.calendarHeader}>
              <Pressable
                accessibilityRole="button"
                accessibilityLabel="이전 달"
                hitSlop={8}
                onPress={() => moveCalendarMonth(-1)}>
                <Text style={styles.calendarMove}>‹</Text>
              </Pressable>
              <Text style={styles.calendarMonth}>
                {calendarMonth.getFullYear()}년 {calendarMonth.getMonth() + 1}월
              </Text>
              <Pressable
                accessibilityRole="button"
                accessibilityLabel="다음 달"
                hitSlop={8}
                onPress={() => moveCalendarMonth(1)}>
                <Text style={styles.calendarMove}>›</Text>
              </Pressable>
            </View>
            <View style={styles.weekRow}>
              {WEEK_DAYS.map(day => (
                <Text key={day} style={styles.weekText}>{day}</Text>
              ))}
            </View>
            <View style={styles.calendarGrid}>
              {calendarCells.map((date, index) => {
                if (!date) {
                  return <View key={`empty-${index}`} style={styles.dayCell} />;
                }

                const isoDate = formatIsoDate(date);
                const selected = isoDate === birthDate;

                return (
                  <Pressable
                    key={isoDate}
                    accessibilityRole="button"
                    accessibilityLabel={`${isoDate} 선택`}
                    onPress={() => selectBirthDate(date)}
                    style={[styles.dayCell, styles.dayButton, selected && styles.dayButtonSelected]}>
                    <Text style={[styles.dayText, selected && styles.dayTextSelected]}>{date.getDate()}</Text>
                  </Pressable>
                );
              })}
            </View>
            <Pressable
              accessibilityRole="button"
              accessibilityLabel="닫기"
              style={styles.modalClose}
              onPress={() => setCalendarVisible(false)}>
              <Text style={styles.modalCloseText}>닫기</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

      <Modal
        transparent
        visible={timePicker !== null}
        animationType="fade"
        accessibilityViewIsModal
        onRequestClose={() => setTimePicker(null)}>
        <View style={styles.modalBackdrop}>
          <View style={styles.modalPanel}>
            <Text style={styles.modalTitle}>{timePicker === 'hour' ? '태어난 시간 선택' : '태어난 분 선택'}</Text>
            <ScrollView contentContainerStyle={styles.optionGrid} showsVerticalScrollIndicator={false}>
              {timePicker === 'hour' ? (
                <Pressable
                  accessibilityRole="button"
                  onPress={() => selectHour(null)}
                  style={[styles.optionButton, birthHour === null && styles.optionButtonSelected]}>
                  <Text style={[styles.optionText, birthHour === null && styles.optionTextSelected]}>시간 모름</Text>
                </Pressable>
              ) : null}
              {(timePicker === 'hour' ? HOURS : MINUTES).map(value => {
                const selected = timePicker === 'hour' ? birthHour === value : birthMinute === value;

                return (
                  <Pressable
                    key={value}
                    accessibilityRole="button"
                    onPress={() => (timePicker === 'hour' ? selectHour(value) : selectMinute(value))}
                    style={[styles.optionButton, selected && styles.optionButtonSelected]}>
                    <Text style={[styles.optionText, selected && styles.optionTextSelected]}>
                      {timePicker === 'hour' ? `${pad2(value)}시` : `${pad2(value)}분`}
                    </Text>
                  </Pressable>
                );
              })}
            </ScrollView>
            <Pressable
              accessibilityRole="button"
              accessibilityLabel="닫기"
              style={styles.modalClose}
              onPress={() => setTimePicker(null)}>
              <Text style={styles.modalCloseText}>닫기</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
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
  },
  label: {
    color: '#CDBB8D',
    marginBottom: 7,
    fontWeight: '700',
  },
  talisman: {
    alignSelf: 'center',
    width: 84,
    height: 122,
    marginBottom: 8,
  },
  selectBox: {
    minHeight: 56,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(240,197,107,0.42)',
    paddingHorizontal: 12,
    backgroundColor: 'rgba(255,255,255,0.06)',
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  selectBoxPressed: {
    opacity: 0.76,
    transform: [{ scale: 0.99 }],
  },
  selectBoxDisabled: {
    opacity: 0.48,
  },
  selectValue: {
    color: '#F7E7BB',
    fontSize: 16,
    fontWeight: '800',
  },
  selectValueDisabled: {
    color: '#8E826A',
  },
  selectHelp: {
    color: '#B9AD91',
    fontSize: 11,
    marginTop: 3,
  },
  selectArrow: {
    color: '#F6D58A',
    fontSize: 18,
    fontWeight: '900',
  },
  timeSelectRow: {
    flexDirection: 'row',
    gap: 8,
  },
  timeSelectBox: {
    flex: 1,
  },
  timePreview: {
    color: '#F6D58A',
    fontSize: 12,
    fontWeight: '800',
    marginTop: -4,
    marginBottom: 8,
  },
  help: {
    color: '#B9AD91',
    fontSize: 12,
    lineHeight: 18,
    marginTop: -4,
    marginBottom: 12,
  },
  segmentRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 12,
  },
  segment: {
    flex: 1,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(240,197,107,0.32)',
    paddingVertical: 11,
    alignItems: 'center',
  },
  segmentActive: {
    backgroundColor: '#E4B75A',
    borderColor: '#FFF0BC',
  },
  segmentText: {
    color: '#F7E7BB',
    fontWeight: '700',
  },
  segmentTextActive: {
    color: '#241307',
  },
  consent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginTop: 2,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#F0C56B',
  },
  checkboxActive: {
    backgroundColor: '#E4B75A',
  },
  consentText: {
    color: '#D8C8A2',
  },
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.64)',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 18,
  },
  modalPanel: {
    width: '100%',
    maxHeight: '82%',
    borderRadius: 18,
    borderWidth: 1,
    borderColor: 'rgba(240,197,107,0.56)',
    backgroundColor: '#10162E',
    padding: 16,
  },
  modalTitle: {
    color: '#F7E7BB',
    fontSize: 18,
    fontWeight: '900',
    textAlign: 'center',
    marginBottom: 12,
  },
  calendarHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  calendarMove: {
    color: '#F6D58A',
    fontSize: 34,
    fontWeight: '900',
    paddingHorizontal: 16,
  },
  calendarMonth: {
    color: '#FFF0BC',
    fontSize: 16,
    fontWeight: '900',
  },
  weekRow: {
    flexDirection: 'row',
    marginBottom: 6,
  },
  weekText: {
    width: `${100 / 7}%`,
    color: '#CDBB8D',
    fontSize: 12,
    fontWeight: '800',
    textAlign: 'center',
  },
  calendarGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  dayCell: {
    width: `${100 / 7}%`,
    aspectRatio: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dayButton: {
    borderRadius: 12,
  },
  dayButtonSelected: {
    backgroundColor: '#E4B75A',
  },
  dayText: {
    color: '#F5E6C8',
    fontWeight: '800',
  },
  dayTextSelected: {
    color: '#241307',
  },
  optionGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    paddingBottom: 4,
  },
  optionButton: {
    minWidth: 74,
    minHeight: 44,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(240,197,107,0.32)',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  optionButtonSelected: {
    backgroundColor: '#E4B75A',
    borderColor: '#FFF0BC',
  },
  optionText: {
    color: '#F7E7BB',
    fontWeight: '800',
  },
  optionTextSelected: {
    color: '#241307',
  },
  modalClose: {
    minHeight: 44,
    borderRadius: 12,
    backgroundColor: 'rgba(255,255,255,0.06)',
    borderWidth: 1,
    borderColor: 'rgba(240,197,107,0.36)',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 12,
  },
  modalCloseText: {
    color: '#F7E7BB',
    fontWeight: '900',
  },
});
