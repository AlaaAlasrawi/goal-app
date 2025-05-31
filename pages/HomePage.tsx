import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { useTheme } from "../hooks/ThemeContext";
import { Button } from "react-native-paper";
import { NavigationProp, useNavigation } from "@react-navigation/native";

import { TabRoutes } from "../hooks/types";
import Header from "../components/Header";

const HomePage = () => {
  const { theme } = useTheme();
  const navigation = useNavigation<NavigationProp<TabRoutes>>();

  const handleStart = () => {
    navigation.navigate("Goals");
    console.log("pressed");
  };

  const dynamicStyles = StyleSheet.create({
    scroll: {
      backgroundColor: theme.surface,
    },
    container: {
      padding: 24,
      backgroundColor: theme.background,
      minHeight: "100%",
      alignItems: "center",
      justifyContent: "center",
    },
    heading: {
      fontSize: 24,
      fontWeight: "bold",
      textAlign: "center",
      marginBottom: 10,
      color: theme.text,
    },
    subtitle: {
      fontSize: 16,
      textAlign: "center",
      marginBottom: 30,
      maxWidth: 300,
      color: theme.text,
    },
    button: {
      marginTop: 10,
      borderRadius: 8,
      paddingHorizontal: 16,
      paddingVertical: 6,
    },
  });

  return (
    <ScrollView
      style={dynamicStyles.scroll}
      contentContainerStyle={{ flexGrow: 1 }}
      keyboardShouldPersistTaps="handled"
      scrollEnabled={true}
      showsVerticalScrollIndicator={false}
    >
      <Header />
      <View style={dynamicStyles.container}>
        <Text style={dynamicStyles.heading}>Welcome to the Goal App 🏆</Text>
        <Text style={dynamicStyles.subtitle}>
          Track your goals, stay focused, and celebrate achievements!
        </Text>
        <Button
          mode="contained"
          onPress={handleStart}
          style={dynamicStyles.button}
          buttonColor={theme.primary}
          labelStyle={{
            color: theme.onPrimary,
            fontWeight: "bold",
            fontSize: 16,
          }}
        >
          Let's Start
        </Button>
      </View>
    </ScrollView>
  );
};

export default HomePage;
