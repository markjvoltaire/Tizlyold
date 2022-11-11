import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  FlatList,
  Dimensions,
} from "react-native";
import React, { useEffect, useState } from "react";

import ProfileDetail from "../../screens/ProfileDetail";
import { useUser } from "../../context/UserContext";
import { supabase } from "../../services/supabase";
import { getTrendingCreators } from "../../services/user";
import { StackActions } from "@react-navigation/native";
import UserProfile from "../../screens/UserProfile";
export default function TrendingCreators({ navigation, route }) {
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(true);

  const { user, setUser } = useUser();
  const pushAction = StackActions.push("UserProfile");

  let height = Dimensions.get("window").height;
  let width = Dimensions.get("window").width;

  useEffect(() => {
    const loadTrendingCreators = async () => {
      const creators = await getTrendingCreators();
      setProfiles(creators);
    };
    loadTrendingCreators();
  }, []);

  function goHome() {
    return <UserProfile />;
  }

  return (
    <View style={styles.container}>
      <Text style={{ position: "absolute", fontWeight: "600", fontSize: 15 }}>
        Trending Creators
      </Text>
      {profiles.map((item) => {
        return (
          <View key={item.id}>
            <TouchableOpacity
              onPress={() => {
                user.id === item.id
                  ? navigation.navigate("UserProfile2")
                  : navigation.push("ProfileDetail2", {
                      item,
                    });
              }}
            >
              <View>
                <Image
                  style={{
                    width: width * 0.3,
                    height: height * 0.15,
                    borderRadius: 13,
                    borderColor: "#5C5C5C",
                    borderWidth: 0.2,
                  }}
                  source={{ uri: item.profileimage }}
                />
                <Image
                  style={{
                    width: width * 0.3,
                    height: height * 0.15,

                    borderRadius: 13,
                    position: "absolute",
                  }}
                  source={require("../../assets/fader.png")}
                />
                <Text
                  style={{
                    position: "absolute",
                    top: height * 0.115,
                    color: "white",
                    fontWeight: "800",
                    fontSize: 10.5,
                    left: width * 0.008,
                  }}
                >
                  {item.displayName}
                </Text>
                <Text
                  style={{
                    position: "absolute",

                    color: "#D7D8DA",
                    fontWeight: "500",
                    left: width * 0.008,
                    fontSize: 10.5,
                    top: height * 0.13,
                  }}
                >
                  @{item.username}
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flexDirection: "row",
    justifyContent: "space-evenly",
    paddingTop: 30,
    paddingBottom: 30,
  },

  title: {
    fontWeight: "600",
    fontSize: 15,
  },

  iconContainer: {
    flexDirection: "row",
  },

  username: {
    fontWeight: "bold",
    color: "#5C5C5C",
    textAlign: "center",
    fontSize: 12,
  },

  userIcon: {
    position: "absolute",
    height: 40,
    width: 40,
  },

  trendTitle: {
    position: "absolute",
    bottom: 70,
    left: 20,

    fontWeight: "bold",
  },
});
