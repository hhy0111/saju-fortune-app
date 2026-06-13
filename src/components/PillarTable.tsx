import React from 'react';
import { ImageBackground, StyleSheet, Text, View } from 'react-native';
import { sajuImages } from '../assets/imageAssets';
import type { SajuPillars } from '../core/saju/types';

interface PillarTableProps {
  pillars: SajuPillars;
}

export function PillarTable({ pillars }: PillarTableProps) {
  const items = [
    ['년주', pillars.year],
    ['월주', pillars.month],
    ['일주', pillars.day],
    ['시주', pillars.hour],
  ] as const;

  return (
    <View style={styles.row}>
      {items.map(([label, pillar]) => (
        <ImageBackground
          key={label}
          source={pillar ? sajuImages.pillars.unsealed : sajuImages.pillars.sealed}
          resizeMode="contain"
          style={styles.pillar}>
          <Text style={styles.label}>{label}</Text>
          <Text style={styles.hanja}>{pillar ? `${pillar.stemHanja}${pillar.branchHanja}` : '--'}</Text>
          <Text style={styles.korean}>{pillar ? `${pillar.stem}${pillar.branch}` : '시간 모름'}</Text>
        </ImageBackground>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    gap: 8,
  },
  pillar: {
    flex: 1,
    minHeight: 92,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(240, 197, 107, 0.52)',
    backgroundColor: 'rgba(120, 36, 48, 0.28)',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  label: {
    color: '#CDBB8D',
    fontSize: 12,
    marginBottom: 6,
  },
  hanja: {
    color: '#F7E7BB',
    fontSize: 24,
    fontWeight: '900',
  },
  korean: {
    color: '#E8C772',
    fontSize: 12,
    marginTop: 4,
  },
});
