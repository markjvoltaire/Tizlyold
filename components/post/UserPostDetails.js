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
import Comment from "../../components/post/Comment";
import UserButtons from "../home/UserButtons";

export default function UserPostDetails({ post, commentList, route }) {
  const FullSeperator = () => <View style={styles.fullSeperator} />;
  const FullSeperator2 = () => <View style={styles.fullSeperator2} />;
  const [isPressed, setIsPressed] = useState(false);

  if (commentList.length === 0) {
    return (
      <View style={styles.container}>
        <View style={{ left: 10 }}>
          <Text style={styles.postTitle}>{post.title}</Text>
          <Text style={styles.postDescription}>{post.description}</Text>
          <Text style={styles.date}>{post.creatAt}</Text>
          <Image
            style={{
              top: 85,
              right: 350,
              height: 54,
              width: 64,
              resizeMode: "contain",
              position: "absolute",
            }}
            source={require("../../assets/blueVideoButton.png")}
          />
        </View>

        <UserButtons
          isPressed={isPressed}
          setIsPressed={setIsPressed}
          item={post}
        />

        <View>
          <Text style={styles.commentsHeader}>Comments</Text>
          <Text style={styles.commentsHeader}>Be the first to comment</Text>

          <FullSeperator />

          <View style={styles.commentSection}>
            <FlatList
              keyExtractor={(item) => item.id}
              data={commentList}
              contentContainerStyle={{
                borderBottomWidth: 0.8,
                borderBottomColor: "#EDEDED",
              }}
              renderItem={({ item }) => (
                <View>
                  <Image
                    style={{
                      height: 30,
                      width: 30,
                      borderRadius: 40,
                      bottom: 4,
                    }}
                    source={{ uri: item.userProfileImage }}
                  />
                  <View style={{ left: 35, bottom: 35 }}>
                    <Text style={{ fontWeight: "600" }}>
                      {item.userDisplayName}
                    </Text>
                    <Text
                      style={{
                        color: "#4F4E4E",
                        fontWeight: "500",
                        fontSize: 12,
                      }}
                    >
                      @{item.userUsername}
                    </Text>
                    <Text
                      style={{
                        right: 35,
                        fontWeight: "600",
                        paddingTop: 10,
                        paddingBottom: 10,
                      }}
                    >
                      {item.comment}
                    </Text>
                  </View>
                </View>
              )}
            />
          </View>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={{ left: 10, top: 10 }}>
        <Text style={styles.postTitle}>{post.title}</Text>
        <Text style={styles.postDescription}>{post.description}</Text>
        <Text style={styles.date}>{post.creatAt}</Text>
      </View>
      <Image
        style={{
          top: 85,
          right: 335,
          height: 54,
          width: 64,
          resizeMode: "contain",
          position: "absolute",
        }}
        source={require("../../assets/blueVideoButton.png")}
      />
      <View>
        <Text style={styles.commentsHeader}>Comments</Text>

        <FullSeperator />
        <View style={{ bottom: 20 }}>
          <UserButtons
            item={post}
            isPressed={isPressed}
            setIsPressed={setIsPressed}
          />
        </View>
        <View style={styles.commentSection}>
          <FlatList
            keyExtractor={(item) => item.id}
            data={commentList}
            contentContainerStyle={{
              borderBottomWidth: 0.8,
              borderBottomColor: "#EDEDED",
            }}
            renderItem={({ item }) => (
              <View>
                <Image
                  style={{ height: 30, width: 30, borderRadius: 40, bottom: 4 }}
                  source={{ uri: item.userProfileImage }}
                />
                <View style={{ left: 35, bottom: 35 }}>
                  <Text style={{ fontWeight: "600" }}>
                    {item.userDisplayName}
                  </Text>
                  <Text
                    style={{
                      color: "#4F4E4E",
                      fontWeight: "500",
                      fontSize: 12,
                    }}
                  >
                    @{item.userUsername}
                  </Text>
                  <Text
                    style={{
                      right: 35,
                      fontWeight: "600",
                      paddingTop: 10,
                      paddingBottom: 10,
                    }}
                  >
                    {item.comment}
                  </Text>
                </View>
              </View>
            )}
          />
        </View>
      </View>
    </View>
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
    top: 185,
    color: "#73738B",
    fontSize: 20,
    fontWeight: "600",
    paddingBottom: 70,
  },

  commentSection: {
    paddingTop: 160,
    left: 10,
    width: 405,
  },
  fullSeperator: {
    position: "absolute",
    alignSelf: "center",
    borderBottomColor: "grey",
    borderBottomWidth: StyleSheet.hairlineWidth,
    opacity: 0.5,
    width: 600,
    top: 165,
  },
});
