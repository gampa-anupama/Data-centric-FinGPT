import React from 'react';
import { View, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { Text, useTheme } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const { width } = Dimensions.get('window');
const isTablet = width > 768;

interface SidebarProps {
  activeScreen: string;
  onNavigate: (screen: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeScreen, onNavigate }) => {
  const theme = useTheme();

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: 'grid-outline' },
    { id: 'news', label: 'News', icon: 'newspaper-outline' },
    { id: 'socialMedia', label: 'Social Media', icon: 'chatbubble-outline' },
    { id: 'filings', label: 'Filings', icon: 'document-text-outline' },
    { id: 'datasets', label: 'Datasets', icon: 'analytics-outline' },
  ];

  return (
    <View style={[styles.sidebar, { backgroundColor: '#1e293b' }]}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: '#ffffff' }]}>FinGPT</Text>
      </View>

      <View style={styles.menu}>
        {menuItems.map((item) => (
          <TouchableOpacity
            key={item.id}
            style={[
              styles.menuItem,
              activeScreen === item.id && styles.activeMenuItem,
            ]}
            onPress={() => onNavigate(item.id)}
          >
            <Ionicons
              name={item.icon as any}
              size={isTablet ? wp('2%') : wp('5%')}
              color={activeScreen === item.id ? '#ffffff' : '#94a3b8'}
              style={styles.menuIcon}
            />
            <Text
              style={[
                styles.menuText,
                {
                  color: activeScreen === item.id ? '#ffffff' : '#94a3b8',
                  fontSize: isTablet ? wp('1.5%') : wp('3.5%'),
                },
              ]}
            >
              {item.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.bottomMenu}>
        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => onNavigate('chatbot')}
        >
          <Ionicons
            name="chatbubble-ellipses-outline"
            size={isTablet ? wp('2%') : wp('5%')}
            color="#94a3b8"
            style={styles.menuIcon}
          />
          <Text
            style={[
              styles.menuText,
              {
                color: '#94a3b8',
                fontSize: isTablet ? wp('1.5%') : wp('3.5%'),
              },
            ]}
          >
            Chatbot
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  sidebar: {
    width: isTablet ? wp('20%') : wp('30%'),
    height: '100%',
    paddingTop: hp('4%'),
    paddingHorizontal: wp('2%'),
  },
  header: {
    paddingBottom: hp('4%'),
    borderBottomWidth: 1,
    borderBottomColor: '#334155',
    marginBottom: hp('4%'),
  },
  title: {
    fontSize: isTablet ? wp('2.5%') : wp('6%'),
    fontWeight: 'bold',
    textAlign: 'center',
  },
  menu: {
    flex: 1,
  },
  bottomMenu: {
    paddingBottom: hp('4%'),
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: hp('2%'),
    paddingHorizontal: wp('3%'),
    marginVertical: hp('0.5%'),
    borderRadius: 8,
  },
  activeMenuItem: {
    backgroundColor: '#334155',
  },
  menuIcon: {
    marginRight: wp('3%'),
  },
  menuText: {
    fontWeight: '500',
  },
});

export default Sidebar;