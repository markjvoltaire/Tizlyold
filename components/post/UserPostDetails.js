import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Button,
  TouchableOpacity,
  Image,
  FlatList,
  ScrollView,
  Dimensions,
} from "react-native";
import React, { useState, useEffect } from "react";
import { supabase } from "../../services/supabase";
import { Video, AVPlaybackStatus } from "expo-av";
import Comment from "../../components/post/Comment";
import UserButtons from "../home/UserButtons";
import CommentList from "./CommentList";

export default function UserPostDetails({
  post,
  commentList,
  route,
  commenter,
  navigation,
}) {
  let height = Dimensions.get("window").height;
  let width = Dimensions.get("window").width;
  const FullSeperator = () => (
    <View
      style={{
        position: "absolute",
        alignSelf: "center",
        borderBottomColor: "grey",
        borderBottomWidth: StyleSheet.hairlineWidth,
        opacity: 0.5,
        width: 600,
        top: height * 0.25,
      }}
    />
  );
  const FullSeperator2 = () => <View style={styles.fullSeperator2} />;
  const [isPressed, setIsPressed] = useState(false);
  const [saveIsPressed, setSaveIsPressed] = useState(false);

  const { item } = route.params;

  async function getProfilePic() {
    const respon = commentList;
    const list = respon.map((item) => item.userId);
    const data = await supabase
      .from("profiles")
      .select("*")
      .in("user_id", [list]);

    return data;
  }

  useEffect(() => {
    const getImage = async () => {
      const res = await getProfilePic();
    };
    getImage();
  }, []);

  return (
    <>
      <View style={{ flex: 1, left: 10 }}>
        <View>
          <Text style={{ fontWeight: "600", fontSize: 18 }}>
            {post.description}
          </Text>
        </View>

        <View>
          <View style={{ top: 20 }}>
            <TouchableOpacity
              onPress={() => navigation.push("ProfileDetail", { item })}
            >
              <Image
                style={{
                  height: 30,
                  width: 30,
                  borderRadius: 100,
                  position: "absolute",
                }}
                source={{ uri: post.profileimage }}
              />
              <View style={{ left: 40 }}>
                <Text style={{ fontWeight: "500" }}>{post.displayName}</Text>
                <Text style={{ fontWeight: "400", color: "#A1A1B3" }}>
                  @{post.username}
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>

        <FullSeperator />
        <View style={{ top: 50 }}></View>
        <View style={{ top: 60 }}>
          <CommentList
            item={post}
            navigation={navigation}
            commentList={commentList}
            isPressed={isPressed}
            setIsPressed={setIsPressed}
            saveIsPressed={saveIsPressed}
            setSaveIsPressed={setSaveIsPressed}
          />
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  header: {
    fontWeight: "800",
    color: "#4F4E4E",
    alignSelf: "center",
    top: 80,
  },
  header2: {
    fontWeight: "800",
    color: "#4F4E4E",
    alignSelf: "center",
  },
  backButton: {
    height: 20,
    width: 20,
    bottom: 100,
  },
  postTitle: {
    fontWeight: "600",
    fontSize: 18,
  },
  postDescription: {
    fontWeight: "300",
    fontSize: 14,
    top: 10,
    position: "relative",
  },
  date: {
    top: 28,
    fontSize: 12,
    color: "#A1A1A3",
  },
  commentsHeader: {
    alignSelf: "center",
    top: 95,
    color: "#73738B",
    fontSize: 20,
    fontWeight: "600",
    paddingBottom: 70,
    position: "absolute",
  },

  commentSection: {
    paddingTop: 100,
    paddingBottom: 100,
    left: 10,
    width: 405,
    top: 20,
  },
  fullSeperator: {
    position: "absolute",
    alignSelf: "center",
    borderBottomColor: "grey",
    borderBottomWidth: StyleSheet.hairlineWidth,
    opacity: 0.5,
    width: 600,
    top: 145,
  },
});
