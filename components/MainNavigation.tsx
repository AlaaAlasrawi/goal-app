import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomePage from "../components/HomePage";
import GoalPage from "../components/GoalPage";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useTheme } from "../hooks/ThemeContext";
import { TouchableOpacity, Text, View, StyleSheet } from "react-native";
import { TabRoutes } from "../hooks/types";

const Tab = createBottomTabNavigator<TabRoutes>();

const MainNavigation = () => {
  const { theme, toggleTheme } = useTheme();

  const Dummy = () => null;

  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName = "home";
          if (route.name === "Home") iconName = "home";
          else if (route.name === "Goals") iconName = "target";
          else if (route.name === "ToggleTheme")
            iconName =
              theme.mode === "dark" ? "weather-night" : "weather-sunny";

          return (
            <MaterialCommunityIcons
              name={iconName as any}
              size={size}
              color={color}
            />
          );
        },
        headerShown: false,
        tabBarActiveTintColor: theme.primary,
        tabBarInactiveTintColor: "gray",
        tabBarStyle: {
          backgroundColor: theme.surface,
          borderTopColor: "transparent",
        },
      })}
    >
      <Tab.Screen name="Home" component={HomePage} />
      <Tab.Screen name="Goals" component={GoalPage} />

      <Tab.Screen
        name="ToggleTheme"
        component={Dummy}
        options={{
          tabBarButton: ({ accessibilityState, style }) => {
            const isActive = accessibilityState?.selected;

            return (
              <TouchableOpacity
                onPress={(e) => {
                  e.preventDefault();
                  toggleTheme();
                }}
                style={[style, styles.center]}
              >
                <MaterialCommunityIcons
                  name={
                    theme.mode === "dark" ? "weather-night" : "weather-sunny"
                  }
                  size={24}
                  color={isActive ? theme.primary : "gray"}
                />
                <Text
                  style={{
                    fontSize: 12,
                    color: isActive ? theme.primary : "gray",
                    marginTop: 2,
                  }}
                >
                  {theme.mode === "dark" ? "Dark" : "Light"}
                </Text>
              </TouchableOpacity>
            );
          },
        }}
      />
    </Tab.Navigator>
  );
};

export default MainNavigation;

const styles = StyleSheet.create({
  center: {
    alignItems: "center",
    justifyContent: "center",
  },
});
