import AsyncStorage from "@react-native-async-storage/async-storage";
import { Goal } from "../hooks/types";

const URL = "http://192.168.1.165:8080/api/v1/goal";

class GoalService {
  public async addGoal(goal: Goal): Promise<void> {
    try {
      await fetch(URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(goal),
      });
    } catch (error) {
      console.log(error);
    }
  }

  public async getAllGoals(): Promise<Goal[]> {
    try {
      const promise = await fetch(URL, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const response = await promise.json();
      console.log(response);

      return response.content;
    } catch (error) {
      console.log(error);
      return [];
    }
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
