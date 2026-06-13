import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import type { PremiumProduct } from '../core/monetization/types';
import { GameButton } from './GameButton';

interface PremiumProductCardProps {
  product: PremiumProduct;
  priceLabel?: string;
  owned: boolean;
  purchasing: boolean;
  onPurchase: () => void;
}

export function PremiumProductCard({
  product,
  priceLabel,
  owned,
  purchasing,
  onPurchase,
}: PremiumProductCardProps) {
  return (
    <View style={[styles.card, owned && styles.owned]}>
      <View style={styles.header}>
        <Text style={styles.title}>{product.title}</Text>
        {product.badge ? <Text style={styles.badge}>{product.badge}</Text> : null}
      </View>
      <Text style={styles.description}>{product.description}</Text>
      <View style={styles.footer}>
        <Text style={styles.price}>{owned ? '보유 중' : priceLabel ?? product.priceLabel}</Text>
        <GameButton
          label={owned ? '활성화됨' : purchasing ? '결제 중...' : '결제하기'}
          variant={owned ? 'secondary' : 'primary'}
          disabled={owned}
          busy={purchasing}
          accessibilityHint={owned ? '이미 보유한 상품입니다.' : '스토어 결제 화면으로 이동합니다.'}
          onPress={onPurchase}
          style={styles.button}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 14,
    borderWidth: 1,
    borderColor: 'rgba(240, 197, 107, 0.42)',
    backgroundColor: 'rgba(15, 21, 45, 0.88)',
    padding: 14,
    marginBottom: 12,
  },
  owned: {
    borderColor: '#4EAA73',
    backgroundColor: 'rgba(78, 170, 115, 0.16)',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
    alignItems: 'center',
  },
  title: {
    flex: 1,
    color: '#F6D58A',
    fontSize: 17,
    fontWeight: '900',
  },
  badge: {
    color: '#241307',
    backgroundColor: '#E4B75A',
    borderRadius: 999,
    paddingHorizontal: 9,
    paddingVertical: 4,
    fontSize: 11,
    fontWeight: '900',
  },
  description: {
    color: '#D8C8A2',
    lineHeight: 20,
    marginVertical: 10,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  price: {
    width: 92,
    color: '#F7E7BB',
    fontWeight: '800',
  },
  button: {
    flex: 1,
  },
});
