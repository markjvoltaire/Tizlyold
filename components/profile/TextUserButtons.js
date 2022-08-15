import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import React from "react";

export default function TextUserButtons({ isPressed, item, setIsPressed }) {
  console.log("item", item);
  return (
    <View style={styles.userButtonsContainer}>
      <View style={styles.likeButtonContainer}>
        <TouchableOpacity onPress={() => handlePress()}>
          <Image
            style={{
              top: 30,
              height: 32,
              aspectRatio: 1,
            }}
            source={
              isPressed === false
                ? require("../../assets/Heart.png")
                : require("../../assets/likedHeart.png")
            }
          />
        </TouchableOpacity>
      </View>
      <View style={styles.commentButtonContainer}>
        <TouchableOpacity onPress={() => likeOldPost()}>
          <Image
            style={{
              top: 30,
              height: 32,
              aspectRatio: 1,
              resizeMode: "contain",
            }}
            source={require("../../assets/Chat.png")}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.saveButtonContainer}>
        <TouchableOpacity onPress={() => console.log("item", item)}>
          <Image
            style={{
              top: 30,
              height: 32,
              aspectRatio: 1,
              resizeMode: "contain",
            }}
            source={require("../../assets/Bookmark.png")}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  userButtonsContainer: {
    flexDirection: "row",
    display: "flex",
    justifyContent: "space-evenly",
    paddingBottom: 20,
  },
});
