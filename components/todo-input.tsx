import React from 'react';
import { View, TextInput } from 'react-native';
import { useTheme } from '@/context/ThemeContext';

interface TodoInputProps {
  value: string;
  onChangeText: (text: string) => void;
  onSubmit: () => void;
}

export default function TodoInput({ value, onChangeText, onSubmit }: TodoInputProps) {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <View
      className={`rounded-[5px] px-4 py-4 ${
        isDark ? 'bg-[#2C2C2C]' : 'bg-white'
      } shadow-lg`}
    >
      <View className="absolute left-4 top-4 w-5 h-5 rounded-full border border-gray-300 z-10" />
      <TextInput
        placeholder="Create a new todo..."
        placeholderTextColor={isDark ? '#999' : '#9495A5'}
        value={value}
        onChangeText={onChangeText}
        onSubmitEditing={onSubmit}
        className={`text-base ${isDark ? 'text-white' : 'text-[#484B6A]'} w-full h-6 pl-8`}
      />
    </View>
  );
}