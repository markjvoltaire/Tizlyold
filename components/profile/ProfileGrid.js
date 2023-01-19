import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Paywall from "./Paywall";
import HomeTab from "./HomeTab";
import SubTab from "./SubTab";

export default function ProfileGrid({
  nav,
  subStatus,
  textCount,
  videoCount,
  photoCount,
  posts,
  profile,
  freePosts,
  navigation,
  isFollowing,
}) {
  if (nav === "Home") {
    return (
      <View>
        {freePosts.length === 0 ? (
          <View>
            <Paywall
              textCount={textCount}
              videoCount={videoCount}
              photoCount={photoCount}
            />
          </View>
        ) : (
          <HomeTab
            isFollowing={isFollowing}
            textCount={textCount}
            videoCount={videoCount}
            photoCount={photoCount}
            freePosts={freePosts}
            profile={profile}
            posts={posts}
            navigation={navigation}
          />
        )}
      </View>
    );
  }

  if (nav === "Subscribers") {
    return (
      <View>
        {subStatus === false ? (
          <View>
            <Paywall
              textCount={textCount}
              videoCount={videoCount}
              photoCount={photoCount}
            />
          </View>
        ) : (
          <SubTab profile={profile} posts={posts} navigation={navigation} />
        )}
      </View>
    );
  }

  if (nav === "Shop") {
    return <Text style={{ alignSelf: "center" }}>{nav}</Text>;
  }
}

const styles = StyleSheet.create({});
