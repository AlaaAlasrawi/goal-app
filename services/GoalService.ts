import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_BASE, TOKEN_KEY } from "../api/env";
import { Goal } from "../hooks/types";

const URL = `${API_BASE}/goal`;

class GoalService {
  private async buildHeaders(
    includeToken: boolean = true,
    hasJsonBody: boolean = false
  ): Promise<Headers> {
    const headers = new Headers();

    if (includeToken) {
      const token = await AsyncStorage.getItem(TOKEN_KEY);
      if (token) headers.set("Authorization", `Bearer ${token}`);
    }

    if (hasJsonBody) {
      headers.set("Content-Type", "application/json");
    }

    return headers;
  }

  public async addGoal(goal: Goal): Promise<void> {
    try {
      await fetch(URL, {
        method: "POST",
        headers: await this.buildHeaders(true, true),
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
        headers: await this.buildHeaders(true, false),
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
        headers: await this.buildHeaders(true, true),
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
        headers: await this.buildHeaders(),
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
        headers: await this.buildHeaders(true, true),
        body: JSON.stringify(updatedGoal),
      });
    } catch (error) {
      console.log(error);
    }
  }

  public async getCompletedGoalsCount(): Promise<number> {
    try {
      const promise = await fetch(`${URL}/completed-goals-count`, {
        method: "GET",
        headers: await this.buildHeaders(),
      });
      const response = promise.json();
      return response;
    } catch (error) {
      console.log(error);
      return 0;
    }
  }
}

export default new GoalService();
