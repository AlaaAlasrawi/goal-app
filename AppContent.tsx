import React from "react";

import { PaperProvider } from "react-native-paper";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MainNavigation from "./components/MainNavigation";
import GoalDetailsPage from "./pages/GoalDetailsPage";
import { useTheme } from "./hooks/ThemeContext";

const Stack = createNativeStackNavigator();

const AppContent = () => {
  const { theme } = useTheme();

  return (
    <PaperProvider>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerStyle: {
              backgroundColor: theme.primary,
            },
            headerTintColor: theme.onPrimary,
            headerTitleStyle: {
              fontWeight: "bold",
              fontSize: 20,
            },
            headerShadowVisible: false,
          }}
        >
          <Stack.Screen
            name="Goals"
            component={MainNavigation}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="GoalDetails"
            component={GoalDetailsPage}
            options={{ title: "Goal Details" }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
};

export default AppContent;
