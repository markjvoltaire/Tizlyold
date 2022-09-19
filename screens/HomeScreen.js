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
  RefreshControl,
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
import LottieView from "lottie-react-native";
export default function HomeScreen({ navigation, route }) {
  const { user, setUser } = useUser();

  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [postList, setPostList] = useState([]);
  const [followingId, setFollowingId] = useState([]);
  const [userFollowingId, setUserFollowingId] = useState();

  const [follow, setFollow] = useState([]);

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

    setFollow(resp.body);

    return resp.body;
  }

  useEffect(() => {
    const getFollowingList = async () => {
      const resp = await getFollowing();

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

    setUserFollowingId(resp.body);

    const list = resp.body.map((item) => item.followingId);
    setFollowingId(list);

    return resp.body;
  }

  useEffect(() => {
    const getUserFollowingId = async () => {
      const resp = await getFollowingId();
    };
    getUserFollowingId();
  }, []);

  async function getPosts() {
    const userId = supabase.auth.currentUser.id;
    const respon = await getFollowing();
    const list = respon.map((item) => item.followingId);
    setFollowingId(list);

    const userPostList = { list, followingId };

    const resp = await supabase
      .from("post")
      .select("*")
      .in("followingId", [userPostList.list]);

    setPostList(resp.body);

    return resp.body;
  }

  useEffect(() => {
    const getUserPost = async () => {
      const resp = await getPosts();
    };
    getUserPost();
  }, []);

  if (loading) {
    return (
      <View style={{ backgroundColor: "white", flex: 1 }}>
        <LottieView
          style={{
            top: 70,
            height: 400,
            width: 400,
            position: "absolute",
            alignSelf: "center",
          }}
          source={require("../assets/lottie/fullBlueCircle.json")}
          autoPlay
        />
      </View>
    );
  }

  // if (postList.length === 0) {
  //   const refreshFeed = async () => {
  //     await getPosts();
  //   };

  //   return (
  //     <View style={{ flex: 1, backgroundColor: "white" }}>
  //       <TopHeader navigation={navigation} />
  //       <ScrollView
  //         refreshControl={
  //           <RefreshControl
  //             refreshing={refreshing}
  //             onRefresh={() => refreshFeed()}
  //           />
  //         }
  //       >
  //         <NoPost navigation={navigation} />
  //       </ScrollView>
  //     </View>
  //   );
  // }

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
          initialNumToRender={2}
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
