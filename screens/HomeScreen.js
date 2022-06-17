import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  FlatList,
  Button,
  TouchableOpacity,
  Image,
  SafeAreaView,
} from "react-native";
import React, { useEffect, useState } from "react";
import Header from "../components/home/Header";
import HomeBoard from "../components/home/HomeBoard";
import TrendingCreators from "../components/home/TrendingCreators";
import TrendingTag from "../components/home/TrendingTag";
import MainStackNavigator from "../navigation/StackNavigator";
import { getUsername, getUser } from "../services/user";

export default function HomeScreen({ navigation }) {
  const [username, setUsername] = useState("");
  const [user, setUser] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const resp = await getUser();
      setUser(resp);
      console.log("username", user);
    };

    fetchData();
  }, []);

  // useEffect(() => {
  //   const fetchUser = async () => {
  //     const resp = await getUser();
  //     setUser(resp);
  //     console.log("user", user);
  //   };

  //   fetchUser();
  // }, []);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <SafeAreaView>
        <Header />
        <HomeBoard />
        <TrendingCreators />
        <TrendingTag />
      </SafeAreaView>
      <TouchableOpacity onPress={() => navigation.navigate("Settings")}>
        <Image style={styles.user} source={require("../assets/Setting.jpg")} />
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
  },
  user: {
    position: "absolute",
    left: 355,
    bottom: 325,
    width: 32,
    height: 32,
  },
});
