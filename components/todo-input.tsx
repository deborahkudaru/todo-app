import React from "react";
import { View, TextInput } from "react-native";
import { useTheme } from "@/context/ThemeContext";

interface TodoInputProps {
  value: string;
  onChangeText: (text: string) => void;
  onSubmit: () => void;
}

export default function TodoInput({
  value,
  onChangeText,
  onSubmit,
}: TodoInputProps) {
  const { currentTheme } = useTheme(); 
  const isDark = currentTheme === "dark"; 

  return (
    <View
      className={`rounded-[5px] px-5 items-center py-6 ${
        isDark ? "bg-[#25273D]" : "bg-white"
      } flex-row`}
      style={{
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.4,
        shadowRadius: 12,
        elevation: 12,
      }}
    >
      <View
        className={`w-5 h-5 rounded-full border mr-3 flex-shrink-0 ${
          isDark ? "border-[#393A4C]" : "border-[#E4E5F1]"
        }`}
      />
      <TextInput
        placeholder="Create a new todo..."
        placeholderTextColor={isDark ? "#767992" : "#9495A5"}
        value={value}
        onChangeText={onChangeText}
        onSubmitEditing={onSubmit}
        returnKeyType="done"
        className={`flex-1 text-base font-josefin ${isDark ? "text-white" : "text-[#484B6A]"}`}
      />
    </View>
  );
}
