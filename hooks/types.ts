export type TabRoutes = {
  Dashboard: undefined;
  Home: undefined;
  Goals: undefined;
  Setting: undefined;
  LoginPage: undefined;
};
export type Goal = {
  id: number;
  title: string;
  description?: string;
  completed: boolean;
  category?: string;
  dueDate?: string;
  createdAt: string;
};

export type GoalFormValues = {
  title: string;
  description?: string;
  category?: string;
  dueDate?: string;
};

export type AppUser = {
  username: string;
  fullName: string;
  email: string;
  noCompletedGoals: number;
};

export type RootStackParamList = {
  Main: undefined;
  LoginPage: undefined;
  GoalsPage: { goal: string };
};
