import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
} from "react-native";
import React from "react";
import Header from "../components/home/Header";

export default function HomeScreen({ navigation }) {
  const FullSeperator = () => <View style={styles.fullSeperator} />;
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <FullSeperator />
      <Header />
      <TouchableOpacity onPress={() => navigation.navigate("Settings")}>
        <Image
          style={styles.settingIcon}
          source={require("../assets/Setting.jpg")}
        />
      </TouchableOpacity>
      <Text style={{ paddingLeft: 155 }}>HomeScreen</Text>
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
});
