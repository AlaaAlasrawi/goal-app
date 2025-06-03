import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Button, TextInput } from "react-native-paper";
import { useTheme } from "../hooks/ThemeContext";

interface GoalInputProps {
  handleAddGoal: (input: string) => void;
}

const GoalInput = ({ handleAddGoal }: GoalInputProps) => {
  const [input, setInput] = useState<string>("");
  const { theme } = useTheme();

  const styles = StyleSheet.create({
    text: {
      color: theme.text,
      fontSize: 16,
      marginBottom: 12,
    },
    input: {
      marginBottom: 16,
      overflow: "hidden",
      elevation: 2,
      backgroundColor: theme.surface,
    },
    button: { marginBottom: 24 },
  });

  return (
    <View>
      <Text style={styles.text}>Enter your goal:</Text>

      <TextInput
        mode="outlined"
        value={input}
        onChangeText={setInput}
        placeholder="e.g. Finish my project"
        style={styles.input}
        activeOutlineColor={theme.primary}
        textColor={theme.text}
        placeholderTextColor={theme.placeholder}
      />

      <Button
        mode="contained"
        onPress={() => {
          handleAddGoal(input);
          setInput("");
        }}
        style={styles.button}
        buttonColor={theme.primary}
        labelStyle={{ color: theme.onPrimary }}
      >
        Add Goal
      </Button>
    </View>
  );
};

export default GoalInput;
