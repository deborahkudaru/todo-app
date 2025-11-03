import React from "react";
import { FlatList, Text, View } from "react-native";
import { useTheme } from "@/context/ThemeContext";
import TodoItem from "./todo-item";
import TodoFooter from "./todo-footer";
import { Id } from "@/convex/_generated/dataModel";

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
  itemsLeft: number;
  onClearCompleted: () => void;
}

export default function TodoList({
  todos,
  onToggleComplete,
  onDelete,
  itemsLeft,
  onClearCompleted,
}: TodoListProps) {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <View
      className={`rounded-[8px] overflow-hidden mb-4 ${
        isDark ? "bg-[#25273D]" : "bg-white"
      }`}
      style={{
        shadowColor: isDark ? "#000" : "#9CA3AF",
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: isDark ? 0.35 : 0.3,
        shadowRadius: 12,
        elevation: 10,
      }}
    >
      <FlatList
        data={todos}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <TodoItem
            item={item}
            onToggleComplete={onToggleComplete}
            onDelete={onDelete}
          />
        )}
        ListEmptyComponent={
          <View className="py-16 items-center justify-center">
            <Text
              className={`text-center text-base ${
                isDark ? "text-gray-400" : "text-gray-500"
              }`}
            >
              No todos yet 📝
            </Text>
          </View>
        }
        ListFooterComponent={
          <TodoFooter itemsLeft={itemsLeft} onClearCompleted={onClearCompleted} />
        }
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}