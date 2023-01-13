import {
  StyleSheet,
  Text,
  View,
  Image,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import React, { useEffect } from "react";

import { supabase } from "../services/supabase";
import { useUser } from "../context/UserContext";
import HomeScreen from "./HomeScreen";

export default function SignUpSuccess({ navigation }) {
  const { user, setUser } = useUser();

  async function getUserById() {
    const userId = supabase.auth.currentUser.id;

    const { data } = await supabase
      .from("profiles")
      .select("*")
      .eq("user_id", userId)
      .single();
    setUser(data);
  }



  useEffect(() => {
    const getUserProfile = async () => {
      await getUserById();
    };
    getUserProfile();
  }, []);

  return (
    <SafeAreaView>
      <Text style={styles.text1}>Sign Up Successful</Text>
      <Text style={styles.text2}>You're All Set</Text>
      <Image style={styles.check} source={require("../assets/Vector.png")} />

      <TouchableOpacity onPress={() => navigation.navigate("HomeScreen")}>
        <Image
          style={styles.button}
          source={require("../assets/buttonBlue.png")}
        />
      </TouchableOpacity>
      <HomeScreen user={user} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  check: {
    position: "absolute",
    width: 110,
    height: 110,
    top: 400,
    left: 155,
  },
  text1: {
    position: "absolute",
    fontSize: 19,
    top: 175,
    left: 130,
  },
  text2: {
    position: "absolute",
    fontWeight: "bold",
    fontSize: 30,
    top: 280,
    left: 118,
  },
  button: {
    position: "absolute",
    width: 311,
    height: 50,
    top: 660,
    left: 55,
  },
});
