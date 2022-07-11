import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  ScrollView,
} from "react-native";

import React from "react";

export default function PostFeedFlatList({ posts }) {
  console.log("posts", posts);

  return (
    <View style={styles.container}>
      <FlatList
        keyExtractor={(item) => item.id}
        data={posts}
        renderItem={({ item }) => (
          <View>
            <Text
              style={{
                fontWeight: "bold",
                fontSize: 20,
              }}
            >
              {item.DisplayName}
            </Text>
            <Text style={{ fontWeight: "600", color: "#73738B" }}>
              @{item.username}
            </Text>
            <Image
              style={{ height: 392, width: 343, borderRadius: 12 }}
              source={{ uri: item.media }}
            />
            <Text>{item.description}</Text>
            <Text>{item.category}</Text>
            <Image
              style={{
                position: "absolute",
                marginHorizontal: 35,
                borderRadius: 100,
                height: 137,
                width: 137,
                top: 53,
                right: 220,
              }}
              source={{ uri: item.profileImage }}
            />
          </View>
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
  },
});
