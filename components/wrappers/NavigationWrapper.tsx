import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { useTheme } from "../../hooks/ThemeContext";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import TabNavigation from "../navigations/TabNavigation";
import LoginPage from "../../pages/LoginPage"; // ✅ Import the login page
import { RootStackParamList } from "../../hooks/types";
import { StatusBar } from "expo-status-bar";

const Stack = createNativeStackNavigator<RootStackParamList>();

const NavigationWrapper = () => {
  const { theme, colorTheme } = useTheme();

  return (
    <NavigationContainer>
      <StatusBar style={colorTheme ? "light" : "dark"} />
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: theme.background },
        }}
      >
        <Stack.Screen name="Main" component={TabNavigation} />
        <Stack.Screen name="LoginPage" component={LoginPage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default NavigationWrapper;
