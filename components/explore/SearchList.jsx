import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  Animated,
} from "react-native";
import React from "react";

import { useUser } from "../../context/UserContext";

export default function SearchList({ item, navigation, isPressed, query }) {
  const { user, setUser } = useUser();
  const defaultImageAnimated = new Animated.Value(0);
  const handleDefaultImageLoad = () => {
    Animated.timing(defaultImageAnimated, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  return (
    <View style={{ marginBottom: 80 }}>
      <TouchableOpacity
        style={{ margin: 10 }}
        onPress={() => {
          user.user_id === item.user_id
            ? navigation.navigate("UserProfile2")
            : navigation.push("ProfileDetail2", {
                item,
              });
        }}
      >
        <View style={{ alignItems: "center" }}>
          <Animated.Image
            style={{
              width: 110,
              height: 116,
              borderRadius: 13,
              // opacity: defaultImageAnimated,
            }}
            // onLoad={handleDefaultImageLoad}
            source={
              item.profileimage === null
                ? require("../../assets/noProfilePic.jpeg")
                : { uri: item.profileimage }
            }
          />
          <Animated.Image
            style={{
              width: 110,
              height: 80,
              top: 37,
              borderRadius: 13,
              position: "absolute",
              // opacity: defaultImageAnimated,
            }}
            source={require("../../assets/fade1.png")}
            // onLoad={handleDefaultImageLoad}
          />
        </View>
        <Text
          style={{
            textAlign: "center",
            fontWeight: "700",
            top: 5,
            color: "white",
          }}
        >
          @{item.username}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({});
