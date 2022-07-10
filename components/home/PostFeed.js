import { StyleSheet, Text, View, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { useUser } from "../../context/UserContext";
import { getPosts } from "../../services/user";

export default function PostFeed({ posts }) {
  const { user, setUser } = useUser();
  const [userPost, setuserPost] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getUserPost = async () => {
      const resp = await getPosts();
      setuserPost(resp);
      setLoading(false);
    };
    getUserPost();
  }, []);

  if (loading) {
    return <Text> loading</Text>;
  }

  //   const posts = userPost.body;
  console.log("postsFeed", posts);

  const FullSeperator = () => <View style={styles.fullSeperator} />;

  return (
    <View style={{ position: "absolute", left: 60 }}>
      {posts.map((post) => {
        return (
          <View style={styles.post} key={post.id}>
            <Image
              style={{
                position: "absolute",
                marginHorizontal: 35,
                borderRadius: 100,
                height: 37,
                width: 37,
                top: 50,
                right: 150,
              }}
              source={{ uri: post.profileImage }}
            />
            <Text style={{ fontWeight: "bold", fontSize: 20 }}>
              {post.DisplayName}
            </Text>
            <Text
              style={{ fontWeight: "600", color: "#73738B", paddingBottom: 10 }}
            >
              @{post.username}
            </Text>

            <Image
              style={{ height: 200, width: 200, borderRadius: 12 }}
              source={{ uri: post.media }}
            />

            <Text style={{ fontWeight: "800" }}>{post.title}</Text>
            <Text>{post.description}</Text>
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  post: {
    padding: 50,
    alignItems: "center",
  },
});
