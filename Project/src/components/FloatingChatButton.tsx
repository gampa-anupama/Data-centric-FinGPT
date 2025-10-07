import React from 'react';
import { StyleSheet, Dimensions } from 'react-native';
import { FAB, useTheme } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const { width } = Dimensions.get('window');
const isTablet = width > 768;

interface FloatingChatButtonProps {
  onPress: () => void;
}

const FloatingChatButton: React.FC<FloatingChatButtonProps> = ({ onPress }) => {
  const theme = useTheme();

  return (
    <FAB
      icon={() => <Ionicons name="chatbubble-ellipses" size={24} color={theme.colors.onPrimary} />}
      style={[
        styles.fab,
        {
          backgroundColor: theme.colors.primary,
          right: isTablet ? wp('5%') : wp('4%'),
          bottom: isTablet ? hp('5%') : hp('4%'),
        },
      ]}
      onPress={onPress}
      size={isTablet ? 'large' : 'normal'}
    />
  );
};

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
});

export default FloatingChatButton; 