import React, { useEffect } from 'react';
import { StatusBar, StyleSheet } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { initializeMobileAds } from '../core/ads/mobileAds';
import { RootNavigator } from '../navigation/RootNavigator';

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: '#070B1F',
    card: '#10162E',
    text: '#F7E7BB',
    border: '#C9984A',
    primary: '#F0C56B',
  },
};

export default function App() {
  useEffect(() => {
    initializeMobileAds().catch(() => undefined);
  }, []);

  return (
    <GestureHandlerRootView style={styles.root}>
      <StatusBar barStyle="light-content" backgroundColor="#070B1F" />
      <NavigationContainer theme={theme}>
        <RootNavigator />
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
});
