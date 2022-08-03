import {
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
} from "react-native";
import React, { useEffect, useState } from "react";
import { supabase } from "../../services/supabase";
import { Video, AVPlaybackStatus } from "expo-av";

export default function PostDetailsVideos({ displayName, postUserId }) {
  const video = React.useRef(null);
  const [status, setStatus] = React.useState({});
  const [posts, setPost] = useState([]);
  async function getPosts() {
    const resp = await supabase
      .from("post")
      .select("*")
      .eq("mediaType", "video")
      .eq("user_id", postUserId)

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

  console.log("postUserId", postUserId);

  return (
    <View style={styles.container}>
      <Text style={styles.header}> Videos By {displayName} </Text>
      <FlatList
        keyExtractor={(item) => item.id}
        data={posts}
        initialNumToRender={4}
        renderItem={({ item }) => (
          <View>
            <Video
              style={{ height: 100 }}
              resizeMode="cover"
              source={{ uri: item.media }}
            />
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "absolute",
    top: 70,
  },
  header: {
    fontWeight: "800",
    color: "#4F4E4E",
    alignSelf: "center",
  },
});
