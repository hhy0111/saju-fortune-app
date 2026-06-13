import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MysticBackground } from '../components/MysticBackground';
import type { RootStackParamList } from '../navigation/types';

type Props = NativeStackScreenProps<RootStackParamList, 'PrivacyPolicy'>;

const sections = [
  {
    title: '수집하는 정보',
    body:
      '운명전은 사주 리포트 생성을 위해 생년월일, 태어난 시간과 분, 양력/음력 선택, 선택 성별을 앱 안에서 사용합니다. 이름, 로그인 정보, 연락처, 정확한 위치 정보는 수집하지 않습니다.',
  },
  {
    title: '이용 목적',
    body:
      '입력값은 사주 기둥 계산, 오행 균형 계산, 오늘의 운세 리포트 생성, 광고 해금 및 프리미엄 권한 표시를 위해 사용됩니다. 운세 결과는 참고용 콘텐츠이며 중요한 결정의 단독 근거로 사용되지 않아야 합니다.',
  },
  {
    title: '기기 내 저장',
    body:
      '생년월일과 태어난 시간은 사용자가 저장에 동의한 경우에만 이 기기에 저장됩니다. 저장 동의가 없으면 민감한 입력값은 기본적으로 보관하지 않습니다. 저장된 정보는 앱 설정 또는 기기 앱 데이터 삭제를 통해 제거할 수 있습니다.',
  },
  {
    title: '서버 전송',
    body:
      '운명전은 사주 계산과 리포트 생성을 자체 앱 로직과 내장 데이터로 처리하며, 생년월일과 태어난 시간 정보를 자체 서버로 전송하지 않습니다.',
  },
  {
    title: '제3자 SDK',
    body:
      '앱에는 Google AdMob 광고 SDK와 스토어 결제/IAP SDK가 포함될 수 있습니다. 이 SDK들은 광고 제공, 구매 처리, 부정 사용 방지, 진단을 위해 기기 정보, 광고 식별자, 구매 또는 진단 데이터를 각 제공사의 정책에 따라 처리할 수 있습니다.',
  },
  {
    title: '보관 및 삭제',
    body:
      '앱 내부에 저장된 입력값과 운세 캐시는 사용자가 앱을 삭제하거나 기기 설정에서 앱 데이터를 삭제하면 함께 제거됩니다. 향후 계정 또는 서버 기능이 추가될 경우 개인정보처리방침을 업데이트하고 필요한 동의를 다시 안내합니다.',
  },
  {
    title: '문의',
    body:
      '개인정보 처리와 관련한 문의는 support@app101.local 로 연락해 주세요. 실제 출시 전에는 운영 가능한 이메일 주소로 교체됩니다.',
  },
];

export function PrivacyPolicyScreen(_props: Props) {
  return (
    <MysticBackground variant="result">
      <SafeAreaView style={styles.safe}>
        <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
          <Text accessibilityRole="header" maxFontSizeMultiplier={1.2} style={styles.title}>
            운명전 개인정보처리방침
          </Text>
          <Text style={styles.effectiveDate}>시행일: 2026-06-13</Text>
          <Text style={styles.lead}>
            운명전은 이름 입력이나 계정 가입 없이 생년월일과 태어난 시간만으로 운세 리포트를 만드는 앱입니다.
            개인정보는 필요한 범위에서 최소한으로 사용하고, 사주 입력값은 자체 서버로 전송하지 않습니다.
          </Text>

          {sections.map(section => (
            <View key={section.title} style={styles.section}>
              <Text maxFontSizeMultiplier={1.2} style={styles.sectionTitle}>
                {section.title}
              </Text>
              <Text style={styles.body}>{section.body}</Text>
            </View>
          ))}
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
    paddingTop: 22,
    paddingBottom: 40,
  },
  title: {
    color: '#F7E7BB',
    fontSize: 26,
    fontWeight: '900',
    lineHeight: 34,
  },
  effectiveDate: {
    color: '#CDBB8D',
    fontSize: 13,
    fontWeight: '800',
    marginTop: 8,
  },
  lead: {
    color: '#E8D7AF',
    fontSize: 15,
    lineHeight: 24,
    marginTop: 14,
    marginBottom: 8,
  },
  section: {
    borderRadius: 14,
    borderWidth: 1,
    borderColor: 'rgba(240,197,107,0.28)',
    backgroundColor: 'rgba(10, 15, 39, 0.76)',
    padding: 14,
    marginTop: 12,
  },
  sectionTitle: {
    color: '#F6D58A',
    fontSize: 16,
    fontWeight: '900',
    marginBottom: 8,
  },
  body: {
    color: '#EADDBF',
    fontSize: 14,
    lineHeight: 22,
  },
});
