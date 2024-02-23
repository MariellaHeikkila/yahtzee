import React, { useCallback } from 'react'
import { Text, View } from 'react-native'
import styles from '../styles/style'
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

SplashScreen.preventAutoHideAsync();

export default function Header() {

  const [fontsLoaded, fontError] = useFonts({
    'Protest': require('../fonts/ProtestRevolution-Regular.ttf'),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded || fontError) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <View style={styles.header} onLayout={onLayoutRootView}>
      <Text style={[styles.title, {fontFamily: 'Protest', fontSize: 30}]}>
        Mini-yahtzee
      </Text>
    </View>
  )
}