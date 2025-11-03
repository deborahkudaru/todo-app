import React from "react";
import { Stack } from "expo-router";
import { ThemeProvider } from "../context/ThemeContext"
import '../global.css';

export default function RootLayout() {
  return (
    <ThemeProvider>
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen
          name="index"
          options={{
            headerShown: false,
          }}
        />
      </Stack>
    </ThemeProvider>
  );
}