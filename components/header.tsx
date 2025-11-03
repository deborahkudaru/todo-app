import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useTheme } from '@/context/ThemeContext';

export default function Header() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <View className="flex-row justify-between items-center mt-12">
      <Text
        className={`text-3xl font-bold tracking-widest ${
          isDark ? 'text-white' : 'text-black'
        }`}
      >
        TODO
      </Text>

      <TouchableOpacity onPress={toggleTheme}>
        {isDark ? (
          <Feather name="sun" size={24} color="#fff" />
        ) : (
          <Feather name="moon" size={24} color="#000" />
        )}
      </TouchableOpacity>
    </View>
  );
}