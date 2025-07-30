import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useTheme } from "../../hooks/ThemeContext";

interface UserInfoCardProps {
  totalGoals: number;
  completedGoals: number;
  streaks: number; // consecutive days with at least one goal added
}

const UserInfoCard = ({
  totalGoals,
  completedGoals,
  streaks,
}: UserInfoCardProps) => {
  const { theme } = useTheme();
  const styles = createStyles(theme);

  return (
    <View style={styles.card}>
      <View style={styles.statsRow}>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>{totalGoals}</Text>
          <Text style={styles.statLabel}>Total Goals</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>{completedGoals}</Text>
          <Text style={styles.statLabel}>Completed</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>{streaks}</Text>
          <Text style={styles.statLabel}>Streaks 🔥</Text>
        </View>
      </View>
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
    label: {
      fontSize: 14,
      fontWeight: "600",
      marginBottom: 4,
      color: theme.placeholder,
    },
    value: {
      fontSize: 16,
      fontWeight: "500",
      marginBottom: 10,
      color: theme.text,
    },
    statsRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginTop: 10,
    },
    statItem: {
      alignItems: "center",
      flex: 1,
    },
    statValue: {
      fontSize: 20,
      fontWeight: "700",
      color: theme.primary,
    },
    statLabel: {
      fontSize: 13,
      marginTop: 4,
      color: theme.placeholder,
    },
  });

export default UserInfoCard;
