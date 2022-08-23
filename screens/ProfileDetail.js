import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  FlatList,
  ScrollView,
  SafeAreaView,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import ProfileNav from "../components/profile/ProfileNav";
import UserButtons from "../components/home/UserButtons";
import UserProfileFeed from "../components/profile/UserProfileFeed";
import UserProfileNav from "../components/profile/UserProfileNav";

import { supabase } from "../services/supabase";
import { useUser } from "../context/UserContext";
import { getCurrentUserPosts, getProfileDetail } from "../services/user";
import ProfileDetailSub from "../components/profile/ProfileDetailSub";
import ProfileFeedList from "../components/profile/ProfileFeedList";
import { StackActions } from "@react-navigation/native";

export default function ProfileDetail({ navigation, route, item }) {
  const { user, setUser } = useUser();
  const [userPosts, setUserPosts] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState([]);
  const [profile, setProfile] = useState([]);
  const [isFollowing, setIsFollowing] = useState(false);

  const FullSeperator = () => <View style={styles.fullSeperator} />;

  async function getPosts() {
    let { data: post, error } = await supabase
      .from("post")
      .select("*")
      .eq("user_id", user_id)
      .order("id", { ascending: false });

    return post;
  }

  async function getFollowing() {
    const resp = await supabase
      .from("following")
      .select("*")
      .eq("creatorId", user_id);

    console.log("resp.body", resp.body);
    return resp.body;
  }

  useEffect(() => {
    const seeLikes = async () => {
      const res = await getFollowing();
      res.map((user) => setIsFollowing(user.following));
      console.log("isFollowing", isFollowing);
    };
    seeLikes();
  }, []);

  useEffect(() => {
    const getPost = async () => {
      const resp = await getPosts();
      setPosts(resp);
      setLoading(false);
      // console.log("resp from curren user Post", resp);
    };
    getPost();
  }, []);

  const user_id = route.params.user_id;

  if (route.params.user_id === user.user_id) {
    navigation.navigate("Profile");
  }

  async function getUserPostsById() {
    const items = await supabase
      .from("post")
      .select("*")
      .eq("user_id", user_id)
      .order("id", { ascending: false });

    return items.body;
  }

  async function getProfileDetail() {
    const { data } = await supabase
      .from("profiles")
      .select("*")
      .eq("user_id", route.params.user_id)
      .single();

    return data;
  }

  useEffect(() => {
    const getUser = async () => {
      const resp = await getProfileDetail();
      setProfile(resp);
    };
    getUser();
  }, []);

  useEffect(() => {
    const getFeed = () => {
      getUserPostsById().then((res) => setUserPosts(res));
      setLoading(false);
    };
    getFeed();
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

  async function followUser() {
    const resp = await supabase.from("following").insert([
      {
        creatorId: profile.user_id,
        userId: user.user_id,
        userProfileImage: user.profileimage,

        userUsername: user.username,
        creatorUsername: profile.username,
        followingId: profile.followingId,
        creatorDisplayname: profile.displayName,
        userDisplayname: user.displayName,
        creatorProfileImage: profile.profileimage,
      },
    ]);
    console.log("resp", resp);
    return resp;
  }

  async function unfollowUser() {
    const resp = await supabase
      .from("following")
      .update({ following: false })
      .eq("followingId", profile.followingId);

    return resp;
  }

  const handleFollow = () => {
    setIsFollowing((current) => !current);

    isFollowing === true ? unfollowUser() : followUser();
  };

  return (
    <ScrollView style={{ flex: 1, backgroundColor: "white" }}>
      <Image style={styles.userBanner} source={{ uri: profile.bannerImage }} />

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

      <View style={{ bottom: 410 }}>
        <Text style={styles.displayname}>{profile.displayName}</Text>
        <Text style={styles.username}>@{profile.username}</Text>
        <Text style={styles.bio}> {profile.bio}</Text>
        <Image
          style={styles.profileImage}
          source={{ uri: profile.profileimage }}
        />
        <TouchableOpacity onPress={() => handleFollow()}>
          <Image
            style={styles.subButton}
            source={
              isFollowing === true
                ? require("../assets/followingbutton.png")
                : require("../assets/followbutton.png")
            }
          />
        </TouchableOpacity>
      </View>
      <UserProfileNav />
      <View style={styles.feedContainer}>
        {posts.map((item) => {
          return (
            <View key={item.id}>
              <ProfileFeedList
                navigation={navigation}
                route={route}
                item={item}
              />
            </View>
          );
        })}
      </View>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  logo: {
    position: "absolute",
    resizeMode: "contain",
    width: 52,
    height: 26,
    backgroundColor: "white",
    alignSelf: "center",
    top: 60,
  },
  userBanner: {
    position: "absolute",
    width: 455,
    height: 455,
    alignSelf: "center",
  },

  title: {
    left: 35,
    fontWeight: "800",
    fontSize: 15,
    paddingBottom: 15,
    top: 8,
  },
  description: {
    left: 35,
    fontWeight: "600",
    color: "#5F5F69",
  },

  media: {
    height: 392,
    width: 343,
    borderRadius: 12,
    alignSelf: "center",
  },

  postUsername: {
    bottom: 26,
    fontWeight: "500",
    color: "#5F5F69",
    fontSize: 12,
  },

  postDisplayname: {
    fontWeight: "600",
    fontSize: 16,
    bottom: 27,
  },

  feedContainer: {
    alignItems: "center",
    top: 20,
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
  subButton: {
    resizeMode: "contain",
    top: 360,
    width: 160,
    height: 30,
    right: 15,
  },

  fullSeperator: {
    position: "absolute",
    borderBottomColor: "grey",
    borderBottomWidth: 0.8,
    opacity: 0.8,
    width: 900,
    left: 1,
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
    width: 35,
    height: 50,
    left: 21,
    bottom: 300,
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
