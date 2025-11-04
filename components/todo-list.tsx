import React from "react";
import { FlatList, Text, View, TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useTheme } from "@/context/ThemeContext";
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
      className={`rounded-[8px] ${
        isDark ? "bg-[#25273D]" : "bg-white"
      }`}
      style={{
        shadowColor: isDark ? "#000" : "#9CA3AF",
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: isDark ? 0.35 : 0.3,
        shadowRadius: 12,
        elevation: 10,
        overflow: 'visible',
      }}
    >
      <View style={{ overflow: 'hidden', borderRadius: 8 }}>
        <FlatList
          data={todos}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <View
              className={`flex-row items-center justify-between px-4 py-6 border-b ${
                isDark
                  ? "bg-[#25273D] border-[#393A4C]"
                  : "bg-white border-[#E4E5F1]"
              }`}
            >
              <TouchableOpacity onPress={() => onToggleComplete(item._id)}>
                {item.isCompleted ? (
                  <LinearGradient
                    colors={["#57DDFF", "#C058F3"]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    className="w-5 h-5 rounded-full items-center justify-center"
                    style={{ borderRadius: 10 }}
                  >
                    <Feather name="check" size={14} color="#fff" />
                  </LinearGradient>
                ) : (
                  <View
                    className={`w-5 h-5 rounded-full border items-center justify-center ${
                      isDark ? "border-[#393A4C]" : "border-[#E4E5F1]"
                    }`}
                  />
                )}
              </TouchableOpacity>

              <Text
                className={`flex-1 ml-3 text-base ${
                  item.isCompleted
                    ? "text-gray-400 line-through"
                    : isDark
                      ? "text-[#C8CBE7]"
                      : "text-[#484B6A]"
                }`}
              >
                {item.text}
              </Text>

              <TouchableOpacity onPress={() => onDelete(item._id)}>
                <Feather name="x" size={18} color="#9495A5" />
              </TouchableOpacity>
            </View>
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
            <View
              className={`flex-row justify-between items-center px-5 py-6 ${
                isDark ? "bg-[#25273D]" : "bg-white"
              }`}
            >
              <Text
                className={`text-xs ${isDark ? "text-[#5B5E7E]" : "text-[#9495A5]"}`}
              >
                {itemsLeft} items left
              </Text>

              <TouchableOpacity onPress={onClearCompleted}>
                <Text
                  className={`text-xs font-semibold ${
                    isDark ? "text-[#5B5E7E]" : "text-[#9495A5]"
                  }`}
                >
                  Clear Completed
                </Text>
              </TouchableOpacity>
            </View>
          }
          showsVerticalScrollIndicator={false}
        />
      </View>
    </View>
  );
}