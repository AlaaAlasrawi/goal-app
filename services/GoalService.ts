import AsyncStorage from "@react-native-async-storage/async-storage";
import { Goal } from "../hooks/types";

class GoalService {
  public async addGoal(goal: Goal): Promise<void> {
    const goals: Goal[] = JSON.parse(
      (await AsyncStorage.getItem("goals")) ?? "[]"
    );
    goals.push(goal);
    await AsyncStorage.setItem("goals", JSON.stringify(goals));
  }

  public async getAllGoals(): Promise<Goal[]> {
    return JSON.parse((await AsyncStorage.getItem("goals")) ?? "[]");
  }

  public async deleteGoal(goalId: number): Promise<void> {
    const goals: Goal[] = JSON.parse(
      (await AsyncStorage.getItem("goals")) ?? "[]"
    );
    const updatedGoals = goals.filter((goal) => goal.id !== goalId);
    await AsyncStorage.setItem("goals", JSON.stringify(updatedGoals));
  }

  public async toggleGoal(id: number) {
    const goals: Goal[] = JSON.parse(
      (await AsyncStorage.getItem("goals")) ?? "[]"
    );
    const goalIndex = goals.findIndex((goal) => goal.id === id);

    if (goalIndex !== -1) {
      goals[goalIndex] = {
        ...goals[goalIndex],
        completed: !goals[goalIndex].completed,
      };
      await AsyncStorage.setItem("goals", JSON.stringify(goals));
    }
  }

  public async updateGoal(id: number, updatedGoal: Goal): Promise<void> {
    const goals: Goal[] = JSON.parse(
      (await AsyncStorage.getItem("goals")) ?? "[]"
    );
    const goalIndex = goals.findIndex((goal) => goal.id === id);

    if (goalIndex !== -1) {
      goals[goalIndex] = updatedGoal;
      await AsyncStorage.setItem("goals", JSON.stringify(goals));
    }
  }
}

export default new GoalService();
