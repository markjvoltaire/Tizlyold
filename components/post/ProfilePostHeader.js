import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Dimensions,
} from "react-native";
import React from "react";

export default function ProfilePostHeader({ item }) {
  const height = Dimensions.get("window").height;
  const width = Dimensions.get("window").width;

  return (
    <>
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
      </View>
    </>
  );
}

const styles = StyleSheet.create({});
