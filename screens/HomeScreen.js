import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  Button,
  SafeAreaView,
  FlatList,
  useWindowDimensions,
} from "react-native";

import { Link } from "@react-navigation/native";

import React, { useEffect, useState, useRef } from "react";
import { supabase } from "../services/supabase";
import { useUser } from "../context/UserContext";
import { getPosts, getFollowing } from "../services/user";
import { usePosts } from "../context/PostContext";
import { Video, AVPlaybackStatus } from "expo-av";
import UserButtons from "../components/home/UserButtons";
import TopHeader from "../components/TopHeader";
import NoPost from "../components/home/NoPost";
import HomeFeedList from "../components/home/HomeFeedList";
import { fromPairs } from "lodash";
import { useFollow } from "../context/FollowContext";
import { useScreens } from "react-native-screens";

export default function HomeScreen({ navigation, route }) {
  const { user, setUser } = useUser();

  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [postList, setPostList] = useState([]);
  const [followingId, setFollowingId] = useState([]);

  const [follow, setFollow] = useState([]);

  // useEffect(() => {
  //   const unsubscribe = navigation.addListener("focus", () => {
  //     async function updateFeed() {
  //       // const resp = await getFollowing();
  //       // const list = resp.map((i) => i.followingId);
  //       // setFollow(list);
  //       console.log("hello");
  //     }
  //     updateFeed();
  //   });

  //   return unsubscribe;
  // }, [navigation]);

  async function getUserById() {
    const userId = supabase.auth.currentUser.id;

    const resp = await supabase
      .from("profiles")
      .select("*")
      .eq("user_id", userId)
      .single();
    setUser(resp.body);
    setLoading(false);
  }

  useEffect(() => {
    const getUserProfile = async () => {
      await getUserById();
      setLoading(false);
    };
    getUserProfile();
  }, []);

  async function getFollowing() {
    const userId = supabase.auth.currentUser.id;
    const resp = await supabase
      .from("following")
      .select(" creatorId, followingId, creatorUsername, userId")
      .eq("following", true)
      .eq("userId", userId);
    // .eq('ceatorId', )

    setFollow(resp.body);

    // const list = resp.map((i) => i.followingId);

    return resp.body;
  }

  useEffect(() => {
    const getFollowingList = async () => {
      const resp = await getFollowing();
      // console.log("resp", resp);

      setFollow(resp);
    };
    getFollowingList();
  }, []);

  async function getFollowingId() {
    const userId = supabase.auth.currentUser.id;

    const resp = await supabase
      .from("post")
      .select("followingId")

      .eq("user_id", userId);

    return resp.body;
  }

  useEffect(() => {
    const getUserFollowingId = async () => {
      const resp = await getFollowingId();
      const list = resp.map((item) => item.followingId);
      setFollowingId(list);
    };
    getUserFollowingId();
  }, []);

  async function getPosts() {
    const userId = supabase.auth.currentUser.id;
    const respon = await getFollowing();
    const list = respon.map((item) => item.followingId);

    const resp = await supabase
      .from("post")
      .select("*")
      .in("followingId", [list]);

    setPostList(resp.body);

    return resp.body;
  }

  useEffect(() => {
    const getUserPost = async () => {
      await getPosts();
    };
    getUserPost();
  }, []);

  if (loading) {
    return (
      <View>
        <Text>Loading</Text>
      </View>
    );
  }

  const refreshFeed = async () => {
    getPosts();
  };

  return (
    <View style={styles.homeScreenContainer}>
      <TopHeader user={user} navigation={navigation} />

      <View style={styles.feedContainer}>
        <FlatList
          data={postList}
          keyExtractor={(item) => item.id}
          refreshing={refreshing}
          onRefresh={() => refreshFeed()}
          initialNumToRender={6}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            borderBottomWidth: 0.8,
            borderBottomColor: "#EDEDED",
          }}
          renderItem={({ item }) => (
            <HomeFeedList item={item} navigation={navigation} />
          )}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  homeScreenContainer: {
    backgroundColor: "white",
    justifyContent: "center",
  },

  profileimage: {
    width: 100,
  },
  exploreButton: {
    position: "absolute",
    width: 213,
    height: 40,
  },

  exploreButtonDiv: {
    right: 105,
    alignItems: "center",
    top: 300,
  },

  fullSeperator: {
    position: "absolute",
    alignSelf: "center",
    borderBottomColor: "grey",
    borderBottomWidth: StyleSheet.hairlineWidth,
    opacity: 0.5,
    width: 600,
    top: 370,
  },

  fullSeperator2: {
    position: "absolute",
    borderBottomColor: "grey",
    borderBottomWidth: StyleSheet.hairlineWidth,
    opacity: 0.5,
    width: 900,
    top: 50,
  },

  settingIcon: {
    position: "absolute",
    left: 368,
    bottom: 270.7,
    width: 29,
    height: 29,
  },
  image: {
    width: 900,
    height: 900,
  },
  userBanner: {
    position: "absolute",
    width: 455,
    right: -10,
    height: 455,
  },
  headerContainer: {},
  homeScreenContainer: {
    flex: 1,
    top: 6,
  },
  feedContainer: {
    flex: 1,
    backgroundColor: "white",
  },
  userInfo: {
    alignItems: "center",
    paddingBottom: 10,
    bottom: 10,
    left: 12,
  },
  postFeedUserProfilePic: {
    borderRadius: 100,
    height: 30,
    width: 30,
    right: 37,
    top: 40,
  },
  postFeedUserDisplayName: {
    fontWeight: "600",
    fontSize: 16,
  },
  postFeedUsername: {
    fontWeight: "500",
    color: "#5F5F69",
    fontSize: 12,
    right: 2,
  },

  userContentContainer: {
    alignItems: "center",
  },

  postTitle: {
    fontWeight: "800",
    fontSize: 15,
  },
  description: {
    fontWeight: "600",
    color: "#5F5F69",
    top: 7,
  },
  photoBeanContainer: {
    paddingBottom: 70,
  },

  engagementButtons: {
    alignItems: "center",
    top: 12,
  },
  postInfo: {
    top: 10,
  },
  userProfileInfo: {
    flex: "row",
    top: 8,
  },
  descriptionContainer: {
    top: 3,
  },
});
