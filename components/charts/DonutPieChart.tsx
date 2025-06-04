import React from "react";
import { View, StyleSheet } from "react-native";
import { PieChart } from "react-native-gifted-charts";

const DonutPieChart = () => {
  const pieData = [
    { value: 22.46, color: "#1DA1F2", text: "The Lego Movie 2" },
    { value: 11.29, color: "#A020F0", text: "How to Train Your Dragon" },
    { value: 10.24, color: "#B0E57C", text: "Cold Pursuit" },
    { value: 8.55, color: "#B19CD9", text: "Instant Family" },
    { value: 7.16, color: "#6A5ACD", text: "The Kid Who Would Be King" },
    { value: 6.01, color: "#2E8B57", text: "On the Basis of Sex" },
    { value: 4.37, color: "#FF6F61", text: "Alita" },
    { value: 3.74, color: "#FFD700", text: "Total Dhamaal" },
    { value: 2.52, color: "#FF8C00", text: "Bumblebee" },
    { value: 1.95, color: "#FF4500", text: "Green Book" },
    { value: 21.7, color: "#87CEFA", text: "Other" },
  ];

  return (
    <View style={styles.container}>
      <PieChart
        data={pieData}
        donut
        showText
        textColor="black"
        textSize={12}
        focusOnPress
        sectionAutoFocus
        innerRadius={50}
        radius={100}
        centerLabelComponent={() => null}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
    alignItems: "center",
    backgroundColor: "#fff",
    flex: 1,
  },
});

export default DonutPieChart;
