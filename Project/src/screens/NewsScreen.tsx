import React, { useState } from 'react';
import { View, StyleSheet, Alert, ScrollView, Platform } from 'react-native';
import { Text, useTheme, ActivityIndicator } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import * as Linking from 'expo-linking';

import DataTable from '../components/DataTable';
import { RootStackParamList } from '../navigation/types';

// ---- Interfaces ----
interface NewsSource {
  id: number;
  title: string;
  description: string;
}

interface PreviewItem {
  [key: string]: any;
}

// ---- Component ----
const NewsScreen: React.FC = () => {
  const theme = useTheme();
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const [loading, setLoading] = useState(false);
  const [scrapingStates, setScrapingStates] = useState<{ [key: string]: boolean }>({});
  const [scrapedSources, setScrapedSources] = useState<{ [key: string]: boolean }>({});
  const [previewData, setPreviewData] = useState<PreviewItem[]>([]);
  const [csvPreviewData, setCsvPreviewData] = useState<PreviewItem[]>([]);
const [viewingSource, setViewingSource] = useState<string | null>(null);

  const BASE_URL = 'http://localhost:8000'; // Update to your backend IP if using a physical device

  const newsSources: NewsSource[] = [
    { id: 1, title: 'CCTV News', description: 'Fetch latest news from CCTV (Akshare)' },
    { id: 2, title: 'Finnhub News', description: 'General financial news from Finnhub' },
    { id: 3, title: 'AAPL News', description: 'Apple-specific news from Finnhub Date Range' },
    { id: 4, title: 'CNBC News', description: 'Streaming news from CNBC' },
    { id: 5, title: 'Yahoo News', description: 'Yahoo Finance-style stock news' },
  ];

  const routeMap: Record<string, string> = {
    'CCTV News': '/cctv-news',
    'Finnhub News': '/finnhub-news',
    'AAPL News': '/aapl-news',
    'CNBC News': '/cnbc-news?keyword=apple',
    'Yahoo News': '/yahoo-news?stock=AAPL',
  };

  // ---- Handlers ----
  const handleScrape = async (source: string): Promise<void> => {
    const route = routeMap[source];
    if (!route) {
      Alert.alert('Error', `No API route defined for ${source}`);
      return;
    }

    try {
      setScrapingStates(prev => ({ ...prev, [source]: true }));
      setLoading(true);

      const response = await fetch(`${BASE_URL}${route}`);
      const data = await response.json();

      if (response.ok) {
        setScrapedSources(prev => ({ ...prev, [source]: true }));
        setPreviewData(data.preview || []);
        Alert.alert('✅ Success', data.message || `${source} scraped successfully`);
      } else {
        Alert.alert('⚠️ Error', data.error || `Failed to fetch ${source}`);
      }
    } catch {
      Alert.alert('Error', 'Unable to connect to backend');
    } finally {
      setScrapingStates(prev => ({ ...prev, [source]: false }));
      setLoading(false);
    }
  };

// const handleViewCSV = async (source: string): Promise<void> => {
//   try {
//     const route = routeMap[source];
//     if (!route) {
//       Alert.alert('Error', `No API route defined for ${source}`);
//       return;
//     }

//     // Convert route (like /cctv-news) → download endpoint (/cctv-news/download)
//     const downloadUrl = `${BASE_URL}${route}/download`;

//     if (Platform.OS === 'web') {
//       // ✅ On Web → directly open in new tab for download
//       window.open(downloadUrl, '_blank');
//       return;
//     }

//     // ✅ On Mobile (Expo) → download and open share sheet
//     const localUri = `${FileSystem.documentDirectory}${source.replace(/\s+/g, '_')}.csv`;
//     const { uri } = await FileSystem.downloadAsync(downloadUrl, localUri);

//     console.log("✅ File downloaded to:", uri);

//     if (await Sharing.isAvailableAsync()) {
//       await Sharing.shareAsync(uri);
//     } else {
//       Alert.alert('CSV Downloaded', `Saved to: ${uri}`);
//     }

//   } catch (error) {
//     console.error("Download error:", error);
//     Alert.alert('Error', 'Failed to download or open CSV file');
//   }
// };

const handleViewCSV = (source: string) => {
  navigation.navigate('CSVPreview', { source, category: 'News' });
};





  if (loading) {
    return (
      <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={theme.colors.primary} />
          <Text style={[styles.loadingText, { color: theme.colors.onSurface }]}>
            Fetching data from backend...
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <ScrollView>
        <View style={styles.header}>
          <Text variant="headlineMedium" style={[styles.title, { color: theme.colors.onSurface }]}>
            Financial News Scraper
          </Text>
        </View>

        <DataTable
          data={newsSources}
          onScrape={handleScrape}
          onViewCSV={handleViewCSV}
          scrapedSources={scrapedSources}
          scrapingStates={scrapingStates}
        />

        {previewData.length > 0 && (
          <View style={styles.previewContainer}>
            <Text style={styles.previewTitle}>🔍 Data Preview</Text>
            {previewData.slice(0, 5).map((item, index) => (
              <Text key={index} style={styles.previewText}>
                • {item.headline || item.title || JSON.stringify(item)}
              </Text>
            ))}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

// ---- Styles ----
const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { padding: wp('4%') },
  title: { fontWeight: 'bold', fontSize: wp('5%') },
  loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  loadingText: { marginTop: hp('2%'), fontSize: wp('4%') },
  previewContainer: { marginTop: hp('2%'), padding: wp('4%'), backgroundColor: '#f2f2f2', borderRadius: 10 },
  previewTitle: { fontWeight: 'bold', marginBottom: 5 },
  previewText: { fontSize: wp('3.5%'), marginBottom: 3 },
});

export default NewsScreen;
