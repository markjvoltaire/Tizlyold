import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  FlatList,
  RefreshControl,
  Animated,
} from "react-native";

import React, { useEffect, useState, useRef } from "react";
import { supabase } from "../services/supabase";
import { useUser } from "../context/UserContext";
import { StackActions } from "@react-navigation/native";
import { useScrollToTop } from "@react-navigation/native";

import Skeleton from "../Skeleton";
import Points from "../views/Points";
import { useLike } from "../context/LikeContext";
import { getAllLikes } from "../services/user";
import ImagePost from "../components/home/ImagePost";
import VideoPost from "../components/home/VideoPost";
import Status from "../components/post/Status";
import ProfileDetailStatus from "../components/profile/ProfileDetailStatus";
import HomeStatus from "../components/post/HomeStatus";
import HomeImagePost from "../components/home/HomeImagePost";
import HomeVideoPost from "../components/home/HomeVideoPost";
import HomeStatusPost from "../components/home/HomeStatusPost";
import { usePosts } from "../context/PostContext";
import PostUploading from "../components/PostUploading";
import { Appearance, useColorScheme } from "react-native";
import { StatusBar } from "expo-status-bar";

export default function HomeScreen({ navigation, route }) {
  const { user, setUser } = useUser();
  const video = React.useRef(null);
  const [status, setStatus] = React.useState({});
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [postList, setPostList] = useState([]);
  const [followingId, setFollowingId] = useState([]);
  const [creatorIds, setcreatorIds] = useState();

  const FullSeperator = () => <View style={styles.fullSeperator} />;

  const ref = React.useRef(null);
  useScrollToTop(ref);
  const { postUploading } = usePosts();

  const { likeList, setLikeList } = useLike();

  const defaultImageAnimated = new Animated.Value(0);
  const imageAnimated = new Animated.Value(0);

  const handleDefaultImageLoad = () => {
    Animated.timing(defaultImageAnimated, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  const handleImageLoad = () => {
    Animated.timing(imageAnimated, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  const [follow, setFollow] = useState([]);

  async function getUserById() {
    const userId = supabase.auth.currentUser.id;
    const resp = await supabase
      .from("profiles")
      .select("*")
      .eq("user_id", userId)
      .single();
    setUser(resp.body);
  }

  useEffect(() => {
    const getUserProfile = async () => {
      await getUserById();
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    };
    getUserProfile();
  }, []);

  async function getFollowing() {
    const userId = supabase.auth.currentUser.id;
    const resp = await supabase
      .from("subscriptions")
      .select("*")
      .eq("userId", userId);

    setFollow(resp.body);

    return resp.body;
  }

  useEffect(() => {
    const getLikeList = async () => {
      const resp = await getAllLikes();
      setLikeList(resp);
    };
    getLikeList();
  }, []);

  useEffect(() => {
    const getFollowingList = async () => {
      const resp = await getFollowing();

      const followingList = resp.map((item) => item.creatorId);
      setcreatorIds(followingList);
    };
    getFollowingList();
  }, []);

  async function getPosts() {
    const userId = supabase.auth.currentUser.id;
    const respon = await getFollowing();
    const list = respon.map((item) => item.creatorId);

    setFollowingId(list);

    const resp = await supabase
      .from("post")
      .select("*")
      .in("user_id", [list])
      .order("date", { ascending: false });

    const res = await supabase.from("post").select("*").eq("user_id", userId);

    const fullList = res.body.concat(resp.body);

    setPostList(resp.body);

    return fullList;
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
        <Skeleton />
      </View>
    );
  }

  const refreshFeed = async () => {
    getPosts();
  };

  return (
    <>
      <StatusBar />
      <Points navigation={navigation} />
      {postUploading === true ? <PostUploading /> : null}

      <View style={{ flex: 1, backgroundColor: "white" }}>
        {postList.length === 0 ? (
          <ScrollView
            showsVerticalScrollIndicator={false}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={() => refreshFeed()}
              />
            }
          >
            <Text
              style={{
                position: "absolute",
                fontWeight: "800",
                fontSize: 20,
                alignSelf: "center",
                top: 50,
              }}
            >
              Your Feed Is Currently Empty
            </Text>
            <Image
              style={{
                position: "absolute",
                height: 300,
                resizeMode: "contain",
                top: 200,
                alignSelf: "center",
              }}
              source={require("../assets/mobile-application.png")}
            />
            <TouchableOpacity
              style={{ top: 600, alignItems: "center" }}
              onPress={() => navigation.navigate("Explore")}
            >
              <Image
                style={styles.exploreButton}
                source={require("../assets/exploreCreators.png")}
              />
            </TouchableOpacity>
          </ScrollView>
        ) : (
          <>
            <FlatList
              ref={ref}
              keyExtractor={(item) => item.id}
              data={postList}
              refreshing={refreshing}
              onRefresh={() => refreshFeed()}
              initialNumToRender={3}
              contentContainerStyle={{
                borderBottomWidth: 0.8,
                borderBottomColor: "#EDEDED",
              }}
              showsVerticalScrollIndicator={false}
              renderItem={({ item }) => {
                if (item.mediaType === "image") {
                  return <HomeImagePost item={item} navigation={navigation} />;
                }

                if (item.mediaType === "video") {
                  return <HomeVideoPost navigation={navigation} item={item} />;
                }

                if (item.mediaType === "status") {
                  return <HomeStatusPost navigation={navigation} item={item} />;
                }
              }}
            />
          </>
        )}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  lightContainer: {
    backgroundColor: "#d0d0c0",
  },

  darkContainer: {
    backgroundColor: "#242c40",
  },

  homeScreenContainer: {
    backgroundColor: "white",
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
    top: 680,
    alignSelf: "center",
    borderBottomColor: "grey",
    borderBottomWidth: StyleSheet.hairlineWidth,
    opacity: 0.5,
    width: 600,
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
