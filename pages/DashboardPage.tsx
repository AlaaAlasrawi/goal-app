import React, { useEffect, useState } from "react";
import { ScrollView } from "react-native";
import { useTheme } from "../hooks/ThemeContext";
import { Goal } from "../hooks/types";
import UserInfoCard from "../components/dashboard/UserInfoCard";
import RecentlyCreatedGoals from "../components/dashboard/RecentlyCreatedGoals";
import GoalsBarChart from "../components/dashboard/GoalsBarChart";
import GoalService from "../services/GoalService";

const goalsBarData = [
  { label: "Mon", value: 2 },
  { label: "Tue", value: 1 },
  { label: "Wed", value: 3 },
];

const DashboardPage = () => {
  const { theme } = useTheme();
  const [goals, setGoals] = useState<Goal[]>([]);

  useEffect(() => {
    const loadGoals = async () => {
      setGoals(await GoalService.getAllGoals());
    };
    loadGoals();
  }, []);

  return (
    <ScrollView style={{ backgroundColor: theme.background, padding: 16 }}>
      <GoalsBarChart data={goalsBarData} />
      <UserInfoCard totalGoals={goals.length} completedGoals={6} streaks={3} />
      <RecentlyCreatedGoals goals={goals} />
    </ScrollView>
  );
};

export default DashboardPage;
