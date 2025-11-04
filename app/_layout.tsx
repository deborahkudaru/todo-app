import React, { useEffect } from "react";
import { Stack } from "expo-router";
import { ThemeProvider } from "../context/ThemeContext";
import "../global.css";
import { ConvexProvider, ConvexReactClient } from "convex/react";
import {
  useFonts,
  JosefinSans_400Regular,
  JosefinSans_700Bold,
} from "@expo-google-fonts/josefin-sans";
import * as SplashScreen from "expo-splash-screen";
import { View } from "react-native";

SplashScreen.preventAutoHideAsync();

const convex = new ConvexReactClient(process.env.EXPO_PUBLIC_CONVEX_URL!, {
  unsavedChangesWarning: false,
});

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    JosefinSans_400Regular,
    JosefinSans_700Bold,
  });

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  // Always render ThemeProvider + ConvexProvider immediately
  return (
    <ConvexProvider client={convex}>
      <ThemeProvider>
        {!fontsLoaded ? (
          <View style={{ flex: 1, backgroundColor: "black" }} />
        ) : (
          <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen
              name="index"
              options={{
                headerShown: false,
              }}
            />
          </Stack>
        )}
      </ThemeProvider>
    </ConvexProvider>
  );
}
