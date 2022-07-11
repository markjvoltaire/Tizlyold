import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  ScrollView,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
} from "react-native";

import { useFonts } from "expo-font";
import Header from "../home/Header";

import React from "react";

export default function PostFeedFlatList({ posts, route, navigation }) {
  const FullSeperator = () => <View style={styles.fullSeperator} />;

  console.log("posts", posts);

  return (
    <View
      style={{ backgroundColor: "#FFFFFF", top: 200, paddingBottom: 100 }}
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
    >
      <FlatList
        keyExtractor={(item) => item.id}
        data={posts}
        contentContainerStyle={{
          borderBottomWidth: 0.8,
          borderBottomColor: "#EDEDED",
          paddingTop: 8,
        }}
        renderItem={({ item }) => (
          <>
            <View style={{ paddingBottom: 60, alignItems: "center" }}>
              <FullSeperator />
              <View style={{ alignItems: "center", top: 10 }}>
                <View style={{ alignItems: "flex-start" }}>
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate("ProfileDetail", {
                        id: item.user_id,
                        username: item.username,
                        email: item.email,
                        profileimage: item.profileimage,
                        bannerImage: item.bannerImage,
                        bio: item.bio,
                        displayName: item.displayName,
                        path: item.username,
                      })
                    }
                    style={{ alignItems: "flex-start" }}
                  >
                    <Text
                      style={{
                        fontWeight: "bold",
                        fontSize: 20,
                        textAlign: "center",
                      }}
                    >
                      {item.DisplayName}
                    </Text>
                    <Text
                      style={{
                        fontWeight: "600",
                        color: "#73738B",
                        textAlign: "center",
                      }}
                    >
                      @{item.username}
                    </Text>
                    <Image
                      style={{
                        borderRadius: 100,
                        height: 37,
                        width: 37,
                        right: 40,
                        bottom: 36,
                      }}
                      source={{ uri: item.profileImage }}
                    />
                  </TouchableOpacity>
                </View>
              </View>
              <View>
                <Image
                  style={{
                    height: 392,
                    width: 343,
                    borderRadius: 12,
                  }}
                  source={{ uri: item.media }}
                />

                <View style={{ top: 10 }}>
                  <Text
                    style={{
                      fontWeight: "800",
                      fontSize: 12,
                      paddingBottom: 12,
                    }}
                  >
                    {item.title}
                  </Text>

                  <Text
                    style={{
                      fontWeight: "400",
                      color: "#5C5C5C",
                      fontfamily: "Work Sans",
                    }}
                  >
                    {item.description}
                  </Text>
                </View>
              </View>
            </View>
          </>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 30,
  },
  fullSeperator: {
    borderBottomColor: "#EDEDED",
    borderBottomWidth: 2.0,
    opacity: 0.8,
    width: 900,
    left: 1,
    bottom: 10,
    height: 3,
  },
});
