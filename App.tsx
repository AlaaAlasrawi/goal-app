import React from "react";
import { ThemeProvider } from "./hooks/ThemeContext";
import AppContent from "./AppContent";

export default function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}
