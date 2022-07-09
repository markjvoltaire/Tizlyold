import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Image,
  TouchableOpacity,
  Pressable,
} from "react-native";
import React, { useState } from "react";

import { createPost } from "../../services/user";
import { useUser } from "../../context/UserContext";
import { supabase } from "../../services/supabase";
export default function PostForm({ navigation }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [post, setPost] = useState("");
  const { user, setUser } = useUser();

  const username = user.username;
  // const email = user.email;
  const displayName = user.displayName;
  const profileImage = user.profileimage;

  return (
    <View style={styles.postHeader}>
      <TextInput
        style={styles.postTitle}
        fontWeight="600"
        placeholder="Post Title"
        placeholderTextColor="#393939"
        value={title}
        onChangeText={(text) => setTitle(text)}
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
        value={description}
        onChangeText={(text) => setDescription(text)}
      />

      <Text style={styles.subHead}>Select From Gallery</Text>

      <TouchableOpacity>
        <Image
          style={styles.plusButton}
          source={require("../../assets/plusButton.png")}
        />
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() =>
          createPost(
            title,
            description,
            username,
            displayName,
            profileImage
          ).then(() => navigation.navigate("Home"))
        }
      >
        <Image
          style={styles.postButton}
          source={require("../../assets/post.png")}
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
    left: 120,
    bottom: -5,
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
