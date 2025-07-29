import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Switch,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useTheme } from "../hooks/ThemeContext";
import AppToggleButton from "../components/AppToggleButton";

const SettingPage = () => {
  const navigation = useNavigation();
  const { theme, toggleTheme } = useTheme();

  const [username, setUsername] = useState<string | undefined>();
  const [name, setName] = useState<string | undefined>();

  useEffect(() => {
    const loadUserInfo = async () => {
      const storedUsername = await AsyncStorage.getItem("username");
      const storedName = await AsyncStorage.getItem("name");
      setUsername(storedUsername ?? "N/A");
      setName(storedName ?? "N/A");
    };

    loadUserInfo();
  }, []);

  const logout = () => {
    console.log("logout");
  };

  const handleLogout = () => {
    Alert.alert("Logout", "Are you sure you want to log out?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Logout",
        style: "destructive",
        onPress: logout,
      },
    ]);
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <Text style={[styles.label, { color: theme.text }]}>Username</Text>
      <Text style={[styles.value, { color: theme.text }]}>{username}</Text>

      <Text style={[styles.label, { color: theme.text }]}>Name</Text>
      <Text style={[styles.value, { color: theme.text }]}>{name}</Text>

      <View style={styles.switchContainer}>
        <Text style={[styles.label, { color: theme.text }]}>Dark Mode</Text>
        <AppToggleButton />
      </View>

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: "500",
    marginTop: 20,
  },
  value: {
    fontSize: 18,
    marginTop: 4,
  },
  switchContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 30,
  },
  logoutButton: {
    marginTop: 40,
    padding: 15,
    backgroundColor: "#e74c3c",
    borderRadius: 10,
    alignItems: "center",
  },
  logoutText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default SettingPage;
