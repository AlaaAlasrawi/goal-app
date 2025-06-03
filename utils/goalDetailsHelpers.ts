import * as ImagePicker from "expo-image-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Load details for a single goal
export async function loadGoalDetails(goal: string) {
  const key = `goal_${encodeURIComponent(goal)}`;
  const stored = await AsyncStorage.getItem(key);
  return stored ? JSON.parse(stored) : {};
}

// Save details (description, image, rating)
export async function saveGoalDetails(goal: string, data: any) {
  const key = `goal_${encodeURIComponent(goal)}`;
  await AsyncStorage.setItem(key, JSON.stringify(data));
}

// Delete all goal-related data
export async function deleteGoalData(goal: string) {
  const key = `goal_${encodeURIComponent(goal)}`;
  await AsyncStorage.removeItem(key);
}

// Image picker logic
export async function pickGoalImage(): Promise<string | null> {
  const result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    allowsEditing: true,
    aspect: [16, 9],
    quality: 1,
  });

  if (!result.canceled && result.assets.length > 0) {
    return result.assets[0].uri;
  }

  return null;
}
