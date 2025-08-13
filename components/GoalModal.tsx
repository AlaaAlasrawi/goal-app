import React, { useEffect, useMemo, useState } from "react";
import { Modal, View, Text, TouchableOpacity, StyleSheet } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { TextInput, Button } from "react-native-paper";
import { GoalFormValues } from "../hooks/types";

type Props = {
  visible: boolean;
  onClose: () => void;
  onSubmit: (goal: GoalFormValues) => void;
  theme: any;
  mode?: "create" | "edit";
  initialValues?: GoalFormValues;
};

type FieldErrors = {
  title?: string;
  description?: string;
  category?: string;
  dueDate?: string;
};

type Touched = {
  title?: boolean;
  description?: boolean;
  category?: boolean;
  dueDate?: boolean;
};

const GoalModal = ({
  visible,
  onClose,
  onSubmit,
  theme,
  mode = "create",
  initialValues,
}: Props) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [dueDate, setDueDate] = useState<Date | undefined>(undefined);
  const [showPicker, setShowPicker] = useState(false);

  const [errors, setErrors] = useState<FieldErrors>({});
  const [touched, setTouched] = useState<Touched>({});

  useEffect(() => {
    if (!visible) return;
    setTitle(initialValues?.title ?? "");
    setDescription(initialValues?.description ?? "");
    setCategory(initialValues?.category ?? "");
    setDueDate(
      initialValues?.dueDate ? new Date(initialValues.dueDate) : undefined
    );
    setErrors({});
    setTouched({});
  }, [visible, initialValues]);

  const validateAll = (state?: {
    title: string;
    description: string;
    category: string;
    dueDate?: Date;
  }): FieldErrors => {
    const v = state ?? { title, description, category, dueDate };
    const next: FieldErrors = {};

    // title
    const t = v.title?.trim() ?? "";
    if (!t) next.title = "Title is required.";
    else if (t.length < 2) next.title = "Title must be at least 2 characters.";

    // description
    if (v.description && v.description.length > 500) {
      next.description = "Description must be ≤ 500 characters.";
    }

    // due date
    if (v.dueDate) {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const dd = new Date(v.dueDate);
      dd.setHours(0, 0, 0, 0);
      if (dd < today) next.dueDate = "Due date cannot be in the past.";
    }

    return next;
  };

  // live validation when any field changes (soft)
  useEffect(() => {
    const next = validateAll();
    setErrors((prev) => ({ ...prev, ...next }));
  }, [title, description, category, dueDate]);

  const markTouched = (key: keyof Touched) =>
    setTouched((t) => ({ ...t, [key]: true }));

  const handleDateChange = (_event: any, selectedDate?: Date) => {
    setShowPicker(false);
    if (selectedDate) {
      setDueDate(selectedDate);
      markTouched("dueDate");
    }
  };

  const handleSave = () => {
    const nextErrors = validateAll();
    setErrors(nextErrors);
    setTouched({
      title: true,
      description: true,
      category: true,
      dueDate: true,
    });

    const hasErrors = Object.values(nextErrors).some(Boolean);
    if (hasErrors) return;

    onSubmit({
      title: title.trim(),
      description: description ? description.trim() : undefined,
      category: category.trim(),
      dueDate: dueDate?.toISOString(), // keep ISO for storage
    });

    if (mode === "create") {
      setTitle("");
      setDescription("");
      setCategory("");
      setDueDate(undefined);
      setErrors({});
      setTouched({});
    }
  };

  const styles = createStyles(theme);

  // Disable Save when obviously invalid (no title/category)
  const isSaveDisabled = useMemo(() => {
    const e = validateAll();
    return !!(e.title || e.category);
  }, [title, category, description, dueDate]);

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.modalBackground}>
        <View style={styles.modalContainer}>
          <Text style={styles.title}>
            {mode === "edit" ? "Edit Goal" : "Add New Goal"}
          </Text>

          <TextInput
            label="Title"
            mode="flat"
            value={title}
            onChangeText={(v) => setTitle(v)}
            onBlur={() => markTouched("title")}
            style={styles.input}
            textColor={theme.text}
            error={touched.title && !!errors.title}
            theme={{
              colors: { onSurfaceVariant: theme.label, primary: theme.primary },
            }}
          />
          {touched.title && errors.title ? (
            <Text style={{ color: "red", marginBottom: 8 }}>
              {errors.title}
            </Text>
          ) : null}

          <TextInput
            label="Description"
            mode="flat"
            value={description}
            onChangeText={(v) => setDescription(v)}
            onBlur={() => markTouched("description")}
            style={styles.input}
            textColor={theme.text}
            multiline
            error={touched.description && !!errors.description}
            theme={{
              colors: { onSurfaceVariant: theme.label, primary: theme.primary },
            }}
          />
          {touched.description && errors.description ? (
            <Text style={{ color: "red", marginBottom: 8 }}>
              {errors.description}
            </Text>
          ) : null}

          <TextInput
            label="Category"
            mode="flat"
            value={category}
            onChangeText={(v) => setCategory(v)}
            onBlur={() => markTouched("category")}
            style={styles.input}
            textColor={theme.text}
            error={touched.category && !!errors.category}
            theme={{
              colors: { onSurfaceVariant: theme.label, primary: theme.primary },
            }}
          />
          {touched.category && errors.category ? (
            <Text style={{ color: "red", marginBottom: 8 }}>
              {errors.category}
            </Text>
          ) : null}

          <TouchableOpacity
            onPress={() => setShowPicker(true)}
            style={styles.dateButton}
          >
            <Text style={styles.dateText}>
              {dueDate ? `Due: ${dueDate.toLocaleString()}` : "Pick Due Date"}
            </Text>
          </TouchableOpacity>
          {touched.dueDate && errors.dueDate ? (
            <Text style={{ color: "red", marginBottom: 8 }}>
              {errors.dueDate}
            </Text>
          ) : null}

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
              disabled={isSaveDisabled}
            >
              {mode === "edit" ? "Save" : "Create"}
            </Button>
          </View>
        </View>
      </View>
    </Modal>
  );
};

// ⬇️ styles unchanged
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
