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
import { Button } from "react-native-paper";
import SettingItem from "../components/SettingItem";

const SettingPage = () => {
  const { theme } = useTheme();

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

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      backgroundColor: theme.background,
      minHeight: "100%",
      flexGrow: 1,
    },
    logoutButton: {
      backgroundColor: "#ff3b30",
      padding: 3.5,
      borderRadius: 8,
      alignItems: "center",
      justifyContent: "center",
      marginTop: 16,
    },
    logoutText: {
      color: "white",
      fontSize: 16,
      fontWeight: "bold",
    },
  });

  return (
    <View style={styles.container}>
      <SettingItem label="Username" value={username} />
      <SettingItem label="Name" value={name} />
      <SettingItem
        label="Dark Mode"
        actionComponent={<AppToggleButton />}
        actionStyle={{ marginTop: 10 }}
      />

      <Button
        mode="contained"
        onPress={handleLogout}
        style={styles.logoutButton}
        labelStyle={styles.logoutText}
      >
        Logout
      </Button>
    </View>
  );
};

export default SettingPage;
