import axios from 'axios';

// Mock API base URL - replace with actual backend URL
const API_BASE_URL = 'https://api.fingpt.com';

// Create axios instance with default config
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Mock data for development
const mockData = {
  news: [
    { id: 1, title: 'Reuters', description: 'Financial news from Reuters' },
    { id: 2, title: 'Bloomberg', description: 'Market data from Bloomberg' },
    { id: 3, title: 'CNBC', description: 'Business news from CNBC' },
    { id: 4, title: 'Financial Times', description: 'Global financial news' },
  ],
  socialMedia: [
    { id: 1, title: 'Twitter', description: 'Financial discussions on Twitter' },
    { id: 2, title: 'Reddit', description: 'r/wallstreetbets and r/investing' },
    { id: 3, title: 'LinkedIn', description: 'Professional financial insights' },
    { id: 4, title: 'Facebook', description: 'Financial groups and pages' },
  ],
  filings: [
    { id: 1, title: 'SEC EDGAR', description: 'SEC filing database' },
    { id: 2, title: 'SEDAR', description: 'Canadian securities filings' },
    { id: 3, title: 'Companies House', description: 'UK company filings' },
    { id: 4, title: 'ASIC', description: 'Australian securities filings' },
  ],
  datasets: [
    { id: 1, title: 'Yahoo Finance', description: 'Stock market data' },
    { id: 2, title: 'Alpha Vantage', description: 'Financial market data API' },
    { id: 3, title: 'Quandl', description: 'Financial and economic data' },
    { id: 4, title: 'FRED', description: 'Federal Reserve Economic Data' },
  ],
};

// Mock CSV data
const mockCSVData = {
  headers: ['Date', 'Symbol', 'Price', 'Volume', 'Change'],
  rows: [
    ['2024-01-15', 'AAPL', '185.92', '45,234,567', '+2.34%'],
    ['2024-01-15', 'GOOGL', '142.56', '23,456,789', '-1.23%'],
    ['2024-01-15', 'MSFT', '374.69', '34,567,890', '+0.87%'],
    ['2024-01-15', 'AMZN', '151.94', '56,789,012', '+3.45%'],
    ['2024-01-15', 'TSLA', '237.49', '67,890,123', '-0.56%'],
  ],
};

export interface ScrapeResponse {
  success: boolean;
  message: string;
  data?: any;
  csvData?: any;
}

export interface ChatResponse {
  success: boolean;
  message: string;
  response: string;
}

// API functions
export const apiService = {
  // Get available data sources
  getDataSources: async (category: string) => {
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      switch (category) {
        case 'news':
          return { success: true, data: mockData.news };
        case 'socialMedia':
          return { success: true, data: mockData.socialMedia };
        case 'filings':
          return { success: true, data: mockData.filings };
        case 'datasets':
          return { success: true, data: mockData.datasets };
        default:
          return { success: false, message: 'Invalid category' };
      }
    } catch (error) {
      return { success: false, message: 'Failed to fetch data sources' };
    }
  },

  // Scrape data from a source
  scrapeData: async (source: string, category: string): Promise<ScrapeResponse> => {
    try {
      // Simulate API delay and processing
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Simulate success/failure based on source
      if (source.toLowerCase().includes('error')) {
        return {
          success: false,
          message: `Failed to scrape data from ${source}`,
        };
      }

      return {
        success: true,
        message: `Successfully scraped data from ${source}`,
        data: {
          source,
          category,
          timestamp: new Date().toISOString(),
          recordCount: Math.floor(Math.random() * 1000) + 100,
        },
        csvData: mockCSVData,
      };
    } catch (error) {
      return {
        success: false,
        message: `Error scraping data from ${source}: ${error}`,
      };
    }
  },

  // Chat with FinGPT
  chat: async (message: string): Promise<ChatResponse> => {
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock responses based on message content
      let response = "I'm here to help with your financial data needs. How can I assist you today?";
      
      if (message.toLowerCase().includes('scrape')) {
        response = "I can help you scrape financial data from various sources. Which source would you like to scrape?";
      } else if (message.toLowerCase().includes('csv')) {
        response = "CSV files contain structured financial data that you can view and analyze. Would you like me to help you understand a specific dataset?";
      } else if (message.toLowerCase().includes('market') || message.toLowerCase().includes('stock')) {
        response = "I can help you analyze market data, stock prices, and financial trends. What specific information are you looking for?";
      } else if (message.toLowerCase().includes('news')) {
        response = "I can help you gather financial news from various sources like Reuters, Bloomberg, and CNBC. What type of news are you interested in?";
      }

      return {
        success: true,
        message: 'Chat response received',
        response,
      };
    } catch (error) {
      return {
        success: false,
        message: 'Failed to get chat response',
        response: 'Sorry, I encountered an error. Please try again.',
      };
    }
  },

  // Get CSV data for a source
  getCSVData: async (source: string): Promise<any> => {
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      return {
        success: true,
        data: mockCSVData,
        source,
        timestamp: new Date().toISOString(),
      };
    } catch (error) {
      return {
        success: false,
        message: `Failed to fetch CSV data from ${source}`,
      };
    }
  },
};

export default apiService; 