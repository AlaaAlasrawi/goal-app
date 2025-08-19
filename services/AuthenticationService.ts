import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_BASE, TOKEN_KEY } from "../api/env";
import { Alert } from "react-native";
import { AppUserSignUp } from "../hooks/types";

const URL = `${API_BASE}/idm`;
const USER_KEY = "1234";

class AuthenticationService {
  public async login(username: string, password: string): Promise<string> {
    try {
      const res = await fetch(`${URL}/login`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      const raw = await res.text(); // read once for better error logs

      if (!res.ok) {
        // 401/400/etc.
        console.warn("login failed:", res.status, raw);
        return "";
      }

      // Expecting: { "token": "..." }
      let data: any = {};
      try {
        data = raw ? JSON.parse(raw) : {};
      } catch (e) {
        console.warn("login JSON parse error:", e, raw);
        return "";
      }

      const token = typeof data?.token === "string" ? data.token : "";
      if (!token) {
        console.warn("login: token not found in response:", data);
      }
      return token;
    } catch (error) {
      console.error("login exception:", error);
      return "";
    }
  }

  public async logout(): Promise<void> {
    console.log("logout");
    await AsyncStorage.removeItem(TOKEN_KEY);
  }

  public async register(input: AppUserSignUp): Promise<number> {
    try {
      const res = await fetch(`${URL}/register`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(input),
      });

      const raw = await res.text();

      if (!res.ok) {
        console.warn("register failed", res.status, raw);
        return 0;
      }

      const data = raw ? JSON.parse(raw) : {};
      const id = typeof (data as any).id === "number" ? (data as any).id : 0;
      return id;
    } catch (error) {
      console.error("register error:", error);
      return 0;
    }
  }
}
export default new AuthenticationService();
