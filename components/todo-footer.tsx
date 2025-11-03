import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useTheme } from '@/context/ThemeContext';

interface TodoFooterProps {
  itemsLeft: number;
  onClearCompleted: () => void;
  filter: 'all' | 'active' | 'completed';
  onFilterChange: (filter: 'all' | 'active' | 'completed') => void;
}

export default function TodoFooter({ 
  itemsLeft, 
  onClearCompleted, 
  filter, 
  onFilterChange 
}: TodoFooterProps) {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <View
      className={`rounded-[5px] px-4 py-3 flex-row justify-between items-center ${
        isDark ? 'bg-[#2C2C2C]' : 'bg-white'
      } shadow-lg`}
    >
      <Text className={`text-sm ${isDark ? 'text-[#5B5E7E]' : 'text-[#9495A5]'}`}>
        {itemsLeft} items left
      </Text>

      {/* Filter Buttons */}
      <View className="flex-row space-x-4">
        {(['all', 'active', 'completed'] as const).map((filterType) => (
          <TouchableOpacity
            key={filterType}
            onPress={() => onFilterChange(filterType)}
          >
            <Text
              className={`text-sm font-bold ${
                filter === filterType
                  ? 'text-[#3A7CFD]'
                  : isDark
                  ? 'text-[#5B5E7E]'
                  : 'text-[#9495A5]'
              }`}
            >
              {filterType.charAt(0).toUpperCase() + filterType.slice(1)}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity onPress={onClearCompleted}>
        <Text className={`text-sm ${isDark ? 'text-[#5B5E7E]' : 'text-[#9495A5]'}`}>
          Clear Completed
        </Text>
      </TouchableOpacity>
    </View>
  );
}