import React from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "../hooks/ThemeContext";
import AuthenticationService from "../services/AuthenticationService";
import { useAuth } from "../hooks/AuthProvider";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { AuthRoutes, TabRoutes } from "../hooks/types";
import { AppUserSignUp } from "../hooks/types";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

const SignUpPage = () => {
  const { theme } = useTheme();
  const { signIn } = useAuth();
  const styles = createStyles(theme);
  const navigation = useNavigation<NativeStackNavigationProp<AuthRoutes>>();

  const signUpSchema = Yup.object().shape({
    username: Yup.string().min(1, "Min 1 char").required("Required"),
    fullName: Yup.string().min(2, "Min 2 chars").required("Required"),
    email: Yup.string().email("Invalid email").required("Required"),
    password: Yup.string().min(6, "Min 6 chars").required("Required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password")], "Passwords must match")
      .required("Required"),
  });

  const handleSignUp = async (
    values: AppUserSignUp & { confirmPassword: string }
  ) => {
    const { confirmPassword, ...userPayload } = values;

    await AuthenticationService.register(userPayload);

    await AuthenticationService.login(
      userPayload.username,
      userPayload.password
    );
    signIn();

    navigation.reset({
      index: 0,
      routes: [{ name: "Home" as keyof TabRoutes } as any],
    });
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <View style={styles.box}>
        <Text style={styles.title}>Create Account</Text>
        <Text style={styles.subtitle}>Sign up to get started</Text>

        <Formik
          initialValues={{
            username: "",
            fullName: "",
            email: "",
            password: "",
            confirmPassword: "",
          }}
          validationSchema={signUpSchema}
          onSubmit={handleSignUp}
        >
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            errors,
            touched,
          }) => (
            <>
              <TextInput
                placeholder="Username"
                placeholderTextColor={theme.placeholder}
                style={styles.input}
                onChangeText={handleChange("username")}
                onBlur={handleBlur("username")}
                value={values.username}
              />
              {touched.username && errors.username && (
                <Text style={styles.errorText}>{errors.username}</Text>
              )}

              <TextInput
                placeholder="Full Name"
                placeholderTextColor={theme.placeholder}
                style={styles.input}
                onChangeText={handleChange("fullName")}
                onBlur={handleBlur("fullName")}
                value={values.fullName}
              />
              {touched.fullName && errors.fullName && (
                <Text style={styles.errorText}>{errors.fullName}</Text>
              )}

              <TextInput
                placeholder="Email"
                placeholderTextColor={theme.placeholder}
                style={styles.input}
                onChangeText={handleChange("email")}
                onBlur={handleBlur("email")}
                value={values.email}
                autoCapitalize="none"
                keyboardType="email-address"
              />
              {touched.email && errors.email && (
                <Text style={styles.errorText}>{errors.email}</Text>
              )}

              <TextInput
                placeholder="Password"
                placeholderTextColor={theme.placeholder}
                style={styles.input}
                onChangeText={handleChange("password")}
                onBlur={handleBlur("password")}
                value={values.password}
                secureTextEntry
              />
              {touched.password && errors.password && (
                <Text style={styles.errorText}>{errors.password}</Text>
              )}

              <TextInput
                placeholder="Confirm Password"
                placeholderTextColor={theme.placeholder}
                style={styles.input}
                onChangeText={handleChange("confirmPassword")}
                onBlur={handleBlur("confirmPassword")}
                value={values.confirmPassword}
                secureTextEntry
              />
              {touched.confirmPassword && errors.confirmPassword && (
                <Text style={styles.errorText}>{errors.confirmPassword}</Text>
              )}

              <TouchableOpacity
                style={styles.loginButton}
                onPress={() => handleSubmit()}
              >
                <Ionicons
                  name="person-add-outline"
                  size={20}
                  color={theme.onPrimary}
                />
                <Text style={styles.loginButtonText}>Sign Up</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={{ marginTop: 12, alignItems: "center" }}
                onPress={() => navigation.replace("Login")}
              >
                <Text style={{ color: theme.placeholder }}>
                  Already have an account? Log in
                </Text>
              </TouchableOpacity>
            </>
          )}
        </Formik>
      </View>
    </KeyboardAvoidingView>
  );
};

const createStyles = (theme: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.background,
      justifyContent: "center",
      padding: 20,
    },
    box: {
      backgroundColor: theme.surface,
      borderRadius: 16,
      padding: 24,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.1,
      shadowRadius: 8,
      elevation: 5,
    },
    title: {
      fontSize: 24,
      fontWeight: "700",
      color: theme.text,
      marginBottom: 4,
    },
    subtitle: {
      fontSize: 14,
      color: theme.placeholder,
      marginBottom: 20,
    },
    input: {
      height: 48,
      borderWidth: 1,
      borderColor: theme.placeholder,
      borderRadius: 10,
      paddingHorizontal: 12,
      fontSize: 16,
      color: theme.text,
      backgroundColor: theme.input || theme.surface,
      marginBottom: 12,
    },
    loginButton: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: theme.primary,
      height: 48,
      borderRadius: 10,
      marginTop: 12,
    },
    loginButtonText: {
      color: theme.onPrimary,
      fontSize: 16,
      fontWeight: "600",
      marginLeft: 8,
    },
    errorText: {
      color: theme.error,
      fontSize: 12,
      marginBottom: 6,
    },
  });

export default SignUpPage;
