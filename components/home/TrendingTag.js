import {
  StyleSheet,
  Text,
  View,
  Button,
  Image,
  TouchableOpacity,
} from "react-native";
import React from "react";

export default function TrendingTag() {
  return (
    <View style={styles.container}>
      <Text style={styles.tagTitle}>TrendingTag</Text>
      <TouchableOpacity>
        <Image
          style={styles.styleHacks}
          source={require("../../assets/rectangleGreen.png")}
        />
      </TouchableOpacity>

      <TouchableOpacity>
        <Image
          style={styles.homeBusiness}
          source={require("../../assets/rectangleBlue.png")}
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    flex: 1,
    alignContent: "center",
    justifyContent: "center",
    marginHorizontal: "auto",
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "flex-start",
  },
  tagTitle: {
    position: "absolute",
    top: 250,
    right: 65,
  },
  styleHacks: {
    position: "absolute",
    width: 91,
    height: 29,
    left: -150,
    top: 300,
  },

  homeBusiness: {
    position: "absolute",
    width: 104,
    height: 29,
    left: -30,
    top: 300,
  },
});
