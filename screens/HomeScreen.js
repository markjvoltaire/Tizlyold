import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Header from "../components/home/Header";
import HomeBoard from "../components/home/HomeBoard";
import TrendingCreators from "../components/home/TrendingCreators";
import TrendingTag from "../components/home/TrendingTag";

export default function HomeScreen() {
  return (
    <View>
      <Header />
      <HomeBoard />
      <TrendingCreators />
      <TrendingTag />
    </View>
  );
}

const styles = StyleSheet.create({});
