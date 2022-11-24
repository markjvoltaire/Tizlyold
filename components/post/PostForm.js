import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Image,
  TouchableOpacity,
  Pressable,
  Button,
  Alert,
  SafeAreaView,
  Platform,
  Dimensions,
} from "react-native";
import React, { useEffect, useState } from "react";

import { useUser } from "../../context/UserContext";
import { supabase } from "../../services/supabase";

import * as ImagePicker from "expo-image-picker";

import { StackActions } from "@react-navigation/native";
import LottieView from "lottie-react-native";

import { Video, AVPlaybackStatus } from "expo-av";
export default function PostForm({ navigation }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(true);
  const video = React.useRef(null);
  const { user, setUser } = useUser();
  const [image, setImage] = useState({});
  const [post, setPost] = useState();
  const [mediaType, setMediaType] = useState("text");
  const [imageData, setImageData] = useState();
  const [uploadProgress, setUploadProgress] = useState("");
  const pushActionGoHome = StackActions.push("HomeScreen");

  const pushAction = StackActions.replace("Checkout");
  const [imageURL, setImageURL] = useState("");
  const [imagePreview, setImagePreview] = useState();
  const [status, setStatus] = React.useState({});
  const username = user.username;
  const displayName = user.displayName;
  const profileImage = user.profileimage;
  const bannerImage = user.bannerImage;
  const bio = user.bio;
  const followingId = user.following_Id;

  const [selected, setSelected] = useState("");

  const openImageLibrary = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status !== "granted") {
      alert("Sorry, we need camera roll permissions to make this work!");
    }

    if (status === "granted") {
      await pickPost();
    }
  };

  const pickPost = async () => {
    let photo = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [9, 16],
      canAskAgain: true,
      quality: 0,
    });

    if (!photo.cancelled) {
      let newfile = {
        uri: photo.uri,
        type: `test/${photo.uri.split(".")[1]}`,
        name: `test.${photo.uri.split(".")[1]}`,
        mediaType: photo.type,
      };

      handleUpload(newfile);
      setImagePreview(photo);
    }
  };

  const handleUpload = (image) => {
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "TizlyUpload");
    data.append("cloud_name", "doz01gvsj");

    fetch("https://api.cloudinary.com/v1_1/doz01gvsj/upload", {
      method: "post",
      body: data,
    })
      .then((res) => res.json())
      .then((data) => {
        // this needs to be the link that that goes to supabase
        console.log("data", data);
        setImage(data);
      });
  };

  const addPost = async () => {
    const userId = supabase.auth.currentUser.id;

    setUploadProgress("loading");
    const req = new XMLHttpRequest();

    function transferComplete(evt) {
      setUploadProgress("done");
      clear();
      navigation.dispatch(pushAction);
    }

    req.addEventListener("load", transferComplete);

    const resp = await supabase.from("post").insert([
      {
        username: username,
        user_id: userId,
        displayName: displayName,

        description: description,
        profileimage: profileImage,
        media: image.url,
        mediaType: image.resource_type,
        bannerImage: bannerImage,
        bio: bio,
        category: selected,
        followingId: followingId,
      },
    ]);

    const response = resp.body;

    setImageData(response);

    if (resp.error === null) {
      setUploadProgress("done");
      navigation.dispatch(pushAction);
    } else {
      setUploadProgress("");
      Alert.alert("Something Went Wrong");
    }

    return resp;
  };

  console.log("imagePreview", imagePreview);

  let height = Dimensions.get("window").height;
  let width = Dimensions.get("window").width;

  const FullSeperator = () => (
    <View
      style={{
        borderBottomColor: "#EDEDED",
        borderBottomWidth: 2.0,
        opacity: 1.8,
        width: 900,
        left: 1,
        top: height * 0.03,
        height: 3,
      }}
    />
  );
  return (
    <View style={{ alignItems: "center", bottom: height * 0.36 }}>
      <Text style={styles.postText}>Post</Text>

      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Image
          style={styles.exitButton}
          source={require("../../assets/x.png")}
        />
      </TouchableOpacity>

      <FullSeperator />

      <TextInput
        style={{
          position: "absolute",
          top: height * 0.1,
          height: height * 0.2,
          width: width * 0.9,
          borderRadius: 8,
          fontSize: 16,
          paddingBottom: height * 0.02,
          paddingLeft: height * 0.02,

          paddingTop: height * 0.04,
          backgroundColor: "#EBEBF1",
          fontWeight: "500",
        }}
        placeholder="Post Description"
        placeholderTextColor="#393939"
        value={description}
        onChangeText={(text) => setDescription(text)}
      />

      <View style={{ bottom: 50 }}>
        <Text
          style={{
            position: "absolute",
            top: height * 0.39,
            right: width * 0.12,
            fontWeight: "700",
          }}
        >
          Select From Gallery
        </Text>
      </View>

      {imagePreview === undefined ? (
        <TouchableOpacity onPress={() => openImageLibrary()}>
          <Image
            resizeMode="contain"
            style={{
              position: "absolute",
              aspectRatio: 1,
              width: width * 0.3,
              top: height * 0.38,
              right: width * 0.15,
              borderRadius: 10,
            }}
            source={require("../../assets/plusButton.png")}
          />
        </TouchableOpacity>
      ) : imagePreview.type === "image" ? (
        <TouchableOpacity onPress={() => openImageLibrary()}>
          <Image
            resizeMode="contain"
            style={{
              position: "absolute",
              aspectRatio: 1,
              width: width * 0.3,
              top: height * 0.38,
              right: width * 0.15,
              borderRadius: 10,
            }}
            source={{ uri: imagePreview.uri }}
          />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity onPress={() => openImageLibrary()}>
          <Video
            source={{ uri: imagePreview.uri }}
            ref={video}
            style={{
              position: "absolute",
              aspectRatio: 1,
              width: width * 0.3,
              top: height * 0.38,
              right: width * 0.15,
              borderRadius: 10,
            }}
            resizeMode="cover"
            onPlaybackStatusUpdate={(status) => setStatus(() => status)}
          />
        </TouchableOpacity>
      )}

      {uploadProgress === "" ? null : uploadProgress === "loading" ? (
        <LottieView
          style={{ height: 130, width: 130, position: "absolute", top: 110 }}
          source={require("../../assets/lottie/loading.json")}
          autoPlay
        />
      ) : null}

      {imagePreview ? (
        <TouchableOpacity
          style={{ bottom: height * 0.09, left: width * 0.28 }}
          onPress={() => addPost()}
        >
          <Image
            resizeMode="contain"
            style={{
              position: "absolute",
              width: width * 0.14,
            }}
            source={require("../../assets/post.png")}
          />
        </TouchableOpacity>
      ) : (
        <View
          style={{ bottom: height * 0.09, left: width * 0.28 }}
          onPress={() => addPost()}
        >
          <Image
            resizeMode="contain"
            style={{
              position: "absolute",
              width: width * 0.14,
            }}
            source={require("../../assets/postButtonGrey.png")}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  category: {
    position: "absolute",
    top: 345,
    right: 183,
  },
  categoryText: {
    fontWeight: "700",
    fontSize: 17,
    top: 8,
  },

  arrow: {
    position: "absolute",
    top: 12,
    width: 12,
    height: 12,
    left: 300,
    resizeMode: "contain",
  },

  hashtag: {
    width: 35,
    height: 35,
    bottom: 21,
    right: 50,
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
  addCategory: {
    position: "absolute",
    top: 580,
    right: -8,
    backgroundColor: "white",
    width: 200,
  },

  subHead: {
    position: "absolute",
    top: 335,
    right: 50,
    fontWeight: "700",
  },

  subHeadCategory: {
    position: "absolute",
    top: 535,
    right: 70,
    fontWeight: "700",
  },

  plusButton: {
    position: "absolute",
    width: 105,
    height: 105,
    top: 380,
    right: 80,
  },

  postTitle: {
    position: "absolute",
    top: 50,
    right: 320,
    borderColor: "grey",
    height: 80,
    paddingLeft: 10,
    width: 380,
    left: 13,
    fontSize: 25,
    borderRadius: 8,
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
    top: 130,
    height: 155,
    width: 380,
    borderRadius: 8,
    fontSize: 16,
    paddingBottom: 62,
    paddingLeft: 20,

    paddingTop: 40,
    backgroundColor: "#EBEBF1",
    fontWeight: "500",
  },

  fullSeperator: {
    borderBottomColor: "grey",
    borderBottomWidth: StyleSheet.hairlineWidth,
    opacity: 0.5,
    width: 340,
    right: 10,
  },
});
