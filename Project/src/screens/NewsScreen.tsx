import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { Text, useTheme, ActivityIndicator } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

import DataTable from '../components/DataTable';
import { apiService } from '../services/api';

interface NewsSource {
  id: number;
  title: string;
  description: string;
}

interface ScrapedSource {
  [key: string]: boolean;
}

const NewsScreen: React.FC = () => {
  const theme = useTheme();
  const navigation = useNavigation();
  const [newsSources, setNewsSources] = useState<NewsSource[]>([]);
  const [scrapedSources, setScrapedSources] = useState<ScrapedSource>({});
  const [loading, setLoading] = useState(true);
  const [scrapingStates, setScrapingStates] = useState<{ [key: string]: boolean }>({});

  useEffect(() => {
    loadNewsSources();
  }, []);

  const loadNewsSources = async () => {
    try {
      setLoading(true);
      const response = await apiService.getDataSources('news');
      if (response.success) {
        setNewsSources(response.data);
      } else {
        Alert.alert('Error', 'Failed to load news sources');
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to load news sources');
    } finally {
      setLoading(false);
    }
  };

  const handleScrape = async (source: string) => {
    try {
      setScrapingStates(prev => ({ ...prev, [source]: true }));
      
      const response = await apiService.scrapeData(source, 'news');
      
      if (response.success) {
        setScrapedSources(prev => ({ ...prev, [source]: true }));
        Alert.alert('Success', response.message);
      } else {
        Alert.alert('Error', response.message);
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to scrape data');
    } finally {
      setScrapingStates(prev => ({ ...prev, [source]: false }));
    }
  };

  const handleViewCSV = (source: string) => {
    navigation.navigate('CSVPreview' as never, {
      source,
      category: 'News'
    } as never);
  };



  if (loading) {
    return (
      <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={theme.colors.primary} />
          <Text style={[styles.loadingText, { color: theme.colors.onSurface }]}>
            Loading news sources...
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={styles.header}>
        <Text variant="headlineMedium" style={[styles.title, { color: theme.colors.onSurface }]}>
          News
        </Text>
      </View>

      <DataTable
        data={newsSources}
        onScrape={handleScrape}
        onViewCSV={handleViewCSV}
        scrapedSources={scrapedSources}
        scrapingStates={scrapingStates}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: wp('3%'),
    paddingBottom: hp('2%'),
  },
  title: {
    fontWeight: 'bold',
    fontSize: wp('4%'),
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: hp('2%'),
    fontSize: wp('3%'),
  },
});

export default NewsScreen; 