import React from "react";
import { ThemeProvider } from "./hooks/ThemeContext";
import { PaperProvider } from "react-native-paper";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MainNavigation from "./components/MainNavigation";
import GoalDetailsPage from "./components/GoalDetailsPage";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <ThemeProvider>
      <PaperProvider>
        <NavigationContainer>
          <Stack.Navigator>
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
    </ThemeProvider>
  );
}
