import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import React from "react";

export default function ProfileNav() {
  return (
    <View style={styles.profileNav}>
      <TouchableOpacity>
        <Text style={styles.home}>Home</Text>
      </TouchableOpacity>

      <TouchableOpacity>
        <Text style={styles.media}>Media</Text>
      </TouchableOpacity>

      <TouchableOpacity>
        <Text style={styles.subscribers}>Subscribers</Text>
      </TouchableOpacity>

      <TouchableOpacity>
        <Text style={styles.shop}>Shop</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  test: {
    position: "absolute",
    top: 420,
    width: 4000,
  },
  home: {
    position: "absolute",
    fontWeight: "bold",
    top: 420,
    left: 28,
    fontSize: 16,
  },
  media: {
    position: "absolute",
    fontWeight: "bold",
    top: 420,
    left: 117,
    fontSize: 16,
  },
  subscribers: {
    position: "absolute",
    fontWeight: "bold",
    top: 420,
    left: 199,
    fontSize: 16,
  },
  shop: {
    position: "absolute",
    fontWeight: "bold",
    top: 420,
    left: 320,
    fontSize: 16,
  },
});
