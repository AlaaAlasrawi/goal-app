import React, { useState } from "react";
import { Modal, StyleSheet, Text, View } from "react-native";
import { Button } from "react-native-paper";
import { useTheme } from "../hooks/ThemeContext";

interface AppModalProps {
  handleClose: () => void;
  isOpen: boolean;
}

const AppModal = ({ isOpen, handleClose }: AppModalProps) => {
  const { theme } = useTheme();
  const styles = StyleSheet.create({
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
    text: {
      color: theme.text,
    },
  });

  return (
    <Modal visible={isOpen} transparent={true} onRequestClose={handleClose}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.text}>hello</Text>
          <Button
            mode="contained"
            onPress={handleClose}
            style={styles.button}
            buttonColor={theme.secondary}
            labelStyle={{ color: theme.onPrimary }}
          >
            Close modal
          </Button>
        </View>
      </View>
    </Modal>
  );
};

export default AppModal;
