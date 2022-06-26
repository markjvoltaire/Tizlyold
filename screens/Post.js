import { StyleSheet, Text, View, Alert, TextInput, Button } from "react-native";
import React, { useState, useEffect } from "react";
import { getUser, getUsers } from "../services/user";
import { supabase } from "../services/supabase";

export default function Post() {
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [profileImage, setProfileImage] = useState("");
  const [user, setUser] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [test, setTest] = useState("");

  async function getUserById() {
    const userId = supabase.auth.currentUser.id;
    console.log("user", user);

    const { data } = await supabase
      .from("profiles")
      .select("*")
      .eq("user_id", userId)
      .single();
    setTest(data);
  }

  console.log("test", test);

  useEffect(() => {
    const getUserProfile = async () => {
      const resp = await getUserById();
      setUser(resp);
    };
    getUserProfile();
  }, []);

  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "white",
      }}
    >
      <Button
        title="pressMe"
        onPress={() => {
          console.log(test);
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  usernameInput: {
    position: "absolute",
    left: 55,
    top: 350,
    borderColor: "grey",
    borderWidth: 0.5,
    height: 50,
    width: 311,
    borderRadius: 10,
    paddingLeft: 30,
  },

  emailInput: {
    position: "absolute",
    left: 55,
    top: 300,
    borderColor: "grey",
    borderWidth: 0.5,
    height: 50,
    width: 311,
    borderRadius: 10,
    paddingLeft: 30,
  },
  displayInput: {
    position: "absolute",
    left: 55,
    top: 420,
    borderColor: "grey",
    borderWidth: 0.5,
    height: 50,
    width: 311,
    borderRadius: 10,
    paddingLeft: 30,
  },
});
