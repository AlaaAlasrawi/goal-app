import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { useTheme } from "../../hooks/ThemeContext";
import { TabRoutes } from "../../hooks/types";
import HomePage from "../../pages/HomePage";
import DashboardPage from "../../pages/DashboardPage";
import SettingPage from "../../pages/SettingPage";
import GoalsPage from "../../pages/GoalsPage";

const Tab = createBottomTabNavigator<TabRoutes>();

const TabNavigation = () => {
  const { theme } = useTheme();
  const icons: Record<
    keyof TabRoutes,
    React.ComponentProps<typeof MaterialCommunityIcons>["name"]
  > = {
    Home: "home",
    Goals: "target",
    Dashboard: "chart-bar",
    Setting: "cog",
  };
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons
            name={icons[route.name] ?? "help-circle"}
            size={size}
            color={color}
          />
        ),
        headerShown: true,
        headerStyle: { backgroundColor: theme.surface },
        headerTintColor: theme.text,
        headerTitleStyle: { color: theme.text },
        tabBarActiveTintColor: theme.primary,
        tabBarInactiveTintColor: "gray",
        tabBarStyle: {
          backgroundColor: theme.surface,
          borderTopColor: "transparent",
        },
        tabBarLabelStyle: { fontSize: 13 },
      })}
    >
      <Tab.Screen name="Home" component={HomePage} />
      <Tab.Screen name="Goals" component={GoalsPage} />
      <Tab.Screen name="Dashboard" component={DashboardPage} />
      <Tab.Screen name="Setting" component={SettingPage} />
    </Tab.Navigator>
  );
};

export default TabNavigation;
