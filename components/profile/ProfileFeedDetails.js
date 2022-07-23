import { StyleSheet, Text, View, FlatList } from "react-native";
import React, { useState, useEffect } from "react";
import { supabase } from "../../services/supabase";

export default function ProfileFeedDetails({ userId, userPosts, posts }) {
  const [refreshing, setRefreshing] = useState(false);

  async function getCurrentUserPosts() {
    const resp = await supabase
      .from("post")
      .select("*")
      .eq("user_id", userId)
      .order("id", { ascending: false });

    return resp;
  }

  //   useEffect(() => {
  //     return () => {
  //       const getUserPost = async () => {
  //         const resp = await getCurrentUserPosts();
  //         setUserPosts(resp);
  //       };
  //       getUserPost();
  //     };
  //   }, []);

  return (
    <View>
      <Text>yooo</Text>
    </View>
  );
}

const styles = StyleSheet.create({});
