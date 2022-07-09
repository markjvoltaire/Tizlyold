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
    <View style={{ position: "absolute" }}>
      {posts.map((post) => {
        return (
          <View style={styles.post} key={post.id}>
            <Image
              style={{
                marginHorizontal: 35,
                borderRadius: 100,
                height: 80,
                width: 80,
              }}
              source={{ uri: post.profileImage }}
            />
            <Text>{post.DisplayName}</Text>
            <Text>@{post.username}</Text>

            <Image
              style={{ height: 200, width: 200, borderRadius: 12 }}
              source={{ uri: post.media }}
            />

            <Text>{post.title}</Text>
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
