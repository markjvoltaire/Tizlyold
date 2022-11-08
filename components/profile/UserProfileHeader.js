import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import React from "react";
import {
  SharedElement,
  createSharedElementStackNavigator,
} from "react-navigation-shared-element";

import { useUser } from "../../context/UserContext";

export default function UserProfileHeader({ item, navigation, userInfo }) {
  const { user } = useUser();

  return (
    <View style={{ alignSelf: "center" }}>
      <View style={{ alignSelf: "center" }}>
        <SharedElement id={item.id}>
          <Image
            style={{
              height: 35,
              width: 35,
              borderRadius: 100,
              bottom: 30,
            }}
            source={{ uri: user.profileimage }}
          />
        </SharedElement>
        <View style={{ bottom: 63, left: 40 }}>
          <Text style={{ fontWeight: "800" }}>{user.displayName}</Text>

          <Text
            style={{
              fontWeight: "600",
              color: "#A1A1B3",
            }}
          >
            @{user.username}
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({});
