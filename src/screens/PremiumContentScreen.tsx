import React from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { SafeAreaView } from 'react-native-safe-area-context';
import { GameButton } from '../components/GameButton';
import { MysticBackground } from '../components/MysticBackground';
import { findPremiumProduct } from '../core/monetization/products';
import type { RootStackParamList } from '../navigation/types';
import { useMonetizationStore } from '../store/monetizationStore';

type Props = NativeStackScreenProps<RootStackParamList, 'PremiumContent'>;

function PremiumContentHeader({ onBack }: { onBack: () => void }) {
  return (
    <View style={styles.header}>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel="뒤로가기"
        accessibilityHint="이전 화면으로 돌아갑니다."
        hitSlop={10}
        android_ripple={{ color: 'rgba(255, 240, 188, 0.14)' }}
        onPress={onBack}
        style={({ pressed }) => [styles.backButton, pressed && styles.backButtonPressed]}>
        <Text style={styles.backIcon}>‹</Text>
      </Pressable>
      <Text accessibilityRole="header" maxFontSizeMultiplier={1.25} style={styles.headerTitle}>
        프리미엄 콘텐츠
      </Text>
      <View style={styles.headerSpacer} />
    </View>
  );
}

export function PremiumContentScreen({ navigation, route }: Props) {
  const product = findPremiumProduct(route.params.productId);
  const hasEntitlement = useMonetizationStore(state => state.hasEntitlement(product.entitlement));

  const goToDetailReport = () => {
    if (route.params.fortuneId) {
      navigation.replace('DetailReport', {
        fortuneId: route.params.fortuneId,
        categoryId: route.params.categoryId,
        categoryLabel: route.params.categoryLabel,
      });
      return;
    }

    navigation.navigate('Home');
  };

  return (
    <MysticBackground variant="result">
      <SafeAreaView style={styles.safe}>
        <ScrollView
          contentContainerStyle={styles.container}
          keyboardShouldPersistTaps="handled"
          overScrollMode="never"
          showsVerticalScrollIndicator={false}>
          <PremiumContentHeader onBack={navigation.goBack} />
          <Text accessibilityRole="header" maxFontSizeMultiplier={1.25} style={styles.title}>
            {product.title}
          </Text>
          <Text style={styles.subtitle}>{product.description}</Text>

          <View style={styles.statusCard}>
            <Text style={styles.statusLabel}>{hasEntitlement ? '구매 완료' : '구매 필요'}</Text>
            <Text style={styles.statusText}>
              {hasEntitlement
                ? '프리미엄 권한이 활성화되었습니다. 아래 순서대로 콘텐츠를 확인해 보세요.'
                : '이 콘텐츠는 결제 완료 후 확인할 수 있습니다. 상품 화면에서 결제를 먼저 진행해 주세요.'}
            </Text>
          </View>

          <View style={styles.card}>
            <Text style={styles.cardTitle}>포함 콘텐츠</Text>
            {product.includes.map(item => (
              <Text key={item} style={styles.includeItem}>
                • {item}
              </Text>
            ))}
          </View>

          {product.contentSections.map(section => (
            <View key={section.title} style={styles.card}>
              <Text accessibilityRole="header" maxFontSizeMultiplier={1.25} style={styles.cardTitle}>
                {section.title}
              </Text>
              <Text style={styles.body}>{hasEntitlement ? section.body : '결제 후 전체 내용을 확인할 수 있습니다.'}</Text>
            </View>
          ))}

          {hasEntitlement ? (
            <GameButton
              label={route.params.fortuneId ? '오늘 상세 리포트로 돌아가기' : '홈으로 돌아가기'}
              accessibilityHint="프리미엄 콘텐츠 확인 후 다음 화면으로 이동합니다."
              onPress={goToDetailReport}
            />
          ) : (
            <GameButton
              label="프리미엄 상품으로 이동"
              accessibilityHint="결제 가능한 프리미엄 상품 목록으로 이동합니다."
              onPress={() => {
                if (route.params.fortuneId) {
                  navigation.replace('PremiumUnlock', {
                    fortuneId: route.params.fortuneId,
                    categoryId: route.params.categoryId,
                    categoryLabel: route.params.categoryLabel,
                  });
                  return;
                }

                navigation.navigate('Home');
              }}
            />
          )}
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
    paddingHorizontal: 18,
    paddingBottom: 34,
  },
  header: {
    marginHorizontal: -18,
    paddingHorizontal: 18,
    paddingTop: 8,
    paddingBottom: 12,
    minHeight: 58,
    backgroundColor: 'rgba(7, 11, 31, 0.94)',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(240, 197, 107, 0.24)',
    flexDirection: 'row',
    alignItems: 'center',
    zIndex: 5,
    elevation: 6,
  },
  backButton: {
    width: 42,
    height: 42,
    borderRadius: 21,
    borderWidth: 1,
    borderColor: 'rgba(240, 197, 107, 0.42)',
    backgroundColor: 'rgba(255, 255, 255, 0.06)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  backButtonPressed: {
    opacity: 0.72,
    transform: [{ scale: 0.97 }],
  },
  backIcon: {
    color: '#F7E7BB',
    fontSize: 32,
    fontWeight: '700',
    lineHeight: 34,
  },
  headerTitle: {
    flex: 1,
    color: '#F7E7BB',
    fontSize: 18,
    fontWeight: '900',
    textAlign: 'center',
  },
  headerSpacer: {
    width: 42,
  },
  title: {
    color: '#F7E7BB',
    fontSize: 26,
    lineHeight: 33,
    fontWeight: '900',
    marginTop: 18,
    marginBottom: 8,
  },
  subtitle: {
    color: '#D8C8A2',
    fontSize: 15,
    lineHeight: 23,
    marginBottom: 14,
  },
  statusCard: {
    borderRadius: 14,
    borderWidth: 1,
    borderColor: 'rgba(78, 170, 115, 0.52)',
    backgroundColor: 'rgba(78, 170, 115, 0.16)',
    padding: 15,
    marginBottom: 13,
  },
  statusLabel: {
    color: '#A9F0C5',
    fontSize: 16,
    fontWeight: '900',
    marginBottom: 5,
  },
  statusText: {
    color: '#E6F7EC',
    lineHeight: 21,
  },
  card: {
    borderRadius: 14,
    borderWidth: 1,
    borderColor: 'rgba(240, 197, 107, 0.42)',
    backgroundColor: 'rgba(11, 16, 42, 0.92)',
    padding: 17,
    marginBottom: 13,
  },
  cardTitle: {
    color: '#F6D58A',
    fontSize: 18,
    lineHeight: 24,
    fontWeight: '900',
    marginBottom: 9,
  },
  includeItem: {
    color: '#F5E6C8',
    fontSize: 15,
    lineHeight: 23,
  },
  body: {
    color: '#F5E6C8',
    fontSize: 15,
    lineHeight: 24,
  },
});
