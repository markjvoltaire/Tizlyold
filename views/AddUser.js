import { View, Text } from "react-native";
import React from "react";
import { supabase } from "../services/supabase";
import { addUserName } from "../services/user";
import UserNames from "../screens/UserNames";

export default function AddUser() {
  const handleRegister = async (email, password, username, displayName) => {
    try {
      let { user } = await supabase.auth
        .signUp({
          email: email,
          password: password,
        })
        .then(() => addUserName(username, displayName))
        .then(() =>
          console.log("supabase.auth.currentUser", supabase.auth.currentUser)
        )
        .then(() => navigation.navigate("HomeScreen"));

      return { user, error };
    } catch (error) {
      throw error;
    }
  };

  return (
    <UserNames
      password={password}
      displayName={displayName}
      email={email}
      handleRegister={handleRegister}
    />
  );
}
