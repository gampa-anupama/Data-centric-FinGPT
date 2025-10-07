import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { Text, useTheme, ActivityIndicator, Card, DataTable } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRoute, RouteProp } from '@react-navigation/native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

import { apiService } from '../services/api';

const { width } = Dimensions.get('window');
const isTablet = width > 768;

type CSVPreviewRouteProp = RouteProp<{
  CSVPreview: {
    source: string;
    category: string;
  };
}, 'CSVPreview'>;

const CSVPreviewScreen: React.FC = () => {
  const theme = useTheme();
  const route = useRoute<CSVPreviewRouteProp>();
  const { source, category } = route.params;

  const [csvData, setCsvData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadCSVData();
  }, [source]);

  const loadCSVData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await apiService.getCSVData(source);
      
      if (response.success) {
        setCsvData(response.data);
      } else {
        setError(response.message);
      }
    } catch (error) {
      setError('Failed to load CSV data');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={theme.colors.primary} />
          <Text style={[styles.loadingText, { color: theme.colors.onSurface }]}>
            Loading CSV data...
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
        <View style={styles.errorContainer}>
          <Text style={[styles.errorText, { color: theme.colors.error }]}>
            {error}
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  if (!csvData) {
    return (
      <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
        <View style={styles.errorContainer}>
          <Text style={[styles.errorText, { color: theme.colors.error }]}>
            No CSV data available
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={styles.header}>
        <Text variant="headlineMedium" style={[styles.title, { color: theme.colors.onSurface }]}>
          CSV Preview: {source}
        </Text>
        <Text variant="bodyMedium" style={[styles.subtitle, { color: theme.colors.secondary }]}>
          {category} • {csvData.rows?.length || 0} records
        </Text>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <Card style={[styles.card, { backgroundColor: theme.colors.surface }]}>
          <Card.Content>
            {isTablet ? (
              // Desktop/Tablet view - Full table
              <DataTable>
                <DataTable.Header>
                  {csvData.headers?.map((header: string, index: number) => (
                    <DataTable.Title key={index} style={styles.tableHeader}>
                      <Text style={[styles.headerText, { color: theme.colors.onSurface }]}>
                        {header}
                      </Text>
                    </DataTable.Title>
                  ))}
                </DataTable.Header>

                {csvData.rows?.map((row: string[], rowIndex: number) => (
                  <DataTable.Row key={rowIndex}>
                    {row.map((cell: string, cellIndex: number) => (
                      <DataTable.Cell key={cellIndex} style={styles.tableCell}>
                        <Text style={[styles.cellText, { color: theme.colors.onSurface }]}>
                          {cell}
                        </Text>
                      </DataTable.Cell>
                    ))}
                  </DataTable.Row>
                ))}
              </DataTable>
            ) : (
              // Mobile view - Card list
              <View>
                {csvData.rows?.map((row: string[], rowIndex: number) => (
                  <Card key={rowIndex} style={[styles.rowCard, { backgroundColor: theme.colors.surfaceVariant }]}>
                    <Card.Content>
                      {row.map((cell: string, cellIndex: number) => (
                        <View key={cellIndex} style={styles.mobileRow}>
                          <Text style={[styles.mobileLabel, { color: theme.colors.secondary }]}>
                            {csvData.headers?.[cellIndex] || `Column ${cellIndex + 1}`}:
                          </Text>
                          <Text style={[styles.mobileValue, { color: theme.colors.onSurface }]}>
                            {cell}
                          </Text>
                        </View>
                      ))}
                    </Card.Content>
                  </Card>
                ))}
              </View>
            )}
          </Card.Content>
        </Card>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: wp('4%'),
    paddingBottom: hp('2%'),
  },
  title: {
    fontWeight: 'bold',
    marginBottom: hp('1%'),
    fontSize: wp('6%'),
  },
  subtitle: {
    fontSize: wp('4%'),
    lineHeight: 20,
  },
  scrollView: {
    flex: 1,
  },
  card: {
    margin: wp('4%'),
    elevation: 2,
  },
  tableHeader: {
    flex: 1,
    justifyContent: 'center',
  },
  headerText: {
    fontWeight: 'bold',
    fontSize: isTablet ? wp('1.5%') : wp('3.5%'),
  },
  tableCell: {
    flex: 1,
    justifyContent: 'center',
  },
  cellText: {
    fontSize: isTablet ? wp('1.5%') : wp('3.5%'),
  },
  rowCard: {
    marginBottom: hp('2%'),
    elevation: 1,
  },
  mobileRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: hp('1%'),
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
  },
  mobileLabel: {
    fontWeight: '600',
    fontSize: wp('3.5%'),
    flex: 1,
  },
  mobileValue: {
    fontSize: wp('3.5%'),
    flex: 2,
    textAlign: 'right',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: hp('2%'),
    fontSize: wp('4%'),
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: wp('4%'),
  },
  errorText: {
    fontSize: wp('4%'),
    textAlign: 'center',
  },
});

export default CSVPreviewScreen; 