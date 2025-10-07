import React, { useState, useEffect } from 'react';
import { View, StyleSheet, FlatList, Alert } from 'react-native';
import { Text, useTheme, ActivityIndicator } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

import DataTable from '../components/DataTable';
import { apiService } from '../services/api';

interface DatasetSource {
  id: number;
  title: string;
  description: string;
}

interface ScrapedSource {
  [key: string]: boolean;
}

const DatasetsScreen: React.FC = () => {
  const theme = useTheme();
  const navigation = useNavigation();
  const [datasetSources, setDatasetSources] = useState<DatasetSource[]>([]);
  const [scrapedSources, setScrapedSources] = useState<ScrapedSource>({});
  const [loading, setLoading] = useState(true);
  const [scrapingStates, setScrapingStates] = useState<{ [key: string]: boolean }>({});


  useEffect(() => {
    loadDatasetSources();
  }, []);

  const loadDatasetSources = async () => {
    try {
      setLoading(true);
      const response = await apiService.getDataSources('datasets');
      if (response.success) {
        setDatasetSources(response.data);
      } else {
        Alert.alert('Error', 'Failed to load dataset sources');
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to load dataset sources');
    } finally {
      setLoading(false);
    }
  };

  const handleScrape = async (source: string) => {
    try {
      setScrapingStates(prev => ({ ...prev, [source]: true }));
      
      const response = await apiService.scrapeData(source, 'datasets');
      
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
      category: 'Datasets'
    } as never);
  };



  if (loading) {
    return (
      <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={theme.colors.primary} />
          <Text style={[styles.loadingText, { color: theme.colors.onSurface }]}>
            Loading dataset sources...
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={styles.header}>
        <Text variant="headlineMedium" style={[styles.title, { color: theme.colors.onSurface }]}>
          Datasets
        </Text>
      </View>

      <DataTable
        data={datasetSources}
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

export default DatasetsScreen; 