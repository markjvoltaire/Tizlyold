import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Image,
  TouchableOpacity,
  Pressable,
  Button,
} from "react-native";
import React, { useState } from "react";

import { useUser } from "../../context/UserContext";
import { supabase } from "../../services/supabase";
import { createPost } from "../../services/user";
import * as ImagePicker from "expo-image-picker";
import { usePosts } from "../../context/PostContext";
import Post from "../../screens/Post";
import PostButtons from "./PostButtons";
export default function PostForm({ navigation }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const { user, setUser } = useUser();
  const [image, setImage] = useState();
  const [mediaType, setMediaType] = useState();
  const [imageData, setImageData] = useState(null);

  const username = user.username;
  const displayName = user.displayName;
  const profileImage = user.profileimage;
  const bannerImage = user.bannerImage;
  const bio = user.bio;

  const Seperator = () => <View style={styles.fullSeperator} />;

  async function addPost() {
    const userId = supabase.auth.currentUser.id;

    const resp = await supabase.from("post").insert([
      {
        username: username,
        user_id: userId,
        displayName: displayName,
        title: title,
        description: description,
        profileImage: profileImage,
        media: image,
        mediaType: mediaType,
        bannerImage: bannerImage,
        bio: bio,
      },
    ]);

    console.log("resp", resp);
    console.log("image", image);

    return resp;
  }

  const uploadPostFromUri = async (photo) => {
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
        .from("posts")
        .upload(fileName, formData, {
          upsert: true,
        });

      const { publicURL } = await supabase.storage
        .from("posts")
        .getPublicUrl(`${fileName}`);
      console.log("publicURL", publicURL);

      const url = publicURL;
      console.log("url", url);

      const resp = await supabase
        .from("post")
        .insert({ user_id: userId, media: publicURL })
        .eq("id", resp.id);

      getUserByIds();

      console.log("error", error);

      if (error) throw new Error(error.message);

      return { ...photo, imageData: data };
    } else {
      return photo;
    }
  };

  const pickPost = async () => {
    // No permissions request is necessary for launching the image library
    let photo = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!photo.cancelled) {
      const ext = photo.uri.substring(photo.uri.lastIndexOf(".") + 1);
      const fileName = photo.uri.replace(/^.*[\\\/]/, "");

      var formData = new FormData();
      formData.append("files", {
        uri: photo.uri,
        name: fileName,
        type: photo.type ? `image/${ext}` : `video/${ext}`,
      });

      try {
        const { data, error } = await supabase.storage
          .from("posts")
          .upload(fileName, formData, {
            upsert: true,
          });

        const { publicURL } = await supabase.storage

          .from("posts")
          .getPublicUrl(`${fileName}`);

        let imageLink = publicURL;
        let type = photo.type;
        console.log("imageLink", imageLink);
        setImage(imageLink);
        setMediaType(type);

        console.log(photo.type);
      } catch (e) {
        ErrorAlert({ title: "image upload", message: e.message });
        return null;
      }
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

      <View style={{ top: 80 }}>
        <Text style={styles.subHead}>Select From Gallery</Text>

        <TouchableOpacity
          onPress={async () => {
            const resp = await pickPost();

            if (resp?.imageData) {
              setImage(resp.uri);
              setImageData(resp?.imageData);
            }
          }}
        >
          <Image
            style={styles.plusButton}
            source={
              image ? { uri: image } : require("../../assets/plusButton.png")
            }
          />
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        onPress={() => {
          addPost().then(() => {
            navigation.navigate("HomeScreen");
          });
        }}
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
  category: {
    position: "absolute",
    top: 345,
    right: 183,
  },

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
    top: 400,
    right: 60,
  },

  plusButton: {
    position: "absolute",
    width: 125,
    height: 125,
    top: 450,
    right: 60,
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

  fullSeperator: {
    borderBottomColor: "grey",
    borderBottomWidth: StyleSheet.hairlineWidth,
    opacity: 0.5,
    width: 900,
    left: 1,
    bottom: 250,
  },
});
