import React, { useState } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Keyboard,
  NativeSyntheticEvent,
  TextInputFocusEventData,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

type Props = {
  theme: any;
  onAdd: (title: string) => void;
};

const GoalInput = ({ theme, onAdd }: Props) => {
  const [inputValue, setInputValue] = useState("");
  const [focused, setFocused] = useState(false);
  const styles = createStyles(theme, focused);

  const handleSubmit = () => {
    const trimmed = inputValue.trim();
    if (!trimmed) return;
    onAdd(trimmed);
    setInputValue("");
    Keyboard.dismiss();
  };

  return (
    <View style={styles.wrapper}>
      <TextInput
        value={inputValue}
        onChangeText={setInputValue}
        placeholder="Enter goal title"
        placeholderTextColor={theme.placeholder}
        style={styles.input}
        onSubmitEditing={handleSubmit}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
      />
      <TouchableOpacity onPress={handleSubmit} style={styles.addButton}>
        <Ionicons name="add" size={24} color={theme.onPrimary} />
      </TouchableOpacity>
    </View>
  );
};

const createStyles = (theme: any, focused: boolean) =>
  StyleSheet.create({
    wrapper: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: theme.surface,
      borderRadius: 12,
      paddingHorizontal: 12,
      paddingVertical: 6,
      marginBottom: 16,
      elevation: 2,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.1,
      shadowRadius: 2,
      borderWidth: focused ? 1.5 : 0,
      borderColor: focused ? theme.primary : "transparent",
    },
    input: {
      flex: 1,
      fontSize: 16,
      color: theme.text,
      paddingVertical: 10,
    },
    addButton: {
      marginLeft: 10,
      backgroundColor: theme.secondary,
      padding: 10,
      borderRadius: 8,
      alignItems: "center",
      justifyContent: "center",
    },
  });

export default GoalInput;
