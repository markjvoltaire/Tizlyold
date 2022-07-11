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
import * as ImagePicker from "expo-image-picker";
export default function PostForm({ navigation }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [post, setPost] = useState("");
  const { user, setUser, userPost, setUserPost } = useUser();

  const username = user.username;
  // const email = user.email;
  const displayName = user.displayName;
  const profileImage = user.profileimage;
  const bio = user.bio;
  console.log("userPost", userPost);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let photo = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    try {
      console.log(photo);
      return await uploadProfileFromUri(photo);
    } catch (e) {
      ErrorAlert({ title: "image upload", message: e.message });
      return null;
    }
  };

  const uploadProfileFromUri = async (photo) => {
    const userId = supabase.auth.currentUser.id;

    if (!photo.cancelled) {
      const ext = photo.uri.substring(photo.uri.lastIndexOf(".") + 1);

      const fileName = photo.uri.replace(/^.*[\\\/]/, "");

      var formData = new FormData();
      formData.append("files", {
        uri: photo.uri,
        name: fileName,
        type: photo.type ? `image/${ext}` : `video/${ext}`,
      });

      const { data, error } = await supabase.storage
        .from("profile-images")
        .upload(fileName, formData, {
          upsert: false,
        });

      const { publicURL } = await supabase.storage
        .from("profile-images")
        .getPublicUrl(`${fileName}`);

      const resp = await supabase
        .from("post")
        .update({ media: publicURL })
        .eq("user_id", userId);

      console.log("error", error);

      if (error) throw new Error(error.message);

      return { ...photo, imageData: data };
    } else {
      return photo;
    }
  };

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

      <TouchableOpacity
        onPress={async () => {
          const resp = await pickImage();

          if (resp?.imageData) {
            setImage(resp.uri);
            setImageData(resp?.imageData);
          }
        }}
      >
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
            profileImage,
            bio,
            media
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
