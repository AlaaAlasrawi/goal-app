import React from "react";
import { ThemeProvider } from "./hooks/ThemeContext";
import { PaperProvider } from "react-native-paper";
import { NavigationContainer } from "@react-navigation/native";
import MainNavigation from "./components/MainNavigation";

export default function App() {
  return (
    <ThemeProvider>
      <PaperProvider>
        <NavigationContainer>
          <MainNavigation />
        </NavigationContainer>
      </PaperProvider>
    </ThemeProvider>
  );
}
