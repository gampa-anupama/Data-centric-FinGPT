import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { Text, Button, useTheme } from 'react-native-paper';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const { width } = Dimensions.get('window');
const isTablet = width > 768;

interface DataTableProps {
  data: Array<{
    id: number;
    title: string;
    description: string;
  }>;
  onScrape: (source: string) => void;
  onViewCSV: (source: string) => void;
  scrapedSources: { [key: string]: boolean };
  scrapingStates: { [key: string]: boolean };
}

const DataTable: React.FC<DataTableProps> = ({
  data,
  onScrape,
  onViewCSV,
  scrapedSources,
  scrapingStates,
}) => {
  const theme = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={[styles.table, { backgroundColor: theme.colors.surface }]}>
        {/* Table Header */}
        <View style={[styles.headerRow, { borderBottomColor: theme.colors.surfaceVariant }]}>
          <Text style={[styles.headerText, { color: theme.colors.onSurface, fontSize: isTablet ? wp('1.5%') : wp('3.5%') }]}>
            Source
          </Text>
          <Text style={[styles.headerText, { color: theme.colors.onSurface, fontSize: isTablet ? wp('1.5%') : wp('3.5%') }]}>
            Action
          </Text>
          <Text style={[styles.headerText, { color: theme.colors.onSurface, fontSize: isTablet ? wp('1.5%') : wp('3.5%') }]}>
            CSV
          </Text>
        </View>

        {/* Table Rows */}
        {data.map((item, index) => (
          <View
            key={item.id}
            style={[
              styles.dataRow,
              { borderBottomColor: theme.colors.surfaceVariant },
              index === data.length - 1 && styles.lastRow,
            ]}
          >
            <View style={styles.sourceColumn}>
              <Text style={[styles.sourceText, { color: theme.colors.onSurface, fontSize: isTablet ? wp('1.4%') : wp('3.2%') }]}>
                {item.title}
              </Text>
            </View>

            <View style={styles.actionColumn}>
              <Button
                mode="contained"
                onPress={() => onScrape(item.title)}
                loading={scrapingStates[item.title] || false}
                disabled={scrapingStates[item.title] || false}
                style={[styles.scrapeButton, { backgroundColor: theme.colors.primary }]}
                labelStyle={[styles.buttonLabel, { fontSize: isTablet ? wp('1.2%') : wp('2.8%') }]}
                compact
              >
                {scrapingStates[item.title] ? 'Scraping...' : 'Scrape'}
              </Button>
            </View>

            <View style={styles.csvColumn}>
              <Button
                mode="outlined"
                onPress={() => onViewCSV(item.title)}
                disabled={!scrapedSources[item.title]}
                style={[
                  styles.csvButton,
                  {
                    borderColor: scrapedSources[item.title] ? theme.colors.primary : theme.colors.surfaceVariant,
                  },
                ]}
                labelStyle={[
                  styles.buttonLabel,
                  {
                    color: scrapedSources[item.title] ? theme.colors.primary : theme.colors.secondary,
                    fontSize: isTablet ? wp('1.2%') : wp('2.8%'),
                  },
                ]}
                compact
              >
                View CSV
              </Button>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: wp('2%'),
  },
  table: {
    borderRadius: 8,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  headerRow: {
    flexDirection: 'row',
    paddingVertical: hp('2%'),
    paddingHorizontal: wp('3%'),
    borderBottomWidth: 1,
    backgroundColor: '#f8fafc',
  },
  dataRow: {
    flexDirection: 'row',
    paddingVertical: hp('2%'),
    paddingHorizontal: wp('3%'),
    borderBottomWidth: 1,
    alignItems: 'center',
  },
  lastRow: {
    borderBottomWidth: 0,
  },
  headerText: {
    fontWeight: '600',
    flex: 1,
  },
  sourceColumn: {
    flex: 2,
  },
  actionColumn: {
    flex: 1,
    alignItems: 'center',
  },
  csvColumn: {
    flex: 1,
    alignItems: 'center',
  },
  sourceText: {
    fontWeight: '500',
  },
  scrapeButton: {
    minWidth: wp('15%'),
    height: hp('4%'),
  },
  csvButton: {
    minWidth: wp('15%'),
    height: hp('4%'),
  },
  buttonLabel: {
    fontWeight: '500',
  },
});

export default DataTable;