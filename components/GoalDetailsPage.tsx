import React, { useState } from "react";
import { View, StyleSheet, Image } from "react-native";
import { useRoute } from "@react-navigation/native";
import { Button, Text, TextInput } from "react-native-paper";
import * as ImagePicker from "expo-image-picker";
import { useTheme } from "../hooks/ThemeContext";

const GoalDetailsPage = () => {
  const route = useRoute();
  const { goal } = route.params as { goal: string };
  const { theme } = useTheme();
  const [description, setDescription] = useState("");
  const [image, setImage] = useState<string | null>(null);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [16, 9],
      quality: 1,
    });

    if (!result.canceled && result.assets.length > 0) {
      setImage(result.assets[0].uri);
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      {image && (
        <Image
          source={{ uri: image }}
          style={styles.image}
          resizeMode="cover"
        />
      )}

      <Text style={[styles.title, { color: theme.text }]}>{goal}</Text>

      <TextInput
        mode="outlined"
        label="Description"
        value={description}
        onChangeText={setDescription}
        multiline
        numberOfLines={4}
        style={styles.input}
        theme={{
          colors: {
            text: theme.text,
            placeholder: "#888",
            primary: theme.primary,
            background: theme.surface,
          },
        }}
      />

      <Button mode="contained" onPress={pickImage} buttonColor={theme.primary}>
        Pick Image
      </Button>
    </View>
  );
};

export default GoalDetailsPage;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    gap: 20,
  },
  image: {
    width: "100%",
    height: 300,
    borderRadius: 12,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  input: {
    marginBottom: 20,
    borderRadius: 12,
  },
});
