import React, { useEffect, useState } from 'react';
import { Alert, ScrollView, StyleSheet, Text, View } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AdBannerSlot } from '../components/AdBannerSlot';
import { GameButton } from '../components/GameButton';
import { MysticBackground } from '../components/MysticBackground';
import { PremiumProductCard } from '../components/PremiumProductCard';
import { UnlockPanel } from '../components/UnlockPanel';
import { showRewardedReportAd } from '../core/ads/rewardedAd';
import { getPremiumProducts } from '../core/monetization/products';
import type { PremiumProductId } from '../core/monetization/types';
import type { RootStackParamList } from '../navigation/types';
import { useFortuneStore } from '../store/fortuneStore';
import { useMonetizationStore } from '../store/monetizationStore';

type Props = NativeStackScreenProps<RootStackParamList, 'PremiumUnlock'>;

export function PremiumUnlockScreen({ navigation, route }: Props) {
  const [adLoading, setAdLoading] = useState(false);
  const [restoring, setRestoring] = useState(false);
  const [purchasingProductId, setPurchasingProductId] = useState<PremiumProductId | null>(null);
  const unlockFortune = useFortuneStore(state => state.unlockFortune);
  const loadProducts = useMonetizationStore(state => state.loadProducts);
  const purchaseProduct = useMonetizationStore(state => state.purchaseProduct);
  const restorePurchases = useMonetizationStore(state => state.restorePurchases);
  const hasEntitlement = useMonetizationStore(state => state.hasEntitlement);
  const storeProducts = useMonetizationStore(state => state.storeProducts);
  const products = getPremiumProducts();

  const openPremiumContent = (productId: PremiumProductId) => {
    navigation.replace('PremiumContent', {
      ...route.params,
      productId,
    });
  };

  useEffect(() => {
    loadProducts().catch(() => undefined);
  }, [loadProducts]);

  const unlockByAd = async () => {
    if (adLoading) {
      return;
    }

    setAdLoading(true);
    const result = await showRewardedReportAd();
    setAdLoading(false);

    if (result.rewarded) {
      unlockFortune(route.params.fortuneId);
      navigation.replace('DetailReport', route.params);
      return;
    }

    Alert.alert('해금 취소', '광고 시청이 완료되지 않아 리포트가 잠긴 상태입니다.');
  };

  const purchase = async (productId: PremiumProductId) => {
    if (purchasingProductId || restoring) {
      return;
    }

    setPurchasingProductId(productId);
    const result = await purchaseProduct(productId);
    setPurchasingProductId(null);

    if (result.status === 'purchased') {
      openPremiumContent(productId);
      return;
    }

    Alert.alert('결제 미완료', result.message ?? '결제가 완료되지 않았습니다.');
  };

  const restore = async () => {
    if (restoring || purchasingProductId) {
      return;
    }

    setRestoring(true);
    const results = await restorePurchases();
    setRestoring(false);

    if (results.length > 0) {
      Alert.alert('구매 복원 완료', `${results.length}개 프리미엄 권한을 복원했습니다.`);
      return;
    }

    Alert.alert('복원할 구매 없음', '현재 계정에서 복원할 프리미엄 구매를 찾지 못했습니다.');
  };

  return (
    <MysticBackground variant="result">
      <SafeAreaView style={styles.safe}>
        <ScrollView
          contentContainerStyle={styles.container}
          keyboardShouldPersistTaps="handled"
          overScrollMode="never"
          showsVerticalScrollIndicator={false}>
          <Text accessibilityRole="header" maxFontSizeMultiplier={1.25} style={styles.title}>
            리포트 해금과 프리미엄
          </Text>
          <Text style={styles.subtitle}>
            오늘의 상세 풀이는 광고로 열고, 월간/연간/궁합 같은 확장 리포트는 인앱 결제 상품으로 확인할 수 있습니다.
          </Text>

          <UnlockPanel loading={adLoading} onUnlock={unlockByAd} />
          <AdBannerSlot placement="detail" />

          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>프리미엄 상품</Text>
            <Text style={styles.sectionCaption}>Google Play에 등록한 일회성 상품 ID와 앱 상품 ID가 같아야 합니다.</Text>
          </View>

          {products.map(product => (
            <PremiumProductCard
              key={product.id}
              product={product}
              priceLabel={storeProducts[product.id]?.localizedPrice}
              owned={hasEntitlement(product.entitlement)}
              purchasing={purchasingProductId === product.id}
              onPurchase={() => purchase(product.id)}
              onOpenContent={() => openPremiumContent(product.id)}
            />
          ))}

          <GameButton
            label={restoring ? '구매 복원 중...' : '구매 복원'}
            variant="secondary"
            busy={restoring}
            accessibilityHint="같은 Google Play 계정에서 이전에 구매한 프리미엄 권한을 복원합니다."
            onPress={restore}
            style={styles.restoreButton}
          />
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
    padding: 22,
    paddingBottom: 34,
  },
  title: {
    color: '#F7E7BB',
    fontSize: 24,
    lineHeight: 31,
    fontWeight: '900',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    color: '#D8C8A2',
    lineHeight: 21,
    textAlign: 'center',
    marginBottom: 18,
  },
  sectionHeader: {
    marginTop: 6,
    marginBottom: 12,
  },
  sectionTitle: {
    color: '#F6D58A',
    fontSize: 19,
    lineHeight: 25,
    fontWeight: '900',
  },
  sectionCaption: {
    color: '#B9AD91',
    fontSize: 12,
    marginTop: 4,
  },
  restoreButton: {
    marginTop: 6,
  },
});
