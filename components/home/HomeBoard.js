import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  TextInput,
} from "react-native";
import React, { useEffect, useState } from "react";
import { supabase } from "../../services/supabase";
import { useUser } from "../../context/UserContext";

export default function HomeBoard() {
  const { user, setUser } = useUser();
  console.log("user", user);

  const [currentUser, setCurrentUser] = useState("");

  async function getUserById() {
    const user = supabase.auth.currentUser.id;
    console.log("user", user);

    const { data } = await supabase
      .from("profiles")
      .select("*")
      .eq("user_id", user)
      .single();
    setCurrentUser(data);
  }

  useEffect(() => {
    const getUserProfile = async () => {
      const resp = await getUserById();
      setUser(resp);
    };
    getUserProfile();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.username}> Welcome 👋 {currentUser.username} </Text>
      <TouchableOpacity>
        <Image
          style={styles.homeboard}
          source={require("../../assets/homeBanner.png")}
        />
      </TouchableOpacity>

      <TextInput />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    left: 180,
    top: 20,
  },
  header: {
    position: "absolute",
    top: -300,
    color: "black",
    width: 500,
    left: -160,
    fontWeight: "bold",
  },

  homeboard: {
    position: "absolute",
    top: -230,
    left: -188,
    height: 200,
    width: 430,
  },
  username: {
    bottom: 250,
    right: 175,
    fontWeight: "bold",
  },
});
