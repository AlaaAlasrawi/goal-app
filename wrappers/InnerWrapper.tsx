import React from "react";
import { PaperProvider } from "react-native-paper";
import NavigationWrapper from "./NavigationWrapper";
import { AuthProvider } from "../hooks/AuthProvider";
import { ThemeProvider } from "../hooks/ThemeContext";

const InnerWrapper = () => {
  return (
    <AuthProvider>
      <ThemeProvider>
        <PaperProvider>
          <NavigationWrapper />
        </PaperProvider>
      </ThemeProvider>
    </AuthProvider>
  );
};

export default InnerWrapper;
