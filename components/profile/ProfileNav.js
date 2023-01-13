import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import React from "react";

export default function ProfileNav({ navigation }) {
  const FullSeperator = () => <View style={styles.fullSeperator} />;
  return (
    <View style={styles.profileNav}>
      <TouchableOpacity>
        <Text style={styles.home}>Home</Text>
      </TouchableOpacity>

      <TouchableOpacity>
        <Text style={styles.subscribers}>Subscribers</Text>
      </TouchableOpacity>

      <TouchableOpacity>
        <Text style={styles.shop}>Shop</Text>
      </TouchableOpacity>
      <FullSeperator />
    </View>
  );
}

const styles = StyleSheet.create({
  profileNav: {
    position: "absolute",
    top: 39,
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
    borderBottomColor: "grey",
    borderBottomWidth: StyleSheet.hairlineWidth,
    opacity: 0.5,
    width: 900,
    left: 1,
    top: 430,
  },
});
