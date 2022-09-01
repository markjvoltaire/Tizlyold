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

import PostForm from "../components/post/PostForm";
import { useUser } from "../context/UserContext";
import * as ImagePicker from "expo-image-picker";
import PostButtons from "../components/post/PostButtons";

export default function Post({ navigation }) {
  const { user, setUser } = useUser();
  const [image, setImage] = useState(null);
  const [imageData, setImageData] = useState(null);

  const FullSeperator = () => <View style={styles.fullSeperator} />;

  const pickPost = async () => {
    // No permissions request is necessary for launching the image library
    let photo = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log("photo", photo);

    if (!photo.cancelled) {
      const ext = photo.uri.substring(photo.uri.lastIndexOf(".") + 1);
      const fileName = photo.uri.replace(/^.*[\\\/]/, "");

      var formData = new FormData();
      formData.append("files", {
        uri: photo.uri,
        name: fileName,
        type: photo.type ? `image/${ext}` : `video/${ext}`,
      });

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

  postButton: {
    position: "absolute",
    width: 59,
    height: 32,
    left: 320,
    bottom: 326,
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
