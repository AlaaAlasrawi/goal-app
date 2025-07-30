import React from "react";
import { View, StyleSheet, TouchableOpacity, Animated } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons"; // or react-native-vector-icons
import { useTheme } from "../hooks/ThemeContext";

const AppToggleButton = () => {
  const { theme, isDark, toggleTheme } = useTheme();

  return (
    <TouchableOpacity onPress={toggleTheme} activeOpacity={0.8}>
      <View
        style={[
          styles.container,
          {
            backgroundColor: isDark ? "#1e1e1e" : "#e6e6e6",
            flexDirection: isDark ? "row-reverse" : "row",
          },
        ]}
      >
        <View style={[styles.iconContainer, { backgroundColor: theme.toggle }]}>
          <MaterialCommunityIcons
            name={isDark ? "moon-waning-crescent" : "white-balance-sunny"}
            color="white"
            size={20}
          />
        </View>
        <View style={styles.sideIcon}>
          <MaterialCommunityIcons
            name={isDark ? "white-balance-sunny" : "moon-waning-crescent"}
            color={isDark ? "#555" : "#888"}
            size={20}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 70,
    height: 36,
    borderRadius: 20,
    padding: 4,
    alignItems: "center",
    justifyContent: "space-between",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  iconContainer: {
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
  },
  sideIcon: {
    paddingHorizontal: 6,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default AppToggleButton;
