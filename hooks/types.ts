export type TabRoutes = {
  Dashboard: undefined;
  Home: undefined;
  Goals: undefined;
  Setting: undefined;
  LoginPage: undefined;
};
export type Goal = {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  category?: string;
  dueDate?: string;
  createdAt: string;
};

export type RootStackParamList = {
  Main: undefined;
  LoginPage: undefined;
  GoalsPage: { goal: string };
};
