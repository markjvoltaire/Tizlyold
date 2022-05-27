import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import React from "react";

export default function TrendingCreators() {
  return (
    <View style={styles.container}>
      <Text style={styles.trendTitle}>Trending Creator</Text>
      <View style={styles.iconContainer}>
        <TouchableOpacity>
          <Image
            style={styles.userIcon}
            source={require("../../assets/desi.png")}
          />
          <Text style={styles.userName1}>Desi Banks</Text>
        </TouchableOpacity>

        <TouchableOpacity>
          <Image
            style={styles.userIcon}
            source={require("../../assets/iaa.png")}
          />
          <Text style={styles.userName1}>I AM ATHLETE</Text>
        </TouchableOpacity>

        <TouchableOpacity>
          <Image
            style={styles.userIcon}
            source={require("../../assets/complex.png")}
          />
          <Text style={styles.userName1}>Complex</Text>
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
    left: 165,
  },

  iconContainer: {
    flexDirection: "row",
  },

  userIcon: {
    marginLeft: 10,
    resizeMode: "contain",
    marginHorizontal: 30,
    top: 50,
  },

  trendTitle: {
    position: "absolute",
    top: 3,
    fontWeight: "bold",
  },

  userName1: {
    position: "absolute",
    top: 155,
    left: 20,
    fontWeight: "bold",
  },
});
