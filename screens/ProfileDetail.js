import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  ScrollView,
  RefreshControl,
  Pressable,
  Animated,
} from "react-native";
import React, { useEffect, useState } from "react";
import ProfileNav from "../components/profile/ProfileNav";
import UserButtons from "../components/home/UserButtons";
import UserProfileFeed from "../components/profile/UserProfileFeed";
import UserProfileNav from "../components/profile/UserProfileNav";
import HomeScreen from "../screens/HomeScreen";

import LottieView from "lottie-react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { supabase } from "../services/supabase";
import { useUser } from "../context/UserContext";
import { getCurrentUserPosts, getProfileDetail } from "../services/user";
import ProfileDetailSub from "../components/profile/ProfileDetailSub";
import ProfileFeedList from "../components/profile/ProfileFeedList";
import { StackActions } from "@react-navigation/native";
import { Video, AVPlaybackStatus } from "expo-av";
import NoProfilePost from "../components/profile/NoProfilePost";
import UserProfile from "./UserProfile";
import {
  SharedElement,
  createSharedElementStackNavigator,
} from "react-navigation-shared-element";
import ProfileSkeleton from "../ProfileSkeleton";

export default function ProfileDetail({ navigation, route }) {
  const { user, setUser } = useUser();
  const [userPosts, setUserPosts] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState([]);

  const [profile, setProfile] = useState([]);
  const [isFollowing, setIsFollowing] = useState(false);
  const { item } = route.params;

  const FullSeperator = () => <View style={styles.fullSeperator} />;

  async function getPosts() {
    let { data: post, error } = await supabase
      .from("post")
      .select("*")
      .eq("user_id", item.user_id)
      .order("id", { ascending: false });

    return post;
  }

  async function getFollowing() {
    const userId = supabase.auth.currentUser.id;
    const resp = await supabase
      .from("following")
      .select("*")
      .eq("creatorId", item.user_id)
      .eq("userId", user.user_id);

    return resp.body;
  }

  useEffect(() => {
    const seeLikes = async () => {
      const res = await getFollowing();
      res.map((user) => setIsFollowing(user.following));
    };
    seeLikes();
  }, []);

  useEffect(() => {
    const getPost = async () => {
      const resp = await getPosts();

      setPosts(resp);
      setLoading(false);
    };
    getPost();
  }, []);

  // const user_id = route.params.user_id;

  // async function getUserPostsById() {
  //   const items = await supabase
  //     .from("post")
  //     .select("*")
  //     .eq("user_id", user_id)
  //     .order("id", { ascending: false });

  //   return items.body;
  // }

  // async function getProfileDetail() {
  //   const { data } = await supabase
  //     .from("profiles")
  //     .select("*")
  //     .eq("user_id", route.params.user_id)
  //     .single();

  //   return data;
  // }

  // useEffect(() => {
  //   const getUser = async () => {
  //     const resp = await getProfileDetail();
  //     setProfile(resp);
  //   };
  //   getUser();
  // }, []);

  // useEffect(() => {
  //   const getFeed = () => {
  //     getUserPostsById().then((res) => setUserPosts(res));
  //     setLoading(false);
  //   };
  //   getFeed();
  // }, []);

  // if (loading) {
  //   return (
  //     <SafeAreaView>
  //       <View>
  //         <Text style={{ fontSize: 300 }}>LOADING</Text>
  //       </View>
  //     </SafeAreaView>
  //   );
  // }

  async function followUser() {
    const resp = await supabase.from("following").insert([
      {
        creatorId: item.user_id,
        userId: user.user_id,
        userProfileImage: user.profileimage,

        userUsername: user.username,
        creatorUsername: item.username,
        followingId: item.following_Id,
        creatorDisplayname: item.displayName,
        userDisplayname: user.displayName,
        creatorProfileImage: item.profileimage,
      },
    ]);

    return resp;
  }

  async function unfollowUser() {
    const resp = await supabase
      .from("following")
      .delete()
      .eq("userId", user.user_id)
      .eq("creatorId", item.user_id);

    return resp;
  }

  const handleFollow = () => {
    setIsFollowing((current) => !current);

    isFollowing === true ? unfollowUser() : followUser();
  };

  if (loading) {
    return (
      <View>
        <ProfileSkeleton navigation={navigation} />
      </View>
    );
  }

  // const refreshFeed = async () => {
  //   getProfileDetail();
  // };

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

  const photoCount = posts.filter((item) => item.mediaType === "image");
  const videoCount = posts.filter((item) => item.mediaType === "video");
  const textCount = posts.filter((item) => item.mediaType === "text");

  return (
    <>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ flex: 1, backgroundColor: "white" }}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={() => refreshFeed()}
          />
        }
      >
        <SharedElement id={item.id}>
          <Animated.Image
            source={require("../assets/defaultImage.png")}
            style={{
              height: 398,
              position: "absolute",
              opacity: defaultImageAnimated,
              aspectRatio: 1,
              alignSelf: "center",
              borderRadius: 10,
              borderColor: "#5C5C5C",
              borderWidth: 0.2,
            }}
            resizeMode="cover"
            onLoad={handleDefaultImageLoad}
          />
        </SharedElement>
        <SharedElement id={item.id}>
          <Image
            style={styles.userBanner}
            source={{ uri: item.profileimage }}
          />
        </SharedElement>

        <Video
          source={{ uri: item.bannerimage }}
          isLooping
          shouldPlay={true}
          isMuted={true}
          resizeMode="cover"
          style={styles.userBanner}
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
        <View style={{ bottom: 410 }}>
          <View style={{ top: 60, right: 62 }}>
            <Text style={styles.displayname}>{item.displayName}</Text>
            <Text style={styles.username}>@{item.username}</Text>

            {/* <Image
              style={styles.profileImage}
              source={
                item.profileimage === null
                  ? require("../assets/noProfilePic.jpeg")
                  : { uri: item.profileimage }
              }
            /> */}
          </View>

          {/* <TouchableOpacity onPress={() => handleFollow()}>
            <Image
              style={styles.subButton}
              source={
                isFollowing === true
                  ? require("../assets/followingbutton.png")
                  : require("../assets/followbutton.png")
              }
            />
          </TouchableOpacity> */}
        </View>
        <View style={styles.profileNav}>
          <Text style={styles.home}>Home</Text>

          <FullSeperator />
        </View>
        {posts.length === 0 ? (
          <View style={{ alignItems: "center", top: 130, flex: 1 }}>
            <Text
              style={{
                bottom: 60,
                fontWeight: "600",
                fontSize: 20,
                color: "#686877",
              }}
            >
              @{item.username} Has No Content Yet.
            </Text>
            <Image
              style={{ height: 170, resizeMode: "contain", bottom: 20 }}
              source={require("../assets/mobile-application.png")}
            />
          </View>
        ) : (
          <View>
            {isFollowing === false ? (
              <>
                <View
                  style={{
                    top: 100,
                    flexDirection: "row",
                    alignSelf: "center",
                  }}
                >
                  <View>
                    <Image
                      style={{ height: 130, width: 130, right: 5 }}
                      source={require("../assets/subBox.png")}
                    />
                    <Text
                      style={{
                        position: "absolute",
                        alignSelf: "center",
                        fontWeight: "600",
                        color: "white",
                        top: 15,
                        fontSize: 17,
                      }}
                    >
                      Photos
                    </Text>
                    <Text
                      style={{
                        position: "absolute",
                        alignSelf: "center",
                        top: 55,
                        fontWeight: "600",
                        fontSize: 28,
                        color: "white",
                      }}
                    >
                      {photoCount.length}
                    </Text>
                  </View>

                  <View>
                    <Image
                      style={{ height: 130, width: 130 }}
                      source={require("../assets/subBox.png")}
                    />
                    <Text
                      style={{
                        position: "absolute",
                        alignSelf: "center",
                        fontWeight: "600",
                        color: "white",
                        top: 15,
                        fontSize: 17,
                      }}
                    >
                      Videos
                    </Text>
                    <Text
                      style={{
                        position: "absolute",
                        alignSelf: "center",
                        top: 55,
                        fontWeight: "600",
                        fontSize: 28,
                        color: "white",
                      }}
                    >
                      {videoCount.length}
                    </Text>
                  </View>

                  <View>
                    <Image
                      style={{ height: 130, width: 130, left: 5 }}
                      source={require("../assets/subBox.png")}
                    />
                    <Text
                      style={{
                        position: "absolute",
                        alignSelf: "center",
                        fontWeight: "600",
                        color: "white",
                        top: 15,
                        fontSize: 17,
                      }}
                    >
                      Text
                    </Text>
                    <Text
                      style={{
                        position: "absolute",
                        alignSelf: "center",
                        top: 55,
                        fontWeight: "600",
                        fontSize: 28,
                        color: "white",
                      }}
                    >
                      {textCount.length}
                    </Text>
                  </View>
                </View>
                <View style={{ alignItems: "center", top: 65 }}>
                  <TouchableOpacity
                    onPress={() =>
                      navigation.push("UserSubscriber", {
                        item,
                      })
                    }
                  >
                    <Image
                      style={{
                        resizeMode: "contain",
                        height: 215,
                        width: 215,
                        alignSelf: "center",
                      }}
                      source={require("../assets/accessButton.png")}
                    />
                  </TouchableOpacity>
                </View>
              </>
            ) : (
              <View style={styles.feedContainer}>
                {posts.map((item) => {
                  return (
                    <View key={item.id}>
                      <Pressable
                        key={item.id}
                        onPress={() =>
                          navigation.navigate("ImageDetails", { item })
                        }
                      >
                        <SharedElement id={item.id}>
                          <Animated.Image
                            source={require("../assets/defaultImage.png")}
                            style={{
                              height: 398,
                              position: "absolute",
                              opacity: defaultImageAnimated,

                              alignSelf: "center",
                              borderRadius: 10,
                              borderColor: "#5C5C5C",
                              borderWidth: 0.2,
                            }}
                            resizeMode="cover"
                            onLoad={handleDefaultImageLoad}
                          />
                        </SharedElement>

                        <SharedElement id={item.id}>
                          <Animated.Image
                            source={{ uri: item.media }}
                            style={{
                              height: 398,
                              aspectRatio: 1,
                              alignSelf: "center",
                              borderRadius: 10,
                            }}
                            resizeMode="cover"
                            onLoad={handleImageLoad}
                          />
                        </SharedElement>
                        <Animated.Image
                          style={{
                            alignSelf: "center",
                            resizeMode: "stretch",
                            height: 200,
                            width: 398,
                            top: 200,
                            borderRadius: 12,
                            position: "absolute",
                          }}
                          resizeMode="stretch"
                          source={require("../assets/fader.png")}
                        />
                      </Pressable>

                      <View
                        style={{ position: "absolute", top: 370, left: 10 }}
                      >
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
                            left: 10,
                            top: 330,
                          }}
                          source={{ uri: item.profileimage }}
                        />
                        <Text
                          style={{
                            position: "absolute",
                            color: "white",
                            top: 342,
                            left: 55,
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
                            left: 10,
                            top: 12,
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
                    </View>
                  );
                })}
              </View>
            )}
          </View>
        )}
      </ScrollView>
    </>
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

  fullSeperator: {
    borderBottomColor: "grey",
    borderBottomWidth: 1.8,
    opacity: 0.2,
    width: 900,
    left: 1,
    top: 428,
  },

  profileNav: {
    position: "absolute",
    top: 85,
    width: 4000,
  },
  home: {
    position: "absolute",
    fontWeight: "bold",
    top: 390,
    left: 180,
    fontSize: 16,
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
    right: 30,
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
    top: 312,
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
