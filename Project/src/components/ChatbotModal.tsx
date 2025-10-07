import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { Modal, Portal, Text, Button, useTheme, IconButton } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const { width, height } = Dimensions.get('window');
const isTablet = width > 768;

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

interface ChatbotModalProps {
  visible: boolean;
  onDismiss: () => void;
}

const ChatbotModal: React.FC<ChatbotModalProps> = ({ visible, onDismiss }) => {
  const theme = useTheme();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Hello! I\'m FinGPT, your financial data assistant. How can I help you today?',
      isUser: false,
      timestamp: new Date(),
    },
  ]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollViewRef = useRef<ScrollView>(null);

  useEffect(() => {
    if (visible && messages.length > 0) {
      setTimeout(() => {
        scrollViewRef.current?.scrollToEnd({ animated: true });
      }, 100);
    }
  }, [visible, messages]);

  const sendMessage = async () => {
    if (!inputText.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText.trim(),
      isUser: true,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: `I received your message: "${inputText.trim()}". This is a placeholder response. In the real app, this would call the backend API.`,
        isUser: false,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, botMessage]);
      setIsLoading(false);
    }, 1000);
  };

  const handleKeyPress = (e: any) => {
    if (e.nativeEvent.key === 'Enter' && !e.nativeEvent.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <Portal>
      <Modal
        visible={visible}
        onDismiss={onDismiss}
        contentContainerStyle={[
          styles.modal,
          {
            backgroundColor: theme.colors.surface,
            width: isTablet ? wp('60%') : wp('95%'),
            maxHeight: isTablet ? hp('80%') : hp('90%'),
          },
        ]}
      >
        <View style={styles.header}>
          <Text variant="headlineSmall" style={{ color: theme.colors.onSurface }}>
            FinGPT Assistant
          </Text>
          <IconButton
            icon="close"
            size={24}
            onPress={onDismiss}
            iconColor={theme.colors.onSurface}
          />
        </View>

        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.container}
        >
          <ScrollView
            ref={scrollViewRef}
            style={styles.messagesContainer}
            showsVerticalScrollIndicator={false}
          >
            {messages.map((message) => (
              <View
                key={message.id}
                style={[
                  styles.messageContainer,
                  message.isUser ? styles.userMessage : styles.botMessage,
                ]}
              >
                <View
                  style={[
                    styles.messageBubble,
                    {
                      backgroundColor: message.isUser
                        ? theme.colors.primary
                        : theme.colors.surfaceVariant,
                    },
                  ]}
                >
                  <Text
                    style={[
                      styles.messageText,
                      {
                        color: message.isUser
                          ? theme.colors.onPrimary
                          : theme.colors.onSurface,
                      },
                    ]}
                  >
                    {message.text}
                  </Text>
                  <Text
                    style={[
                      styles.timestamp,
                      {
                        color: message.isUser
                          ? theme.colors.onPrimary
                          : theme.colors.secondary,
                      },
                    ]}
                  >
                    {message.timestamp.toLocaleTimeString([], {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </Text>
                </View>
              </View>
            ))}
            {isLoading && (
              <View style={styles.loadingContainer}>
                <Text style={{ color: theme.colors.secondary }}>FinGPT is typing...</Text>
              </View>
            )}
          </ScrollView>

          <View style={styles.inputContainer}>
            <TextInput
              style={[
                styles.textInput,
                {
                  backgroundColor: theme.colors.surfaceVariant,
                  color: theme.colors.onSurface,
                  borderColor: theme.colors.outline,
                },
              ]}
              value={inputText}
              onChangeText={setInputText}
              placeholder="Type your message..."
              placeholderTextColor={theme.colors.secondary}
              multiline
              maxLength={500}
              onKeyPress={handleKeyPress}
            />
            <TouchableOpacity
              style={[
                styles.sendButton,
                {
                  backgroundColor: inputText.trim() ? theme.colors.primary : theme.colors.surfaceVariant,
                },
              ]}
              onPress={sendMessage}
              disabled={!inputText.trim() || isLoading}
            >
              <Ionicons
                name="send"
                size={20}
                color={inputText.trim() ? theme.colors.onPrimary : theme.colors.secondary}
              />
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </Modal>
    </Portal>
  );
};

const styles = StyleSheet.create({
  modal: {
    alignSelf: 'center',
    borderRadius: 16,
    padding: 0,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: wp('4%'),
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
  },
  container: {
    flex: 1,
  },
  messagesContainer: {
    flex: 1,
    padding: wp('4%'),
  },
  messageContainer: {
    marginBottom: hp('2%'),
  },
  userMessage: {
    alignItems: 'flex-end',
  },
  botMessage: {
    alignItems: 'flex-start',
  },
  messageBubble: {
    maxWidth: wp('70%'),
    padding: wp('3%'),
    borderRadius: 16,
    elevation: 1,
  },
  messageText: {
    fontSize: isTablet ? wp('1.5%') : wp('3.5%'),
    lineHeight: 20,
  },
  timestamp: {
    fontSize: isTablet ? wp('1%') : wp('2.5%'),
    marginTop: hp('0.5%'),
    opacity: 0.7,
  },
  loadingContainer: {
    alignItems: 'center',
    padding: wp('2%'),
  },
  inputContainer: {
    flexDirection: 'row',
    padding: wp('4%'),
    gap: wp('2%'),
    borderTopWidth: 1,
    borderTopColor: '#e2e8f0',
  },
  textInput: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: wp('4%'),
    paddingVertical: wp('2%'),
    fontSize: isTablet ? wp('1.5%') : wp('3.5%'),
    maxHeight: hp('15%'),
  },
  sendButton: {
    width: wp('12%'),
    height: wp('12%'),
    borderRadius: wp('6%'),
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2,
  },
});

export default ChatbotModal; 