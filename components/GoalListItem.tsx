import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useTheme } from "../hooks/ThemeContext";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../hooks/types";

interface GoalListItemProps {
  goal: string;
  index: number;
}
const GoalListItem = ({ goal, index }: GoalListItemProps) => {
  const { theme } = useTheme();
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const styles = StyleSheet.create({
    goalCard: {
      padding: 16,
      borderRadius: 12,
      marginBottom: 12,
      elevation: 3,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      backgroundColor: theme.surface,
    },
    goalText: {
      fontSize: 16,
      fontWeight: "500",
      color: theme.text,
    },
  });
  return (
    <View>
      <TouchableOpacity
        key={index}
        onPress={() => navigation.navigate("GoalDetails", { goal })}
      >
        <View style={styles.goalCard}>
          <Text style={styles.goalText}>{goal}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default GoalListItem;
