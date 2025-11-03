import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useTheme } from "@/context/ThemeContext";

interface TodoFooterProps {
  itemsLeft: number;
  onClearCompleted: () => void;
}

export default function TodoFooter({
  itemsLeft,
  onClearCompleted,
}: TodoFooterProps) {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <View
      className={`flex-row justify-between items-center px-5 py-6 ${
        isDark ? "bg-[#25273D]" : "bg-white"
      }`}
      style={{
        borderBottomLeftRadius: 8,
        borderBottomRightRadius: 8,
        shadowColor: isDark ? "#000" : "#9CA3AF",
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: isDark ? 0.35 : 0.25,
        shadowRadius: 8,
        elevation: 6,
      }}
    >
      <Text
        className={`text-xs ${
          isDark ? "text-[#5B5E7E]" : "text-[#9495A5]"
        }`}
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
  );
}
