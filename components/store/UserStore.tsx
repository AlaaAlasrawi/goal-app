import React, { createContext, useContext, useState, ReactNode } from "react";

type UserInfo = {
  name: string;
  username: string;
  totalGoals: number;
  completedGoals: number;
  setUserInfo: (info: Partial<UserInfo>) => void;
};

const defaultContext: UserInfo = {
  name: "",
  username: "",
  totalGoals: 0,
  completedGoals: 0,
  setUserInfo: () => {},
};

const UserContext = createContext<UserInfo>(defaultContext);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [userInfo, setUserInfoState] = useState<Omit<UserInfo, "setUserInfo">>({
    name: "",
    username: "",
    totalGoals: 0,
    completedGoals: 0,
  });

  const setUserInfo = (info: Partial<UserInfo>) => {
    setUserInfoState((prev) => ({ ...prev, ...info }));
  };

  return (
    <UserContext.Provider value={{ ...userInfo, setUserInfo }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserStore = () => useContext(UserContext);
