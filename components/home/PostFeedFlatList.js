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

import React, { useEffect, useState } from "react";
import { supabase } from "../../services/supabase";

export default function PostFeedFlatList({ posts, route, navigation }) {
  const FullSeperator = () => <View style={styles.fullSeperator} />;
  const [refreshing, setRefreshing] = useState();
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    const resp = await supabase.from("post").select("*");
    return resp;
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <View
        style={{
          backgroundColor: "white",
          top: 200,
        }}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        refreshing={loading}
      >
        <FlatList
          keyExtractor={(item) => item.id}
          data={posts}
          initialNumToRender={4}
          contentContainerStyle={{
            borderBottomWidth: 0.8,
            borderBottomColor: "#EDEDED",
          }}
          renderItem={({ item }) => (
            <>
              <View style={{ paddingBottom: 100, alignItems: "center" }}>
                <FullSeperator />
                <View style={{ alignItems: "center", top: 19 }}>
                  <View style={{ alignItems: "flex-start" }}>
                    <TouchableOpacity style={{ alignItems: "flex-start" }}>
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
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
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
