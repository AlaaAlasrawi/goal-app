import React from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import { BarChart } from "react-native-chart-kit";
import { useTheme } from "../../hooks/ThemeContext";

type Props = {
  data: { label: string; value: number }[];
  title?: string;
};

const GoalsBarChart = ({ data, title = "📊 Goals Completed" }: Props) => {
  const { theme, isDark } = useTheme();
  const styles = getStyles(theme);
  const screenWidth = Dimensions.get("window").width;

  const chartData = {
    labels: data.map((item) => item.label),
    datasets: [{ data: data.map((item) => item.value) }],
  };

  const chartConfig = {
    backgroundGradientFrom: theme.surface,
    backgroundGradientTo: isDark ? theme.background : theme.surface,
    decimalPlaces: 0,
    color: () => theme.primary,
    labelColor: () => theme.placeholder,
    propsForBackgroundLines: {
      stroke: theme.placeholder,
    },
    barPercentage: 0.6,
  };

  return (
    <View style={styles.chartContainer}>
      <Text style={styles.title}>{title}</Text>
      <BarChart
        data={chartData}
        width={screenWidth - 40}
        height={220}
        yAxisLabel=""
        yAxisSuffix=""
        showValuesOnTopOfBars={false}
        withInnerLines={true}
        fromZero={true}
        chartConfig={chartConfig}
        verticalLabelRotation={0}
        style={styles.chartStyle}
      />
    </View>
  );
};

const getStyles = (theme: any) =>
  StyleSheet.create({
    chartContainer: {
      backgroundColor: theme.surface,
      padding: 20,
      borderRadius: 10,
      marginTop: 10,
      elevation: 3,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.1,
      shadowRadius: 2,
    },
    title: {
      fontSize: 18,
      fontWeight: "bold",
      marginBottom: 15,
      color: theme.text,
    },
    chartStyle: {
      borderRadius: 12,
      alignSelf: "center",
    },
  });

export default GoalsBarChart;
