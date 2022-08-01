import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  TextInput,
} from "react-native";
import React, { useEffect, useState } from "react";
import TopHeader from "../components/TopHeader";
import { supabase } from "../services/supabase";
import { useUser } from "../context/UserContext";
import { editPost } from "../services/supabase";
import { getCurrentUserPosts } from "../services/user";

export default function EditPost({ route, navigation }) {
  const [title, setTitle] = useState(route.params.title);
  const [description, setDescription] = useState(route.params.description);
  const [post, setPost] = useState([]);

  async function getCurrentUserPosts() {
    let { data: post, error } = await supabase
      .from("post")
      .select("*")
      .eq("id", route.params.id);
    return post;
  }

  async function updatePost() {
    const { data, error } = await supabase
      .from("post")
      .update({ description: description, title: title })
      .eq("id", route.params.id);
  }

  async function deletePost() {
    const { data, error } = await supabase
      .from("post")
      .delete()
      .eq("id", route.params.id);
  }

  useEffect(() => {
    const getPost = async () => {
      const resp = await getCurrentUserPosts();
      setPost(resp);
    };
    getPost();
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <TopHeader />

      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Image
          style={styles.backButton}
          source={require("../assets/backButton.png")}
        />
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() =>
          updatePost(title, description).then(() => navigation.goBack())
        }
      >
        <Image
          style={{
            height: 25,
            resizeMode: "contain",
            position: "absolute",
            left: 150,
            top: 17,
          }}
          source={require("../assets/saveChanges.png")}
        />
      </TouchableOpacity>

      <View>
        <TouchableOpacity
          onPress={() => deletePost().then(() => navigation.goBack())}
        >
          <Image
            style={{
              top: 550,
              alignSelf: "center",
              position: "absolute",
              resizeMode: "contain",
              width: 210,
            }}
            source={require("../assets/deletePost.png")}
          />
        </TouchableOpacity>
      </View>

      <Text
        style={{
          fontWeight: "600",
          alignSelf: "center",
          top: 18,
          fontSize: 20,
        }}
      >
        Edit Post
      </Text>
      <View style={{ alignItems: "center", top: 80 }}>
        {post.map((item) => {
          return (
            <Image
              source={{ uri: item.media }}
              style={{
                height: 220,
                width: 220,
                borderRadius: 12,
                position: "absolute",
              }}
            />
          );
        })}
        <View style={{ bottom: 30 }}>
          <TextInput
            style={{
              top: 300,
              borderRadius: 25,
              borderColor: "grey",
              borderWidth: 0.5,
              width: 311,
              height: 50,
              paddingLeft: 30,
            }}
            value={title}
            onChangeText={(text) => setTitle(text)}
          />

          <TextInput
            style={{
              top: 320,
              borderRadius: 25,
              borderColor: "grey",
              borderWidth: 0.5,
              width: 311,
              height: 150,
              paddingLeft: 30,
            }}
            value={description}
            onChangeText={(text) => setDescription(text)}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  backButton: {
    position: "absolute",
    width: 20,
    height: 20,
    left: 30,
    top: 20,
  },
});
