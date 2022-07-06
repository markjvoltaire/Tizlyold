import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import React from "react";
import { useLinkTo } from "@react-navigation/native";

export default function TrendingCreators({ navigation }) {
  const linkTo = useLinkTo();
  return (
    <View style={styles.container}>
      <Text style={styles.trendTitle}>Trending Creator 🔥</Text>
      <View style={styles.iconContainer}>
        <TouchableOpacity onPress={() => linkTo("/HomeScreen/me")}>
          <Image
            style={styles.userIcon}
            source={require("../../assets/druski.jpg")}
          />
          <Text style={styles.userName1}>Druski</Text>
        </TouchableOpacity>

        <TouchableOpacity>
          <Image
            style={styles.userIcon}
            source={require("../../assets/wallo.jpg")}
          />
          <Text style={styles.userName2}>Millon Dollar Worth of Game </Text>
        </TouchableOpacity>

        <TouchableOpacity>
          <Image
            style={styles.userIcon}
            source={require("../../assets/taylor.jpg")}
          />
          <Text style={styles.userName3}>DJ Taylor</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    marginLeft: -150,
    left: 164,
    top: 12,
  },

  iconContainer: {
    flexDirection: "row",
  },

  userIcon: {
    marginLeft: 10,
    resizeMode: "contain",
    marginHorizontal: 2,
    top: 50,
    width: 127,
    height: 123,
    right: 20,
  },

  trendTitle: {
    position: "absolute",
    top: 3,
    fontWeight: "bold",
  },

  userName1: {
    position: "absolute",
    top: 189,
    left: 25,
    fontWeight: "bold",
    color: "#5C5C5C",
  },
  userName2: {
    position: "absolute",
    top: 185,
    left: 6,
    width: 110,
    fontWeight: "bold",
    color: "#5C5C5C",
  },
  userName3: {
    position: "absolute",
    top: 189,
    left: 15,
    fontWeight: "bold",
    color: "#5C5C5C",
  },
});
