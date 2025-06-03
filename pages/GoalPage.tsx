import React, { useEffect, useState } from "react";
import {
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useTheme } from "../hooks/ThemeContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Header from "../components/Header";
import GoalInput from "../components/GoalInput";
import GoalListItem from "../components/GoalListItem";
import { Button } from "react-native-paper";
import AppModal from "../components/AppModal";

const GoalPage = () => {
  const [goals, setGoals] = useState<string[]>([]);
  const [open, setOpen] = useState(false);
  const { theme } = useTheme();

  useEffect(() => {
    const loadGoals = async () => {
      const saved = await AsyncStorage.getItem("goals");
      if (saved) {
        setGoals(JSON.parse(saved));
      }
    };
    loadGoals();
  }, []);

  useEffect(() => {
    AsyncStorage.setItem("goals", JSON.stringify(goals));
  }, [goals]);

  const handleAddGoal = (input: string) => {
    if (input.trim() === "") return;
    setGoals((prevGoals) => [...prevGoals, input.trim()]);
  };

  function handleDeleteAllGoals() {
    setGoals([]);
    AsyncStorage.removeItem("goals");
  }

  function onPressFunction() {
    console.log("preas");
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
  }
  const styles = StyleSheet.create({
    scroll: { backgroundColor: theme.surface },
    container: {
      padding: 24,
      backgroundColor: theme.background,
      minHeight: "100%",
      flexGrow: 1,
    },
    button: { marginBottom: 24 },
    modalContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    modalContent: {
      backgroundColor: theme.surface,
      padding: 24,
      borderRadius: 10,
      width: "80%",
      alignItems: "center",
    },
  });

  return (
    <ScrollView style={styles.scroll}>
      <Header />
      <View style={styles.container}>
        <GoalInput handleAddGoal={handleAddGoal} />
        {goals.map((goal, index) => (
          <GoalListItem goal={goal} index={index} key={index} />
        ))}
        <Button
          mode="contained"
          onPress={() => {
            handleDeleteAllGoals();
          }}
          style={styles.button}
          buttonColor={theme.secondary}
          labelStyle={{ color: theme.onPrimary }}
        >
          Clear All
        </Button>
        <Pressable onPress={onPressFunction}>
          <Text style={{ color: theme.text }}>I'm pressable!</Text>
        </Pressable>
        {open && <AppModal handleClose={handleClose} isOpen={open} />}
      </View>
    </ScrollView>
  );
};

export default GoalPage;
