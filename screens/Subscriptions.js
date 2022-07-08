import {
  StyleSheet,
  Text,
  ScrollView,
  View,
  TouchableOpacity,
  Image,
} from "react-native";
import React from "react";
import Header from "../components/home/Header";
import HomeBoard from "../components/home/HomeBoard";

export default function Subscriptions({ navigation }) {
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
      <View style={styles.pageTitle}>
        <Text
          style={{
            position: "absolute",
            fontSize: 20,
            fontWeight: "600",
          }}
        >
          Subscriptions
        </Text>
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
  pageTitle: {
    alignItems: "center",
    bottom: 200,
  },
});
