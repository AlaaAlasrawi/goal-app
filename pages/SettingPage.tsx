import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Switch,
  TouchableOpacity,
  Alert,
} from "react-native";
import {
  CommonActions,
  NavigationProp,
  useNavigation,
} from "@react-navigation/native";
import { useTheme } from "../hooks/ThemeContext";
import { Button } from "react-native-paper";
import { TabRoutes } from "../hooks/types";
import SettingItem from "../components/SettingItem";
import AppToggleButton from "../components/AppToggleButton";
import UserService from "../services/UserService";
import AuthenticationService from "../services/AuthenticationService";
import { useAuth } from "../hooks/AuthProvider";

const SettingPage = () => {
  const [username, setUsername] = useState<string | undefined>();
  const [name, setName] = useState<string | undefined>();

  const { theme } = useTheme();
  const { signOut } = useAuth();

  const navigation = useNavigation<NavigationProp<TabRoutes>>();

  useEffect(() => {
    const loadUserInfo = async () => {
      const userData = UserService.getUserProfile();
      setUsername((await userData).username);
      setName((await userData).fullName);
    };

    loadUserInfo();
  }, []);

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

  const logout = () => {
    AuthenticationService.logout();
    signOut();
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
        contentStyle={styles.logoutContent}
        labelStyle={styles.logoutText}
      >
        Logout
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
      alignSelf: "stretch",
      width: "100%",
      borderRadius: 8,
      marginTop: 16,
    },
    logoutContent: {
      minHeight: 48,
      paddingVertical: 6,
    },
    logoutText: {
      fontSize: 16,
      fontWeight: "bold",
      color: "white",
    },
  });

export default SettingPage;
