import React from "react";
import { Provider } from "react-redux";
import { PaperProvider } from "react-native-paper";

import { ThemeProvider } from "../../hooks/ThemeContext";
import NavigationWrapper from "./NavigationWrapper";

interface InnerWrapperProps {
  store: any;
}

const InnerWrapper = ({ store }: InnerWrapperProps) => {
  return (
    <Provider store={store}>
      <ThemeProvider>
        <PaperProvider>
          <NavigationWrapper />
        </PaperProvider>
      </ThemeProvider>
    </Provider>
  );
};

export default InnerWrapper;
