import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useTheme } from "@/context/ThemeContext";

interface FilterButtonsProps {
  filter: "all" | "active" | "completed";
  onFilterChange: (filter: "all" | "active" | "completed") => void;
}

export default function TodoFilter({
  filter,
  onFilterChange,
}: FilterButtonsProps) {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <View
      className={`flex-row justify-center items-center gap-6 rounded-[8px] py-4 px-6 ${
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
      {(["all", "active", "completed"] as const).map((filterType) => (
        <TouchableOpacity
          key={filterType}
          onPress={() => onFilterChange(filterType)}
        >
          <Text
            className={`text-sm font-bold font-josefin-bold ${
              filter === filterType
                ? "text-[#3A7CFD]"
                : isDark
                ? "text-[#5B5E7E]"
                : "text-[#9495A5]"
            }`}
          >
            {filterType.charAt(0).toUpperCase() + filterType.slice(1)}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}
