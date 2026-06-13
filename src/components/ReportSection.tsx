import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import type { ReportSection as ReportSectionType } from '../core/fortune/types';

interface ReportSectionProps {
  section: ReportSectionType;
  unlocked: boolean;
}

export function ReportSection({ section, unlocked }: ReportSectionProps) {
  const locked = section.locked && !unlocked;

  return (
    <View
      accessible
      accessibilityLabel={`${section.title}. ${locked ? '잠긴 상세 리포트입니다.' : section.body}`}
      style={[styles.section, locked && styles.locked]}>
      <Text accessibilityRole="header" maxFontSizeMultiplier={1.3} style={styles.title}>
        {section.title}
      </Text>
      <Text style={styles.body}>
        {locked
          ? '금빛 봉인이 걸린 상세 리포트입니다. 해금 후에는 이 주제에 맞춘 성향, 오늘의 흐름, 말과 행동의 조절 포인트를 더 길게 이어서 볼 수 있습니다. 기본 결과만으로도 오늘의 큰 방향은 확인할 수 있고, 상세 풀이는 읽을거리와 하루 루틴을 더해 주는 보너스 영역입니다.'
          : section.body}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    borderRadius: 14,
    borderWidth: 1,
    borderColor: 'rgba(240, 197, 107, 0.44)',
    backgroundColor: 'rgba(11, 16, 42, 0.92)',
    padding: 17,
    marginBottom: 13,
  },
  locked: {
    borderColor: 'rgba(240, 197, 107, 0.58)',
    backgroundColor: 'rgba(73, 40, 58, 0.9)',
  },
  title: {
    color: '#F6D58A',
    fontSize: 18,
    lineHeight: 24,
    fontWeight: '900',
    marginBottom: 9,
  },
  body: {
    color: '#F5E6C8',
    fontSize: 15,
    lineHeight: 24,
  },
});
