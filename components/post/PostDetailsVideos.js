import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { supabase } from "../../services/supabase";
import { Video, AVPlaybackStatus } from "expo-av";

export default function PostDetailsVideos({ creatorDisplayName, postUserId }) {
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

  return (
    <View style={styles.container}>
      <Text style={styles.header}> Videos By {creatorDisplayName} </Text>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-evenly",
          display: "flex",
          flexWrap: "wrap",

          width: 330,
        }}
      >
        {posts.map((post) => {
          return (
            <View>
              <TouchableOpacity>
                <Video
                  resizeMode="cover"
                  style={{
                    height: 102,
                    width: 164,
                    borderRadius: 6,
                  }}
                  source={{ uri: post.media }}
                />
                <Text>{post.title}</Text>
              </TouchableOpacity>
            </View>
          );
        })}
      </View>
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
