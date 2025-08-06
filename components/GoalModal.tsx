import React, { useState } from "react";
import { Modal, View, Text, TouchableOpacity, StyleSheet } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { TextInput, Button } from "react-native-paper";

type Props = {
  visible: boolean;
  onClose: () => void;
  onSubmit: (goal: {
    title: string;
    description?: string;
    category?: string;
    dueDate?: string;
  }) => void;
  theme: any;
};

const GoalModal = ({ visible, onClose, onSubmit, theme }: Props) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [dueDate, setDueDate] = useState<Date | undefined>(undefined);
  const [showPicker, setShowPicker] = useState(false);

  const handleDateChange = (_event: any, selectedDate?: Date) => {
    setShowPicker(false);
    if (selectedDate) setDueDate(selectedDate);
  };

  const handleSave = () => {
    if (!title.trim()) return;

    onSubmit({
      title: title.trim(),
      description: description || undefined,
      category: category || undefined,
      dueDate: dueDate?.toISOString(),
    });

    setTitle("");
    setDescription("");
    setCategory("");
    setDueDate(undefined);
  };

  const styles = createStyles(theme);

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.modalBackground}>
        <View style={styles.modalContainer}>
          <Text style={styles.title}>Add New Goal</Text>

          <TextInput
            label="Title"
            mode="flat"
            value={title}
            onChangeText={setTitle}
            style={styles.input}
            textColor={theme.text}
            theme={{
              colors: {
                onSurfaceVariant: theme.label,
                primary: theme.primary,
              },
            }}
          />

          <TextInput
            label="Description"
            mode="flat"
            value={description}
            onChangeText={setDescription}
            style={styles.input}
            textColor={theme.text}
            multiline
            theme={{
              colors: {
                onSurfaceVariant: theme.label,
                primary: theme.primary,
              },
            }}
          />

          <TextInput
            label="Category"
            mode="flat"
            value={category}
            onChangeText={setCategory}
            style={styles.input}
            textColor={theme.text}
            theme={{
              colors: {
                onSurfaceVariant: theme.label,
                primary: theme.primary,
              },
            }}
          />

          <TouchableOpacity
            onPress={() => setShowPicker(true)}
            style={styles.dateButton}
          >
            <Text style={styles.dateText}>
              {dueDate ? `Due: ${dueDate.toLocaleString()}` : "Pick Due Date"}
            </Text>
          </TouchableOpacity>

          {showPicker && (
            <DateTimePicker
              value={dueDate || new Date()}
              mode="datetime"
              display="default"
              onChange={handleDateChange}
            />
          )}

          <View style={styles.btnContainer}>
            <Button
              mode="outlined"
              onPress={onClose}
              style={styles.button}
              textColor={theme.primary}
              contentStyle={styles.contentStyle}
            >
              Cancel
            </Button>

            <Button
              mode="contained"
              onPress={handleSave}
              style={styles.button}
              buttonColor={theme.primary}
              textColor={theme.onPrimary}
              contentStyle={styles.contentStyle}
            >
              Save
            </Button>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const createStyles = (theme: any) =>
  StyleSheet.create({
    modalBackground: {
      flex: 1,
      justifyContent: "center",
      backgroundColor: theme.surface,
      padding: 16,
    },
    modalContainer: {
      backgroundColor: theme.card,
      borderRadius: 12,
      padding: 20,
    },
    title: {
      fontSize: 22,
      fontWeight: "700",
      color: theme.text,
      marginBottom: 20,
      textAlign: "center",
    },
    input: {
      marginBottom: 16,
      backgroundColor: theme.background,
    },
    dateButton: {
      marginBottom: 20,
      alignItems: "flex-start",
    },
    dateText: {
      color: theme.primary,
      fontSize: 16,
      fontWeight: "500",
    },
    btnContainer: {
      flexDirection: "row",
      justifyContent: "flex-end",
      gap: 10,
      marginTop: 40,
    },
    button: {
      borderRadius: 8,
      marginLeft: 10,
    },
    contentStyle: {
      paddingVertical: 6,
      paddingHorizontal: 20,
    },
  });

export default GoalModal;
