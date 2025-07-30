import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { useTheme } from "../../hooks/ThemeContext";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import TabNavigation from "../navigations/TabNavigation";

import { RootStackParamList } from "../../hooks/types";
import { StatusBar } from "expo-status-bar";

const Stack = createNativeStackNavigator<RootStackParamList>();

const NavigationWrapper = () => {
  const { theme, colorTheme } = useTheme();

  return (
    <NavigationContainer>
      <StatusBar style={colorTheme ? "light" : "dark"} />
      <TabNavigation />
    </NavigationContainer>
  );
};

export default NavigationWrapper;
