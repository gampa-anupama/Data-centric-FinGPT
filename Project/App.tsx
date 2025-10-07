import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Provider as PaperProvider } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { useColorScheme } from 'react-native';

import { theme } from './src/theme';
import { darkTheme } from './src/theme';
import RootNavigator from './src/navigation/RootNavigator';

export default function App() {
  const colorScheme = useColorScheme();
  const currentTheme = colorScheme === 'dark' ? darkTheme : theme;

  return (
    <SafeAreaProvider>
      <PaperProvider theme={currentTheme}>
        <NavigationContainer theme={currentTheme}>
          <StatusBar style="auto" />
          <RootNavigator />
        </NavigationContainer>
      </PaperProvider>
    </SafeAreaProvider>
  );
} 