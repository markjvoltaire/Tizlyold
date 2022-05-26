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

      <TouchableOpacity>
        <Image
          style={styles.fitness}
          source={require("../../assets/rectanglePurple.png")}
        />
      </TouchableOpacity>

      <TouchableOpacity>
        <Image
          style={styles.cooking}
          source={require("../../assets/rectanglePink.png")}
        />
      </TouchableOpacity>

      <TouchableOpacity>
        <Image
          style={styles.wraps}
          source={require("../../assets/rectangleRed.png")}
        />
      </TouchableOpacity>

      <TouchableOpacity>
        <Image
          style={styles.gaming}
          source={require("../../assets/rectangleOrange.png")}
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
    width: 100,
    height: 29,
    left: -150,
    top: 300,
  },

  homeBusiness: {
    position: "absolute",
    width: 100,
    height: 29,
    left: -30,
    top: 300,
  },

  fitness: {
    position: "absolute",
    width: 100,
    height: 29,
    left: 95,
    top: 300,
  },

  cooking: {
    position: "absolute",
    width: 100,
    height: 29,
    left: -150,
    top: 358,
  },

  wraps: {
    position: "absolute",
    width: 100,
    height: 29,
    left: -30,
    top: 358,
  },

  gaming: {
    position: "absolute",
    width: 100,
    height: 29,
    left: 95,
    top: 358,
  },
  text: {},
});
