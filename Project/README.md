# FinGPT - Financial Data Framework

A React Native application for gathering and visualizing financial data from various sources including news, social media, regulatory filings, and datasets.

## Features

- **Multi-Source Data Scraping**: Scrape financial data from news sources, social media platforms, regulatory filings, and datasets
- **Responsive Design**: Fully responsive across mobile, tablet, and desktop devices
- **CSV Preview**: View scraped data in a responsive table format
- **AI Chatbot**: Integrated FinGPT assistant for financial data queries
- **Modern UI**: Clean, minimal design using React Native Paper components
- **Cross-Platform**: Built with Expo for iOS, Android, and web support

## Screens

1. **News Screen**: Financial news sources (Reuters, Bloomberg, CNBC, Financial Times)
2. **Social Media Screen**: Social platform sources (Twitter, Reddit, LinkedIn, Facebook)
3. **Filings Screen**: Regulatory filing sources (SEC EDGAR, SEDAR, Companies House, ASIC)
4. **Datasets Screen**: Financial dataset sources (Yahoo Finance, Alpha Vantage, Quandl, FRED)
5. **CSV Preview Screen**: Responsive table view of scraped data

## Tech Stack

- **React Native** with Expo
- **TypeScript** for type safety
- **React Navigation** for routing
- **React Native Paper** for UI components
- **Axios** for API calls
- **Responsive Design** with react-native-responsive-screen

## Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Expo CLI (`npm install -g @expo/cli`)
- iOS Simulator (for iOS development)
- Android Studio (for Android development)

## Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd fingpt
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Start the development server**
   ```bash
   npm start
   # or
   yarn start
   ```

4. **Run on your preferred platform**
   - Press `i` for iOS Simulator
   - Press `a` for Android Emulator
   - Press `w` for web browser
   - Scan QR code with Expo Go app on your device

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── TableRow.tsx    # Data source row component
│   ├── ChatbotModal.tsx # AI chatbot modal
│   └── FloatingChatButton.tsx # Floating chat button
├── screens/            # Screen components
│   ├── NewsScreen.tsx
│   ├── SocialMediaScreen.tsx
│   ├── FilingsScreen.tsx
│   ├── DatasetsScreen.tsx
│   └── CSVPreviewScreen.tsx
├── navigation/         # Navigation configuration
│   └── RootNavigator.tsx
├── services/           # API services
│   └── api.ts
└── theme/              # Theme configuration
    └── index.ts
```

## API Integration

The app currently uses mock API endpoints for development. To connect to a real backend:

1. Update the `API_BASE_URL` in `src/services/api.ts`
2. Replace mock data with actual API calls
3. Implement proper error handling and authentication

### Mock Endpoints

- `GET /api/sources/:category` - Get available data sources
- `POST /api/scrape` - Scrape data from a source
- `GET /api/chat` - Chat with FinGPT
- `GET /api/csv/:source` - Get CSV data for a source

## Responsive Design

The app automatically adapts to different screen sizes:

- **Mobile**: Card-based layout with stacked buttons
- **Tablet**: Side-by-side layout with larger touch targets
- **Desktop**: Full table view with multiple columns visible

## Development

### Adding New Data Sources

1. Add source data to the mock data in `src/services/api.ts`
2. Create corresponding screen component if needed
3. Update navigation configuration

### Customizing Themes

Modify `src/theme/index.ts` to customize colors, typography, and other design tokens.

### Building for Production

```bash
# Build for iOS
expo build:ios

# Build for Android
expo build:android

# Build for web
expo build:web
```

## Testing

The app includes comprehensive error handling and loading states. Test the following scenarios:

- Network connectivity issues
- API failures
- Different screen sizes and orientations
- Light/dark mode switching
- Navigation between screens

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For questions or issues, please open an issue on GitHub or contact the development team.

---

**Note**: This is a development version with mock APIs. Production deployment requires backend integration and proper security measures. 