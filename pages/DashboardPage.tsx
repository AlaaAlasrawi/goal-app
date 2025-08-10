import React, { useEffect, useState } from "react";
import { ScrollView } from "react-native";
import { useTheme } from "../hooks/ThemeContext";
import { Goal } from "../hooks/types";
import UserInfoCard from "../components/dashboard/UserInfoCard";
import RecentlyCreatedGoals from "../components/dashboard/RecentlyCreatedGoals";
import GoalsBarChart from "../components/dashboard/GoalsBarChart";
import GoalService from "../services/GoalService";
import UserService from "../services/UserService";

const goalsBarData = [
  { label: "Mon", value: 2 },
  { label: "Tue", value: 1 },
  { label: "Wed", value: 3 },
];

const DashboardPage = () => {
  const { theme } = useTheme();
  const [goals, setGoals] = useState<Goal[]>([]);
  const [completedGoals, setCompletedGoals] = useState<number>(0);

  useEffect(() => {
    (async () => {
      const [goalsData, user] = await Promise.all([
        GoalService.getAllGoals(),
        UserService.getUserProfile(),
      ]);
      setGoals(goalsData);
      setCompletedGoals(user.noCompletedGoals ?? 0);
    })();
  }, []);

  return (
    <ScrollView style={{ backgroundColor: theme.background, padding: 16 }}>
      <GoalsBarChart data={goalsBarData} />
      <UserInfoCard
        totalGoals={goals.length}
        completedGoals={completedGoals}
        streaks={3}
      />
      <RecentlyCreatedGoals goals={goals} />
    </ScrollView>
  );
};

export default DashboardPage;
