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

export default function HomeScreen({ navigation, route }) {
  const { user, setUser } = useUser();

  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [postList, setPostList] = useState([]);
  const [post, setPost] = useState([]);
  const [creatorIds, setCreatorIds] = useState();
  const [check, setCheck] = useState();
  const { follow, setFollow } = useFollow();

  async function getPosts() {
    const userId = supabase.auth.currentUser.id;
    const posts = await supabase
      .from("post")
      .select("*")
      .in("followingId", [follow]);

    setPostList(posts.body);

    const following = await supabase.from("profiles");
  }

  async function getFollowing() {
    const userId = supabase.auth.currentUser.id;
    const resp = await supabase
      .from("following")
      .select(" creatorId, followingId,creatorUsername")
      .eq("following", true)
      .eq("userId", userId);

    return resp.body;
  }

  useEffect(() => {
    const getFollowingList = async () => {
      const resp = await getFollowing();
      const list = resp.map((i) => i.followingId);
      setFollow(list);
      console.log("follow!!!!", follow);
    };
    getFollowingList();
  }, []);

  // follow.map((i) =>
  //   i === "45e13ff3-212b-410f-a2a2-48c7cdb3502e"
  //     ? console.log("match")
  //     : console.log("not a match")
  // );

  useEffect(() => {
    const getUserPost = async () => {
      const resp = await getPosts();
    };
    getUserPost();
  }, []);

  async function getUserById() {
    const userId = supabase.auth.currentUser.id;

    const resp = await supabase
      .from("profiles")
      .select("*")
      .eq("user_id", userId)
      .single();
    setUser(resp.body);
  }

  async function getLikes() {
    const resp = await supabase
      .from("likes")
      .select("*")
      .eq("userId", userId)
      .eq("postId", item.id)
      .eq("liked_Id", item.likeId);

    return resp.body;
  }

  useEffect(() => {
    const getUserProfile = async () => {
      await getUserById();
      setLoading(false);
    };
    getUserProfile();
  }, []);

  if (loading) {
    return <Text> Please Wait</Text>;
  }

  const refreshFeed = async () => {
    const resp = await getPosts();
    setPost(resp);
  };

  return (
    <View style={styles.homeScreenContainer}>
      <TopHeader navigation={navigation} />
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
