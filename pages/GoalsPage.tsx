import React, { useState, useEffect } from "react";
import { View, Text, FlatList, Alert, StyleSheet } from "react-native";
import { useTheme } from "../hooks/ThemeContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import GoalItem from "../components/GoalItem";
import GoalInput from "../components/GoalInput";
import { Goal } from "../hooks/types";

const STORAGE_KEY = "goals";

const GoalsPage = () => {
  const [goals, setGoals] = useState<Goal[]>([]);

  const { theme } = useTheme();
  const styles = createStyles(theme);

  useEffect(() => {
    const loadGoals = async () => {
      const stored = await AsyncStorage.getItem(STORAGE_KEY);
      if (stored) setGoals(JSON.parse(stored));
    };
    loadGoals();
  }, []);

  useEffect(() => {
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(goals));
  }, [goals]);

  const handleAddGoal = (title: string) => {
    const goal: Goal = {
      id: Date.now(),
      title,
      completed: false,
      createdAt: new Date().toISOString(),
    };
    setGoals([goal, ...goals]);
  };

  const toggleGoal = (id: number) => {
    setGoals((prev) =>
      prev.map((g) => (g.id === id ? { ...g, completed: !g.completed } : g))
    );
  };

  const deleteGoal = (id: number) => {
    Alert.alert("Delete Goal", "Are you sure you want to delete this goal?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: () => setGoals((prev) => prev.filter((g) => g.id !== id)),
      },
    ]);
  };

  const renderGoal = ({ item }: { item: Goal }) => (
    <GoalItem
      goal={item}
      theme={theme}
      onToggle={toggleGoal}
      onDelete={deleteGoal}
    />
  );

  const sortedGoals = [
    ...goals.filter((g) => !g.completed),
    ...goals.filter((g) => g.completed),
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.header}>My Goals</Text>

      <GoalInput theme={theme} onAdd={handleAddGoal} />

      {goals.length === 0 ? (
        <Text style={styles.emptyText}>No goals yet. Add one above!</Text>
      ) : (
        <FlatList
          data={sortedGoals}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderGoal}
          contentContainerStyle={{ paddingBottom: 40 }}
        />
      )}
    </View>
  );
};

const createStyles = (theme: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      backgroundColor: theme.background,
    },
    header: {
      fontSize: 26,
      fontWeight: "700",
      marginBottom: 20,
      color: theme.text,
    },
    emptyText: {
      color: theme.placeholder,
      marginTop: 30,
    },
  });

export default GoalsPage;
