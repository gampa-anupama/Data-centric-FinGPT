import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { Card, Text, Button, useTheme } from 'react-native-paper';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

interface TableRowProps {
  title: string;
  description?: string;
  onScrape: () => void;
  onViewCSV: () => void;
  isScraped: boolean;
  isLoading?: boolean;
}

const { width } = Dimensions.get('window');
const isTablet = width > 768;

const TableRow: React.FC<TableRowProps> = ({
  title,
  description,
  onScrape,
  onViewCSV,
  isScraped,
  isLoading = false,
}) => {
  const theme = useTheme();

  return (
    <Card style={[styles.card, { backgroundColor: theme.colors.surface }]}>
      <Card.Content style={styles.content}>
        <View style={styles.textContainer}>
          <Text variant="titleMedium" style={[styles.title, { color: theme.colors.onSurface }]}>
            {title}
          </Text>
          {description && (
            <Text variant="bodyMedium" style={[styles.description, { color: theme.colors.secondary }]}>
              {description}
            </Text>
          )}
        </View>
        
        <View style={styles.buttonContainer}>
          <Button
            mode="contained"
            onPress={onScrape}
            loading={isLoading}
            disabled={isLoading}
            style={[styles.button, styles.scrapeButton]}
            labelStyle={styles.buttonLabel}
          >
            {isLoading ? 'Scraping...' : 'Scrape'}
          </Button>
          
          <Button
            mode="outlined"
            onPress={onViewCSV}
            disabled={!isScraped}
            style={[styles.button, styles.viewButton]}
            labelStyle={styles.buttonLabel}
          >
            View CSV
          </Button>
        </View>
      </Card.Content>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    marginVertical: hp('1%'),
    marginHorizontal: wp('2%'),
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  content: {
    padding: wp('3%'),
  },
  textContainer: {
    flex: 1,
    marginBottom: hp('2%'),
  },
  title: {
    fontWeight: '600',
    marginBottom: hp('0.5%'),
    fontSize: isTablet ? wp('2%') : wp('4%'),
  },
  description: {
    fontSize: isTablet ? wp('1.5%') : wp('3%'),
  },
  buttonContainer: {
    flexDirection: isTablet ? 'row' : 'column',
    gap: wp('2%'),
  },
  button: {
    flex: isTablet ? 1 : undefined,
    minHeight: hp('5%'),
  },
  scrapeButton: {
    marginBottom: isTablet ? 0 : hp('1%'),
  },
  viewButton: {
    marginBottom: 0,
  },
  buttonLabel: {
    fontSize: isTablet ? wp('1.5%') : wp('3%'),
  },
});

export default TableRow; 