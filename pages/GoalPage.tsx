import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { useTheme } from "../hooks/ThemeContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Header from "../components/Header";
import GoalInput from "../components/GoalInput";
import GoalListItem from "../components/GoalListItem";
import { Button } from "react-native-paper";

const GoalPage = () => {
  const [goals, setGoals] = useState<string[]>([]);

  const { theme } = useTheme();

  useEffect(() => {
    const loadGoals = async () => {
      const saved = await AsyncStorage.getItem("goals");
      if (saved) {
        setGoals(JSON.parse(saved));
      }
    };
    loadGoals();
  }, []);

  useEffect(() => {
    AsyncStorage.setItem("goals", JSON.stringify(goals));
  }, [goals]);

  const handleAddGoal = (input: string) => {
    if (input.trim() === "") return;
    setGoals((prevGoals) => [...prevGoals, input.trim()]);
  };

  function handleDeleteAllGoals() {
    setGoals([]);
    AsyncStorage.removeItem("goals");
  }

  const styles = StyleSheet.create({
    scroll: { backgroundColor: theme.surface },
    container: {
      padding: 24,
      backgroundColor: theme.background,
      minHeight: "100%",
      flexGrow: 1,
    },
    button: { marginBottom: 24 },
  });

  return (
    <ScrollView style={styles.scroll}>
      <Header />
      <View style={styles.container}>
        <GoalInput handleAddGoal={handleAddGoal} />
        {goals.map((goal, index) => (
          <GoalListItem goal={goal} index={index} key={index} />
        ))}
        {goals.length > 0 && (
          <Button
            mode="contained"
            onPress={() => {
              handleDeleteAllGoals();
            }}
            style={styles.button}
            buttonColor={theme.secondary}
            labelStyle={{ color: theme.onPrimary }}
          >
            Clear All
          </Button>
        )}
      </View>
    </ScrollView>
  );
};

export default GoalPage;
