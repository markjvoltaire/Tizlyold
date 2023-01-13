import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import React from "react";

export default function PostDetailButtons() {
  return (
    <View style={styles.userButtonsContainer}>
      <View style={styles.likeButtonContainer}>
        <TouchableOpacity>
          <Image
            style={{
              height: 72,
              width: 132,
            }}
            source={require("../../assets/likeButton.png")}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.commentButtonContainer}>
        <TouchableOpacity>
          <Image
            style={{
              height: 72,
              width: 132,
            }}
            source={require("../../assets/commentButton.png")}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.saveButtonContainer}>
        <TouchableOpacity>
          <Image
            style={{
              height: 72,
              width: 132,
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
