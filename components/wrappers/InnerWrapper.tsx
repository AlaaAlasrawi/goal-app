import React from "react";
import { PaperProvider } from "react-native-paper";

import { ThemeProvider } from "../../hooks/ThemeContext";
import NavigationWrapper from "./NavigationWrapper";
import { AuthProvider } from "../../hooks/AuthProvider";

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
