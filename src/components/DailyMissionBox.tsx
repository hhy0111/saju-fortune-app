import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface DailyMissionBoxProps {
  mission: string;
  completed?: boolean;
}

export function DailyMissionBox({ mission, completed = false }: DailyMissionBoxProps) {
  return (
    <View
      accessible
      accessibilityLabel={`오늘의 미션. ${mission}. 상태 ${completed ? '완료됨' : '진행 중'}`}
      style={styles.box}>
      <Text accessibilityRole="header" style={styles.label}>오늘의 미션</Text>
      <Text style={styles.mission}>{mission}</Text>
      <Text style={styles.status}>{completed ? '완료됨' : '진행 중'}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  box: {
    borderRadius: 14,
    backgroundColor: 'rgba(255,255,255,0.07)',
    borderWidth: 1,
    borderColor: 'rgba(240,197,107,0.36)',
    padding: 14,
  },
  label: {
    color: '#CDBB8D',
    fontSize: 12,
    fontWeight: '900',
    marginBottom: 8,
  },
  mission: {
    color: '#F7E7BB',
    fontSize: 15,
    lineHeight: 22,
    fontWeight: '700',
  },
  status: {
    color: '#F6D58A',
    marginTop: 8,
    fontSize: 12,
  },
});
