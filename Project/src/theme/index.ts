import { MD3LightTheme, MD3DarkTheme } from 'react-native-paper';

export const theme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    primary: '#2563eb',
    secondary: '#64748b',
    background: '#f8fafc',
    surface: '#ffffff',
    error: '#ef4444',
    text: '#0f172a',
    onSurface: '#0f172a',
    surfaceVariant: '#f1f5f9',
  },
};

export const darkTheme = {
  ...MD3DarkTheme,
  colors: {
    ...MD3DarkTheme.colors,
    primary: '#3b82f6',
    secondary: '#94a3b8',
    background: '#0f172a',
    surface: '#1e293b',
    error: '#f87171',
    text: '#f8fafc',
    onSurface: '#f8fafc',
    surfaceVariant: '#334155',
  },
}; 