import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Button,
  Image,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  FlatList,
} from "react-native";
import React, { useState, useEffect } from "react";
import { Video, AVPlaybackStatus } from "expo-av";
import PostNavigator from "../components/post/PostNavigator";
import PostDetailButtons from "../components/post/PostDetailButtons";
import { supabase } from "../services/supabase";
import UserPostDetails from "../components/post/UserPostDetails";
import VideoHeader from "../components/post/VideoHeader";
import BottomTabNavigator from "../navigation/TabNavigator";
import Comment from "../components/post/Comment";
import BottomNav from "../navigation/BottomNav";

export default function Player({ route, navigation }) {
  const video = React.useRef(null);
  const [status, setStatus] = useState({});
  const [post, setPost] = useState([]);
  const [commentList, setCommentList] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const windowWidth = Dimensions.get("window").width;

  const postUserId = route.params.user_id;
  const postId = route.params.id;
  const displayName = route.params.displayName;

  const FullSeperator = () => <View style={styles.fullSeperator} />;

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

  useEffect(() => {
    const getPostComments = async () => {
      const resp = await getComments();
      setCommentList(resp);
    };
    getPostComments();
  }, []);

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
    <View style={{ backgroundColor: "white", flex: 1 }}>
      <VideoHeader navigation={navigation} route={route} />
      <View>
        {post.map((item) => {
          return (
            <View key={item.id} style={{ top: 80, position: "absolute" }}>
              <Video
                source={{ uri: item.media }}
                useNativeControls
                shouldPlay={true}
                style={{ height: 229, width: 415 }}
              />
            </View>
          );
        })}
      </View>
      <View style={{ top: 165, flex: 1, marginVertical: 150 }}>
        <FlatList
          refreshing={refreshing}
          onRefresh={() => refreshFeed()}
          keyExtractor={(item) => item.id}
          data={post}
          renderItem={({ item }) => (
            <UserPostDetails
              displayName={displayName}
              postUserId={postUserId}
              navigation={navigation}
              post={item}
              commentList={commentList}
              route={route}
            />
          )}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
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

// <Image
// style={styles.logo}
// source={require("../assets/tizlyicon.jpg")}
// />
// <FullSeperator />
// </View>
// <Image
// style={{
// position: "absolute",
// width: 100,
// height: 80,
// resizeMode: "contain",
// top: 120,
// left: 300,
// }}
// source={require("../assets/goToProfile.png")}
// />
// <View>
