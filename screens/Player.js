import { StyleSheet, View, Dimensions } from "react-native";
import React, { useState, useEffect } from "react";

import { supabase } from "../services/supabase";
import UserPostDetails from "../components/post/UserPostDetails";
import VideoHeader from "../components/post/VideoHeader";
import { useUser } from "../context/UserContext";
import LottieView from "lottie-react-native";
import VideoPlayer from "react-native-video-controls";

import Video from "react-native-video";

export default function Player({ route, navigation }) {
  const [comment, setComment] = useState("");
  const { user, setUser } = useUser();

  const [status, setStatus] = useState({});
  const [post, setPost] = useState([]);
  const [commentList, setCommentList] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [isPressed, setIsPressed] = useState(false);
  const [saveIsPressed, setSaveIsPressed] = useState(false);

  const [commentUser, setcommentUser] = useState([]);
  const [commenter, setCommenter] = useState([]);

  let height = Dimensions.get("window").height;
  let width = Dimensions.get("window").width;

  const { item } = route.params;

  const postUserId = route.params.user_id;
  const postId = route.params.id;
  const displayName = route.params.displayName;
  const userId = user.user_id;

  const FullSeperator = () => <View style={styles.fullSeperator} />;

  async function getLikes() {
    const resp = await supabase
      .from("likes")
      .select("*")
      .eq("userId", userId)
      .eq("postId", route.id)
      .eq("liked_Id", route.likeId);

    return resp.body;
  }

  async function getPosts() {
    const resp = await supabase
      .from("post")
      .select("*")
      .eq("mediaType", "video")
      .eq("id", postId)
      .order("id", { ascending: false });
    return resp.body;
  }

  useEffect(() => {
    const getUserPost = async () => {
      const resp = await getPosts();
      setPost(resp);
    };
    getUserPost();
  }, []);

  async function getProfilePhotos() {
    const resp = await supabase.from("profiles").select("*");

    return resp;
  }

  async function createComment() {
    const resp = await supabase.from("comments").insert([
      {
        creatorId: route.params.user_id,
        userId: user.user_id,
        comment: comment,
        userProfileImage: user.profileimage,
        postId: route.params.id,
        userDisplayName: user.displayName,
        userUsername: user.username,
      },
    ]);

    return resp;
  }

  async function getComments() {
    const resp = await supabase
      .from("comments")
      .select("*")
      .eq("postId", postId);

    const list = resp.body.map((i) => i.userId);

    const users = await supabase
      .from("profiles")
      .select("username")
      .in("user_id", [list]);

    const comments = { users: users, comments: resp };

    return resp.body;
  }

  async function getUsers() {
    const resp = await getProfilePhotos();

    return resp.body;
  }

  useEffect(() => {
    const userList = async () => {
      const resp = await getUsers();
      const list = resp.map((item) => setcommentUser(item));
      return list;
    };
    userList();
  }, []);

  useEffect(() => {
    const getPostComments = async () => {
      const resp = await getComments();
      setCommentList(resp);
    };

    getPostComments();
  }, []);

  useEffect(() => {
    const seeLikes = async () => {
      const res = await getLikes();
      res.map((post) => setIsPressed(post.liked));
    };
    seeLikes();
  }, []);

  const handlePress = () => {
    setIsPressed((current) => !current);

    isPressed === true ? deletePost() : likePost();
  };

  const refreshFeed = async () => {
    const resp = await getComments();
    setCommentList(resp);
  };

  async function getCommentProfileDetail() {
    const respon = await getComments();
    const list = respon.map((item) => item.userId);

    const data = await supabase
      .from("profiles")
      .select("*")
      .in("user_id", [list]);
    setCommenter(data);

    return data;
  }

  useEffect(() => {
    const getDetails = async () => {
      const resp = await getCommentProfileDetail();
    };
    getDetails();
  }, []);

  return (
    <View style={{ backgroundColor: "white", flex: 1 }}>
      <View>
        {/* <VideoHeader navigation={navigation} route={route} /> */}
        <View key={item.id} style={{ top: 80 }}>
          <View
            style={{
              height: height * 0.26,
              width: width,
              backgroundColor: "black",
            }}
          >
            <LottieView
              style={{
                height: height * 0.4,
                width: width * 0.4,
                position: "absolute",
                alignSelf: "center",
                bottom: height * -0.02,
              }}
              source={require("../assets/lottie/fullBlueCircle.json")}
              autoPlay
            />
          </View>
          <VideoPlayer
            toggleResizeModeOnFullscreen={true}
            onBack={() => navigation.goBack()}
            tapAnywhereToPause={true}
            seekColor={"red"}
            pictureInPicture={true}
            controls={true}
            source={{ uri: item.media }}
            style={{
              height: height * 0.26,
              width: width,
              position: "absolute",
            }}
          />
        </View>
      </View>

      <View style={{ top: 101, flex: 1 }}>
        <UserPostDetails
          displayName={displayName}
          postUserId={postUserId}
          navigation={navigation}
          post={item}
          commentList={commentList}
          route={route}
          commentUser={commentUser}
          commenter={commenter}
          saveIsPressed={saveIsPressed}
          setSaveIsPressed={setSaveIsPressed}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  commentInput: {
    borderColor: "grey",
    borderWidth: 0.1,
    borderRadius: 10,
    backgroundColor: "#E1E1EA",
    width: 230,
    height: 33,
    paddingLeft: 20,
    alignSelf: "center",
    right: 60,
    margin: 15,
  },
  inner: {
    padding: 14,
    borderTopColor: "#EDEDED",
    opacity: 7.8,
    borderTopWidth: 1.8,
    justifyContent: "space-around",
    backgroundColor: "white",
    position: "relative",
  },
  backButton: {
    position: "absolute",
    resizeMode: "contain",
    width: 35,
    height: 50,
    left: 21,
    top: 40,
  },
  logo: {
    position: "absolute",
    alignSelf: "center",
    top: 60,
    resizeMode: "contain",
    width: 52,
    height: 26,
  },
  fullSeperator: {
    borderBottomColor: "#EDEDED",
    borderBottomWidth: 2.0,
    opacity: 7.8,
    width: 900,
    left: 1,
    top: 15,
    height: 3,
  },
  fullSeperator2: {
    borderBottomColor: "#EDEDED",
    borderBottomWidth: 2.0,
    opacity: 0.8,
    width: 900,
    left: 1,
    top: 155,
    height: 3,
  },
});

{
  /* <Video
source={{ uri: route.params.media }}
ref={video}
useNativeControls
shouldPlay={true}
style={{
  height: 259,
  width: 415,
  top: 56,
}}
resizeMode="contain"
onPlaybackStatusUpdate={(status) => setStatus(() => status)}
/> */
}
