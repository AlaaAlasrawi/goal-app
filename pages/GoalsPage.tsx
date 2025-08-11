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
import GoalItem from "../components/GoalItem";
import { Goal } from "../hooks/types";
import { Ionicons } from "@expo/vector-icons";
import GoalModal from "../components/GoalModal";
import GoalService from "../services/GoalService";

const GoalsPage = () => {
  const [goals, setGoals] = useState<Goal[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [refresh, setRefresh] = useState(0);

  const { theme } = useTheme();
  const styles = createStyles(theme);

  useEffect(() => {
    const loadGoals = async () => {
      setGoals(await GoalService.getAllGoals());
    };
    loadGoals();
  }, [refresh]);

  const handleAddGoal = async (
    goalData: Omit<Goal, "id" | "createdAt" | "completed">
  ) => {
    const newGoal: Goal = {
      id: Math.random(),
      title: goalData.title,
      description: goalData.description,
      category: goalData.category,
      dueDate: goalData.dueDate,
      completed: false,
      createdAt: new Date().toISOString(),
    };

    await GoalService.addGoal(newGoal);
    setRefresh((pre) => pre + 1);
    setModalVisible(false);
  };

  const toggleGoal = async (id: number) => {
    await GoalService.toggleGoal(id);
    setRefresh((pre) => pre + 1);
    console.log("toggle");
  };

  const deleteGoal = (id: number) => {
    Alert.alert("Delete Goal", "Are you sure you want to delete this goal?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: async () => {
          await GoalService.deleteGoal(id);
          setRefresh((pre) => pre + 1);
        },
      },
    ]);
  };

  const updateGoal = async (id: number, updateGoal: Goal) => {
    await GoalService.updateGoal(id, updateGoal);
    setRefresh((pre) => pre + 1);
    console.log("update goal !!");
  };

  const renderGoal = ({ item }: { item: Goal }) => (
    <GoalItem
      goal={item}
      theme={theme}
      onToggle={toggleGoal}
      onDelete={deleteGoal}
      onEdit={updateGoal}
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
