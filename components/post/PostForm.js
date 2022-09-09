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
} from "react-native";
import React, { useEffect, useState } from "react";
import SelectList from "react-native-dropdown-select-list";

import { useUser } from "../../context/UserContext";
import { supabase } from "../../services/supabase";
import { createPost } from "../../services/user";
import * as ImagePicker from "expo-image-picker";
import { usePosts } from "../../context/PostContext";
import Post from "../../screens/Post";
import PostButtons from "./PostButtons";
import AddCategory from "../AddCategory";
import { StackActions } from "@react-navigation/native";

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
  const [imageData, setImageData] = useState(null);
  const [uploadProgress, setUploadProgress] = useState("");
  const pushActionGoHome = StackActions.push("HomeScreen");
  const [status, requestPermission] = ImagePicker.useCameraPermissions();

  const [imageURL, setImageURL] = useState("");

  const username = user.username;
  const displayName = user.displayName;
  const profileImage = user.profileimage;
  const bannerImage = user.bannerImage;
  const bio = user.bio;
  const followingId = user.following_Id;

  const [selected, setSelected] = useState("");

  // entertainment📺   fitness🏋️   podcast🎙    music 🎤  sports 🏆  music 🍽  gaming 🎮  beauty 💄  content creation 🎬

  const data = [
    {
      key: "https://ivxipgaauikqwyguqagw.supabase.co/storage/v1/object/public/posts/entertainmentBean.png?t=2022-08-23T00%3A51%3A11.199Z",
      value: "Entertainment",
    },
    {
      key: "https://ivxipgaauikqwyguqagw.supabase.co/storage/v1/object/public/posts/fitnessBean.png?t=2022-08-08T04%3A38%3A09.071Z",
      value: "Fitness",
    },
    {
      key: "https://ivxipgaauikqwyguqagw.supabase.co/storage/v1/object/public/posts/categoryBeans/podcastBean.png?t=2022-08-08T04%3A18%3A17.495Z",
      value: "Podcast",
    },
    {
      key: "https://ivxipgaauikqwyguqagw.supabase.co/storage/v1/object/public/posts/categoryBeans/musicBean.png?t=2022-08-08T04%3A18%3A41.104Z",
      value: "Music",
    },
    {
      key: "https://ivxipgaauikqwyguqagw.supabase.co/storage/v1/object/public/posts/categoryBeans/sportsBean.png?t=2022-08-08T04%3A18%3A58.688Z",
      value: "Sports",
    },
    {
      key: "https://ivxipgaauikqwyguqagw.supabase.co/storage/v1/object/public/posts/categoryBeans/cookingBean.png?t=2022-08-08T04%3A19%3A14.026Z",
      value: "Cooking",
    },
    {
      key: "https://ivxipgaauikqwyguqagw.supabase.co/storage/v1/object/public/posts/categoryBeans/gamingBean.png?t=2022-08-08T04%3A19%3A29.450Z",
      value: "Gaming",
    },
    {
      key: "https://ivxipgaauikqwyguqagw.supabase.co/storage/v1/object/public/posts/categoryBeans/beautyBean.png?t=2022-08-08T04%3A19%3A41.911Z",
      value: "Beauty",
    },
    {
      key: "https://ivxipgaauikqwyguqagw.supabase.co/storage/v1/object/public/posts/categoryBeans/contentCreationBean.png?t=2022-08-08T04%3A19%3A56.347Z",
      value: "Content Creation",
    },
  ];

  const handleProgress = (event) => {
    setUploadProgress(Math.round((event.loaded * 100) / event.total));
  };

  const showAlert = () =>
    Alert.alert("Upload Successful", "your post has been uploaded", [
      {
        text: "Ok",
        onPress: () => navigation.goBack(),
        style: "cancel",
      },
    ]);

  async function addPost() {
    const userId = supabase.auth.currentUser.id;
    const ext = image.uri.substring(image.uri.lastIndexOf(".") + 1);
    const fileName = image.uri.replace(/^.*[\\\/]/, "");

    var formData = new FormData();
    formData.append("files", {
      uri: image.uri,
      name: fileName,
      type: image.type ? `image/${ext}` : `video/${ext}`,
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

      const url = `${supabase.supabaseUrl}/storage/v1/object/posts/${data.Key}`;
      const headers = supabase._getAuthHeaders();
      const req = new XMLHttpRequest();

      function updateProgress(event) {
        console.log("LOADING");
        setUploadProgress("Please Wait");
      }

      function transferComplete(evt) {
        showAlert();
      }

      req.addEventListener("progress", updateProgress);

      req.addEventListener("load", transferComplete);

      req.open("POST", url);
      for (const [key, value] of Object.entries(headers)) {
        req.setRequestHeader(key, value);
      }
      req.setRequestHeader("Authorization", data.authorization);

      req.send(data);

      let imageLink = publicURL;
      let type = image.type;

      setImageURL(imageLink);
      if (image.type === "image") {
        setMediaType("image");
        console.log("mediaType", mediaType);
      }
      if (image.type === "video") {
        setMediaType("video");
        console.log("mediaType", mediaType);
      }
      if (image.type === "text") {
        setMediaType("text");
      }

      const resp = await supabase.from("post").insert([
        {
          username: username,
          user_id: userId,
          displayName: displayName,
          title: title,
          description: description,
          profileimage: profileImage,
          media: imageLink,
          mediaType: type,
          bannerImage: bannerImage,
          bio: bio,
          category: selected,
          followingId: followingId,
        },
      ]);

      return resp;
    } catch (e) {
      console.log({ title: "image upload", message: e.message });
      return null;
    }
  }

  const pickPost = async () => {
    // No permissions request is necessary for launching the image library
    let photo = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!photo.cancelled) {
      setImage(photo);
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

      <View style={{ bottom: 50 }}>
        <Text style={styles.subHead}>Select From Gallery</Text>
        <Text style={styles.subHeadCategory}>Select a category</Text>
        <View style={styles.addCategory}>
          <TouchableOpacity>
            <View>
              <SelectList
                placeholder="Select a category"
                data={data}
                setSelected={setSelected}
                inputStyles={{ fontWeight: "600" }}
                dropdownStyles={{ height: 130 }}
              />
            </View>
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={() => pickPost()}>
          <Image
            style={styles.plusButton}
            source={
              image
                ? { uri: image.uri }
                : require("../../assets/plusButton.png")
            }
          />

          <>
            <Video
              ref={video}
              resizeMode="cover"
              style={styles.plusButton}
              source={
                image
                  ? { uri: image.uri }
                  : require("../../assets/plusButton.png")
              }
            />
            {/* <Image
                style={{
                  position: "absolute",
                  width: 55,
                  height: 55,
                  top: 410,
                  right: 105,
                }}
                resizeMode="contain"
                source={require("../../assets/playButton.png")}
              /> */}
          </>
        </TouchableOpacity>
      </View>

      <Text>{uploadProgress}</Text>

      <TouchableOpacity onPress={() => addPost()}>
        <Image
          style={styles.postButton}
          source={require("../../assets/post.png")}
        />
      </TouchableOpacity>
    </View>
  );
}

// try {
//   const { data, error } = await supabase.storage
//     .from("posts")
//     .upload(fileName, formData, {
//       upsert: true,
//     });

//   const { publicURL } = await supabase.storage

//     .from("posts")
//     .getPublicUrl(`${fileName}`);

//   const url = `${supabase.supabaseUrl}/storage/v1/object/posts/${data.Key}`;
//   const headers = supabase._getAuthHeaders();

//   const req = new XMLHttpRequest();

//   function updateProgress(event) {
//     console.log("LOADING");
//     setUploadProgress("LOADING");
//   }

//   function loadEnd(e) {
//     setUploadProgress(
//       "The transfer finished (although we don't know if it succeeded or not)."
//     );
//   }

//   function transferComplete(evt) {
//     setUploadProgress("The transfer is complete.");
//     setPost(imageLink);
//     console.log("DONE LOADING");
//   }

//   req.addEventListener("progress", updateProgress);

//   req.addEventListener("load", transferComplete);
//   // You might want to also listen to onabort, onerror, ontimeout

//   req.open("POST", url);
//   for (const [key, value] of Object.entries(headers)) {
//     req.setRequestHeader(key, value);
//   }
//   req.setRequestHeader("Authorization", data.authorization);

//   req.send(data);

//   let imageLink = publicURL;
//   let type = photo.type;

//   setImage(imageLink);
//   type = null ? setMediaType("text") : setMediaType(type);
// } catch (e) {
//   ErrorAlert({ title: "image upload", message: e.message });
//   return null;
// }

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
