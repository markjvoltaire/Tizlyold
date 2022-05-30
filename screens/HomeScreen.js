import { StyleSheet, Text, View, ScrollView, FlatList } from "react-native";
import React from "react";
import Header from "../components/home/Header";
import HomeBoard from "../components/home/HomeBoard";
import TrendingCreators from "../components/home/TrendingCreators";
import TrendingTag from "../components/home/TrendingTag";
import MainStackNavigator from "../navigation/StackNavigator";

import { NavigationContainer } from "@react-navigation/native";

export default function HomeScreen() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View>
        <Header />
        <HomeBoard />
        <TrendingCreators />
        <TrendingTag />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
  },
});
