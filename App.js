import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from "@react-navigation/native";
import { UserProvider } from "./context/UserContext";
import PropTypes from "prop-types";
import React, { useState, useEffect } from "react";
import { supabase } from "./services/supabase";
import { Appearance, useColorScheme } from "react-native";

import AuthStack from "./auth/AuthStack";
import NoAuthStack from "./auth/NoAuthStack";

import { LogBox } from "react-native";

import Welcome from "./screens/Welcome";
import { AuthProvider } from "./context/AuthContext";

LogBox.ignoreLogs(["Warning: ..."]);
LogBox.ignoreAllLogs();

export default function App({ navigation }) {
  const [auth, setAuth] = useState();
  const [loading, setLoading] = useState(true);

  const MyTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      primary: "white",
      background: "white",
      text: "white",
    },
  };

  const darkMode = {
    ...DarkTheme,
    colors: {
      ...DarkTheme.colors,

      background: "black",
      text: "white",
    },
  };

  const scheme = useColorScheme();

  0;

  const statusStyle = scheme === "light" ? "dark" : "light";

  useEffect(() => {
    setAuth(supabase.auth.session());

    supabase.auth.onAuthStateChange((_event, session) => {
      setAuth(session);
    });
  });

  return (
    <AuthProvider>
      <UserProvider>
        <NavigationContainer theme={scheme === "dark" ? darkMode : MyTheme}>
          <StatusBar style={`${statusStyle}`} />
          {auth ? <AuthStack navigation={navigation} /> : <NoAuthStack />}
        </NavigationContainer>
      </UserProvider>
    </AuthProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
