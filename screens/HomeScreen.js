import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  Button,
} from "react-native";
import React, { useEffect, useState } from "react";
import { supabase } from "../services/supabase";
import Header from "../components/home/Header";
import { useUser } from "../context/UserContext";
import { getPosts } from "../services/user";
import PostFeed from "../components/home/PostFeed";

export default function HomeScreen({ navigation }) {
  const { user, setUser } = useUser();
  const [image, setImage] = useState(null);

  const [userPost, setuserPost] = useState([]);

  async function getUser() {
    const userId = supabase.auth.currentUser.id;

    const { data } = await supabase
      .from("profiles")
      .select("*")
      .eq("user_id", userId)
      .single();
    setUser(data);
  }

  useEffect(() => {
    const getUserPost = async () => {
      const resp = await getPosts();
      setuserPost(resp);
    };
    getUserPost();
  }, []);

  const posts = userPost.body;
  // console.log("posts", posts);

  useEffect(() => {
    const getUserProfile = async () => {
      await getUser();
    };
    getUserProfile();
  }, []);

  const FullSeperator = () => <View style={styles.fullSeperator} />;

  if (user === null) {
    navigation.navigate("Username");
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Header />
      <FullSeperator />
      <TouchableOpacity onPress={() => navigation.navigate("Settings")}>
        <Image
          style={styles.settingIcon}
          source={require("../assets/Setting.jpg")}
        />
      </TouchableOpacity>
      <PostFeed posts={posts} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
  },

  header: {
    alignItems: "center",
    bottom: 200,
  },
  whyHeader: {
    position: "absolute",
    left: 88,
    top: 321,
  },

  howHeader: {
    position: "absolute",
    left: 88,
    top: 500,
  },

  why: {
    fontWeight: "800",
    color: "#4A90E2",
    fontSize: 20,
  },
  how: {
    fontWeight: "800",
    color: "#4A90E2",
    fontSize: 20,
  },

  whyDiv: {
    position: "absolute",
    color: "#686877",
    fontWeight: "500",
    width: 252,
    left: 88,
    top: 360,
  },
  howDiv: {
    position: "absolute",
    color: "#686877",
    fontWeight: "500",
    width: 252,
    left: 88,
    top: 540,
  },
  whyIcon: {
    position: "absolute",
    height: 24,
    width: 24,
    bottom: 425,
    left: 40,
  },
  howIcon: {
    position: "absolute",
    height: 24,
    width: 24,
    left: 40,
    bottom: 230,
  },

  whyText: {
    fontSize: 13,
    fontWeight: "700",
    lineHeight: 20,
    color: "#686877",
  },

  howText: {
    fontSize: 13,
    fontWeight: "700",
    lineHeight: 20,
    color: "#686877",
  },

  pageHeader: {
    position: "absolute",
    fontWeight: "800",
    fontSize: 20,
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
    borderBottomColor: "grey",
    borderBottomWidth: StyleSheet.hairlineWidth,
    opacity: 0.5,
    width: 900,
    left: 1,
    bottom: 250,
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
});
