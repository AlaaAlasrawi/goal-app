import { ScrollView, StyleSheet } from "react-native";
import { Text } from "react-native-paper";
import { useTheme } from "../hooks/ThemeContext";
import Header from "../components/Header";
import DonutPieChart from "../components/charts/DonutPieChart";

const DashboardPage = () => {
  const { theme } = useTheme();

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: theme.background }]}
    >
      <Text style={[styles.heading, { color: theme.text }]}>
        📊 Goal Ratings
      </Text>
      <DonutPieChart />
    </ScrollView>
  );
};

export default DashboardPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  heading: {
    fontSize: 20,
    fontWeight: "600",
    textAlign: "center",
    marginTop: 30,
    marginBottom: 16,
  },
  chart: {
    paddingLeft: 15,
    borderRadius: 12,
    marginBottom: 30,
  },
});
