import {
  StyleSheet,
  Text,
  View,
  Image,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Button,
  Alert,
  ErrorAlert,
  FlatList,
  RefreshControl,
  Animated,
  Dimensions,
} from "react-native";
import React, { useState, useEffect } from "react";
import BottomTabNavigator from "../navigation/TabNavigator";
import ProfileNav from "../components/profile/ProfileNav";
import LottieView from "lottie-react-native";
import { supabase } from "../services/supabase";
import { useUser } from "../context/UserContext";
import * as ImagePicker from "expo-image-picker";
import UserProfileFeed from "../components/profile/UserProfileFeed";
import UserProfileNav from "../components/profile/UserProfileNav";
import NoUserProfilePost from "../components/profile/NoUserProfilePost";
import { Video, AVPlaybackStatus } from "expo-av";
import ProfileSkeleton from "../ProfileSkeleton";
import { usePoints } from "../context/PointsContext";

export default function UserProfile({ navigation, route }) {
  const { user, setUser } = useUser();
  const { points, setPoints } = usePoints();
  const [image, setImage] = useState(null);
  const [imageData, setImageData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [stateImage, setStateImage] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const video = React.useRef(null);
  const [navState, setNavState] = useState("home");
  const [status, setStatus] = React.useState({});
  const FullSeperator = () => <View style={styles.fullSeperator} />;
  const FullSeperatorTwo = () => <View style={styles.FullSeperatorTwo} />;

  const [posts, setPosts] = useState();

  async function getCurrentUserPosts() {
    const userId = supabase.auth.currentUser.id;
    let { data: post, error } = await supabase
      .from("post")
      .select("*")
      .eq("user_id", userId)
      .order("id", { ascending: false });

    return post;
  }

  useEffect(() => {
    const getPost = async () => {
      const resp = await getCurrentUserPosts();
      setPosts(resp);
    };
    getPost();
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  async function getUserById() {
    const userId = supabase.auth.currentUser.id;

    const { data } = await supabase
      .from("profiles")
      .select("*")
      .eq("user_id", userId)
      .single();
    setUser(data);
  }

  const refreshFeed = async () => {
    const getPost = async () => {
      const resp = await getCurrentUserPosts();
      setPosts(resp);
      setLoading(false);
    };
    getUserById();
    getPost();
  };

  let height = Dimensions.get("window").height;
  let width = Dimensions.get("window").width;

  if (loading) {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
        {/* <LottieView
          style={{
            top: 60,
            height: 400,
            width: 400,
            position: "absolute",
            alignSelf: "center",
          }}
          source={require("../assets/lottie/fasterGreyLoader.json")}
          autoPlay
        /> */}
        <ProfileSkeleton />
      </SafeAreaView>
    );
  }

  if (posts.length === 0) {
    return (
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
        <NoUserProfilePost navigation={navigation} />
      </ScrollView>
    );
  }

  return (
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
      {/* <Image style={styles.userBanner} source={{ uri: user.bannerImage }} /> */}

      {user.bannerImageType === "image" ? (
        <Image
          style={{
            width: 455,
            height: 455,
            position: "absolute",

            alignSelf: "center",
            borderRadius: 10,
            borderColor: "#5C5C5C",
            borderWidth: 0.2,
          }}
          resizeMode="cover"
          source={{ uri: user.bannerImage }}
        />
      ) : (
        <Video
          source={{ uri: user.bannerImage }}
          ref={video}
          isLooping
          shouldPlay
          isMuted
          style={{
            height: 450,
            aspectRatio: 1,
            alignSelf: "center",
            borderRadius: 10,
            position: "absolute",
          }}
          resizeMode="cover"
          onPlaybackStatusUpdate={(status) => setStatus(() => status)}
        />
      )}

      <Image
        style={styles.userBannerFader}
        source={require("../assets/fader.png")}
      />

      <View
        style={{ position: "absolute", top: height * 0.06, left: width * 0.75 }}
      >
        <Image
          style={{ height: 40, width: 70, borderRadius: 10 }}
          source={require("../assets/backgroundBlur.png")}
        />
      </View>

      <View style={{ position: "absolute", top: height * 0.036, left: 16 }}>
        <Image
          style={{
            height: height * 0.027,
            top: height * 0.032,
            left: width * 0.73,
            aspectRatio: 1,
          }}
          source={require("../assets/coin.png")}
        />
        <Text
          style={{ left: width * 0.82, top: height * 0.009, fontWeight: "600" }}
        >
          {points}
        </Text>
      </View>

      <View style={{ bottom: 410 }}>
        <View style={{ right: 6 }}>
          <Text style={styles.displayname}>{user.displayName}</Text>
          <Text style={styles.username}>@{user.username}</Text>
        </View>
        <Text style={styles.bio}> {user.bio}</Text>

        <TouchableOpacity onPress={() => navigation.navigate("EditProfile")}>
          <Image
            style={styles.subButton}
            source={require("../assets/editprofile.png")}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("Settings")}>
          <Image
            style={styles.settingsButton}
            source={require("../assets/settings.png")}
          />
        </TouchableOpacity>
        <Image
          style={styles.profileImage}
          source={
            user.profileimage === null
              ? require("../assets/noProfilePic.jpeg")
              : { uri: user.profileimage }
          }
        />
      </View>
      <View style={styles.profileNav}>
        <Text style={styles.home}>Home</Text>
      </View>

      <FullSeperator />
      <View style={styles.feedContainer}>
        {posts.map((item) => {
          return (
            <View key={item.id}>
              <UserProfileFeed
                navigation={navigation}
                route={route}
                post={item}
                navState={navState}
                setPosts={setPosts}
                user={user}
                setUser={setUser}
              />
            </View>
          );
        })}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  userBanner: {
    position: "absolute",
    width: 455,
    height: 455,
    alignSelf: "center",
  },

  setting: {
    position: "absolute",
    height: 22,
    width: 22,
    left: 308,
    top: 29,
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
  media: {
    position: "absolute",
    fontWeight: "bold",
    top: 390,
    left: 245,
    fontSize: 16,
  },

  feedContainer: {
    alignItems: "center",
    top: 40,
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
  editButton: {
    position: "absolute",
    resizeMode: "contain",
    bottom: 30,
    width: 160,
    height: 30,
  },

  fullSeperator: {
    borderBottomColor: "black",
    borderBottomWidth: 0.8,
    opacity: 0.2,
    width: 900,
    top: 10,
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
  subButton: {
    resizeMode: "contain",
    top: 330,
    width: 160,
    height: 30,
    right: 20,
  },

  settingsButton: {
    resizeMode: "contain",
    position: "absolute",
    top: 300,
    width: 160,
    height: 29,
    left: 100,
  },

  bio: {
    color: "white",
    fontSize: 15,
    width: 400,
    top: 312,
    left: 3,
    alignSelf: "center",
    fontWeight: "700",
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
    width: 25,
    height: 30,
    left: 41,
    top: 90,
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
