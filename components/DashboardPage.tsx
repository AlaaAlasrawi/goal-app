import React, { useEffect, useState } from "react";
import { View, StyleSheet, Dimensions, ScrollView } from "react-native";
import { Text } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { BarChart } from "react-native-chart-kit";
import { useTheme } from "../hooks/ThemeContext";

const DashboardPage = () => {
  const { theme } = useTheme();
  const [goalTitles, setGoalTitles] = useState<string[]>([]);
  const [ratings, setRatings] = useState<number[]>([]);

  useEffect(() => {
    const loadData = async () => {
      try {
        const keys = await AsyncStorage.getAllKeys();
        const goalKeys = keys.filter((key) => key.startsWith("goal_"));
        const stores = await AsyncStorage.multiGet(goalKeys);

        const titles: string[] = [];
        const values: number[] = [];

        stores.forEach(([key, value]) => {
          if (value) {
            const parsed = JSON.parse(value);
            const goalName = decodeURIComponent(key.replace("goal_", ""));
            titles.push(goalName);
            values.push(parsed.rating || 0);
          }
        });

        setGoalTitles(titles);
        setRatings(values);
      } catch (error) {
        console.error("Failed to load dashboard data:", error);
      }
    };

    loadData();
  }, []);

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: theme.background }]}
    >
      <Text style={[styles.title, { color: theme.text }]}>
        🎯 Goal Progress Dashboard
      </Text>

      {goalTitles.length > 0 ? (
        <BarChart
          data={{
            labels: goalTitles,
            datasets: [{ data: ratings }],
          }}
          width={Dimensions.get("window").width - 32}
          height={280}
          fromZero
          yAxisSuffix="/10"
          chartConfig={{
            backgroundGradientFrom: theme.surface,
            backgroundGradientTo: theme.surface,
            color: () => theme.primary,
            labelColor: () => theme.text,
            propsForBackgroundLines: {
              stroke: "#ccc",
            },
          }}
          yAxisLabel=""
          style={{ borderRadius: 12 }}
        />
      ) : (
        <Text style={{ color: theme.text, marginTop: 20 }}>
          No rated goals yet.
        </Text>
      )}
    </ScrollView>
  );
};

export default DashboardPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 24,
  },
});
