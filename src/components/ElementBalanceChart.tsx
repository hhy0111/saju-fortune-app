import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import type { ElementBalance, ElementKey } from '../core/saju/types';

interface ElementBalanceChartProps {
  balance: ElementBalance;
}

const labels: Array<[ElementKey, string, string]> = [
  ['wood', '목', '#4EAA73'],
  ['fire', '화', '#C94843'],
  ['earth', '토', '#C69B50'],
  ['metal', '금', '#DDE2EA'],
  ['water', '수', '#4E88D9'],
];

export function ElementBalanceChart({ balance }: ElementBalanceChartProps) {
  const max = Math.max(1, ...labels.map(([key]) => balance[key]));

  return (
    <View style={styles.container}>
      {labels.map(([key, label, color]) => (
        <View
          key={key}
          accessible
          accessibilityLabel={`${label} 기운 ${balance[key]}`}
          style={styles.item}>
          <Text style={styles.label}>{label}</Text>
          <View style={styles.track}>
            <View style={[styles.fill, { width: `${(balance[key] / max) * 100}%`, backgroundColor: color }]} />
          </View>
          <Text style={styles.value}>{balance[key]}</Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 8,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    minHeight: 26,
  },
  label: {
    width: 24,
    color: '#F7E7BB',
    fontSize: 15,
    fontWeight: '900',
  },
  track: {
    flex: 1,
    height: 11,
    borderRadius: 999,
    backgroundColor: 'rgba(255,255,255,0.16)',
    overflow: 'hidden',
  },
  fill: {
    height: '100%',
    borderRadius: 999,
  },
  value: {
    width: 24,
    color: '#F6D58A',
    fontWeight: '800',
    textAlign: 'right',
  },
});
