import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TextInput,
  Button,
  TouchableOpacity,
  Image,
} from "react-native";
import React, { useState, useEffect } from "react";

export default function Comment() {
  const [comment, setComment] = useState("");
  const FullSeperator = () => <View style={styles.fullSeperator} />;
  return (
    <SafeAreaView style={{ left: 40 }}>
      <FullSeperator />
      <TextInput
        autoCapitalize="none"
        autoCorrect={false}
        placeholder="Leave A Comment"
        onChangeText={(text) => setComment(text)}
        style={styles.commentInput}
      />
      <View style={{ left: 170, position: "absolute" }}>
        <TouchableOpacity onPress={() => console.log(comment)}>
          <Image
            style={{ height: 33, resizeMode: "contain", bottom: 30 }}
            source={require("../../assets/commentPost.png")}
          />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  commentInput: {
    borderColor: "grey",
    borderWidth: 0.1,
    borderRadius: 10,
    backgroundColor: "#E1E1EA",
    width: 230,
    height: 33,
    position: "absolute",
    bottom: 35,
    paddingLeft: 20,
  },
  fullSeperator: {
    borderBottomColor: "#EDEDED",
    borderBottomWidth: 2.0,
    opacity: 9.8,
    width: 900,
    right: 40,
    bottom: 42,
    height: 3,
  },
});
