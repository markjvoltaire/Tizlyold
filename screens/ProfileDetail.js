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
  Alert,
  Button,
} from "react-native";
import React, { useEffect, useState, useRef } from "react";
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
import { usePoints } from "../context/PointsContext";
import TopHeader from "../components/TopHeader";
import PostHeader from "../components/home/PostHeader";
import Points from "../views/Points";
import Buttons from "../components/home/Buttons";

export default function ProfileDetail({ navigation, route }) {
  const { user, setUser } = useUser();
  const [userPosts, setUserPosts] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [userTizlyPoints, setUserTizlyPoints] = useState();
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState([]);
  const { points, setPoints } = usePoints([]);
  const video = React.useRef(null);
  const [status, setStatus] = React.useState({});

  const [isPressed, setIsPressed] = useState(false);
  const [saveIsPressed, setSaveIsPressed] = useState(false);

  const [profile, setProfile] = useState([]);
  const [isFollowing, setIsFollowing] = useState(false);
  const { item } = route.params;

  async function getUserPoints() {
    const userId = supabase.auth.currentUser.id;

    const { data: profiles, error } = await supabase
      .from("profiles")
      .select("tizlyPoints")
      .eq("user_id", userId);

    return profiles;
  }

  async function getUser() {
    const userId = supabase.auth.currentUser.id;

    const { data: profiles, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("user_id", item.user_id);

    return profiles;
  }

  useEffect(() => {
    const getUserInfo = async () => {
      const resp = await getUser();
      resp.map((i) => setUserTizlyPoints(i.tizlyPoints));
    };

    getUserInfo();
  }, []);

  useEffect(() => {
    const getPoints = async () => {
      const resp = await getUserPoints();
      resp.map((i) => setPoints(i.tizlyPoints));
    };
    getPoints();
  }, []);

  async function subtractCoins() {
    const userId = supabase.auth.currentUser.id;
    const { data: profiles, error } = await supabase
      .from("profiles")
      .update({ tizlyPoints: points - 10 })
      .eq("user_id", userId);

    // setUser(profiles);

    error === null ? handleFollow() : console.log("error", error);

    profiles.map((i) => setPoints(i.tizlyPoints));

    // setPoints(profiles);

    return profiles;
  }

  async function addCoins() {
    const userId = supabase.auth.currentUser.id;
    const { data: profiles, error } = await supabase
      .from("profiles")
      .update({ tizlyPoints: userTizlyPoints + item.subCost })
      .eq("user_id", item.user_id);

    // error === null ? handleFollow() : console.log("error", error);
  }

  async function handleSubscriptions() {
    if (points - item.subCost < 0) {
      Alert.alert("Insufficent Coins To Access Content");
    } else {
      subtractCoins();
      addCoins();
      setIsFollowing(true);
    }
  }

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
      .eq("userId", userId);

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

  const user_id = route.params.user_id;

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

    setIsFollowing(false);

    return resp;
  }

  const handleFollow = () => {
    // setIsFollowing((current) => !current);

    isFollowing === false ? followUser() : unfollowUser();
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

  const createThreeButtonAlert = () =>
    Alert.alert(
      `subscribe to @${item.username}`,
      `Would you like to subscribe to @${item.username} for ${item.subCost} Coins`,
      [
        {
          text: "Subscribe",
          onPress: () => handleSubscriptions(),
        },
        {
          text: "Not Now",

          onPress: () => null,
          type: "cancel",
        },
      ]
    );

  const unsubscribeAlert = () =>
    Alert.alert(
      `unsubscribe to @${item.username}`,
      `Would you like to unsubscribe to @${item.username} `,
      [
        {
          text: "Unsubscribe",
          onPress: () => unfollowUser(),
        },
        {
          text: "Not Now",

          onPress: () => null,
          type: "cancel",
        },
      ]
    );

  return (
    <>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ flex: 1, backgroundColor: "white" }}
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
        <View style={{ bottom: 430 }}>
          <View style={{ top: 70, right: 62 }}>
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

          <TouchableOpacity onPress={() => unsubscribeAlert()}>
            <Image
              style={styles.subButton}
              source={
                isFollowing === true
                  ? require("../assets/subscribed.png")
                  : require("../assets/blank.png")
              }
            />
          </TouchableOpacity>
        </View>

        <View style={{ position: "absolute", top: 55, left: 320 }}>
          <Image
            style={{ height: 40, width: 70, borderRadius: 10 }}
            source={require("../assets/backgroundBlur.png")}
          />
        </View>

        <View style={{ position: "absolute", top: 35, left: 16 }}>
          <Image
            style={styles.setting}
            source={require("../assets/coin.png")}
          />
          <Text style={{ left: 350, top: 31, fontWeight: "700" }}>
            {points}
          </Text>
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
                  <TouchableOpacity onPress={() => createThreeButtonAlert()}>
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
              <View style={{ paddingBottom: 20 }}>
                {posts.map((item) => {
                  if (item.mediaType === "image") {
                    return (
                      <View
                        style={{ top: 90, paddingBottom: 90 }}
                        key={item.id}
                      >
                        <View style={{ alignItems: "center", top: 20 }}>
                          <PostHeader navigation={navigation} item={item} />
                        </View>
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
                        </Pressable>

                        <View>
                          <Text
                            style={{
                              left: 13,
                              top: 12,
                              fontWeight: "700",
                              textAlign: "left",
                              width: 390,
                              paddingBottom: 6,
                              lineHeight: 20,
                            }}
                          >
                            {item.title}
                          </Text>
                          <Text
                            style={{
                              left: 13,
                              top: 12,
                              fontWeight: "600",
                              color: "#4F4E4E",
                              textAlign: "left",
                              width: 390,
                              paddingBottom: 30,
                              lineHeight: 20,
                            }}
                          >
                            {item.description}
                          </Text>

                          <Image
                            resizeMode="contain"
                            style={{ width: 70, left: 10, bottom: 30 }}
                            source={require("../assets/photoBean.png")}
                          />
                        </View>

                        <View style={{ bottom: 30 }}>
                          <Buttons navigation={navigation} item={item} />
                        </View>
                      </View>
                    );
                  }

                  if (item.mediaType === "video") {
                    return (
                      <View
                        style={{ top: 90, paddingBottom: 90 }}
                        key={item.id}
                      >
                        <View style={{ alignItems: "center", top: 20 }}>
                          <PostHeader navigation={navigation} item={item} />
                        </View>
                        <Pressable
                          key={item.id}
                          onPress={() =>
                            navigation.navigate("Player", { item })
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
                            <Video
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
                          <Image
                            style={{
                              alignSelf: "center",
                              resizeMode: "stretch",
                              height: 180,
                              width: 400,
                              top: 219,
                              borderRadius: 12,
                              position: "absolute",
                            }}
                            source={require("../assets/fader.png")}
                          />
                          <Image
                            style={{
                              position: "absolute",
                              width: 60,
                              top: 160,
                              alignSelf: "center",
                              resizeMode: "contain",
                            }}
                            source={require("../assets/playButton.png")}
                          />
                        </Pressable>

                        <View>
                          <Text
                            style={{
                              left: 13,
                              top: 12,
                              fontWeight: "700",
                              textAlign: "left",
                              width: 390,
                              paddingBottom: 6,
                              lineHeight: 20,
                            }}
                          >
                            {item.title}
                          </Text>
                          <Text
                            style={{
                              left: 13,
                              top: 12,
                              fontWeight: "600",
                              color: "#4F4E4E",
                              textAlign: "left",
                              width: 390,
                              paddingBottom: 30,
                              lineHeight: 20,
                            }}
                          >
                            {item.description}
                          </Text>

                          <Image
                            resizeMode="contain"
                            style={{ width: 70, left: 10, bottom: 30 }}
                            source={require("../assets/videoBean.png")}
                          />
                        </View>

                        <View style={{ bottom: 30 }}>
                          <UserButtons
                            isPressed={isPressed}
                            setIsPressed={setIsPressed}
                            saveIsPressed={saveIsPressed}
                            setSaveIsPressed={setSaveIsPressed}
                            item={item}
                          />
                        </View>
                      </View>
                    );
                  }
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

  setting: {
    position: "absolute",
    height: 29,
    width: 29,
    left: 308,
    top: 26,
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
    top: 383,
    width: 150,
    height: 32,
    right: 18,
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
    bottom: 350,
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
