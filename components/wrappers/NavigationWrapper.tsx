import React, { useEffect, useState } from "react";
import { NavigationContainer, CommonActions } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { StatusBar } from "expo-status-bar";
import { useTheme } from "../../hooks/ThemeContext";
import TabNavigation from "../navigations/TabNavigation";
import LoginPage from "../../pages/LoginPage";
import { RootStackParamList } from "../../hooks/types";
import { TOKEN_KEY } from "../../api/env";
import { useAuth } from "../../hooks/AuthProvider";

const RootStack = createNativeStackNavigator<RootStackParamList>();
const AuthStack = createNativeStackNavigator();
const AppStack = createNativeStackNavigator();

const AuthNavigator = () => (
  <AuthStack.Navigator screenOptions={{ headerShown: false }}>
    <AuthStack.Screen name="Login" component={LoginPage} />
    {/* Signup, ForgotPassword, etc. */}
  </AuthStack.Navigator>
);

const AppNavigator = () => (
  <AppStack.Navigator screenOptions={{ headerShown: false }}>
    <AppStack.Screen name="MainTabs" component={TabNavigation} />
  </AppStack.Navigator>
);

export default function NavigationWrapper() {
  const { theme, colorTheme } = useTheme();
  const { checked, isAuthed } = useAuth();

  if (!checked) return null;

  return (
    <NavigationContainer>
      <StatusBar style={colorTheme ? "light" : "dark"} />
      <RootStack.Navigator
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: theme.background },
        }}
      >
        {isAuthed ? (
          <RootStack.Screen name="App" component={AppNavigator} />
        ) : (
          <RootStack.Screen name="Auth" component={AuthNavigator} />
        )}
      </RootStack.Navigator>
    </NavigationContainer>
  );
}
