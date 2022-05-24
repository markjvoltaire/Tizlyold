import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Header from "../components/home/Header";
import HomeBoard from "../components/home/HomeBoard";

export default function HomeScreen() {
  return (
    <View>
      <Header />
      <HomeBoard />
    </View>
  );
}

const styles = StyleSheet.create({});
