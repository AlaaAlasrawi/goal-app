import { AppUser } from "../hooks/types";

const URL = "http://192.168.1.165:8080/api/v1/user";

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
    console.log(data);

    return data;
  }
}
export default new UserService();
