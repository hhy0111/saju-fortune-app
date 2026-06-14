import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { sajuImages } from '../assets/imageAssets';
import { GameButton } from './GameButton';

interface UnlockPanelProps {
  loading: boolean;
  onUnlock: () => void;
}

export function UnlockPanel({ loading, onUnlock }: UnlockPanelProps) {
  return (
    <View style={styles.panel}>
      <Image
        accessible={false}
        importantForAccessibility="no"
        source={loading ? sajuImages.collection.chestOpen : sajuImages.collection.chestClosed}
        resizeMode="contain"
        style={styles.chest}
      />
      {loading ? (
        <Image
          accessible={false}
          importantForAccessibility="no"
          source={sajuImages.effects.goldBurst}
          resizeMode="contain"
          style={styles.burst}
        />
      ) : null}
      <Text style={styles.icon}>封</Text>
      <Text style={styles.title}>광고 해금 영역</Text>
      <Text style={styles.body}>
        보상형 광고를 끝까지 시청하면 오늘의 상세 리포트 잠금 섹션이 열립니다.
      </Text>
      <GameButton
        label={loading ? '해금 중...' : '광고 보고 오늘 리포트 해금'}
        busy={loading}
        accessibilityHint="보상형 광고를 완료하면 오늘의 상세 리포트 잠금이 해제됩니다."
        onPress={onUnlock}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  panel: {
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#F0C56B',
    backgroundColor: 'rgba(120, 36, 48, 0.42)',
    padding: 18,
    alignItems: 'center',
  },
  chest: {
    width: 132,
    height: 132,
    marginBottom: -8,
  },
  burst: {
    position: 'absolute',
    top: 18,
    width: 180,
    height: 180,
    opacity: 0.45,
  },
  icon: {
    color: '#F6D58A',
    fontSize: 42,
    fontWeight: '900',
  },
  title: {
    color: '#F7E7BB',
    fontSize: 20,
    fontWeight: '900',
    marginTop: 4,
  },
  body: {
    color: '#D8C8A2',
    textAlign: 'center',
    marginVertical: 14,
    lineHeight: 21,
  },
});
