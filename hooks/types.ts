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
  isCompleted: boolean;
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
  App: undefined;
  Auth: undefined;
};

export type AuthRoutes = {
  Login: undefined;
  SignUp: undefined;
};

export type AuthCtx = {
  checked: boolean;
  isAuthed: boolean;
  signIn(): Promise<void>;
  signOut(): Promise<void>;
};

export type AppUserSignUp = {
  username: string;
  fullName: string;
  email: string;
  password: string;
};
