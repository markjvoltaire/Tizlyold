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
        <Skeleton />
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
        {postList.length === 0 ? (
          <ScrollView
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
            renderItem={({ item, defaultImageSource, source }) => {
            
              return (
                <View
                  style={{ alignSelf: "center", paddingBottom: 200, top: 70 }}
                >
                  {item.mediaType === "image" ? (
                    <>
                      {item.media != null ? (
                        <>
                          <View style={{ bottom: 25 }}>
                            <PostHeader navigation={navigation} item={item} />
                          </View>
                          <SharedElement id={item.id}>
                            <Animated.Image
                              source={require("../assets/defaultImage.png")}
                              style={{
                                opacity: defaultImageAnimated,
                                height: 300,
                                width: 300,
                                alignSelf: "center",
                              }}
                              onLoad={handleDefaultImageLoad}
                              blurRadius={1}
                            />
                          </SharedElement>
                          <Pressable
                            onPress={() =>
                              navigation.push("ImageDetails", { item })
                            }
                            style={{
                              position: "absolute",
                              alignSelf: "center",
                            }}
                          >
                            <SharedElement id={item.id}>
                              <Animated.Image
                                source={{ uri: item.media }}
                                style={{
                                  opacity: imageAnimated,
                                  aspectRatio: 1,
                                  width: 400,
                                  borderRadius: 10,
                                  position: "absolute",
                                  alignSelf: "center",
                                }}
                                onLoad={handleImageLoad}
                              />
                            </SharedElement>
                          </Pressable>
                          <View style={{ top: 45 }}>
                            <Text
                              style={{
                                fontWeight: "700",
                                textAlign: "left",
                                width: 390,
                                paddingBottom: 16,
                                lineHeight: 20,
                              }}
                            >
                              {item.title}
                            </Text>
                            <Text
                              style={{
                                fontWeight: "600",
                                color: "#4F4E4E",
                                textAlign: "left",
                                width: 390,
                                paddingBottom: 6,
                                lineHeight: 20,
                              }}
                            >
                              {item.description}
                            </Text>

                            <Image
                              resizeMode="contain"
                              style={{
                                width: 70,
                              }}
                              source={require("../assets/photoBean.png")}
                            />
                          </View>
                          <View style={{ top: 17 }}>
                            {item.user_id === user.user_id ? (
                              <CurrentUserButtons
                                isPressed={isPressed}
                                setIsPressed={setIsPressed}
                                saveIsPressed={saveIsPressed}
                                setSaveIsPressed={setSaveIsPressed}
                                navigation={navigation}
                                item={item}
                              />
                            ) : (
                              <UserButtons
                                isPressed={isPressed}
                                setIsPressed={setIsPressed}
                                saveIsPressed={saveIsPressed}
                                setSaveIsPressed={setSaveIsPressed}
                                item={item}
                                navigation={navigation}
                              />
                            )}
                          </View>
                          <FullSeperator />
                        </>
                      ) : (
                        <Skeleton />
                      )}

                      {/* <View>
                          <PostImage item={item} navigation={navigation} />
                        </View> */}
                    </>
                  ) : (
                    <View style={{ paddingBottom: 90, bottom: 10 }}>
                      <Pressable
                        onPress={() => navigation.push("Player", { item })}
                      >
                        <Video
                          source={{ uri: item.media }}
                          ref={video}
                          style={{
                            height: 400,
                            aspectRatio: 1,
                            borderRadius: 12,
                            alignSelf: "center",
                            top: 20,
                          }}
                          resizeMode="cover"
                          onPlaybackStatusUpdate={(status) =>
                            setStatus(() => status)
                          }
                        />

                        <Image
                          style={{
                            alignSelf: "center",
                            resizeMode: "stretch",
                            height: 180,
                            width: 400,
                            top: 240,
                            borderRadius: 12,
                            position: "absolute",
                          }}
                          source={require("../assets/fader.png")}
                        />
                        <Image
                          style={{
                            position: "absolute",
                            width: 60,
                            top: 190,
                            alignSelf: "center",
                            resizeMode: "contain",
                          }}
                          source={require("../assets/playButton.png")}
                        />
                      </Pressable>

                      <View style={{ position: "absolute", top: 390, left: 5 }}>
                        <Text style={{ color: "white", fontWeight: "700" }}>
                          {item.title}
                        </Text>
                      </View>

                      <View style={{ position: "absolute" }}>
                        <Image
                          style={{
                            height: 35,
                            width: 35,
                            borderRadius: 100,
                            position: "absolute",
                            left: 5,
                            top: 350,
                          }}
                          source={{ uri: item.profileimage }}
                        />
                        <Text
                          style={{
                            position: "absolute",
                            color: "white",
                            top: 360,
                            left: 50,
                            fontWeight: "500",
                            fontSize: 15,
                          }}
                        >
                          {item.username}
                        </Text>
                      </View>

                      <View>
                        <Text
                          style={{
                            left: 5,
                            top: 32,
                            fontWeight: "700",
                            color: "#4F4E4E",
                            textAlign: "left",
                            width: 390,
                            paddingBottom: 30,
                          }}
                        >
                          {item.description}
                        </Text>
                      </View>

                      {/* <UserButtons
        isPressed={isPressed}
        setIsPressed={setIsPressed}
        saveIsPressed={saveIsPressed}
        setSaveIsPressed={setSaveIsPressed}
        item={post}
      /> */}

                      {/* <CurrentUserButtons
                        isPressed={isPressed}
                        setIsPressed={setIsPressed}
                        saveIsPressed={saveIsPressed}
                        setSaveIsPressed={setSaveIsPressed}
                        navigation={navigation}
                        item={post}
                      /> */}
                    </View>
                  )}
                </View>
              );
            }}
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
