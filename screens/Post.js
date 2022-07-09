import {
  StyleSheet,
  Text,
  View,
  Alert,
  TextInput,
  Button,
  ScrollView,
  TouchableOpacity,
  Image,
} from "react-native";
import React, { useState, useEffect } from "react";
import { getUser, getUsers } from "../services/user";
import { supabase } from "../services/supabase";
import { useLinkTo } from "@react-navigation/native";
import Header from "../components/home/Header";
import PostForm from "../components/post/PostForm";
import { useUser } from "../context/UserContext";

export default function Post({ navigation }) {
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [profileImage, setProfileImage] = useState("");
  const { user, setUser } = useUser();

  const FullSeperator = () => <View style={styles.fullSeperator} />;

  // async function getUserById() {
  //   const userId = supabase.auth.currentUser.id;

  console.log("user from post", user);

  useEffect(() => {
    const getUserProfile = async () => {
      const resp = await getUserById();
      setUser(resp);
    };
    getUserProfile();
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <PostForm navigation={navigation} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
  },

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
