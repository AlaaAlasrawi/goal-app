import React from "react";
import { View, Text } from "react-native";
import { PieChart } from "react-native-gifted-charts";
import { useTheme } from "../../hooks/ThemeContext";

type Props = { completed: number; total: number };

export default function GoalsPieChart(props: Props) {
  const { theme } = useTheme();
  const remaining = Math.max(props.total - props.completed, 0);

  return (
    <View style={{ alignItems: "center", marginVertical: 16 }}>
      <Text style={{ fontSize: 16, fontWeight: "600", marginBottom: 8 }}>
        Goals
      </Text>
      <PieChart
        data={[
          { value: props.completed, color: theme.primary }, // completed
          { value: remaining, color: theme.placeholder }, // remaining
        ]}
        donut
        innerRadius={60}
        radius={80}
        focusOnPress
        centerLabelComponent={() => (
          <View style={{ alignItems: "center" }}>
            <Text style={{ fontSize: 18, fontWeight: "700" }}>
              {props.completed}/{props.total}
            </Text>
            <Text style={{ fontSize: 12 }}>completed</Text>
          </View>
        )}
      />
    </View>
  );
}
