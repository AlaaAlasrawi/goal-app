import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Switch,
  TouchableOpacity,
  Alert,
} from "react-native";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useTheme } from "../hooks/ThemeContext";
import AppToggleButton from "../components/AppToggleButton";
import { Button } from "react-native-paper";
import SettingItem from "../components/SettingItem";
import { TabRoutes } from "../hooks/types";
import LoginPage from "./LoginPage";

const SettingPage = () => {
  const [username, setUsername] = useState<string | undefined>();
  const [name, setName] = useState<string | undefined>();

  const { theme } = useTheme();

  const navigation = useNavigation<NavigationProp<TabRoutes>>();

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

  const goLogin = () => {
    navigation.navigate("LoginPage");
  };

  const styles = createStyles(theme);

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

      <Button
        mode="contained"
        onPress={goLogin}
        style={styles.logoutButton}
        labelStyle={styles.logoutText}
      >
        Login page
      </Button>
    </View>
  );
};
const createStyles = (theme: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      backgroundColor: theme.background,
      minHeight: "100%",
      flexGrow: 1,
    },
    logoutButton: {
      backgroundColor: theme.primary,
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

export default SettingPage;
