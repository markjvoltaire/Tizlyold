import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  RefreshControl,
} from "react-native";
import React, { useState, useEffect } from "react";
import TopHeader from "../TopHeader";
import { supabase } from "../../services/supabase";

export default function NoPost({ navigation }) {
  const [refreshing, setRefreshing] = useState(false);
  const [follow, setFollow] = useState([]);
  const [postList, setPostList] = useState([]);

  async function getPosts() {
    const userId = supabase.auth.currentUser.id;
    const respon = await getFollowing();
    const list = respon.map((item) => item.followingId);

    const resp = await supabase
      .from("post")
      .select("*")
      .in("followingId", [list]);

    setPostList(resp.body);

    return resp.body;
  }

  async function getFollowing() {
    const userId = supabase.auth.currentUser.id;
    const resp = await supabase
      .from("following")
      .select(" creatorId, followingId, creatorUsername, userId")
      .eq("following", true)
      .eq("userId", userId);
    // .eq('ceatorId', )

    setFollow(resp.body);

    // const list = resp.map((i) => i.followingId);

    return resp.body;
  }

  useEffect(() => {
    const getFollowingList = async () => {
      const resp = await getFollowing();
      // console.log("resp", resp);

      setFollow(resp);
    };
    getFollowingList();
  }, []);

  useEffect(() => {
    const getUserPost = async () => {
      await getPosts();
    };
    getUserPost();
  }, []);

  const refreshFeed = async () => {
    await getPosts();

    const getUserPost = async () => {
      await getPosts();
    };
    getUserPost();
  };

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      {/* <Text
        style={{
          fontSize: 13,
          fontWeight: "700",
          lineHeight: 20,
          color: "#686877",
          top: 100,
        }}
      >
        Your home feed shows you content of creators that you are following.
      </Text> */}

      <Text style={styles.howText}>
        visit the explore screen to discover your favorite creators.
      </Text>

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
          top: 250,
          alignSelf: "center",
        }}
        source={require("../../assets/mobile-application.png")}
      />

      <TouchableOpacity
        style={{ top: 700, alignItems: "center" }}
        onPress={() => navigation.navigate("Explore")}
      >
        <Image
          style={styles.exploreButton}
          source={require("../../assets/exploreCreators.png")}
        />
      </TouchableOpacity>
    </View>
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
    bottom: 300,
  },
  whyHeader: {
    position: "absolute",
    left: 88,
    top: 221,
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
    bottom: 100,
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
    top: 440,
  },
  whyIcon: {
    position: "absolute",
    height: 24,
    width: 24,
    bottom: 525,
    left: 40,
  },
  howIcon: {
    position: "absolute",
    height: 24,
    width: 24,
    left: 40,
    bottom: 330,
  },

  whyText: {
    fontSize: 13,
    fontWeight: "700",
    lineHeight: 20,
    color: "#686877",
    bottom: 300,
  },

  howText: {
    fontSize: 13,
    fontWeight: "700",
    lineHeight: 20,
    color: "#686877",
    top: 125,
    position: "absolute",
    width: 370,
    alignSelf: "center",
  },

  pageHeader: {
    position: "absolute",
    fontWeight: "800",
    fontSize: 20,
    alignSelf: "center",
  },

  profileimage: {
    width: 100,
  },
  exploreButton: {
    position: "absolute",
    width: 213,
    height: 40,
    bottom: 30,
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
