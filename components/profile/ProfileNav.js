import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import React from "react";

export default function ProfileNav({ navigation }) {
  return (
    <View style={styles.profileNav}>
      <TouchableOpacity>
        <Text style={styles.home}>Home</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate("UserSubscriber")}>
        <Text style={styles.subscribers}>Subscribers</Text>
      </TouchableOpacity>

      <TouchableOpacity>
        <Text style={styles.shop}>Shop</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  profileNav: {
    position: "absolute",
    top: 87,
    width: 4000,
  },
  home: {
    position: "absolute",
    fontWeight: "bold",
    top: 390,
    left: 28,
    fontSize: 16,
  },
  media: {
    position: "absolute",
    fontWeight: "bold",
    top: 390,
    left: 117,
    fontSize: 16,
  },
  subscribers: {
    position: "absolute",
    fontWeight: "bold",
    top: 390,
    left: 165,
    fontSize: 16,
  },
  shop: {
    position: "absolute",
    fontWeight: "bold",
    top: 390,
    left: 330,
    fontSize: 16,
  },
  fullSeperator: {
    borderBottomColor: "red",
    borderBottomWidth: StyleSheet.hairlineWidth,
    opacity: 0.5,
    width: 900,
    left: 1,
    bottom: 70,
  },
});
