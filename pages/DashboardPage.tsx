import React from "react";
import { ScrollView } from "react-native";
import { useTheme } from "../hooks/ThemeContext";
import { Goal } from "../hooks/types";
import UserInfoCard from "../components/dashboard/UserInfoCard";
import RecentlyCreatedGoals from "../components/dashboard/RecentlyCreatedGoals";
import GoalsBarChart from "../components/dashboard/GoalsBarChart";

const mockGoals: Goal[] = [
  {
    id: 1,
    title: "Study React Native",
    completed: false,
    createdAt: new Date().toISOString(),
    description: "Learn components and hooks",
  },
  {
    id: 2,
    title: "Read 20 pages 📚",
    completed: false,
    createdAt: new Date(Date.now() - 86400000).toISOString(),
    description: "Book: Atomic Habits",
  },
  // Add more mock goals here...
];

const goalsBarData = [
  { label: "Mon", value: 2 },
  { label: "Tue", value: 1 },
  { label: "Wed", value: 3 },
];

const DashboardPage = () => {
  const { theme } = useTheme();

  return (
    <ScrollView style={{ backgroundColor: theme.background, padding: 16 }}>
      <GoalsBarChart data={goalsBarData} />
      <UserInfoCard totalGoals={10} completedGoals={6} streaks={3} />
      <RecentlyCreatedGoals goals={mockGoals} />
    </ScrollView>
  );
};

export default DashboardPage;
