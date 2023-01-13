import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  TextInput,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import React, { useState, useEffect } from "react";
import UserButtons from "../home/UserButtons";
import { useUser } from "../../context/UserContext";
import { supabase } from "../../services/supabase";

export default function VideoPostDetails({ item, route }) {
  const FullSeperator = () => <View style={styles.fullSeperator} />;
  const [comment, setComment] = useState("");
  const { user, setUser } = useUser();
  const video = React.useRef(null);
  const [status, setStatus] = useState({});
  const [post, setPost] = useState([]);
  const [commentList, setCommentList] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [isPressed, setIsPressed] = useState(false);
  const [saveIsPressed, setSaveIsPressed] = useState(false);

  const windowWidth = Dimensions.get("window").width;

  const postUserId = route.params.user_id;
  const postId = route.params.id;
  const displayName = route.params.displayName;
  const userId = user.user_id;

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

  async function getComments() {
    const resp = await supabase
      .from("comments")
      .select("*")
      .eq("postId", postId);

    return resp.body;
  }

  const refreshFeed = async () => {
    const resp = await getComments();
    setCommentList(resp);
  };
  return (
    <View>
      <View style={{ top: 10, left: 10 }}>
        <Pressable>
          <Image
            style={{ height: 35, width: 35, borderRadius: 100 }}
            source={{ uri: item.profileimage }}
          />
          <Text
            style={{
              left: 40,
              bottom: 25,
              fontWeight: "500",
            }}
          >
            {item.username}
          </Text>
        </Pressable>
        <Text style={{ fontWeight: "700", paddingBottom: 10 }}>
          {item.title}
        </Text>
        <Text style={{ paddingBottom: 10, width: 400 }}>
          {item.description}
        </Text>
        <Text>{item.posted}</Text>

        <View style={{ top: 10 }}>
          <UserButtons
            isPressed={isPressed}
            setIsPressed={setIsPressed}
            saveIsPressed={saveIsPressed}
            setSaveIsPressed={setSaveIsPressed}
            item={item}
          />
          <FullSeperator />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  fullSeperator: {
    borderBottomColor: "#EDEDED",
    borderBottomWidth: 2.0,
    opacity: 7.8,
    width: 900,
    right: 10,
    top: 15,
    height: 3,
    paddingTop: 20,
  },
});
