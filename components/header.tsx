import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";
import { useTheme } from "@/context/ThemeContext";

export default function Header() {
  const { theme, currentTheme, toggleTheme } = useTheme();

  // Use currentTheme for styling (actual applied theme)
  const isDark = currentTheme === "dark";

  // Use theme for toggle icon logic (user preference)
  const showSunIcon = theme === "system" ? isDark : theme === "dark";

  return (
    <View className="flex-row justify-between items-center mt-16">
      <Text
        className={`text-3xl font-bold font-josefin-bold tracking-widest ${
          isDark ? "text-white" : "text-white"
        }`}
      >
        TODO
      </Text>

      <TouchableOpacity onPress={toggleTheme}>
        {showSunIcon ? (
          <Feather name="sun" size={24} color="#fff" />
        ) : (
          <Feather name="moon" size={24} color="#fff" />
        )}
      </TouchableOpacity>
    </View>
  );
}
