import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_BASE, TOKEN_KEY } from "../api/env";
import { AppUser } from "../hooks/types";

const URL = `${API_BASE}/user`;

class UserService {
  public async getUserProfile(): Promise<AppUser> {
    const token = await AsyncStorage.getItem(TOKEN_KEY);

    const res = await fetch(`${URL}/profile`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      } as HeadersInit,
    });

    if (!res.ok) {
      throw new Error(
        `Failed to fetch profile: ${res.status} ${res.statusText}`
      );
    }

    const data = (await res.json()) as AppUser;

    return data;
  }
}
export default new UserService();
