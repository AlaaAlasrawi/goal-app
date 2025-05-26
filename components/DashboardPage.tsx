import React, { useEffect, useState } from "react";
import { View, ScrollView, StyleSheet, Dimensions } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Text } from "react-native-paper";
import { BarChart } from "react-native-chart-kit";
import { useTheme } from "../hooks/ThemeContext";
import Header from "./Header";

const screenWidth = Dimensions.get("window").width;

const DashboardPage = () => {
  const { theme } = useTheme();
  const [labels, setLabels] = useState<string[]>([]);
  const [ratings, setRatings] = useState<number[]>([]);

  useEffect(() => {
    const loadRatings = async () => {
      try {
        const keys = await AsyncStorage.getAllKeys();
        const goalKeys = keys.filter((key) => key.startsWith("goal_"));

        const stores = await AsyncStorage.multiGet(goalKeys);
        const loadedLabels: string[] = [];
        const loadedRatings: number[] = [];

        stores.forEach(([key, value]) => {
          if (value) {
            const goalTitle = decodeURIComponent(key.replace("goal_", ""));
            const parsed = JSON.parse(value);
            if (typeof parsed.rating === "number") {
              loadedLabels.push(goalTitle);
              loadedRatings.push(parsed.rating);
            }
          }
        });

        setLabels(loadedLabels);
        setRatings(loadedRatings);
      } catch (error) {
        console.error("Failed to load goals:", error);
      }
    };

    loadRatings();
  }, []);

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: theme.background }]}
    >
      <Header />
      <Text style={[styles.heading, { color: theme.text }]}>
        📊 Goal Progress
      </Text>

      {ratings.length > 0 ? (
        <BarChart
          data={{
            labels,
            datasets: [{ data: ratings }],
          }}
          width={screenWidth - 32}
          height={280}
          fromZero
          yAxisLabel=""
          yAxisSuffix="/10"
          chartConfig={{
            backgroundGradientFrom: theme.surface,
            backgroundGradientTo: theme.surface,
            decimalPlaces: 1,
            color: () => theme.primary,
            labelColor: () => theme.text,
            propsForBackgroundLines: {
              stroke: "#ccc",
            },
          }}
          style={styles.chart}
        />
      ) : (
        <Text style={{ color: theme.text, textAlign: "center", marginTop: 20 }}>
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
  },
  heading: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
    marginTop: 30,
  },
  chart: {
    borderRadius: 16,
    padding: 15,
  },
});
