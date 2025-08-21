import React, { JSX, useEffect, useMemo, useState } from "react";
import {
  View,
  Text,
  FlatList,
  Alert,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useFormik } from "formik";
import { useTheme } from "../hooks/ThemeContext";
import GoalItem from "../components/GoalItem";
import GoalModal from "../components/GoalModal";
import GoalService from "../services/GoalService";
import { Goal, GoalFormValues } from "../hooks/types";
import { GoalValidation } from "../validations/GoalValidation";

type Theme = {
  background: string;
  text: string;
  primary: string;
  placeholder: string;
  onPrimary?: string;
};

interface props {
  refresh: number;
  setRefresh: (state: any) => void;
}

function GoalsPage({ refresh, setRefresh }: props): JSX.Element {
  const [goals, setGoals] = useState<Goal[]>([]);
  const [modalVisible, setModalVisible] = useState(false);

  const { theme } = useTheme() as { theme: Theme };
  const styles = useMemo(() => createStyles(theme), [theme]);

  useEffect(() => {
    async function loadGoals() {
      const list = await GoalService.getAllGoals();
      setGoals(list ?? []);
    }
    loadGoals();
  }, [refresh]);

  const formik = useFormik<GoalFormValues>({
    initialValues: { title: "", description: "", category: "", dueDate: "" },
    validationSchema: GoalValidation,
    onSubmit: async (values, { resetForm }) => {
      await handleAddGoal(values);
      resetForm();
      setModalVisible(false);
    },
  });

  useEffect(() => {}, [
    formik.values,
    formik.errors,
    formik.touched,
    formik.isSubmitting,
    formik.isValid,
    formik.submitCount,
  ]);

  async function handleAddGoal(goalData: GoalFormValues): Promise<void> {
    const newGoal: Goal = {
      id: Math.floor(Math.random() * 1_000_000_000),
      title: goalData.title.trim(),
      description: goalData.description?.trim(),
      category: goalData.category?.trim(),
      dueDate: goalData.dueDate || undefined,
      isCompleted: false,
      createdAt: new Date().toISOString(),
    };
    await GoalService.addGoal(newGoal);
    setRefresh((p: number) => p + 1);
  }

  async function toggleGoal(id: number): Promise<void> {
    await GoalService.toggleGoal(id);
    setRefresh((p: number) => p + 1);
  }

  function deleteGoal(id: number): void {
    Alert.alert("Delete Goal", "Are you sure you want to delete this goal?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: async () => {
          await GoalService.deleteGoal(id);
          setRefresh((p: number) => p + 1);
        },
      },
    ]);
  }

  async function updateGoal(id: number, updated: Goal): Promise<void> {
    await GoalService.updateGoal(id, updated);
    setRefresh((p: number) => p + 1);
  }

  function renderGoal({ item }: { item: Goal }): JSX.Element {
    return (
      <GoalItem
        id={item.id}
        goal={item}
        theme={theme}
        onToggle={toggleGoal}
        onDelete={deleteGoal}
        onEdit={updateGoal}
      />
    );
  }

  const sortedGoals = useMemo(
    () => [
      ...goals.filter((g) => !g.isCompleted),
      ...goals.filter((g) => g.isCompleted),
    ],
    [goals]
  );

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
          keyExtractor={(item) => String(item.id)}
          renderItem={renderGoal}
          contentContainerStyle={{ paddingBottom: 40 }}
        />
      )}

      <GoalModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        theme={theme}
        mode="create"
        onSubmit={async (values) => {
          await handleAddGoal(values);
          setModalVisible(false);
        }}
      />
    </View>
  );
}

function createStyles(theme: Theme) {
  return StyleSheet.create({
    container: { flex: 1, padding: 20, backgroundColor: theme.background },
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
    addButton: { flexDirection: "row", alignItems: "center", marginBottom: 20 },
    addText: {
      marginLeft: 10,
      fontSize: 18,
      fontWeight: "600",
      color: theme.primary,
    },
  });
}

export default GoalsPage;
