import React, { useState } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Keyboard,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

type Props = {
  theme: any;
  onAdd: (title: string) => void;
};

const GoalInput = ({ theme, onAdd }: Props) => {
  const [inputValue, setInputValue] = useState("");
  const styles = createStyles(theme);

  const handleSubmit = () => {
    const trimmed = inputValue.trim();
    if (!trimmed) return;
    onAdd(trimmed);
    setInputValue("");
    Keyboard.dismiss();
  };

  return (
    <View style={styles.container}>
      <TextInput
        value={inputValue}
        onChangeText={setInputValue}
        placeholder="Enter goal title"
        placeholderTextColor={theme.placeholder}
        style={styles.input}
        onSubmitEditing={handleSubmit}
      />
      <TouchableOpacity onPress={handleSubmit} style={styles.addButton}>
        <Ionicons name="add" size={24} color={theme.onPrimary} />
      </TouchableOpacity>
    </View>
  );
};

const createStyles = (theme: any) =>
  StyleSheet.create({
    container: {
      marginBottom: 16,
    },
    input: {
      borderWidth: 1,
      borderRadius: 8,
      paddingHorizontal: 12,
      height: 48,
      fontSize: 16,
      backgroundColor: theme.surface,
      color: theme.text,
      borderColor: theme.placeholder,
    },
    addButton: {
      marginTop: 10,
      width: "100%",
      height: 48,
      borderRadius: 8,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: theme.secondary,
    },
  });

export default GoalInput;
