import React, { useEffect, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { useTheme } from "../hooks/ThemeContext";
import Header from "./Header";
import { Button, TextInput } from "react-native-paper";
import { RootStackParamList } from "../hooks/types";
import AsyncStorage from "@react-native-async-storage/async-storage";

const GoalPage = () => {
  const [goals, setGoals] = useState<string[]>([]);
  const [input, setInput] = useState("");
  const { theme } = useTheme();
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  // Load saved goals on mount
  useEffect(() => {
    const loadGoals = async () => {
      const saved = await AsyncStorage.getItem("goals");
      if (saved) {
        setGoals(JSON.parse(saved));
      }
    };
    loadGoals();
  }, []);

  // Save goals every time it updates
  useEffect(() => {
    AsyncStorage.setItem("goals", JSON.stringify(goals));
  }, [goals]);

  const handleAddGoal = () => {
    if (input.trim() === "") return;
    setGoals((prevGoals) => [...prevGoals, input.trim()]);
    setInput("");
  };

  const styles = StyleSheet.create({
    scroll: { backgroundColor: theme.surface },
    container: {
      padding: 24,
      backgroundColor: theme.background,
      minHeight: "100%",
      flexGrow: 1,
    },
    text: {
      color: theme.text,
      fontSize: 16,
      marginBottom: 12,
    },
    input: {
      marginBottom: 16,
      overflow: "hidden",
      elevation: 2,
      backgroundColor: theme.surface,
    },
    button: { marginBottom: 24 },
    goalCard: {
      padding: 16,
      borderRadius: 12,
      marginBottom: 12,
      elevation: 3,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      backgroundColor: theme.surface,
    },
    goalText: {
      fontSize: 16,
      fontWeight: "500",
      color: theme.text,
    },
  });

  return (
    <ScrollView style={styles.scroll}>
      <Header />
      <View style={styles.container}>
        <Text style={styles.text}>Enter your goal:</Text>

        <TextInput
          mode="outlined"
          value={input}
          onChangeText={setInput}
          placeholder="e.g. Finish my project"
          style={styles.input}
          activeOutlineColor={theme.primary}
          textColor={theme.text}
          placeholderTextColor={theme.placeholder}
        />

        <Button
          mode="contained"
          onPress={handleAddGoal}
          style={styles.button}
          buttonColor={theme.primary}
          labelStyle={{ color: theme.onPrimary }}
        >
          Add Goal
        </Button>

        {goals.map((goal, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => navigation.navigate("GoalDetails", { goal })}
          >
            <View style={styles.goalCard}>
              <Text style={styles.goalText}>{goal}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
};

export default GoalPage;
