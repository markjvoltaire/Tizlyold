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

export default function Explore({ navigation }) {
  const FullSeperator = () => <View style={styles.fullSeperator} />;

  const HalfSeperator = () => <View style={styles.halfSeperator} />;

  const HalfSeperator2 = () => <View style={styles.halfSeperator2} />;

  const [username, setUsername] = useState("");
  const [user, setUser] = useState("");
  const [loading, setLoading] = useState(false);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <SafeAreaView>
        <Header />
        <FullSeperator />
        <HomeBoard />
        <HalfSeperator />
        <TrendingCreators />
        <HalfSeperator2 />
        <TrendingTag />
      </SafeAreaView>
      <TouchableOpacity onPress={() => navigation.navigate("Settings")}>
        <Image
          style={styles.settingIcon}
          source={require("../assets/Setting.jpg")}
        />
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
  settingIcon: {
    position: "absolute",
    left: 368,
    bottom: 306.5,
    width: 29,
    height: 29,
  },
  fullSeperator: {
    borderBottomColor: "grey",
    borderBottomWidth: StyleSheet.hairlineWidth,
    opacity: 0.5,
    width: 900,
    left: 1,
    bottom: 250,
  },
  halfSeperator: {
    borderBottomColor: "grey",
    borderBottomWidth: 0.8,
    opacity: 0.5,
    width: 298,
    left: 70,
    bottom: 25,
  },
  halfSeperator2: {
    borderBottomColor: "grey",
    borderBottomWidth: 0.8,
    opacity: 0.5,
    width: 298,
    left: 70,
    top: 235,
  },
});
