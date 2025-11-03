import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useTheme } from '@/context/ThemeContext';
import { Id } from '@/convex/_generated/dataModel';

interface TodoItemProps {
  item: {
    _id: Id<"todos">;
    text: string;
    isCompleted: boolean;
  };
  onToggleComplete: (id: Id<"todos">) => void;
  onDelete: (id: Id<"todos">) => void;
}

export default function TodoItem({ item, onToggleComplete, onDelete }: TodoItemProps) {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <View
      className={`flex-row items-center justify-between rounded-[5px] px-4 py-4 border-b ${
        isDark ? 'bg-[#2C2C2C] border-[#393A4C]' : 'bg-white border-[#E4E5F1]'
      }`}
    >
      <TouchableOpacity onPress={() => onToggleComplete(item._id)}>
        <View
          className={`w-5 h-5 rounded-full border items-center justify-center ${
            item.isCompleted 
              ? 'bg-gradient-to-br from-[#57DDFF] to-[#C058F3] border-0' 
              : isDark 
                ? 'border-[#393A4C]' 
                : 'border-[#E4E5F1]'
          }`}
        >
          {item.isCompleted && (
            <Feather name="check" size={14} color="#fff" />
          )}
        </View>
      </TouchableOpacity>

      <Text
        className={`flex-1 ml-3 text-base ${
          item.isCompleted
            ? 'text-gray-400 line-through'
            : isDark
            ? 'text-[#C8CBE7]'
            : 'text-[#484B6A]'
        }`}
      >
        {item.text}
      </Text>

      <TouchableOpacity onPress={() => onDelete(item._id)}>
        <Feather name="x" size={18} color="#9495A5" />
      </TouchableOpacity>
    </View>
  );
}