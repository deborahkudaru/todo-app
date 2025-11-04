import React, { createContext, useContext, useState, useEffect } from 'react';
import { useColorScheme } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

type Theme = 'light' | 'dark' | 'system';

interface ThemeContextType {
  theme: Theme;
  currentTheme: 'light' | 'dark'; // The actual theme being applied
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType>({
  theme: 'system',
  currentTheme: 'light',
  toggleTheme: () => {},
  setTheme: () => {},
});

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const systemTheme = useColorScheme() || 'light';
  const [theme, setThemeState] = useState<Theme>('system');
  const [isReady, setIsReady] = useState(false);

  // Calculate the actual theme to apply
  const currentTheme = theme === 'system' ? systemTheme : theme;

  useEffect(() => {
    const loadTheme = async () => {
      try {
        const saved = await AsyncStorage.getItem('theme');
        if (saved === 'light' || saved === 'dark' || saved === 'system') {
          setThemeState(saved as Theme);
        }
      } catch (error) {
        console.error('Failed to load theme:', error);
      } finally {
        setIsReady(true);
      }
    };

    loadTheme();
  }, []);

  const setTheme = async (newTheme: Theme) => {
    setThemeState(newTheme);
    try {
      await AsyncStorage.setItem('theme', newTheme);
    } catch (error) {
      console.error('Failed to save theme:', error);
    }
  };

  const toggleTheme = () => {
    if (theme === 'system') {
      // If currently on system, switch to the opposite of current appearance
      setTheme(currentTheme === 'light' ? 'dark' : 'light');
    } else {
      // If manual theme is set, toggle between light and dark
      setTheme(theme === 'light' ? 'dark' : 'light');
    }
  };

  if (!isReady) {
    // You can return a loading indicator or null
    return null;
  }

  return (
    <ThemeContext.Provider value={{ 
      theme, 
      currentTheme, 
      toggleTheme, 
      setTheme 
    }}>
      {children}
    </ThemeContext.Provider>
  );
};