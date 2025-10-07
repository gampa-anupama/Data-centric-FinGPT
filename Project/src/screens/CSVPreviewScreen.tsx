// import React, { useEffect, useState } from 'react';
// import { View, ScrollView, StyleSheet, Alert, TouchableOpacity } from 'react-native';
// import { Text, ActivityIndicator } from 'react-native-paper';
// import { apiService } from '../api/apiService';

// interface CSVPreviewProps {
//   route: {
//     params: {
//       source: string;
//       category: string;
//     };
//   };
// }

// const CSVPreview: React.FC<CSVPreviewProps> = ({ route }) => {
//   const { source } = route.params;
//   const [csvData, setCsvData] = useState<any[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [fileName, setFileName] = useState<string>("");

//   useEffect(() => {
//     loadCSVPreview();
//   }, []);

//   const loadCSVPreview = async () => {
//     try {
//       const response = await apiService.getNewsCSVPreview(source.toUpperCase());
//       if (response.preview) {
//         setCsvData(response.preview);
//         setFileName(response.csv_file);
//       } else {
//         Alert.alert("Error", "No CSV preview found");
//       }
//     } catch (error) {
//       Alert.alert("Error", "Failed to fetch CSV data");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleDownload = async () => {
//     try {
//       const res = await apiService.downloadCSV(fileName);
//       Alert.alert("Success", `CSV downloaded: ${fileName}`);
//     } catch (error) {
//       Alert.alert("Error", "Failed to download CSV");
//     }
//   };

//   if (loading) {
//     return (
//       <View style={styles.center}>
//         <ActivityIndicator size="large" />
//         <Text>Loading CSV preview...</Text>
//       </View>
//     );
//   }

//   return (
//     <ScrollView style={styles.container}>
//       <Text style={styles.title}>{source} News Preview</Text>

//       {csvData.length === 0 ? (
//         <Text>No data available.</Text>
//       ) : (
//         <View style={styles.table}>
//           <View style={styles.headerRow}>
//             {Object.keys(csvData[0]).map((key, i) => (
//               <Text key={i} style={styles.headerCell}>{key}</Text>
//             ))}
//           </View>
//           {csvData.map((row, i) => (
//             <View key={i} style={styles.dataRow}>
//               {Object.values(row).map((val, j) => (
//                 <Text key={j} style={styles.dataCell}>
//                   {val ? String(val).slice(0, 25) : "-"}
//                 </Text>
//               ))}
//             </View>
//           ))}
//         </View>
//       )}

//       <TouchableOpacity style={styles.downloadBtn} onPress={handleDownload}>
//         <Text style={styles.downloadText}>Download CSV</Text>
//       </TouchableOpacity>
//     </ScrollView>
//   );
// };

// const styles = StyleSheet.create({
//   container: { flex: 1, padding: 10 },
//   center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
//   title: { fontWeight: 'bold', fontSize: 18, marginVertical: 10 },
//   table: { marginTop: 10 },
//   headerRow: { flexDirection: 'row', flexWrap: 'wrap', backgroundColor: '#eee' },
//   headerCell: { width: '25%', fontWeight: 'bold', padding: 4 },
//   dataRow: { flexDirection: 'row', flexWrap: 'wrap' },
//   dataCell: { width: '25%', padding: 4 },
//   downloadBtn: { backgroundColor: '#007bff', padding: 10, borderRadius: 8, marginTop: 15 },
//   downloadText: { color: '#fff', textAlign: 'center', fontWeight: 'bold' },
// });

// export default CSVPreview;
import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, useTheme } from 'react-native-paper';
import { RouteProp, useRoute } from '@react-navigation/native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { RootStackParamList } from '../navigation/types';

type CSVPreviewRouteProp = RouteProp<RootStackParamList, 'CSVPreview'>;

const CSVPreviewScreen: React.FC = () => {
  const theme = useTheme();
  const route = useRoute<CSVPreviewRouteProp>();
  const { source, category } = route.params;

  const [csvData, setCsvData] = useState<any[]>([]);

  const BASE_URL = 'http://127.0.0.1:8000'; // your backend URL
  const routeMap: Record<string, string> = {
    'CCTV News': '/cctv-news',
    'Finnhub News': '/finnhub-news',
    'AAPL News': '/aapl-news',
    'CNBC News': '/cnbc-news?keyword=apple',
    'Yahoo News': '/yahoo-news?stock=AAPL',
  };

  useEffect(() => {
    const fetchCSVPreview = async () => {
      try {
        const apiRoute = routeMap[source];
        const response = await fetch(`${BASE_URL}${apiRoute}`);
        const data = await response.json();
        setCsvData(data.preview || []);
      } catch (error) {
        console.error(error);
      }
    };

    fetchCSVPreview();
  }, [source]);

  if (csvData.length === 0) {
    return (
      <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
        <Text>Loading CSV preview...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Text style={[styles.title, { color: theme.colors.primary }]}>
        {source} - CSV Preview
      </Text>

      <ScrollView horizontal>
        <View>
          {/* Header */}
          <View style={{ flexDirection: 'row', paddingBottom: 5 }}>
            {Object.keys(csvData[0]).map((key) => (
              <Text key={key} style={{ fontWeight: 'bold', marginRight: 10 }}>
                {key}
              </Text>
            ))}
          </View>

          {/* Rows */}
          {csvData.map((row, idx) => (
            <View key={idx} style={{ flexDirection: 'row', paddingBottom: 3 }}>
              {Object.values(row).map((val, i) => (
                <Text key={i} style={{ marginRight: 10 }}>
                  {val?.toString?.() || ''}
                </Text>
              ))}
            </View>
          ))}
        </View>
      </ScrollView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: wp('4%') },
  title: { fontWeight: 'bold', fontSize: wp('5%'), marginBottom: 10 },
});

export default CSVPreviewScreen;
