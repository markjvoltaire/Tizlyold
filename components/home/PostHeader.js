import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import React from "react";
import {
  SharedElement,
  createSharedElementStackNavigator,
} from "react-navigation-shared-element";

import { useUser } from "../../context/UserContext";

export default function PostHeader({ item, navigation }) {
  const { user, setUser } = useUser();

  return (
    <TouchableOpacity
      onPress={() => navigation.push("ProfileDetail2", { item })}
    >
      <SharedElement id={item.id}>
        <Image
          style={{
            height: 35,
            width: 35,
            borderRadius: 100,
            bottom: 30,
          }}
          source={{ uri: item.profileimage }}
        />
      </SharedElement>
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
  );
}

const styles = StyleSheet.create({});
