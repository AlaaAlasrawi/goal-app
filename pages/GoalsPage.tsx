import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  Alert,
  StyleSheet,
  Modal,
  TouchableOpacity,
} from "react-native";
import { useTheme } from "../hooks/ThemeContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import GoalItem from "../components/GoalItem";

import { Goal } from "../hooks/types";
import { Ionicons } from "@expo/vector-icons";
import GoalModal from "../components/GoalModal";

const STORAGE_KEY = "goals";

const GoalsPage = () => {
  const [goals, setGoals] = useState<Goal[]>([]);
  const [modalVisible, setModalVisible] = useState(false);

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

  const handleAddGoal = (
    goalData: Omit<Goal, "id" | "createdAt" | "completed">
  ) => {
    const newGoal: Goal = {
      id: Date.now(),
      title: goalData.title,
      description: goalData.description,
      category: goalData.category,
      dueDate: goalData.dueDate,
      completed: false,
      createdAt: new Date().toISOString(),
    };
    setGoals([newGoal, ...goals]);
    setModalVisible(false);
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

      <TouchableOpacity
        onPress={() => setModalVisible(true)}
        style={styles.addButton}
      >
        <Ionicons name="add-circle-outline" size={28} color={theme.primary} />
        <Text style={styles.addText}>Add New Goal</Text>
      </TouchableOpacity>

      {goals.length === 0 ? (
        <Text style={styles.emptyText}>
          No goals yet. Press the button above!
        </Text>
      ) : (
        <FlatList
          data={sortedGoals}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderGoal}
          contentContainerStyle={{ paddingBottom: 40 }}
        />
      )}

      <GoalModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onSubmit={handleAddGoal}
        theme={theme}
      />
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
      fontSize: 16,
      textAlign: "center",
    },
    addButton: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: 20,
    },
    addText: {
      marginLeft: 10,
      fontSize: 18,
      fontWeight: "600",
      color: theme.primary,
    },
  });

export default GoalsPage;
