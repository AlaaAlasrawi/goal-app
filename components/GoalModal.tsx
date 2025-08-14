// GoalModal.tsx
import React from "react";
import { Modal, View, Text, TouchableOpacity, StyleSheet } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { TextInput, Button } from "react-native-paper";
import { useFormik } from "formik";
import { GoalFormValues } from "../hooks/types";
import { GoalValidation } from "../validations/GoalValidation";

type Props = {
  visible: boolean;
  onClose: () => void;
  onSubmit: (values: GoalFormValues) => void | Promise<void>;
  theme: any;
  mode?: "create" | "edit";
  initialValues?: GoalFormValues; // used for edit
};

const DEFAULT_VALUES: GoalFormValues = {
  title: "",
  description: "",
  category: "",
  dueDate: "",
};

const GoalModal = ({
  visible,
  onClose,
  onSubmit,
  theme,
  mode = "create",
  initialValues,
}: Props) => {
  const [showPicker, setShowPicker] = React.useState(false);

  const formik = useFormik<GoalFormValues>({
    initialValues: initialValues ?? DEFAULT_VALUES,
    enableReinitialize: true, // re-fill when initialValues change (edit)
    validationSchema: GoalValidation,
    onSubmit: async (values, helpers) => {
      await onSubmit(values);
      helpers.setSubmitting(false);
    },
  });

  const parsedDate = formik.values.dueDate
    ? new Date(formik.values.dueDate)
    : undefined;

  const handleDateChange = (_event: any, selectedDate?: Date) => {
    setShowPicker(false);
    if (selectedDate) {
      formik.setFieldValue("dueDate", selectedDate.toISOString(), true);
    }
  };

  const styles = createStyles(theme);

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.modalBackground}>
        <View style={styles.modalContainer}>
          <Text style={styles.title}>
            {mode === "edit" ? "Edit Goal" : "Add New Goal"}
          </Text>

          <TextInput
            label="Title"
            value={formik.values.title}
            onChangeText={formik.handleChange("title")}
            onBlur={formik.handleBlur("title")}
            style={styles.input}
            error={Boolean(formik.touched.title && formik.errors.title)}
            textColor={theme.text}
            theme={{
              colors: { onSurfaceVariant: theme.label, primary: theme.primary },
            }}
          />
          {formik.touched.title && formik.errors.title ? (
            <Text style={{ color: "red", marginBottom: 8 }}>
              {formik.errors.title as string}
            </Text>
          ) : null}

          <TextInput
            label="Description"
            value={formik.values.description ?? ""}
            onChangeText={formik.handleChange("description")}
            onBlur={formik.handleBlur("description")}
            style={styles.input}
            multiline
            error={Boolean(
              formik.touched.description && formik.errors.description
            )}
            textColor={theme.text}
            theme={{
              colors: { onSurfaceVariant: theme.label, primary: theme.primary },
            }}
          />
          {formik.touched.description && formik.errors.description ? (
            <Text style={{ color: "red", marginBottom: 8 }}>
              {formik.errors.description as string}
            </Text>
          ) : null}

          <TextInput
            label="Category"
            value={formik.values.category ?? ""}
            onChangeText={formik.handleChange("category")}
            onBlur={formik.handleBlur("category")}
            style={styles.input}
            error={Boolean(formik.touched.category && formik.errors.category)}
            textColor={theme.text}
            theme={{
              colors: { onSurfaceVariant: theme.label, primary: theme.primary },
            }}
          />
          {formik.touched.category && formik.errors.category ? (
            <Text style={{ color: "red", marginBottom: 8 }}>
              {formik.errors.category as string}
            </Text>
          ) : null}

          <TouchableOpacity
            onPress={() => setShowPicker(true)}
            style={styles.dateButton}
          >
            <Text style={styles.dateText}>
              {parsedDate
                ? `Due: ${parsedDate.toLocaleString()}`
                : "Pick Due Date (optional)"}
            </Text>
          </TouchableOpacity>
          {formik.touched.dueDate && formik.errors.dueDate ? (
            <Text style={{ color: "red", marginBottom: 8 }}>
              {formik.errors.dueDate as string}
            </Text>
          ) : null}

          {showPicker && (
            <DateTimePicker
              value={parsedDate || new Date()}
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
              onPress={formik.handleSubmit as () => void} // ✅ matches onPress type
              style={styles.button}
              buttonColor={theme.primary}
              textColor={theme.onPrimary}
              contentStyle={styles.contentStyle}
              disabled={formik.isSubmitting}
            >
              {mode === "edit" ? "Save" : "Create"}
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
    input: { marginBottom: 16, backgroundColor: theme.background },
    dateButton: { marginBottom: 20, alignItems: "flex-start" },
    dateText: { color: theme.primary, fontSize: 16, fontWeight: "500" },
    btnContainer: {
      flexDirection: "row",
      justifyContent: "flex-end",
      gap: 10,
      marginTop: 40,
    },
    button: { borderRadius: 8, marginLeft: 10 },
    contentStyle: { paddingVertical: 6, paddingHorizontal: 20 },
  });

export default GoalModal;
