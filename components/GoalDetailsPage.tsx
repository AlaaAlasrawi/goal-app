import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Image,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import { useRoute } from "@react-navigation/native";
import { Button, Text, TextInput } from "react-native-paper";
import * as ImagePicker from "expo-image-picker";
import { useTheme } from "../hooks/ThemeContext";
import AsyncStorage from "@react-native-async-storage/async-storage";

const GoalDetailsPage = () => {
  const [description, setDescription] = useState("");
  const [image, setImage] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);

  const route = useRoute();
  const { goal } = route.params as { goal: string };
  const { theme } = useTheme();
  const storageKey = `goal_${encodeURIComponent(goal)}`;

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

  const saveGoalDetails = async () => {
    try {
      const goalData = { description, image };
      await AsyncStorage.setItem(storageKey, JSON.stringify(goalData));
      setSaved(true);
      setTimeout(() => setSaved(false), 1200);
    } catch (error) {
      console.error("❌ Failed to save goal:", error);
    }
  };

  const loadGoalDetails = async () => {
    try {
      const stored = await AsyncStorage.getItem(storageKey);
      if (stored) {
        const parsed = JSON.parse(stored);
        setDescription(parsed.description || "");
        setImage(parsed.image || null);
      }
    } catch (error) {
      console.error("❌ Failed to load goal:", error);
    }
  };

  useEffect(() => {
    if (description || image) {
      saveGoalDetails();
    }
  }, [description, image]);

  useEffect(() => {
    loadGoalDetails();
  }, []);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={[styles.container, { backgroundColor: theme.background }]}>
        {image && (
          <Image
            source={{ uri: image }}
            style={styles.image}
            resizeMode="cover"
          />
        )}

        <Text style={[styles.title, { color: theme.text }]}>
          Your Goal: {goal}
        </Text>

        <TextInput
          mode="outlined"
          placeholder="Write about your goal..."
          value={description}
          onChangeText={setDescription}
          multiline
          numberOfLines={4}
          style={styles.input}
          theme={{
            colors: {
              text: theme.text,
              primary: theme.primary,
              background: theme.surface,
              placeholder: theme.placeholder,
            },
          }}
          textColor={theme.text}
        />

        <Button
          mode="contained"
          onPress={pickImage}
          buttonColor={theme.primary}
        >
          Pick Image
        </Button>

        {saved && (
          <Text style={{ color: "green", marginTop: 10 }}>✅ Saved!</Text>
        )}
      </View>
    </TouchableWithoutFeedback>
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
    marginBottom: 10,
    borderRadius: 12,
  },
});
