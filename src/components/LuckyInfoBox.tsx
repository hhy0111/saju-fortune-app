import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import type { LuckyInfo } from '../core/fortune/types';

interface LuckyInfoBoxProps {
  lucky: LuckyInfo;
  showLotto?: boolean;
}

export function LuckyInfoBox({ lucky, showLotto = false }: LuckyInfoBoxProps) {
  return (
    <View style={styles.container}>
      <View style={styles.grid}>
        <View accessible accessibilityLabel={`행운 색상 ${lucky.color}`} style={styles.item}>
          <Text style={styles.label}>행운 색상</Text>
          <View style={[styles.swatch, { backgroundColor: lucky.colorHex }]} />
          <Text style={styles.value}>{lucky.color}</Text>
        </View>
        <View accessible accessibilityLabel={`행운 숫자 ${lucky.number}`} style={styles.item}>
          <Text style={styles.label}>행운 숫자</Text>
          <Text style={styles.big}>{lucky.number}</Text>
        </View>
        <View accessible accessibilityLabel={`행운 방향 ${lucky.direction}`} style={styles.item}>
          <Text style={styles.label}>행운 방향</Text>
          <Text style={styles.value}>{lucky.direction}</Text>
        </View>
      </View>

      {showLotto ? <View style={styles.lottoBox}>
        <View>
          <Text style={styles.lottoTitle}>이번주 로또 행운</Text>
          <Text style={styles.lottoWeek}>{lucky.lottoWeekLabel}</Text>
        </View>
        <View style={styles.lottoRow}>
          {lucky.lottoNumbers.map(number => (
            <View key={number} style={styles.lottoBall}>
              <Text style={styles.lottoNumber}>{number}</Text>
            </View>
          ))}
        </View>
        <Text style={styles.lottoNote}>사주와 이번 주 흐름을 조합한 참고용 행운 번호입니다.</Text>
      </View> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 10,
  },
  grid: {
    flexDirection: 'row',
    gap: 8,
  },
  item: {
    flex: 1,
    minHeight: 88,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(240,197,107,0.22)',
    backgroundColor: 'rgba(255,255,255,0.07)',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
  },
  label: {
    color: '#CDBB8D',
    fontSize: 12,
    fontWeight: '800',
    marginBottom: 6,
  },
  swatch: {
    width: 20,
    height: 20,
    borderRadius: 10,
    marginBottom: 5,
  },
  value: {
    color: '#F7E7BB',
    fontWeight: '700',
    textAlign: 'center',
  },
  big: {
    color: '#F6D58A',
    fontSize: 28,
    fontWeight: '900',
  },
  lottoBox: {
    borderRadius: 14,
    borderWidth: 1,
    borderColor: 'rgba(246,213,138,0.32)',
    backgroundColor: 'rgba(8,12,30,0.74)',
    padding: 12,
    gap: 8,
  },
  lottoTitle: {
    color: '#F6D58A',
    fontSize: 15,
    fontWeight: '900',
  },
  lottoWeek: {
    color: '#B9AD91',
    fontSize: 11,
    marginTop: 2,
  },
  lottoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 6,
  },
  lottoBall: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#E7B85A',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#FFF0BC',
  },
  lottoNumber: {
    color: '#241307',
    fontSize: 15,
    fontWeight: '900',
  },
  lottoNote: {
    color: '#E8D5AA',
    fontSize: 12,
    lineHeight: 18,
  },
});
