import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  TextInput,
  TouchableOpacity,
  Keyboard,
  ScrollView,
  Platform,
  Image,
} from "react-native";
import React, { useState, useEffect } from "react";
import { supabase } from "../services/supabase";
import { useUser } from "../context/UserContext";

export default function CommentScreen({ route, navigation }) {
  const [comment, setComment] = useState("");
  const [commentList, setCommentList] = useState([]);
  const FullSeperator = () => <View style={styles.fullSeperator} />;
  const FullSeperatorTwo = () => <View style={styles.fullSeperatorTwo} />;

  const { item } = route.params;

  const { user, setUser } = useUser();

  const postId = item.id;

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

  async function createComment() {
    const resp = await supabase.from("comments").insert([
      {
        creatorId: item.user_id,
        userId: user.user_id,
        comment: comment,
        userProfileImage: user.profileimage,
        postId: item.id,
        userDisplayName: user.displayName,
        userUsername: user.username,
      },
    ]);

    return resp;
  }

  const refreshFeed = async () => {
    const resp = await getComments();
    setCommentList(resp);
  };

  useEffect(() => {
    const getPostComments = async () => {
      const resp = await getComments();

      setCommentList(resp);
    };

    getPostComments();
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <SafeAreaView>
        <View style={{ width: 350, alignSelf: "center" }}>
          {/* <Image
            style={{ height: 60, width: 60, borderRadius: 100 }}
            source={{ uri: item.profileimage }}
          /> */}

          <View style={{ position: "absolute", alignSelf: "center", top: 30 }}>
            {/* <Text
              style={{
                fontWeight: "700",
                fontSize: 15,
                color: "#4F4E4E",
              }}
            >
              {item.title}
            </Text>
            <Text>{item.description}</Text> */}
          </View>
        </View>

        <FullSeperatorTwo />
        <Text style={{ alignSelf: "center", fontWeight: "700" }}>
          {item.title}
        </Text>
        <Text style={{ alignSelf: "center", fontWeight: "400" }}>
          @{item.username}
        </Text>
      </SafeAreaView>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Image
          style={styles.backButton}
          source={require("../assets/backButton2.png")}
        />
      </TouchableOpacity>
      <ScrollView>
        <FullSeperator />
        {commentList.map((comment) => (
          <View style={{ top: 30, left: 10 }} key={comment.id}>
            <View>
              <Image
                style={{ height: 30, width: 30, borderRadius: 40, bottom: 4 }}
                source={{ uri: comment.userProfileImage }}
              />
              <View style={{ left: 35, bottom: 35 }}>
                <Text style={{ fontWeight: "600" }}>
                  {comment.userDisplayName}
                </Text>
                <Text
                  style={{
                    color: "#4F4E4E",
                    fontWeight: "500",
                    fontSize: 12,
                  }}
                >
                  @{comment.userUsername}
                </Text>
                <Text
                  style={{
                    right: 35,
                    fontWeight: "600",
                    paddingTop: 10,
                    paddingBottom: 10,
                  }}
                >
                  {comment.comment}
                </Text>
              </View>
            </View>
          </View>
        ))}
      </ScrollView>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
      >
        <View style={styles.inner}>
          <TextInput
            autoCapitalize="none"
            autoCorrect={true}
            placeholder="Leave A Comment"
            value={comment}
            onChangeText={(text) => setComment(text)}
            style={styles.commentInput}
          />
          <View
            style={{
              position: "absolute",
              top: 207,
              left: 80,
              backgroundColor: "white",
            }}
          >
            <TouchableOpacity
              onPress={() =>
                createComment()
                  .then(() => refreshFeed().then(() => Keyboard.dismiss()))
                  .then(() => setComment())
              }
            >
              <Image
                style={{
                  width: 100,
                  bottom: 117,
                  left: 200,
                  resizeMode: "contain",

                  position: "absolute",
                }}
                source={require("../assets/commentPost.png")}
              />
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
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
    height: 40,
    width: 40,
    left: 20,
    bottom: 40,
  },
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
  fullSeperatorTwo: {
    borderBottomColor: "#EDEDED",
    borderBottomWidth: 2.0,
    opacity: 1.8,
    width: 900,
    top: 50,
  },
});
