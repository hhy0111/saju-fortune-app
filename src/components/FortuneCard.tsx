import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface FortuneCardProps {
  title: string;
  children: React.ReactNode;
}

export function FortuneCard({ title, children }: FortuneCardProps) {
  return (
    <View
      accessibilityLabel={`${title} 카드`}
      style={styles.card}>
      <View style={styles.corner} />
      <Text accessibilityRole="header" maxFontSizeMultiplier={1.3} style={styles.title}>
        {title}
      </Text>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 14,
    borderWidth: 1,
    borderColor: 'rgba(246, 213, 138, 0.58)',
    backgroundColor: 'rgba(11, 16, 42, 0.92)',
    padding: 17,
    marginBottom: 13,
    overflow: 'hidden',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.22,
    shadowRadius: 18,
    elevation: 3,
  },
  corner: {
    position: 'absolute',
    top: -22,
    right: -22,
    width: 78,
    height: 78,
    borderRadius: 39,
    backgroundColor: 'rgba(240, 197, 107, 0.13)',
  },
  title: {
    color: '#F6D58A',
    fontSize: 18,
    lineHeight: 23,
    fontWeight: '900',
    marginBottom: 10,
  },
});
