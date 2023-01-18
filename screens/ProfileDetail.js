import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  ScrollView,
  Animated,
  Alert,
  RefreshControl,
} from "react-native";
import React, { useEffect, useState, useRef } from "react";

import { supabase } from "../services/supabase";
import { useUser } from "../context/UserContext";

import { Video } from "expo-av";

import { SharedElement } from "react-navigation-shared-element";
import ProfileSkeleton from "../ProfileSkeleton";
import { usePoints } from "../context/PointsContext";
import LottieView from "lottie-react-native";
import ProfileImagePost from "../components/profile/ProfileImagePost";
import ProfileVideoPost from "../components/profile/ProfileVideoPost";
import BannerSkeleton from "../components/profile/BannerSkeleton";
import { Dimensions } from "react-native";
import ProfileTextPost from "../components/profile/CurrentUserTextPost";
import ProfileDetailStatus from "../components/profile/ProfileDetailStatus";
import Purchases from "react-native-purchases";
import SubLoading from "../components/loading/SubLoading";

import ProfileNav from "../components/profile/ProfileNav";
import ProfileFeedList from "../components/profile/ProfileFeedList";
import ProfileHeader from "../components/profile/ProfileHeader";

export default function ProfileDetail({ navigation, route }) {
  const { user, setUser } = useUser();
  const [userPosts, setUserPosts] = useState([]);

  const [userTizlyPoints, setUserTizlyPoints] = useState();
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState([]);
  const [freePosts, setFreePosts] = useState([]);
  const { points, setPoints } = usePoints([]);
  const video = React.useRef(null);
  const [status, setStatus] = React.useState({});
  const [userDetails, setUserDetails] = useState([]);

  const [profile, setProfile] = useState([]);
  const [isFollowing, setIsFollowing] = useState(false);
  const { item } = route.params;
  const [userInfo, setUserInfo] = useState(item);
  const [subscriptions, setSubscriptions] = useState();
  const [subStatus, setSubStatus] = useState(false);
  const [subLoading, setSubLoading] = useState("idle");
  const [refreshing, setRefreshing] = useState(false);

  async function checkSubStatus() {
    const userId = supabase.auth.currentUser.id;

    const resp = await supabase
      .from("subscriptions")
      .select("*")
      .eq("creatorId", item.user_id)
      .eq("userId", userId);

    return resp.body;
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

  async function getFreePosts() {
    let { data: post, error } = await supabase
      .from("post")
      .select("*")
      .eq("user_id", item.user_id)
      .eq("subsOnly", false)
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

  useEffect(() => {
    const getPost = async () => {
      const resp = await getFreePosts();

      setFreePosts(resp);
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
      .eq("user_id", item.user_id)
      .single();

    return data;
  }

  async function getSubs() {
    const resp = await supabase
      .from("subscriptions")
      .select("*")
      .eq("userId", user.user_id);

    setStatus(resp.body[0].status);

    return resp.body;
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

  useEffect(() => {
    const checkSub = async () => {
      const resp = await checkSubStatus();

      if (resp[0] === undefined) {
        setSubStatus(false);
      } else {
        setSubStatus("SUBSTATUS", resp[0]);
      }
    };
    checkSub();
  }, []);

  const listOfProducts = [
    "TizlySub1",
    "TizlySub2",
    "TizlySub3",
    "TizlyUserSubscription004",
    "TizlyUserSubscription005",
    "TizlyUserSubscription006",
    "TizlyUserSubscription007",
    "TizlyUserSubscription008",
  ];

  useEffect(() => {
    const main = async () => {
      const userId = supabase.auth.currentUser.id;
      Purchases.setDebugLogsEnabled(true);

      await Purchases.configure({
        apiKey: "appl_YzNJKcRtIKShkjSciXgXIqfSDqc",
        appUserID: userId,
      });

      const prods = await Purchases.getProducts(listOfProducts);

      // console.log("prods", prods);

      const customerInfo = await Purchases.getCustomerInfo();

      const currentSubscription = customerInfo.activeSubscriptions;

      async function findProduct() {
        const box = {
          allProducts: prods.map((i) => i.identifier),
          userSubs: currentSubscription,
        };

        const intersection = box.allProducts.filter(
          (element) => !box.userSubs.includes(element)
        );

        let availableSubscription =
          intersection[Math.floor(Math.random() * intersection.length)];

        // console.log("currentSubscription", currentSubscription);
        // console.log("availableSubscription", availableSubscription);
        // console.log("customerInfo", customerInfo);

        setSubscriptions(availableSubscription);
      }

      findProduct();
    };
    main();
  }, []);

  async function subscribeToUser() {
    const customerInfo = await Purchases.getCustomerInfo();
    setSubLoading("loading");
    try {
      const resp = await Purchases.purchaseProduct(
        subscriptions,
        null,
        Purchases.PURCHASE_TYPE.INAPP
      );

      const res = await supabase.from("subscriptions").insert([
        {
          userId: supabase.auth.currentUser.id,
          creatorId: item.user_id,
          creatorProfileImage: item.profileimage,
          userProfileImage: user.profileimage,
          creatorUsername: item.username,
          userUsername: user.username,
          creatorDisplayname: item.displayName,
          userDisplayname: user.displayName,
          subscriptionName: subscriptions,
        },
      ]);

      setSubStatus(res.body[0].status);

      setSubLoading("idle");

      return resp && res;
    } catch (error) {
      if (error.userCancelled) {
        setSubLoading("idle");
      } else {
        setSubLoading("idle");
        Alert.alert("Something Went Wrong, Try Again");
        console.log("error", error);
      }
    }
  }

  if (loading) {
    return (
      <View>
        <ProfileSkeleton navigation={navigation} />
      </View>
    );
  }

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
  const textCount = posts.filter((item) => item.mediaType === "status");

  if (loading) {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
        <ProfileSkeleton />
      </SafeAreaView>
    );
  }

  let height = Dimensions.get("window").height;
  let width = Dimensions.get("window").width;

  const scrollY = new Animated.Value(0);

  const diffclamp = Animated.diffClamp(scrollY, 0, 45);

  // const onRefresh = React.useCallback(() => {
  //   console.log("YOOOOO");
  // }, []);

  async function onRefresh() {
    console.log("REFRESHING");
  }

  return (
    <>
      <ScrollView
        scrollEventThrottle={16}
        onScroll={(e) => {
          scrollY.setValue(e.nativeEvent.contentOffset.y);
        }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        showsVerticalScrollIndicator={false}
        style={{ flex: 1, backgroundColor: "white" }}
      >
        <ProfileHeader
          profile={profile}
          posts={posts}
          freePosts={freePosts}
          subStatus={subStatus}
          photoCount={photoCount}
          videoCount={videoCount}
          textCount={textCount}
          subLoading={subLoading}
          subscribeToUser={subscribeToUser}
        />

        <ProfileNav
          profile={profile}
          posts={posts}
          freePosts={freePosts}
          subStatus={subStatus}
          photoCount={photoCount}
          videoCount={videoCount}
          textCount={textCount}
          subLoading={subLoading}
          navigation={navigation}
          subscribeToUser={subscribeToUser}
        />
      </ScrollView>
      <Animated.View
        style={{
          position: "absolute",
          bottom: height * 0.8,
          width: width * 1,
          height: height * 0.2,
          backgroundColor: "white",
          borderBottomColor: "red",
          borderBottomWidth: 2.0,
          borderBottomColor: "#EDEDED",
          flex: 1,
          alignSelf: "center",
          opacity: scrollY.interpolate({
            inputRange: [1, height * 0.2],
            outputRange: [0, 1],
          }),
        }}
      >
        <Text
          style={{
            position: "absolute",
            alignSelf: "center",
            top: height * 0.16,
            fontWeight: "800",
          }}
        >
          {profile.username}
        </Text>
      </Animated.View>

      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Image
          style={{
            position: "absolute",
            resizeMode: "contain",
            width: 35,
            height: 50,
            left: 21,
            bottom: height * 0.8,
          }}
          source={require("../assets/backButton2.png")}
        />
      </TouchableOpacity>
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
    top: 393,
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
    bottom: 565,
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
