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
  Dimensions,
} from "react-native";

import React, { useEffect, useState, useRef } from "react";
import { supabase } from "../services/supabase";
import { useUser } from "../context/UserContext";
import { StackActions } from "@react-navigation/native";
import { useScrollToTop } from "@react-navigation/native";

import Skeleton from "../Skeleton";
import Points from "../views/Points";
import { useLike } from "../context/LikeContext";
import { getAllLikes, creatorsYouMayLike } from "../services/user";
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
  const [creators, setCreators] = useState();

  const FullSeperator = () => <View style={styles.fullSeperator} />;

  let height = Dimensions.get("window").height;
  let width = Dimensions.get("window").width;

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

  const [subscriptions, setSubscriptions] = useState([]);

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

  async function getSubscriptions() {
    const userId = supabase.auth.currentUser.id;
    const resp = await supabase
      .from("subscriptions")
      .select("*")
      .eq("userId", userId);

    setSubscriptions(resp.body);

    return resp.body;
  }

  async function getFollowing() {
    const userId = supabase.auth.currentUser.id;
    const resp = await supabase
      .from("userFollowings")
      .select("*")
      .eq("userId", userId);

    setSubscriptions(resp.body);

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
      const resp = await getSubscriptions();

      const followingList = resp.map((item) => item.creatorId);
      setcreatorIds(followingList);
    };
    getFollowingList();
  }, []);

  async function getFreePosts() {
    const userId = supabase.auth.currentUser.id;
    const respon = await getFollowing();
    const list = respon.map((item) => item.creatorId);
  }

  async function getPosts() {
    const userId = supabase.auth.currentUser.id;
    const respon = await getSubscriptions();
    const resp = await getFollowing();
    const list = respon.map((item) => item.creatorId);
    const freeList = resp.map((item) => item.creatorId);

    setFollowingId(list);

    const paidPost = await supabase
      .from("post")
      .select("*")
      .in("user_id", [list])
      .order("date", { ascending: false });

    const freePosts = await supabase
      .from("post")
      .select("*")
      .in("user_id", [freeList])
      .eq("subsOnly", false)
      .order("id", { ascending: false });

    const fullList = freePosts.body.concat(paidPost.body);

    setPostList(fullList);

    return fullList;
  }

  useEffect(() => {
    const getUserPost = async () => {
      const resp = await getPosts();
    };
    getUserPost();
  }, []);

  useEffect(() => {
    const getUsers = async () => {
      const resp = await creatorsYouMayLike();
      setCreators(resp);
    };
    getUsers();
  }, []);

  useEffect(() => {
    const log = async () => {
      const resp = await creatorsYouMayLike();
    };
    log();
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

      {postList.length === 0 ? (
        <ScrollView
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={() => refreshFeed()}
            />
          }
          style={{ flex: 1, backgroundColor: "white" }}
        >
          <Text
            style={{
              alignSelf: "center",
              top: height * 0.05,
              fontWeight: "600",
              fontSize: 20,
            }}
          >
            Creators You May Like
          </Text>
          <View
            style={{
              backgroundColor: "white",
              flexDirection: "row",
              justifyContent: "space-evenly",
              flexWrap: "wrap",
              top: height * 0.08,
              marginBottom: height * 0.2,
            }}
          >
            {creators.map((item) => {
              return (
                <View style={{ paddingBottom: 30 }} key={item.id}>
                  <TouchableOpacity
                    onPress={() => {
                      user.id === item.id
                        ? navigation.navigate("UserProfile2")
                        : navigation.push("ProfileDetail2", {
                            item,
                          });
                    }}
                  >
                    <Image
                      style={{
                        height: 170,
                        width: 170,
                        margin: width * 0.01,
                        borderRadius: 13,
                        borderWidth: 0.2,
                        resizeMode: "contain",
                      }}
                      source={{ uri: item.profileimage }}
                    />

                    <Image
                      style={{
                        height: 170,
                        width: 170,
                        margin: width * 0.01,
                        borderRadius: 13,
                        position: "absolute",
                      }}
                      source={require("../assets/fader.png")}
                    />

                    <Text
                      style={{
                        position: "absolute",
                        top: height * 0.155,
                        color: "white",
                        fontWeight: "800",
                        fontSize: 10.5,
                        left: width * 0.02,
                      }}
                    >
                      {item.displayName}
                    </Text>
                    <Text
                      style={{
                        position: "absolute",

                        color: "#D7D8DA",
                        fontWeight: "500",
                        left: width * 0.02,
                        fontSize: 10.5,
                        top: height * 0.17,
                      }}
                    >
                      @{item.username}
                    </Text>
                  </TouchableOpacity>
                </View>
              );
            })}
          </View>

          <TouchableOpacity
            style={{ bottom: height * 0.08, alignItems: "center" }}
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
            style={{ backgroundColor: "white" }}
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
