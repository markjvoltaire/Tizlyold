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

import HomeBoard from "../components/home/HomeBoard";
import TrendingCreators from "../components/explore/TrendingCreators";
import TrendingTag from "../components/home/TrendingTag";
import MainStackNavigator from "../navigation/StackNavigator";
import { getUsername, getUsers } from "../services/user";
import TopHeader from "../components/TopHeader";
import NewToTizly from "../components/explore/NewToTizly";

export default function Explore({ navigation }) {
  const FullSeperator = () => <View style={styles.fullSeperator} />;

  const HalfSeperator = () => <View style={styles.halfSeperator} />;

  const HalfSeperator2 = () => <View style={styles.halfSeperator2} />;

  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(true);

  return (
    <ScrollView style={styles.container}>
      <TopHeader navigation={navigation} />
      <HomeBoard />
      <TrendingCreators navigation={navigation} />
      <NewToTizly navigation={navigation} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {},
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
  homeBoardContainer: {
    backgroundColor: "white",
  },
  explorePageContainer: {
    flex: 1,
  },
});
