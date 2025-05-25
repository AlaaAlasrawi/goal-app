import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { useColorScheme, Animated } from "react-native";
import { lightTheme, darkTheme, ThemeType } from "../theme/theme";

type ThemeContextType = {
  theme: ThemeType;
  colorTheme: boolean;
  toggleTheme: () => void;
  backgroundAnim: Animated.Value;
};

export const ThemeContext = createContext<ThemeContextType | undefined>(
  undefined
);

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const colorScheme = useColorScheme();
  const [colorTheme, setColorTheme] = useState(colorScheme === "dark");

  const backgroundAnim = useRef(new Animated.Value(colorTheme ? 1 : 0)).current;

  const theme = colorTheme ? darkTheme : lightTheme;

  const toggleTheme = () => {
    const newTheme = !colorTheme;
    setColorTheme(newTheme);

    Animated.timing(backgroundAnim, {
      toValue: newTheme ? 1 : 0,
      duration: 400,
      useNativeDriver: false,
    }).start();
  };

  useEffect(() => {
    Animated.timing(backgroundAnim, {
      toValue: colorTheme ? 1 : 0,
      duration: 400,
      useNativeDriver: false,
    }).start();
  }, []);

  return (
    <ThemeContext.Provider
      value={{ theme, colorTheme, toggleTheme, backgroundAnim }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("useTheme must be used within ThemeProvider");
  return context;
};
