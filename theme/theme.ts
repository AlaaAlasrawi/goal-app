export const lightTheme = {
  mode: "light",
  background: "#F2F2F2",
  surface: "#FFFFFF",
  primary: "#6200EE",
  onPrimary: "#FFFFFF",
  secondary: "#03DAC6",
  onSecondary: "#000000",
  error: "#B00020",
  onError: "#FFFFFF",
  text: "#000000",
  onBackground: "#000000",
  onSurface: "#000000",
} as const;

export const darkTheme = {
  mode: "dark",
  background: "#121212",
  surface: "#313338",
  primary: "#BB86FC",

  onPrimary: "#000000",
  secondary: "#03DAC6",
  onSecondary: "#000000",
  error: "#CF6679",
  onError: "#000000",
  text: "#FFFFFF",
  onBackground: "#FFFFFF",
  onSurface: "#FFFFFF",
} as const;

export type ThemeType = typeof lightTheme | typeof darkTheme;
