import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import React from "react";

export default function TrendingCreators() {
  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <TouchableOpacity>
          <Image
            style={styles.userIcon}
            source={require("../../assets/desi.png")}
          />
        </TouchableOpacity>

        <TouchableOpacity>
          <Image
            style={styles.userIcon}
            source={require("../../assets/iaa.png")}
          />
        </TouchableOpacity>

        <TouchableOpacity>
          <Image
            style={styles.userIcon}
            source={require("../../assets/complex.png")}
          />
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
  },

  iconContainer: {
    flexDirection: "row",
  },

  userIcon: {
    marginLeft: 10,
    resizeMode: "contain",
    marginHorizontal: 20,
  },
});
