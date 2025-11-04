import React, { createContext, useContext, useState, useEffect } from 'react';
import { useColorScheme } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

type Theme = 'light' | 'dark';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType>({
  theme: 'light',
  toggleTheme: () => {},
});

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const systemTheme = useColorScheme();
  const [theme, setTheme] = useState<Theme>((systemTheme as Theme) || 'light'); 
  const [userPreference, setUserPreference] = useState(false);
  const [isReady, setIsReady] = useState(false); 

  useEffect(() => {
    const loadTheme = async () => {
      try {
        const saved = await AsyncStorage.getItem('theme');
        if (saved === 'light' || saved === 'dark') {
          setTheme(saved);
          setUserPreference(true);
        } else {
          setTheme(systemTheme || 'light');
        }
      } finally {
        setIsReady(true);
      }
    };

    loadTheme();
  }, [systemTheme]);

  useEffect(() => {
    if (!userPreference && systemTheme) {
      setTheme(systemTheme);
    }
  }, [systemTheme, userPreference]);

  const toggleTheme = async () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    setUserPreference(true);
    await AsyncStorage.setItem('theme', newTheme);
  };

  if (!isReady) return null;

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
