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
} from "react-native";
import React, { useState, useEffect } from "react";
import { supabase } from "../../services/supabase";
import { Video, AVPlaybackStatus } from "expo-av";

export default function UserPostDetails({ post }) {
  const FullSeperator = () => <View style={styles.fullSeperator} />;

  console.log("post", post);

  return (
    <View style={styles.container}>
      <View style={{ left: 10 }}>
        <Text style={styles.postTitle}>{post.title}</Text>
        <Text style={styles.postDescription}>{post.description}</Text>
        <Text style={styles.date}>{post.creatAt}</Text>
        <Image
          style={{ height: 20, resizeMode: "contain", top: 50, right: 165 }}
          source={{ uri: post.category }}
        />
      </View>

      <View style={styles.userButtonsContainer}>
        <View>
          <TouchableOpacity>
            <Image
              style={{
                height: 52,
                width: 112,
              }}
              source={require("../../assets/likeButton.png")}
            />
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity>
            <Image
              style={{
                height: 52,
                width: 112,
              }}
              source={require("../../assets/commentButton.png")}
            />
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity>
            <Image
              style={{
                height: 52,
                width: 112,
              }}
              source={require("../../assets/saveButton.png")}
            />
          </TouchableOpacity>
        </View>
      </View>
      <View>
        <Text style={styles.commentsHeader}>Comments</Text>
        <FullSeperator />
        <View style={styles.commentSection}>
          <Text>hello</Text>
          <Text>hello</Text>
          <Text>hello</Text>
          <Text>hello</Text>
          <Text>hello</Text>
          <Text>hello</Text>
          <Text>hello</Text>
          <Text>hello</Text>
          <Text>hello</Text>
          <Text>hello</Text>
          <Text>hello</Text>
          <Text>hello</Text>
          <Text>hello</Text>
          <Text>hello</Text>
          <Text>hello</Text>
          <Text>hello</Text>
          <Text>hello</Text>
          <Text>hello</Text>
          <Text>hello</Text>
          <Text>hello</Text>
          <Text>hello</Text>
          <Text>hello</Text>
          <Text>hello</Text>
          <Text>hello</Text>
          <Text>hello</Text>
          <Text>hello</Text>
          <Text>hello</Text>
          <Text>bottom</Text>
          <Text>bottom</Text>
          <Text>YUPP</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  userButtonsContainer: {
    position: "absolute",
    top: 140,
    flexDirection: "row",
    display: "flex",
    justifyContent: "space-evenly",

    alignSelf: "center",
  },

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
    fontWeight: "400",
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
    top: 155,
    color: "#73738B",
    fontSize: 20,
    fontWeight: "600",
  },
  fullSeperator: {
    borderBottomColor: "#EDEDED",
    borderBottomWidth: 3.0,
    opacity: 1.8,
    width: 900,
    left: 1,
    top: 115,
    height: 3,
  },
  commentSection: {
    alignItems: "center",
    paddingTop: 170,
  },
});
