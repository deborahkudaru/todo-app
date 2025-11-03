import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useTheme } from "@/context/ThemeContext";
import { Id } from "@/convex/_generated/dataModel";

interface TodoItemProps {
  item: {
    _id: Id<"todos">;
    text: string;
    isCompleted: boolean;
  };
  onToggleComplete: (id: Id<"todos">) => void;
  onDelete: (id: Id<"todos">) => void;
}

export default function TodoItem({
  item,
  onToggleComplete,
  onDelete,
}: TodoItemProps) {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <View
      className={`flex-row items-center justify-between px-4 py-6 border-b ${
        isDark ? "bg-[#25273D] border-[#393A4C]" : "bg-white border-[#E4E5F1]"
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
  );
}