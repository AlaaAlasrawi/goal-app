import React, { createContext, useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { TOKEN_KEY } from "../api/env";
import { AuthCtx } from "./types";

const Ctx = createContext<AuthCtx>({
  checked: false,
  isAuthed: false,
  signIn: async () => {},
  signOut: async () => {},
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [checked, setChecked] = useState(false);
  const [isAuthed, setIsAuthed] = useState(false);

  useEffect(() => {
    (async () => {
      setIsAuthed(!!(await AsyncStorage.getItem(TOKEN_KEY)));
      setChecked(true);
    })();
  }, []);

  return (
    <Ctx.Provider
      value={{
        checked,
        isAuthed,
        async signIn() {
          setIsAuthed(true);
        },
        async signOut() {
          await AsyncStorage.removeItem(TOKEN_KEY);
          setIsAuthed(false);
        },
      }}
    >
      {children}
    </Ctx.Provider>
  );
}

export const useAuth = () => useContext(Ctx);
