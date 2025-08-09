import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Goal } from "../hooks/types";

interface GoalItemProps {
  goal: Goal;
  theme: any;
  onToggle: (id: string, goal: Goal) => void;
  onDelete: (id: string) => void;
}

const GoalItem = ({ goal, theme, onToggle, onDelete }: GoalItemProps) => {
  const styles = createStyles(theme);

  return (
    <View style={[styles.wrapper, { backgroundColor: theme.surface }]}>
      <TouchableOpacity onPress={() => onToggle(goal.id, goal)}>
        <Ionicons
          name={goal.completed ? "checkbox-outline" : "square-outline"}
          size={22}
          color={goal.completed ? theme.primary : theme.placeholder}
          style={styles.checkboxIcon}
        />
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => onToggle(goal.id, goal)}
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
        <Text style={[styles.createdText, { color: theme.placeholder }]}>
          Created: {new Date(goal.createdAt).toLocaleString()}
        </Text>
      </TouchableOpacity>
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
    goalText: {
      fontSize: 16,
      fontWeight: "600",
    },
    createdText: {
      fontSize: 11,
      marginTop: 4,
    },
    checkboxIcon: {
      marginRight: 10,
      marginTop: 2,
    },
  });

export default GoalItem;
