import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React from "react";
import HomeBoard from "../home/HomeBoard";
import TrendingCreators from "./TrendingCreators";
import NewToTizly from "./NewToTizly";
import { useUser } from "../../context/UserContext";

export default function SearchList({ item, navigation, isPressed, query }) {
  const { user, setUser } = useUser();

  console.log("user", user);
  console.log("item", item);

  return (
    <View>
      <TouchableOpacity
        style={{ margin: 10 }}
        onPress={() => {
          user.user_id === item.user_id
            ? navigation.navigate("UserProfile2")
            : navigation.navigate("ProfileDetail2", {
                username: item.username,
                displayName: item.displayName,
                profileimage: item.profileimage,
                bannerImage: item.bannerImage,
                bio: item.bio,
                id: item.id,
                user_id: item.user_id,
              });
        }}
      >
        <View style={{ alignItems: "center" }}>
          <Image
            style={{ width: 110, height: 116, borderRadius: 13 }}
            source={
              item.profileimage === null
                ? require("../../assets/noProfilePic.jpeg")
                : { uri: item.profileimage }
            }
          />
          <Image
            style={{
              width: 110,
              height: 80,
              top: 37,
              borderRadius: 13,
              position: "absolute",
            }}
            source={require("../../assets/fader.png")}
          />
        </View>
        <Text style={{ textAlign: "center", fontWeight: "500", top: 5 }}>
          {item.username}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({});
