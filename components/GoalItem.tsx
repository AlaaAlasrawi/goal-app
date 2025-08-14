import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Goal, GoalFormValues } from "../hooks/types";
import GoalModal from "./GoalModal";

interface GoalItemProps {
  goal: Goal;
  theme: any;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
  onEdit: (id: number, goal: Goal) => void;
}

const GoalItem = ({
  goal,
  theme,
  onToggle,
  onDelete,
  onEdit,
}: GoalItemProps) => {
  const [editOpen, setEditOpen] = useState(false);
  const styles = createStyles(theme);

  return (
    <View style={[styles.wrapper, { backgroundColor: theme.surface }]}>
      <TouchableOpacity
        onPress={() => {
          console.log(goal.id);
          onToggle(goal.id);
        }}
      >
        <Ionicons
          name={goal.isCompleted ? "checkbox-outline" : "square-outline"}
          size={22}
          color={goal.isCompleted ? theme.primary : theme.placeholder}
          style={styles.checkboxIcon}
        />
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => onToggle(goal.id)}
        onLongPress={() => onDelete(goal.id)}
        style={{ flex: 1 }}
      >
        <Text
          style={[
            styles.goalText,
            {
              color: theme.text,
              textDecorationLine: goal.isCompleted ? "line-through" : "none",
              opacity: goal.isCompleted ? 0.6 : 1,
            },
          ]}
        >
          {goal.title}
        </Text>
        <Text style={[styles.createdText, { color: theme.placeholder }]}>
          Created: {new Date(goal.createdAt).toLocaleString()}
        </Text>
      </TouchableOpacity>
      {!goal.isCompleted && (
        <TouchableOpacity
          onPress={() => setEditOpen(true)}
          style={styles.editBtn}
        >
          <Ionicons name="pencil" size={18} color={theme.primary} />
        </TouchableOpacity>
      )}
      <GoalModal
        visible={editOpen}
        onClose={() => setEditOpen(false)}
        theme={theme}
        mode="edit"
        initialValues={{
          title: goal.title,
          description: goal.description,
          category: goal.category,
          dueDate: goal.dueDate,
        }}
        onSubmit={async (values) => {
          await onEdit(goal.id, { ...goal, ...values });
          setEditOpen(false);
        }}
      />
    </View>
  );
};

const createStyles = (theme: any) =>
  StyleSheet.create({
    wrapper: {
      flexDirection: "row",
      alignItems: "flex-start",
      paddingVertical: 12,
      paddingHorizontal: 16,
      marginVertical: 8,
      borderRadius: 12,
      elevation: 2,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.1,
      shadowRadius: 2,
    },
    goalText: { fontSize: 16, fontWeight: "600" },
    createdText: { fontSize: 11, marginTop: 4 },
    checkboxIcon: { marginRight: 10, marginTop: 2 },
    editBtn: { padding: 6, marginLeft: 8 },
  });

export default GoalItem;
