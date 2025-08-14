import React, { useEffect, useState } from "react";
import { ScrollView } from "react-native";
import { useTheme } from "../hooks/ThemeContext";
import { Goal } from "../hooks/types";
import UserInfoCard from "../components/dashboard/UserInfoCard";
import RecentlyCreatedGoals from "../components/dashboard/RecentlyCreatedGoals";
import GoalService from "../services/GoalService";
import UserService from "../services/UserService";
import GoalsPieChart from "../components/dashboard/GoalsPieChart";

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
      <UserInfoCard
        totalGoals={goals.length}
        completedGoals={completedGoals}
        streaks={3}
      />
      <GoalsPieChart completed={completedGoals} total={goals.length} />
      <RecentlyCreatedGoals goals={goals} />
    </ScrollView>
  );
};

export default DashboardPage;
