import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Button,
  Image,
  FlatList,
  KeyboardAvoidingView,
  TextInput,
  TouchableOpacity,
  Keyboard,
  ScrollView,
  Platform,
} from "react-native";
import React, { useState, useEffect } from "react";
import { SharedElement } from "react-navigation-shared-element";
import UserButtons from "../components/home/UserButtons";
import CommentList from "../components/post/CommentList";
import { useUser } from "../context/UserContext";
import { supabase } from "../services/supabase";
import { useLike } from "../context/LikeContext";
import HomePostButtons from "../components/home/HomePostButtons";

export default function ImageDetails({ navigation, route }) {
  const [refreshing, setRefreshing] = useState(false);
  const [commentList, setCommentList] = useState([]);
  const [isPressed, setIsPressed] = useState(false);
  const [saveIsPressed, setSaveIsPressed] = useState(false);
  const [comment, setComment] = useState("");
  const [commentProfilePics, setCommentProfilePics] = useState();
  const { item } = route.params;

  const FullSeperator = () => <View style={styles.fullSeperator} />;

  const { user, setUser } = useUser();
  const { like, setLike } = useLike();

  const postId = item.id;

  async function getCommentsProfilePics() {
    const resp = await supabase.from("profiles").select("user_id, username");

    return resp.body;
  }

  useEffect(() => {
    const getPics = async () => {
      const resp = await getCommentsProfilePics();
    };
    getPics();
  }, []);

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

  async function deleteComment(comment) {
    const resp = await supabase
      .from("comments")
      .delete()
      .eq("id", comment.id)
      .eq("userId", user.user_id);
  }

  return (
    <View style={{ flex: 1, top: 50, backgroundColor: "white" }}>
      <ScrollView style={{ backgroundColor: "white" }}>
        <SharedElement id={item.id}>
          <Image
            source={{ uri: item.media }}
            style={{
              height: 448,
              width: 400,
              alignSelf: "center",
              borderRadius: 10,
            }}
            resizeMode="cover"
          />
        </SharedElement>
        {/* <Image
          style={{
            alignSelf: "center",
            resizeMode: "stretch",
            height: 200,
            width: 398,
            top: 200,
            borderRadius: 12,
            position: "absolute",
          }}
          resizeMode="stretch"
          source={require("../assets/fader.png")}
        /> */}
        <TouchableOpacity onPress={() => navigation.goBack({ item: item })}>
          <Image
            style={styles.backButton}
            source={require("../assets/backButton2.png")}
          />
        </TouchableOpacity>
        <View style={{ position: "absolute", top: 370, left: 20 }}></View>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("ProfileDetail2", {
              user_id: item.user_id,
            });
          }}
          style={{ position: "absolute" }}
        >
          <View style={{ position: "absolute" }}>
            {/* <Image
              style={{
                height: 35,
                width: 35,
                borderRadius: 100,
                position: "absolute",
                left: 20,
                top: 330,
              }}
              source={{ uri: item.profileimage }}
            /> */}
          </View>
        </TouchableOpacity>
        <View>
          <Text
            style={{
              left: 15,
              top: 12,
              fontWeight: "700",
              color: "#4F4E4E",
              textAlign: "left",
              width: 390,
              paddingBottom: 30,
            }}
          >
            {item.description}
          </Text>

          <View>
            <Text style={{ left: 17, fontWeight: "500" }}>Photo</Text>
          </View>
        </View>

        <View style={{ paddingBottom: 60 }}>
          <Text style={styles.commentsHeader}>Comments</Text>

          <FullSeperator />
          {commentList.map((comment) => (
            <View
              style={{ left: 10, top: 40, paddingBottom: 20 }}
              key={comment.id}
            >
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

                  {comment.userId === user.user_id ? (
                    <View style={{ left: 270, bottom: 60 }}>
                      <TouchableOpacity
                        onPress={() =>
                          deleteComment(comment).then(() => refreshFeed())
                        }
                      >
                        <Image
                          style={{
                            resizeMode: "contain",
                            position: "absolute",
                            height: 23,
                          }}
                          source={require("../assets/Delete.png")}
                        />
                      </TouchableOpacity>
                    </View>
                  ) : null}
                </View>
              </View>
            </View>
          ))}
        </View>
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
    bottom: 40,
    borderTopColor: "#EDEDED",
    opacity: 7.8,
    borderTopWidth: 1.8,
    justifyContent: "space-around",
    backgroundColor: "white",
    position: "relative",
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
  fullSeperator: {
    position: "absolute",
    top: 40,
    alignSelf: "center",
    borderBottomColor: "grey",
    borderBottomWidth: StyleSheet.hairlineWidth,
    opacity: 0.5,
    width: 600,
  },
  commentsHeader: {
    alignSelf: "center",
    top: 65,
    color: "#73738B",
    fontSize: 15,
    fontWeight: "600",
    paddingBottom: 70,
  },
  backButton: {
    position: "absolute",
    resizeMode: "contain",
    width: 35,
    height: 50,
    left: 21,
    bottom: 340,
  },
});
