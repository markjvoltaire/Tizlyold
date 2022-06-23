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

export default function HomeBoard() {
  // bring this back when we can store the user name in context when logging in
  // const { user } = useUser();
  // console.log("user", user);

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
      <Text> {currentUser.username} </Text>
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
});
