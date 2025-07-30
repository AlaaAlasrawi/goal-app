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
  createdAt: string;
};

export type RootStackParamList = {
  Main: undefined;
  LoginPage: undefined;
  GoalsPage: { goal: string };
};
