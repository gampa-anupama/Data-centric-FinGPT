import React, { useState } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { useTheme } from 'react-native-paper';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

import Sidebar from '../components/Sidebar';
import NewsScreen from '../screens/NewsScreen';
import SocialMediaScreen from '../screens/SocialMediaScreen';
import FilingsScreen from '../screens/FilingsScreen';
import DatasetsScreen from '../screens/DatasetsScreen';
import CSVPreviewScreen from '../screens/CSVPreviewScreen';
import ChatbotModal from '../components/ChatbotModal';

const { width } = Dimensions.get('window');
const isTablet = width > 768;

const Stack = createStackNavigator();

const MainLayout = () => {
  const theme = useTheme();
  const [activeScreen, setActiveScreen] = useState('socialMedia');
  const [chatbotVisible, setChatbotVisible] = useState(false);

  const handleNavigate = (screen: string) => {
    if (screen === 'chatbot') {
      setChatbotVisible(true);
    } else {
      setActiveScreen(screen);
    }
  };

  const renderActiveScreen = () => {
    switch (activeScreen) {
      case 'news':
        return <NewsScreen />;
      case 'socialMedia':
        return <SocialMediaScreen />;
      case 'filings':
        return <FilingsScreen />;
      case 'datasets':
        return <DatasetsScreen />;
      default:
        return <SocialMediaScreen />;
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Sidebar activeScreen={activeScreen} onNavigate={handleNavigate} />
      <View style={styles.content}>
        {renderActiveScreen()}
      </View>
      <ChatbotModal
        visible={chatbotVisible}
        onDismiss={() => setChatbotVisible(false)}
      />
    </View>
  );
};

const RootNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="Main" 
        component={MainLayout} 
        options={{ headerShown: false }}
      />
      <Stack.Screen 
        name="CSVPreview" 
        component={CSVPreviewScreen}
        options={{ title: 'CSV Preview' }}
      />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
  },
  content: {
    flex: 1,
  },
});

export default RootNavigator; 