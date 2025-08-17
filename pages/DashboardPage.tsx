import React, { useEffect, useState } from "react";
import { ScrollView } from "react-native";
import { useTheme } from "../hooks/ThemeContext";
import { Goal } from "../hooks/types";
import UserInfoCard from "../components/dashboard/UserInfoCard";
import RecentlyCreatedGoals from "../components/dashboard/RecentlyCreatedGoals";
import GoalService from "../services/GoalService";
import GoalsPieChart from "../components/dashboard/GoalsPieChart";

interface props {
  refresh: number;
}

const DashboardPage = ({ refresh }: props) => {
  const [goals, setGoals] = useState<Goal[]>([]);
  const [completedGoals, setCompletedGoals] = useState<number>(0);
  const { theme } = useTheme();

  useEffect(() => {
    async function fetchData() {
      const [goalsData, completedGoalsCount] = await Promise.all([
        GoalService.getAllGoals(),
        GoalService.getCompletedGoalsCount(),
      ]);
      setGoals(goalsData);
      setCompletedGoals(completedGoalsCount ?? 0);
    }

    fetchData();
  }, [refresh]);

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
