import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  FlatList,
  ScrollView,
  SafeAreaView,
} from "react-native";
import { useLinkTo } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import UserProfile from "../screens/UserProfile";
import ProfileNav from "../components/profile/ProfileNav";
import UserButtons from "../components/home/UserButtons";

import { supabase } from "../services/supabase";
import { useUser } from "../context/UserContext";
import { getCurrentUserPosts } from "../services/user";
import ProfileFeed from "../components/profile/ProfileFeed";

export default function ProfileDetail({ navigation, route }) {
  const { user, setUser } = useUser();
  const [userPosts, setUserPosts] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [yId, setPostsById] = useState([]);

  console.log("route", route);

  const FullSeperator = () => <View style={styles.fullSeperator} />;

  const user_id = route.params.user_id;

  async function getUserPostsById() {
    let { data: post, error } = await supabase
      .from("post")
      .select("*")
      .eq("user_id", user_id)
      .order("id", { ascending: false });
    return post;
  }

  useEffect(() => {
    const getFeed = () => {
      getUserPostsById().then((res) => setUserPosts(res));
      setLoading(false);
    };
    getFeed();
  }, []);

  if (loading) {
    return <Text>Please Wait</Text>;
  }

  console.log("userPosts", userPosts);

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <ScrollView>
        <View style={styles.profileHeader}>
          <Image
            style={styles.userBanner}
            source={{ uri: route.params.bannerImage }}
          />

          <Image
            style={styles.userBannerFader}
            source={require("../assets/fader.png")}
          />
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image
              style={styles.backButton}
              source={require("../assets/backButton2.png")}
            />
          </TouchableOpacity>

          <Text style={styles.displayname}>{route.params.displayName}</Text>
          <Text style={styles.username}>@{route.params.username}</Text>
          <Text style={styles.bio}> {route.params.bio}</Text>
          <Image
            style={styles.profileImage}
            source={{ uri: route.params.profileImage }}
          />
        </View>
        <ProfileNav />
        <ProfileFeed />
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  flatListContainer: {
    top: 600,
  },
  postUserInfo: {
    alignItems: "center",
  },

  postProfileImage: {
    position: "absolute",
    borderRadius: 100,
    height: 30,
    width: 30,
    top: 520,
    left: 140,
  },

  postUsername: {
    position: "absolute",
    top: 535,
    alignSelf: "center",
  },

  userBanner: {
    width: 455,
    bottom: 50,
    height: 455,
  },

  userBannerFader: {
    width: 455,
    bottom: 500,
    height: 455,
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
    top: 360,
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
    width: 35,
    height: 50,
    left: 21,
    bottom: 750,
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

  subscribeButton: {
    position: "absolute",
    resizeMode: "contain",
    top: 360,
    width: 120,
    left: 130,
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
  userinfoContainer: {
    top: 30,
  },

  postFeedUserProfilePic: {
    position: "absolute",
    borderRadius: 100,
    height: 30,
    width: 30,
  },
});
