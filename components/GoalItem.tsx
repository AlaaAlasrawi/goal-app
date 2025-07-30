import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Goal } from "../hooks/types";

interface GoalItemProps {
  goal: Goal;
  theme: any;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
}

const GoalItem = ({ goal, theme, onToggle, onDelete }: GoalItemProps) => {
  const styles = createStyles(theme);

  return (
    <View
      style={[
        styles.goalItem,
        {
          backgroundColor: theme.surface,
          borderColor: goal.completed ? theme.primary : theme.placeholder,
        },
      ]}
    >
      <TouchableOpacity onPress={() => onToggle(goal.id)}>
        <Ionicons
          name={goal.completed ? "checkbox-outline" : "square-outline"}
          size={22}
          color={goal.completed ? theme.primary : theme.placeholder}
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
              textDecorationLine: goal.completed ? "line-through" : "none",
              opacity: goal.completed ? 0.6 : 1,
            },
          ]}
        >
          {goal.title}
        </Text>
        <Text style={styles.createdText}>
          Created: {new Date(goal.createdAt).toLocaleString()}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const createStyles = (theme: any) =>
  StyleSheet.create({
    goalItem: {
      flexDirection: "row",
      alignItems: "flex-start",
      padding: 14,
      borderRadius: 10,
      borderWidth: 1.5,
      marginBottom: 12,
    },
    goalText: {
      fontSize: 16,
      fontWeight: "600",
    },
    createdText: {
      color: theme.placeholder,
      fontSize: 11,
      marginTop: 4,
    },
    checkboxIcon: {
      marginRight: 10,
    },
  });

export default GoalItem;
