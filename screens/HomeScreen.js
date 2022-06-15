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
import React from "react";
import Header from "../components/home/Header";
import HomeBoard from "../components/home/HomeBoard";
import TrendingCreators from "../components/home/TrendingCreators";
import TrendingTag from "../components/home/TrendingTag";
import MainStackNavigator from "../navigation/StackNavigator";

import { NavigationContainer } from "@react-navigation/native";
import { supabase } from "../services/supabase";

export default function HomeScreen({ navigation }) {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <SafeAreaView>
        <Header />
        <HomeBoard />
        <TrendingCreators />
        <TrendingTag />
        <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
          <Image style={styles.user} source={require("../assets/mark.png")} />
        </TouchableOpacity>
      </SafeAreaView>
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
