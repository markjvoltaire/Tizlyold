import { Image, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { supabase } from "../../services/supabase";

export default function PostDetailsPhotos({ creatorDisplayName, postUserId }) {
  const [posts, setPost] = useState([]);

  async function getPhotoPosts() {
    const resp = await supabase
      .from("post")
      .select("*")
      .eq("mediaType", "image")
      .eq("user_id", postUserId)

      .order("id", { ascending: false });
    return resp.body;
  }

  console.log("posts", posts);

  useEffect(() => {
    const getUserPost = async () => {
      const resp = await getPhotoPosts();
      setPost(resp);
    };
    getUserPost();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Photos By {creatorDisplayName}</Text>
      <View style={{ flexDirection: "row" }}>
        {posts.map((post) => {
          return (
            <View key={post.id}>
              <Image
                style={{ width: 112, height: 166 }}
                source={{ uri: post.media }}
              />
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
    textAlign: "center",
  },
});
