export type TabRoutes = {
  Dashboard: undefined;
  Home: undefined;
  Goals: undefined;
  Setting: undefined;
};
export type Goal = {
  id: number;
  title: string;
  description?: string;
  completed: boolean;
  createdAt: string;
};

export type RootStackParamList = {
  Root: undefined;
  Login: undefined;
  GoalsPage: { goal: string };
};
