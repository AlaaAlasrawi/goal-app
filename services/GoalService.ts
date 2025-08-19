import { API_BASE } from "../api/env";
import { Goal } from "../hooks/types";

const URL = `${API_BASE}/goal`;

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

      return response.content;
    } catch (error) {
      console.log(error);
      console.log("fails to get ALL goals");
      return [];
    }
  }

  public async deleteGoal(goalId: number): Promise<boolean> {
    try {
      const promise = await fetch(`${URL}/${goalId}`, {
        method: "DELETE",
      });
      const response = await promise.json();
      return response;
    } catch (error) {
      return false;
    }
  }

  public async toggleGoal(id: number): Promise<boolean> {
    try {
      const promise = await fetch(`${URL}/${id}/completed`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const response = promise.json();
      return response;
    } catch (error) {
      console.log(error);

      return false;
    }
  }

  public async updateGoal(id: number, updatedGoal: Goal): Promise<void> {
    try {
      const promise = await fetch(`${URL}/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedGoal),
      });
    } catch (error) {
      console.log(error);
    }
  }

  public async getCompletedGoalsCount(): Promise<number> {
    try {
      const promise = await fetch(`${URL}/completed-goals-count`);
      const response = promise.json();
      return response;
    } catch (error) {
      console.log(error);
      return 0;
    }
  }
}

export default new GoalService();
