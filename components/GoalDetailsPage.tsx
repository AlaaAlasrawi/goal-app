import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Image,
  Keyboard,
  TouchableWithoutFeedback,
  Text as RNText,
} from "react-native";
import { useRoute } from "@react-navigation/native";
import { Button, Text, TextInput } from "react-native-paper";
import * as ImagePicker from "expo-image-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useTheme } from "../hooks/ThemeContext";
import Slider from "@react-native-community/slider";

const GoalDetailsPage = () => {
  const route = useRoute();
  const { goal } = route.params as { goal: string };
  const { theme } = useTheme();

  const [description, setDescription] = useState("");
  const [image, setImage] = useState<string | null>(null);
  const [rating, setRating] = useState(0);
  const [saved, setSaved] = useState(false);

  const storageKey = `goal_${encodeURIComponent(goal)}`;

  useEffect(() => {
    const loadGoalDetails = async () => {
      try {
        const stored = await AsyncStorage.getItem(storageKey);
        if (stored) {
          const parsed = JSON.parse(stored);
          setDescription(parsed.description || "");
          setImage(parsed.image || null);
          setRating(parsed.rating || 0);
        }
      } catch (error) {
        console.error("❌ Failed to load goal:", error);
      }
    };

    loadGoalDetails();
  }, []);

  useEffect(() => {
    if (description || image || rating > 0) {
      const saveGoalDetails = async () => {
        try {
          const goalData = { description, image, rating };
          await AsyncStorage.setItem(storageKey, JSON.stringify(goalData));
          setSaved(true);
          setTimeout(() => setSaved(false), 1200);
        } catch (error) {
          console.error("❌ Failed to save goal:", error);
        }
      };

      saveGoalDetails();
    }
  }, [description, image, rating]);

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

        <View style={styles.sliderContainer}>
          <Text style={{ color: theme.text, marginBottom: 4 }}>
            Rate this goal (1–10):
          </Text>
          <Slider
            minimumValue={1}
            maximumValue={10}
            value={rating}
            onValueChange={setRating}
            minimumTrackTintColor={theme.primary}
            maximumTrackTintColor="#ccc"
            thumbTintColor={theme.primary}
            style={styles.slider}
          />

          <RNText style={{ color: theme.text, textAlign: "center" }}>
            Your Rating: {rating.toFixed(1)}
          </RNText>
        </View>

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
  sliderContainer: {
    marginBottom: 10,
  },
  slider: {
    width: "100%",
    height: 40,
  },
});
