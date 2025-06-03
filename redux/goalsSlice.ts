import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface GoalsState {
  list: string[];
}

const initialState: GoalsState = {
  list: [],
};

const goalsSlice = createSlice({
  name: "goals",
  initialState,
  reducers: {
    setGoals(state, action: PayloadAction<string[]>) {
      state.list = action.payload;
    },
    addGoal(state, action: PayloadAction<string>) {
      state.list.push(action.payload);
      AsyncStorage.setItem("goals", JSON.stringify(state.list));
    },
    deleteGoal(state, action: PayloadAction<string>) {
      const updated = state.list.filter(
        (g) => g.trim() !== action.payload.trim()
      );
      state.list = updated;
      AsyncStorage.setItem("goals", JSON.stringify(updated));
      AsyncStorage.removeItem(`goal_${encodeURIComponent(action.payload)}`);
    },
    clearGoals(state) {
      state.list = [];
      AsyncStorage.removeItem("goals");
    },
  },
});

export const { setGoals, addGoal, deleteGoal, clearGoals } = goalsSlice.actions;

export default goalsSlice.reducer;
