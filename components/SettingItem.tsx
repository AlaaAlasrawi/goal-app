import React from "react";
import {
  View,
  Text,
  StyleSheet,
  StyleProp,
  TextStyle,
  ViewStyle,
} from "react-native";
import { useTheme } from "../hooks/ThemeContext";

type Props = {
  label: string;
  value?: string;
  actionComponent?: React.ReactNode;
  labelStyle?: StyleProp<TextStyle>;
  actionStyle?: StyleProp<ViewStyle>;
};

const SettingItem = ({
  label,
  value,
  actionComponent,
  labelStyle,
  actionStyle,
}: Props) => {
  const { theme } = useTheme();

  return (
    <View style={[styles.wrapper, { backgroundColor: theme.surface }]}>
      <Text style={[styles.label, { color: theme.placeholder }, labelStyle]}>
        {label}
      </Text>
      {value ? (
        <Text style={[styles.value, { color: theme.text }]}>{value}</Text>
      ) : (
        <View style={actionStyle}>{actionComponent}</View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginVertical: 8,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 6,
  },
  value: {
    fontSize: 16,
    fontWeight: "500",
  },
});

export default SettingItem;
