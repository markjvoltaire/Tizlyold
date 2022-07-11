import {
  StyleSheet,
  Text,
  View,
  Alert,
  TextInput,
  Button,
  ScrollView,
  TouchableOpacity,
  Image,
} from "react-native";
import React, { useState, useEffect } from "react";
import { getUser, getUsers } from "../services/user";
import { supabase } from "../services/supabase";
import { useLinkTo } from "@react-navigation/native";
import Header from "../components/home/Header";
import PostForm from "../components/post/PostForm";
import { useUser } from "../context/UserContext";
import * as ImagePicker from "expo-image-picker";

export default function Post({ navigation }) {
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [profileImage, setProfileImage] = useState("");
  const { user, setUser } = useUser();

  const FullSeperator = () => <View style={styles.fullSeperator} />;

  // async function getUserById() {
  //   const userId = supabase.auth.currentUser.id;

  console.log("user from post", user);

  useEffect(() => {
    const getUserProfile = async () => {
      const resp = await getUserById();
      setUser(resp);
    };
    getUserProfile();
  }, []);

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
        .from("profiles")
        .update({ profileimage: publicURL })
        .eq("user_id", userId);

      console.log("error", error);

      if (error) throw new Error(error.message);

      return { ...photo, imageData: data };
    } else {
      return photo;
    }
  };

  const uploadBannerFromUri = async (photo) => {
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
        .from("profiles")
        .update({ bannerImage: publicURL })
        .eq("user_id", userId);

      getUserByIds();

      console.log("error", error);

      if (error) throw new Error(error.message);

      return { ...photo, imageData: data };
    } else {
      return photo;
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <PostForm navigation={navigation} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
  },

  usernameInput: {
    position: "absolute",
    left: 55,
    top: 350,
    borderColor: "grey",
    borderWidth: 0.5,
    height: 50,
    width: 311,
    borderRadius: 10,
    paddingLeft: 30,
  },

  emailInput: {
    position: "absolute",
    left: 55,
    top: 300,
    borderColor: "grey",
    borderWidth: 0.5,
    height: 50,
    width: 311,
    borderRadius: 10,
    paddingLeft: 30,
  },
  displayInput: {
    position: "absolute",
    left: 55,
    top: 420,
    borderColor: "grey",
    borderWidth: 0.5,
    height: 50,
    width: 311,
    borderRadius: 10,
    paddingLeft: 30,
  },
});
