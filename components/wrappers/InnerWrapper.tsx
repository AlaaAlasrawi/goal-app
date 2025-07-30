import React from "react";
import { Provider } from "react-redux";
import { PaperProvider } from "react-native-paper";

import { ThemeProvider } from "../../hooks/ThemeContext";
import NavigationWrapper from "./NavigationWrapper";

const InnerWrapper = () => {
  return (
    <ThemeProvider>
      <PaperProvider>
        <NavigationWrapper />
      </PaperProvider>
    </ThemeProvider>
  );
};

export default InnerWrapper;
