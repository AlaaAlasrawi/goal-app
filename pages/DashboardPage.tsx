import React, { useEffect, useState } from "react";
import {
  View,
  ScrollView,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Text } from "react-native-paper";
import { BarChart, PieChart } from "react-native-chart-kit";
import { useTheme } from "../hooks/ThemeContext";
import Header from "../components/Header";
import { useNavigation } from "@react-navigation/native";
import { NavigationProp } from "@react-navigation/native";
import { RootStackParamList } from "../hooks/types";

const screenWidth = Dimensions.get("window").width;

const DashboardPage = () => {
  const { theme } = useTheme();
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [goals, setGoals] = useState<
    {
      title: string;
      rating: number;
      category?: string;
    }[]
  >([]);

  useEffect(() => {
    const loadRatings = async () => {
      try {
        const keys = await AsyncStorage.getAllKeys();
        const goalKeys = keys.filter((key) => key.startsWith("goal_"));

        const stores = await AsyncStorage.multiGet(goalKeys);
        const loadedGoals: {
          title: string;
          rating: number;
          category?: string;
        }[] = [];

        stores.forEach(([key, value]) => {
          if (value) {
            const title = decodeURIComponent(key.replace("goal_", ""));
            const parsed = JSON.parse(value);
            if (typeof parsed.rating === "number") {
              loadedGoals.push({
                title,
                rating: parsed.rating,
                category: parsed.category || "Uncategorized",
              });
            }
          }
        });

        setGoals(loadedGoals);
      } catch (error) {
        console.error("Failed to load goals:", error);
      }
    };

    loadRatings();
  }, []);

  const chartData = {
    labels: goals.map((g) => g.title),
    datasets: [{ data: goals.map((g) => g.rating) }],
  };

  const pieData = goals.reduce(
    (
      acc: {
        name: string;
        value: number;
        color: string;
        legendFontColor: string;
        legendFontSize: number;
      }[],
      goal
    ) => {
      const existing = acc.find((c) => c.name === goal.category);
      if (existing) existing.value += 1;
      else
        acc.push({
          name: goal.category ?? "Uncategorized",
          value: 1,
          color: theme.primary,
          legendFontColor: theme.text,
          legendFontSize: 12,
        });
      return acc;
    },
    []
  );

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: theme.background }]}
    >
      <Header />

      <Text style={[styles.heading, { color: theme.text }]}>
        📊 Goal Ratings
      </Text>

      {goals.length > 0 ? (
        <BarChart
          data={chartData}
          width={screenWidth - 32}
          height={260}
          fromZero
          yAxisLabel=""
          yAxisSuffix="%"
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

      {pieData.length > 0 && (
        <>
          <Text style={[styles.heading, { color: theme.text }]}>
            📈 Categories
          </Text>
          <PieChart
            data={pieData}
            width={screenWidth - 32}
            height={240}
            accessor="value"
            backgroundColor="transparent"
            paddingLeft="15"
            chartConfig={{
              color: () => theme.primary,
              labelColor: () => theme.text,
            }}
            style={styles.chart}
          />
        </>
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
    fontSize: 20,
    fontWeight: "600",
    textAlign: "center",
    marginTop: 30,
    marginBottom: 16,
  },
  chart: {
    paddingLeft: 15,
    borderRadius: 12,
    marginBottom: 30,
  },
});
