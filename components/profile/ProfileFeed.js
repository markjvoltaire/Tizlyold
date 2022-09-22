import {
  FlatList,
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
} from "react-native";
import React from "react";
import UserButtons from "../../components/home/UserButtons";
import ProfileUserButtons from "../home/ProfileUserButtons";

export default function ProfileFeed({ userPosts }) {




  
  const FullSeperator = () => <View style={styles.fullSeperator} />;
  return (
    <View style={styles.feedContainer}>
      {userPosts.map((post) => {
        return (
          <View
            key={post.id}
            style={{ top: 80, paddingBottom: 660, alignItems: "center" }}
          >
            <View
              style={{
                alignItems: "center",
                position: "absolute",
              }}
            >
              <Image
                style={{
                  height: 30,
                  width: 30,
                  borderRadius: 100,
                  right: 20,
                  position: "absolute",
                }}
                source={{ uri: post.profileImage }}
              />
              <Text
                style={{
                  fontWeight: "600",
                  fontSize: 16,
                  left: -8,

                  position: "absolute",
                }}
              >
                {post.displayName}
              </Text>
              <Text
                style={{
                  position: "absolute",
                  left: -8,
                  fontWeight: "500",
                  fontSize: 12,
                  color: "#73738B",
                  top: 16,
                }}
              >
                @{post.username}
              </Text>
            </View>
            <View style={{ top: 40, position: "absolute" }}>
              <Image
                style={{ height: 392, width: 343, borderRadius: 12, top: 11 }}
                source={{ uri: post.media }}
              />
              <Text style={{ top: 20, fontWeight: "800", fontSize: 15 }}>
                {post.title}
              </Text>
              <Text style={{ top: 29, fontWeight: "600", color: "#5F5F69" }}>
                {post.description}
              </Text>
              <Image
                style={{
                  height: 54,
                  width: 64,
                  resizeMode: "contain",
                  position: "absolute",
                  top: 457,
                }}
                source={{ uri: post.category }}
              />
              <View style={styles.engagementButtons}>
                <ProfileUserButtons />
              </View>
            </View>
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  feedContainer: {
    alignItems: "center",
    bottom: 480,
  },
  postHeaders: {
    alignItems: "center",
  },
  fullSeperator: {
    position: "absolute",

    borderBottomColor: "grey",
    borderBottomWidth: 1.8,
    opacity: 0.2,
    width: 600,

    top: 100,
  },
  engagementButtons: {
    bottom: 17,
    right: 10,
  },
});
