import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Goal } from "../../hooks/types";
import { useTheme } from "../../hooks/ThemeContext";

type Props = {
  goals: Goal[];
  limit?: number;
};

const RecentlyCreatedGoals = ({ goals, limit = 5 }: Props) => {
  const { theme } = useTheme();
  const styles = createStyles(theme);

  const sortedGoals = [...goals]
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    )
    .slice(0, limit);

  if (sortedGoals.length === 0) return null;

  return (
    <View style={styles.card}>
      <Text style={styles.header}>Recently Created</Text>
      {sortedGoals.map((goal) => (
        <View key={goal.id} style={styles.goalRow}>
          <Text style={styles.title}>{goal.title}</Text>
          <Text style={styles.date}>
            {new Date(goal.createdAt).toLocaleDateString()} –{" "}
            {new Date(goal.createdAt).toLocaleTimeString()}
          </Text>
        </View>
      ))}
    </View>
  );
};

const createStyles = (theme: any) =>
  StyleSheet.create({
    card: {
      borderRadius: 12,
      padding: 16,
      marginVertical: 12,
      elevation: 3,
      backgroundColor: theme.surface,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.1,
      shadowRadius: 3,
    },
    header: {
      alignSelf: "center",
      fontSize: 18,
      fontWeight: "bold",
      color: theme.primary,
      marginBottom: 15,
    },
    goalRow: {
      marginBottom: 12,
      borderBottomWidth: 1,
      borderBottomColor: theme.background,
      paddingBottom: 8,
    },
    title: {
      fontSize: 16,
      fontWeight: "600",
      color: theme.text,
    },
    date: {
      fontSize: 13,
      color: theme.placeholder,
      marginTop: 4,
    },
  });

export default RecentlyCreatedGoals;
