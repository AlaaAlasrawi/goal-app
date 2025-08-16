import { API_BASE } from "../api/env";
import { AppUser } from "../hooks/types";

const URL = `${API_BASE}/user`;

class UserService {
  public async getUserProfile(): Promise<AppUser> {
    const res = await fetch(`${URL}/profile`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
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
