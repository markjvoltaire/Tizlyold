import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
} from "react-native";
import React, { useEffect, useState } from "react";
import { supabase } from "../services/supabase";
import Header from "../components/home/Header";
import { useUser } from "../context/UserContext";
import * as ImagePicker from "expo-image-picker";

export default function HomeScreen({ navigation }) {
  const { user, setUser } = useUser();
  const [image, setImage] = useState(null);

  async function getUser() {
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
      await getUser();
    };
    getUserProfile();
  }, []);

  const FullSeperator = () => <View style={styles.fullSeperator} />;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Header />
      <FullSeperator />
      <TouchableOpacity onPress={() => navigation.navigate("Settings")}>
        <Image
          style={styles.settingIcon}
          source={require("../assets/Setting.jpg")}
        />
      </TouchableOpacity>
      {/* <Text> user is {user.username}</Text> */}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
  },
  fullSeperator: {
    borderBottomColor: "grey",
    borderBottomWidth: StyleSheet.hairlineWidth,
    opacity: 0.5,
    width: 900,
    left: 1,
    bottom: 250,
  },
  settingIcon: {
    position: "absolute",
    left: 368,
    bottom: 270.7,
    width: 29,
    height: 29,
  },
  image: {
    width: 900,
    height: 900,
  },
  userBanner: {
    position: "absolute",
    width: 455,
    right: -10,
    height: 455,
  },
});
