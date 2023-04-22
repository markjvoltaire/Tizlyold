import { StyleSheet, Text, View, Dimensions } from "react-native";
import React, { useState, useEffect } from "react";
import { supabase } from "../../services/supabase";
import Paywall from "./Paywall";
import ProfileHomeView from "./ProfileHomeView";
import ProfileFeedList from "./ProfileFeedList";

export default function HomeTab({
  posts,
  profile,
  freePosts,
  textCount,
  videoCount,
  photoCount,
  navigation,
  isFollowing,
}) {
  let height = Dimensions.get("window").height;
  let width = Dimensions.get("window").width;

  if (posts.length && freePosts.length === 0) {
    return (
      <View key={posts.id}>
        <Text style={{ alignSelf: "center" }}>
          {profile.username} Hasn't Uploaded Any Content Yet
        </Text>
      </View>
    );
  }

  if (freePosts.length === 0) {
    return (
      <>
        <Text
          style={{
            alignSelf: "center",
            bottom: height * 0.1,
            fontWeight: "700",
          }}
        >
          This Is For Subscribers Only
        </Text>

        <Paywall
          textCount={textCount}
          videoCount={videoCount}
          photoCount={photoCount}
        />
      </>
    );
  }

  if (freePosts.length > 0) {
    return (
      <ProfileFeedList
        isFollowing={isFollowing}
        profile={profile}
        navigation={navigation}
        freePosts={freePosts}
      />
    );
  }
}

const styles = StyleSheet.create({});
