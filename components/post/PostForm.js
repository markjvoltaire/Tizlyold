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
import SelectList from "react-native-dropdown-select-list";

import { useUser } from "../../context/UserContext";
import { supabase } from "../../services/supabase";
import { createPost } from "../../services/user";
import * as ImagePicker from "expo-image-picker";
import { usePosts } from "../../context/PostContext";
import Post from "../../screens/Post";
import PostButtons from "./PostButtons";
import AddCategory from "../AddCategory";
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

  const [selected, setSelected] = useState("");

  const data = [
    {
      key: "https://ivxipgaauikqwyguqagw.supabase.co/storage/v1/object/public/posts/entertainmentBean.png",
      value: "Entertainment",
    },
    {
      key: "https://ivxipgaauikqwyguqagw.supabase.co/storage/v1/object/public/posts/fitnessBean.png",
      value: "Fitness",
    },
    {
      key: "https://ivxipgaauikqwyguqagw.supabase.co/storage/v1/object/public/posts/podcastBean.png",
      value: "Podcast",
    },
    {
      key: "https://ivxipgaauikqwyguqagw.supabase.co/storage/v1/object/public/posts/musicBean.png",
      value: "Music",
    },
    {
      key: "https://ivxipgaauikqwyguqagw.supabase.co/storage/v1/object/public/posts/sportsBean.png",
      value: "Sports",
    },
    {
      key: "https://ivxipgaauikqwyguqagw.supabase.co/storage/v1/object/public/posts/cookingBean.png",
      value: "Cooking",
    },
    {
      key: "https://ivxipgaauikqwyguqagw.supabase.co/storage/v1/object/public/posts/gamingBean.png",
      value: "Gaming",
    },
    {
      key: "https://ivxipgaauikqwyguqagw.supabase.co/storage/v1/object/public/posts/beautyBean.png",
      value: "Beauty",
    },
    {
      key: "https://ivxipgaauikqwyguqagw.supabase.co/storage/v1/object/public/posts/contentBean.png",
      value: "Content Creation",
    },
  ];

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
        category: selected,
      },
    ]);

    console.log("resp", resp);
    console.log("image", image);

    return resp;
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
        onPress={() => addPost().then(() => navigation.navigate("HomeScreen"))}
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
