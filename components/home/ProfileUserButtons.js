import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import React from "react";

export default function ProfileUserButtons() {
  return (
    <View style={styles.userButtonsContainer}>
      <View style={styles.likeButtonContainer}>
        <TouchableOpacity>
          <Image
            style={{
              right: 3,
              width: 112,
              resizeMode: "contain",
            }}
            source={require("../../assets/likeButton.png")}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.commentButtonContainer}>
        <TouchableOpacity>
          <Image
            style={{
              width: 112,
              resizeMode: "contain",
            }}
            source={require("../../assets/commentButton.png")}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.saveButtonContainer}>
        <TouchableOpacity>
          <Image
            style={{
              width: 112,
              resizeMode: "contain",
              left: 3,
            }}
            source={require("../../assets/saveButton.png")}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  userButtonsContainer: {
    position: "absolute",
    flexDirection: "row",
    display: "flex",

    justifyContent: "space-evenly",
  },
});
