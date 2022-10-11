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
  Pressable,
  Animated,
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
import { StackActions } from "@react-navigation/native";
import {
  SharedElement,
  createSharedElementStackNavigator,
} from "react-navigation-shared-element";
import PostImage from "../components/home/PostImage";
import PostHeader from "../components/home/PostHeader";
import Skeleton from "../Skeleton";
import ProgressiveImage from "../components/ProgressiveImage";
import Points from "../views/Points";
import { useLike } from "../context/LikeContext";
import { getAllLikes } from "../services/user";

export default function HomeScreen({ navigation, route }) {
  const { user, setUser } = useUser();
  const video = React.useRef(null);
  const [status, setStatus] = React.useState({});
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [postList, setPostList] = useState([]);
  const [followingId, setFollowingId] = useState([]);
  const [userFollowingId, setUserFollowingId] = useState();
  const pushAction = StackActions.replace("Explore");
  const [isPressed, setIsPressed] = useState(false);
  const [saveIsPressed, setSaveIsPressed] = useState(false);
  const FullSeperator = () => <View style={styles.fullSeperator} />;

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
      .from("following")
      .select("*")
      .eq("following", true)
      .eq("userId", userId);

    setFollow(resp.body);

    return resp.body;
  }

  // async function getAllLikes() {
  //   const userId = supabase.auth.currentUser.id;
  //   const resp = await supabase.from("likes").select("*").eq("userId", userId);

  //   return resp.body;
  // }

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

      // setFollow(resp);
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
      .in("followingId", [userPostList.list])
      .order("date", { ascending: false });

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
        <Skeleton />
      </View>
    );
  }

  const refreshFeed = async () => {
    getPosts();
  };

  return (
    <View style={styles.homeScreenContainer}>
      <Points navigation={navigation} />

      <View style={styles.feedContainer}>
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
          <FlatList
            keyExtractor={(item) => item.id}
            data={postList}
            refreshing={refreshing}
            onRefresh={() => refreshFeed()}
            initialNumToRender={6}
            contentContainerStyle={{
              borderBottomWidth: 0.8,
              borderBottomColor: "#EDEDED",
            }}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => (
              <HomeFeedList item={item} navigation={navigation} />
            )}
          />
        )}
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
