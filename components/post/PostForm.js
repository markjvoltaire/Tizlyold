import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Image,
  TouchableOpacity,
} from "react-native";
import React from "react";
export default function PostForm({ navigation }) {
  return (
    <View style={styles.postHeader}>
      <Image
        style={styles.postButton}
        source={require("../../assets/post.png")}
      />

      <TextInput
        style={styles.postTitle}
        fontWeight="600"
        placeholder="Post Title"
        placeholderTextColor="#393939"
      />

      <Text style={styles.postText}>Post</Text>

      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Image
          style={styles.exitButton}
          source={require("../../assets/x.png")}
        />
      </TouchableOpacity>

      <TextInput
        style={styles.postDescription}
        placeholder="Post Description"
        placeholderTextColor="#393939"
      />

      <Text style={styles.subHead}>Select From Gallery</Text>

      <TouchableOpacity>
        <Image
          style={styles.plusButton}
          source={require("../../assets/plusButton.png")}
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  postHeader: {
    alignItems: "center",
    bottom: 330,
  },
  postText: {
    fontWeight: "600",
    fontSize: 20,
  },
  postButton: {
    position: "absolute",
    width: 59,
    height: 32,
    left: 320,
  },

  subHead: {
    position: "absolute",
    top: 460,
    left: 20,
  },

  plusButton: {
    position: "absolute",
    width: 105,
    height: 105,
    top: 500,
    right: 85,
  },

  postTitle: {
    position: "absolute",
    top: 90,
    right: 320,
    borderColor: "grey",
    height: 80,
    paddingLeft: 10,
    width: 380,
    left: 20,
    fontSize: 16,
    borderRadius: 8,
    backgroundColor: "#EBEBF1",
  },
  exitButton: {
    position: "absolute",
    width: 16,
    height: 16,
    right: 160,
    bottom: 3,
  },
  postDescription: {
    position: "absolute",
    top: 200,
    height: 215,
    width: 380,
    borderRadius: 8,
    fontSize: 16,
    paddingBottom: 140,
    paddingLeft: 10,
    backgroundColor: "#EBEBF1",
    fontWeight: "500",
  },
});
