import React, { useState, useEffect } from "react";
import { Stack } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import '../global.css';

export default function RootLayout() {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    const loadTheme = async () => {
      const saved = await AsyncStorage.getItem("theme");
      if (saved === "light" || saved === "dark") {
        setTheme(saved);
      }
    };
    loadTheme();
  }, []);

  const toggleTheme = async () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    await AsyncStorage.setItem("theme", newTheme);
  };

  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="index"
        initialParams={{ theme, toggleTheme }}
      />
    </Stack>
  );
}
