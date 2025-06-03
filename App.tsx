import React from "react";
import { ThemeProvider } from "./hooks/ThemeContext";
import AppContent from "./AppContent";
import { Provider } from "react-redux";
import store from "./redux/store";

export default function App() {
  return (
    <Provider store={store}>
      <ThemeProvider>
        <AppContent />
      </ThemeProvider>
    </Provider>
  );
}
