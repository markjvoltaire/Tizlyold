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



  const FullSeperator = () => <View style={styles.fullSeperator} />;

  const oneUser = ({ item }) => <Text>{item.username}</Text>;

  return (
    <View
      style={{
        position: "absolute",
        alignItems: "center",
      }}
    >
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
                top: 53,
                right: 220,
              }}
              source={{ uri: post.profileImage }}
            />
            <View>
              <Text
                style={{
                  fontWeight: "bold",
                  fontSize: 20,
                }}
              >
                {post.DisplayName}
              </Text>
            </View>
            <Text style={{ fontWeight: "600", color: "#73738B" }}>
              @{post.username}
            </Text>

            <Image
              style={{ height: 392, width: 343, borderRadius: 12 }}
              source={{ uri: post.media }}
            />

            <Text style={{ fontWeight: "800" }}>{post.title}</Text>
            <Text>{post.description}</Text>
            <Text>{post.category}</Text>
            <FullSeperator />
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  post: {
    top: 360,
    padding: 50,
    alignItems: "center",
  },
  fullSeperator: {
    position: "absolute",
    borderBottomColor: "grey",
    borderBottomWidth: 3.8,
    opacity: 0.2,
    width: 900,
    left: 1,
    top: 470,
  },
});
