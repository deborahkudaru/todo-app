import React from 'react';
import { FlatList, Text } from 'react-native';
import { useTheme } from '@/context/ThemeContext';
import TodoItem from './todo-item';
import { Id } from '@/convex/_generated/dataModel';

interface Todo {
  _id: Id<"todos">;
  text: string;
  isCompleted: boolean;
  order: number;
  createdAt: number;
}

interface TodoListProps {
  todos: Todo[];
  onToggleComplete: (id: Id<"todos">) => void;
  onDelete: (id: Id<"todos">) => void;
}

export default function TodoList({ todos, onToggleComplete, onDelete }: TodoListProps) {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <FlatList
      data={todos}
      keyExtractor={(item) => item._id}
      className="mt-6 rounded-sm shadow-xl"
      renderItem={({ item }) => (
        <TodoItem
          item={item}
          onToggleComplete={onToggleComplete}
          onDelete={onDelete}
        />
      )}
      ListEmptyComponent={
        <Text className={`text-center mt-10 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
          No todos yet 📝
        </Text>
      }
    />
  );
}