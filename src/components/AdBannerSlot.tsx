import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { BannerAd, BannerAdSize } from 'react-native-google-mobile-ads';
import { getBannerAdUnitId, type AdPlacement } from '../core/ads/adUnits';

interface AdBannerSlotProps {
  placement: AdPlacement;
}

const placementLabels = {
  home: '로비 하단 광고 영역',
  summary: '결과 요약 광고 영역',
  detail: '상세 리포트 광고 영역',
  collection: '도감 광고 영역',
};

export function AdBannerSlot({ placement }: AdBannerSlotProps) {
  const [failed, setFailed] = useState(false);

  if (!failed) {
    return (
      <View style={styles.bannerWrapper}>
        <BannerAd
          unitId={getBannerAdUnitId(placement)}
          size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
          requestOptions={{
            requestNonPersonalizedAdsOnly: true,
            keywords: ['fortune', 'lifestyle'],
          }}
          onAdFailedToLoad={() => setFailed(true)}
        />
      </View>
    );
  }

  return (
    <View style={styles.slot}>
      <Text style={styles.label}>AD</Text>
      <Text style={styles.title}>{placementLabels[placement]}</Text>
      <Text style={styles.body}>광고를 불러오지 못해 잠시 비워두었습니다.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  bannerWrapper: {
    minHeight: 58,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 12,
  },
  slot: {
    minHeight: 76,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(240, 197, 107, 0.28)',
    backgroundColor: 'rgba(255,255,255,0.05)',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    marginVertical: 12,
  },
  label: {
    color: '#C9984A',
    fontSize: 11,
    fontWeight: '900',
    marginBottom: 4,
  },
  title: {
    color: '#F7E7BB',
    fontWeight: '800',
  },
  body: {
    color: '#B9AD91',
    fontSize: 12,
    marginTop: 4,
  },
});
