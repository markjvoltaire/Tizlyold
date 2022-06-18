import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import React from "react";

export default function TrendingCreators({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.trendTitle}>Trending Creator</Text>
      <View style={styles.iconContainer}>
        <TouchableOpacity onPress={() => navigation.navigate("ProfileScreen")}>
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
          <Text style={styles.userName2}>I AM ATHLETE</Text>
        </TouchableOpacity>

        <TouchableOpacity>
          <Image
            style={styles.userIcon}
            source={require("../../assets/complex.png")}
          />
          <Text style={styles.userName3}>Complex</Text>
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
    top: 200,
    left: 10,
    fontWeight: "bold",
  },
  userName2: {
    position: "absolute",
    top: 200,
    left: 6,
    fontWeight: "bold",
  },
  userName3: {
    position: "absolute",
    top: 200,
    left: 15,
    fontWeight: "bold",
  },
});
