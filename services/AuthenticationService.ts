import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_BASE, TOKEN_KEY } from "../api/env";
import { Alert } from "react-native";
import { AppUserSignUp } from "../hooks/types";

const URL = `${API_BASE}/idm`;
const USER_KEY = "1234";

class AuthenticationService {
  public async login(username: string, password: string): Promise<string> {
    try {
      console.log("login");
      AsyncStorage.setItem(TOKEN_KEY, USER_KEY);
      return USER_KEY;
    } catch (error) {
      Alert.alert("Login failed", String(error));
      return "";
    }
  }

  public async logout(): Promise<void> {
    console.log("logout");
    await AsyncStorage.removeItem(TOKEN_KEY);
  }

  public async register(input: AppUserSignUp): Promise<number> {
    console.log("regesrer sucess");
    return 1;
  }
}
export default new AuthenticationService();
