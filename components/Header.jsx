import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  SafeAreaView,
  Image,
  TouchableOpacity,
  Modal,
} from "react-native";
import React from "react";
import { useUser } from "../context/UserContext";

export default function Header() {
  const { user, setUser } = useUser();
  let height = Dimensions.get("window").height;
  let width = Dimensions.get("window").width;

  return (
    <SafeAreaView
      style={{
        height: height * 0.08,
        borderBottomColor: "     #8D8D8D",
        borderBottomWidth: 0.17,
        backgroundColor: "black",
      }}
    >
      <View style={{ alignSelf: "center", bottom: height * 0.045 }}>
        <Image
          resizeMode="contain"
          style={{
            width: width * 0.12,
          }}
          source={require("../assets/Tizlymed.png")}
        />
      </View>

      <View style={{ bottom: height * 0.07, left: width * 0.03 }}>
        <Text
          style={{
            bottom: height * 0.054,
            fontWeight: "600",
            color: "#8D8D8D",
          }}
        >
          Hello {user.username}
        </Text>
        <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
          <Image
            style={{
              width: width * 0.09,
              aspectRatio: 1,
              borderRadius: 100,
              left: 340,
              bottom: height * 0.09,
            }}
            source={{ uri: user.profileimage }}
          />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});
