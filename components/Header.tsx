import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useTheme } from "../hooks/ThemeContext";

const Header = () => {
  const { theme } = useTheme();

  return (
    <View style={[styles.header, { backgroundColor: theme.surface }]}>
      <MaterialCommunityIcons name="target" size={28} color={theme.primary} />
      <Text style={[styles.title, { color: theme.text }]}>Goal App</Text>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingTop: 48,
    paddingBottom: 12,
    gap: 8,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
});
