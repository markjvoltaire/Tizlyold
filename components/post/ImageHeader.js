import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import React from "react";

export default function ImageHeader({ userInfo, navigation }) {
  return (
    <View>
      {userInfo.map((item) => (
        <View key={item.id}>
          <View style={{ alignSelf: "center" }}>
            <TouchableOpacity
              onPress={() => navigation.push("ProfileDetail2", { item })}
            >
              <Image
                style={{
                  height: 35,
                  width: 35,
                  borderRadius: 100,
                  bottom: 30,
                }}
                source={{ uri: item.profileimage }}
              />

              <View style={{ bottom: 63, left: 40 }}>
                <Text style={{ fontWeight: "800" }}>{item.displayName}</Text>
                <Text
                  style={{
                    fontWeight: "600",
                    color: "#A1A1B3",
                  }}
                >
                  @{item.username}
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      ))}
    </View>
  );
}

{
  /* <View>
  <View style={{ alignSelf: "center" }}>
    <TouchableOpacity
      onPress={() => navigation.push("ProfileDetail2", { item })}
    >
<Image
  style={{
    height: 35,
    width: 35,
    borderRadius: 100,
    bottom: 30,
  }}
  source={{ uri: userInfo.profileimage }}
/>

      <View style={{ bottom: 63, left: 40 }}>
        <Text style={{ fontWeight: "800" }}>{userInfo.displayName}</Text>
        <Text
          style={{
            fontWeight: "600",
            color: "#A1A1B3",
          }}
        >
          @{userInfo.username}
        </Text>
      </View>
    </TouchableOpacity>
  </View>
</View> */
}

const styles = StyleSheet.create({});
