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
  FlatList,
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
  const [postInfo, setPostInfo] = useState();
  const { user, setUser } = useUser();
  const [image, setImage] = useState({});
  const [postURI, setPostURI] = useState({});
  const [uploadProgress, setUploadProgress] = useState("");
  const pushActionGoHome = StackActions.push("HomeScreen");
  const pushAction = StackActions.replace("Checkout");
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
      videoMaxDuration: 60,
    });

    if (!photo.canceled) {
      let newfile = {
        uri: photo.assets[0].uri,
        type: `test/${photo.assets[0].uri.split(".")[1]}`,
        name: `test.${photo.assets[0].uri.split(".")[1]}`,
        mediaType: photo.assets[0].type,
      };

      setPostURI(newfile);
      setImagePreview(photo.assets);

      return newfile;
    }
  };

  const addPost = async () => {
    postURI === {} || null || undefined
      ? Alert.alert("Something Went Wrong")
      : uploadToCloudinary(postURI);
    setUploadProgress("loading");
  };

  async function uploadToCloudinary(postURI) {
    const data = new FormData();
    data.append("file", postURI);
    data.append("upload_preset", "TizlyUpload");
    data.append("cloud_name", "doz01gvsj");

    const response = await fetch(
      "https://api.cloudinary.com/v1_1/doz01gvsj/upload",
      {
        method: "post",
        body: data,
      }
    );

    const resp = await response.json();

    uploadToSupabase(resp);
  }

  async function uploadToSupabase(resp) {
    const userId = supabase.auth.currentUser.id;

    console.log("resp", resp);

    const res = await supabase.from("post").insert([
      {
        username: username,
        user_id: userId,
        displayName: displayName,
        description: description,
        profileimage: profileImage,
        media: resp.secure_url,
        mediaType: resp.resource_type,
        bannerImage: bannerImage,
        bio: bio,
        followingId: followingId,
      },
    ]);

    if (res.error === null) {
      setUploadProgress("done");
      navigation.dispatch(pushAction);
    } else {
      setUploadProgress("");
      Alert.alert("Something Went Wrong");
      console.log("res.error", res.error);
    }

    return res;
  }

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
        flex: 1,
        backgroundColor: "#FFFFFF",
        justifyContent: "center",
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

      <View style={{ position: "absolute" }}>
        {imagePreview === undefined ? (
          <TouchableOpacity
            onPress={() => Alert.alert("Select a photo or video first")}
          >
            <Image
              resizeMode="contain"
              style={{
                width: width * 0.15,
                left: width * 0.35,
                bottom: height * 0.055,
              }}
              source={require("../../assets/postButtonGrey.png")}
            />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={() => addPost()}>
            <Image
              resizeMode="contain"
              style={{
                width: width * 0.15,
                left: width * 0.35,
                bottom: height * 0.055,
              }}
              source={require("../../assets/post.png")}
            />
          </TouchableOpacity>
        )}
      </View>

      {imagePreview === undefined ? (
        <TouchableOpacity onPress={() => pickPost()}>
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
      ) : (
        <View>
          {imagePreview.map((item) => {
            if (item.duration === null) {
              return (
                <View>
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
                        borderWidth: 0.9,
                        borderColor: "#73738B",
                      }}
                      source={{ uri: item.uri }}
                    />
                    <Image
                      resizeMode="contain"
                      style={{
                        position: "absolute",
                        width: width * 0.08,
                        top: height * 0.425,
                        right: width * 0.12,
                      }}
                      source={require("../../assets/bluePlus.png")}
                    />
                  </TouchableOpacity>
                </View>
              );
            } else {
              return (
                <TouchableOpacity onPress={() => openImageLibrary()}>
                  <Video
                    source={{ uri: item.uri }}
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
                  <Image
                    style={{
                      position: "absolute",
                      aspectRatio: 1,
                      width: width * 0.1,
                      top: height * 0.41,
                      right: width * 0.25,
                      borderRadius: 10,
                    }}
                    resizeMode="contain"
                    source={require("../../assets/playButton.png")}
                  />
                  <Image
                    resizeMode="contain"
                    style={{
                      position: "absolute",
                      width: width * 0.08,
                      top: height * 0.425,
                      right: width * 0.12,
                    }}
                    source={require("../../assets/bluePlus.png")}
                  />
                </TouchableOpacity>
              );
            }
          })}
        </View>
      )}

      {uploadProgress === "" ? null : uploadProgress === "loading" ? (
        <LottieView
          style={{ height: 130, width: 130, position: "absolute", top: 110 }}
          source={require("../../assets/lottie/loading.json")}
          autoPlay
        />
      ) : null}
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

{
  /* {imagePreview === undefined || {} ? (
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
      ) : image.resource_type === "image" ? (
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
            source={{ uri: image.url }}
          />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity onPress={() => openImageLibrary()}>
          <Video
            source={{ uri: image.url }}
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
      )} */
}
