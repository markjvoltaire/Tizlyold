import {
  StyleSheet,
  Text,
  View,
  Image,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Button,
  Alert,
  ErrorAlert,
  FlatList,
} from "react-native";
import React, { useState, useEffect } from "react";
import BottomTabNavigator from "../navigation/TabNavigator";
import ProfileNav from "../components/profile/ProfileNav";

import { supabase } from "../services/supabase";
import { useUser } from "../context/UserContext";
import * as ImagePicker from "expo-image-picker";
import UserProfileFeed from "../components/profile/UserProfileFeed";
import UserProfileNav from "../components/profile/UserProfileNav";

export default function UserProfile({ navigation, route }) {
  const { user, setUser } = useUser();
  const [image, setImage] = useState(null);
  const [imageData, setImageData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [stateImage, setStateImage] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const userProfileImage = user.profileimage;

  const FullSeperator = () => <View style={styles.fullSeperator} />;

  const [posts, setPosts] = useState();
  const [userPosts, setUserPosts] = useState();

  // useEffect(() => {
  //   const unsubscribe = navigation.addListener("focus", () => {
  //     const getPost = async () => {
  //       const resp = await getCurrentUserPosts();
  //       setPosts(resp);
  //       setLoading(false);
  //     };
  //     getPost();
  //   });
  //   return unsubscribe;
  // }, [navigation]);
  // console.log("user", user);

  async function getCurrentUserPosts() {
    let { data: post, error } = await supabase
      .from("post")
      .select("*")
      .eq("user_id", user.user_id)
      .order("id", { ascending: false });

    return post;
  }

  useEffect(() => {
    const getPost = async () => {
      const resp = await getCurrentUserPosts();
      setPosts(resp);
      setLoading(false);
    };
    getPost();
  }, []);

  if (loading) {
    return (
      <SafeAreaView>
        <View>
          <Text style={{ fontSize: 300 }}>LOADING</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <ScrollView style={{ flex: 1, backgroundColor: "white" }}>
      <Image style={styles.userBanner} source={{ uri: user.bannerImage }} />

      <Image
        style={styles.userBannerFader}
        source={require("../assets/fader.png")}
      />
      <View style={{ bottom: 410 }}>
        <Text style={styles.displayname}>{user.displayName}</Text>
        <Text style={styles.username}>@{user.username}</Text>
        <Text style={styles.bio}> {user.bio}</Text>
        <Image
          style={styles.profileImage}
          source={{ uri: user.profileimage }}
        />
        <TouchableOpacity>
          <Image
            style={styles.subButton}
            source={require("../assets/editprofile.png")}
          />
        </TouchableOpacity>
      </View>
      <UserProfileNav />
      <View style={styles.feedContainer}>
        {posts.map((item) => {
          return (
            <View style={{ bottom: 90 }} key={item.id}>
              <UserProfileFeed
                navigation={navigation}
                route={route}
                item={item}
                posts={posts}
                setPosts={setPosts}
              />
            </View>
          );
        })}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  userBanner: {
    position: "absolute",
    width: 455,
    height: 455,
    alignSelf: "center",
  },

  feedContainer: {
    alignItems: "center",
    top: 130,
    flex: 1,
  },
  displayNameContainer: {
    left: 40,
    bottom: 33,
  },
  usernameContainer: {
    left: 40,
    bottom: 33,
  },
  halfSep: {
    top: 655,
    borderBottomColor: "grey",
    borderBottomWidth: 0.8,
    opacity: 0.6,
    width: 300,
    left: 60,
  },
  editButton: {
    position: "absolute",
    resizeMode: "contain",
    bottom: 30,
    width: 160,
    height: 30,
  },

  fullSeperator: {
    borderBottomColor: "grey",
    borderBottomWidth: 0.8,
    opacity: 0.2,
    width: 900,
    left: 1,
    top: 470,
  },
  displayname: {
    position: "absolute",
    height: 38,
    left: 75,
    right: 64.27,
    top: 253,
    color: "white",
    fontWeight: "bold",
    fontSize: 22,
    width: 400,
  },
  username: {
    position: "absolute",
    color: "white",
    top: 283,
    left: 75,
  },
  subButton: {
    resizeMode: "contain",
    top: 360,
    width: 160,
    height: 30,
    right: 15,
  },

  bio: {
    position: "absolute",
    color: "white",
    fontSize: 15,
    width: 400,
    top: 320,
    left: 8,
    fontWeight: "800",
  },

  followbutton: {
    position: "absolute",
    resizeMode: "contain",
    width: 100,
    left: 10,
    top: 320,
  },
  profileImage: {
    position: "absolute",
    left: 10,
    width: 50,
    height: 50,
    resizeMode: "contain",
    top: 250,
    borderRadius: 100,
  },
  backButton: {
    position: "absolute",
    resizeMode: "contain",
    width: 25,
    height: 30,
    left: 41,
    top: 90,
  },
  photoBox: {
    position: "absolute",
    width: 100,
    height: 100,
    top: 575,
    left: 20,
  },
  videosBox: {
    position: "absolute",
    width: 100,
    height: 100,
    top: 575,
    left: 165,
  },
  wrapBox: {
    position: "absolute",
    width: 100,
    height: 100,
    top: 575,
    left: 305,
  },
  testButton: {
    position: "absolute",
  },
  paywall: {
    position: "absolute",
  },
  photosDiv: {
    position: "absolute",
  },
  videosDiv: {
    position: "absolute",
  },
  wrapsDiv: {
    position: "absolute",
  },
  photosTextTitle: {
    fontWeight: "bold",
    color: "white",
    fontSize: 14,
    top: 600,
    left: 45,
  },
  videosTextTitle: {
    fontWeight: "bold",
    color: "white",
    fontSize: 14,
    top: 600,
    left: 190,
  },
  wrapsTextTitle: {
    fontWeight: "bold",
    color: "white",
    fontSize: 14,
    top: 600,
    left: 330,
  },
  photosLength: {
    fontWeight: "bold",
    color: "white",
    fontSize: 20,
    top: 615,
    left: 55,
  },
  videosLength: {
    fontWeight: "bold",
    color: "white",
    fontSize: 20,
    top: 615,
    left: 200,
  },
  wrapsLength: {
    fontWeight: "bold",
    color: "white",
    fontSize: 20,
    top: 615,
    left: 350,
  },
  accessButton: {
    position: "absolute",
    resizeMode: "contain",
    width: 190,
    height: 61,
    top: 720,
    left: 120,
  },
  userBannerFader: {
    width: 455,

    height: 455,
  },
});

//banner image
{
  /* <Image
style={styles.userBanner}
source={
  user.bannerImage
    ? {
        uri: user.bannerImage,
      }
    : require("../assets/noImage.png")
}
/> */
}

// profile image
{
  /* <TouchableOpacity
onPress={async () => {
  const resp = await pickImage();

  if (resp?.imageData) {
    setImage(resp.uri);
    setImageData(resp?.imageData);
  }
}}
>
<Image
  style={styles.profileImage}
  source={
    user.profileimage
      ? {
          uri: user.profileimage,
        }
      : require("../assets/noImage.png")
  }
/>
</TouchableOpacity> */
}
