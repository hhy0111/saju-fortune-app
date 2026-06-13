import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AnalysisLoadingScreen } from '../screens/AnalysisLoadingScreen';
import { BirthInputScreen } from '../screens/BirthInputScreen';
import { CollectionScreen } from '../screens/CollectionScreen';
import { DetailReportScreen } from '../screens/DetailReportScreen';
import { HomeScreen } from '../screens/HomeScreen';
import { PremiumUnlockScreen } from '../screens/PremiumUnlockScreen';
import { PrivacyPolicyScreen } from '../screens/PrivacyPolicyScreen';
import { ResultSummaryScreen } from '../screens/ResultSummaryScreen';
import type { RootStackParamList } from './types';

const Stack = createNativeStackNavigator<RootStackParamList>();

export function RootNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: '#10162E' },
        headerTintColor: '#F7E7BB',
        headerTitleStyle: { fontWeight: '700' },
        contentStyle: { backgroundColor: '#070B1F' },
      }}>
      <Stack.Screen name="Home" component={HomeScreen} options={{ title: '운명전' }} />
      <Stack.Screen name="BirthInput" component={BirthInputScreen} options={{ title: '사주 입력' }} />
      <Stack.Screen
        name="AnalysisLoading"
        component={AnalysisLoadingScreen}
        options={{ title: '기운 분석', headerBackVisible: false }}
      />
      <Stack.Screen name="ResultSummary" component={ResultSummaryScreen} options={{ headerShown: false }} />
      <Stack.Screen name="DetailReport" component={DetailReportScreen} options={{ headerShown: false }} />
      <Stack.Screen name="PremiumUnlock" component={PremiumUnlockScreen} options={{ title: '리포트 해금' }} />
      <Stack.Screen name="Collection" component={CollectionScreen} options={{ title: '행운 도감' }} />
      <Stack.Screen name="PrivacyPolicy" component={PrivacyPolicyScreen} options={{ title: '개인정보처리방침' }} />
    </Stack.Navigator>
  );
}
