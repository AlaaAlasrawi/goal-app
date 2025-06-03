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
import { useTheme } from "../hooks/ThemeContext";
import Slider from "@react-native-community/slider";
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { deleteGoal } from "../redux/goalsSlice";
import {
  loadGoalDetails,
  saveGoalDetails,
  deleteGoalData,
  pickGoalImage,
} from "../utils/goalDetailsHelpers";

const GoalDetailsPage = () => {
  const route = useRoute();

  const { goal } = route.params as { goal: string };
  const { theme } = useTheme();

  const [description, setDescription] = useState("");
  const [image, setImage] = useState<string | null>(null);
  const [rating, setRating] = useState(0);
  const [saved, setSaved] = useState(false);

  const navigation = useNavigation();
  const dispatch = useDispatch();

  useEffect(() => {
    loadGoalDetails(goal)
      .then((parsed) => {
        setDescription(parsed.description || "");
        setImage(parsed.image || null);
        setRating(parsed.rating || 0);
      })
      .catch((error) => {
        console.error("❌ Failed to load goal:", error);
      });
  }, []);

  useEffect(() => {
    let isCancelled = false;
    let timeoutId: NodeJS.Timeout;

    if (description || image || rating > 0) {
      saveGoalDetails(goal, { description, image, rating })
        .then(() => {
          if (!isCancelled) {
            setSaved(true);
            timeoutId = setTimeout(() => setSaved(false), 1200);
          }
        })
        .catch((error) => {
          console.error("❌ Failed to save goal:", error);
        });
    }

    // Cleanup function on unmount or if inputs change quickly
    return () => {
      isCancelled = true;
      clearTimeout(timeoutId);
    };
  }, [description, image, rating]);

  const handlePickImage = async () => {
    const uri = await pickGoalImage();
    if (uri) setImage(uri);
  };

  const handleDeleteGoal = async () => {
    await deleteGoalData(goal);
    dispatch(deleteGoal(goal));
    navigation.goBack();
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
          placeholderTextColor={theme.placeholder}
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
          onPress={handlePickImage}
          buttonColor={theme.primary}
        >
          Pick Image
        </Button>
        <Button
          mode="contained"
          onPress={handleDeleteGoal}
          buttonColor={theme.secondary}
          style={{ marginTop: 20 }}
        >
          Delete Goal
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
