import { StyleSheet, Text, View, ScrollView, FlatList } from "react-native";
import React from "react";
import Header from "../components/home/Header";
import HomeBoard from "../components/home/HomeBoard";
import TrendingCreators from "../components/home/TrendingCreators";
import TrendingTag from "../components/home/TrendingTag";

export default function HomeScreen() {
  return (
    <ScrollView>
      <View style={styles.homeScreen}>
        <Header />
        <HomeBoard />
        <TrendingCreators />
        <TrendingTag />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  homeScreen: {
    left: 180,
    top: 395,
  },
});
