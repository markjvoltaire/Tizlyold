import { StyleSheet, Text, View, Dimensions, Image } from "react-native";
import React from "react";

export default function PostUserInfo({ profile }) {
  const width = Dimensions.get("window").width;
  let height = Dimensions.get("window").height;
  return (
    <View
      style={{ alignSelf: "center", top: height * 0.04, right: width * 0.05 }}
    >
      <Image
        style={{
          height: 35,
          width: 35,
          borderRadius: 100,
          bottom: 30,
        }}
        source={{ uri: profile.profileimage }}
      />

      <View style={{ bottom: 63, left: 40 }}>
        <Text style={{ fontWeight: "800" }}>{profile.displayName}</Text>
        <Text
          style={{
            fontWeight: "600",
            color: "#A1A1B3",
          }}
        >
          @{profile.username}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({});
