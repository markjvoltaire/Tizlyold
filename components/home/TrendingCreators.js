import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { useLinkTo } from "@react-navigation/native";
import { getUserEmail, getUsers } from "../../services/user";
import ProfileDetail from "../../screens/ProfileDetail";

export default function TrendingCreators({ navigation }) {
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getProfiles = async () => {
      const resp = await getUsers();

      setProfiles(resp);
      setLoading(false);
    };
    getProfiles();
  }, []);
  if (loading) {
    return <Text> loading</Text>;
  }

  const users = profiles.body;

  return (
    <View
      style={{
        justifyContent: "center",
        alignItems: "center",
        position: "absolute",
        flexDirection: "row",
        display: "flex",
        flexWrap: "wrap",
        flexBasis: 33.333333,
        width: 400,
        left: 10,
        top: 20,
        height: 100,
      }}
    >
      {users.map((user) => {
        return (
          <>
            <View>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("ProfileDetail", {
                    id: user.id,
                    username: user.username,
                    email: user.email,
                    profileimage: user.profileimage,
                    bannerImage: user.bannerImage,
                    bio: user.bio,
                    displayName: user.displayName,
                  })
                }
              >
                <Image
                  style={{
                    height: 93,
                    width: 93,
                    borderRadius: 5,

                    marginHorizontal: 15,
                    marginVertical: 8,
                  }}
                  source={{ uri: user.profileimage }}
                />
                <Text style={styles.username}>{user.username}</Text>
              </TouchableOpacity>
            </View>
          </>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    marginLeft: -150,
    left: 164,
    top: 12,
  },

  iconContainer: {
    flexDirection: "row",
  },

  username: {
    fontWeight: "bold",
    color: "#5C5C5C",
    textAlign: "center",
  },

  userIcon: {
    position: "absolute",
    height: 40,
    width: 40,
  },

  trendTitle: {
    position: "absolute",

    fontWeight: "bold",
  },

  userName1: {
    position: "absolute",
    top: 189,
    left: 25,
    fontWeight: "bold",
    color: "#5C5C5C",
  },
  userName2: {
    position: "absolute",
    top: 185,
    left: 6,
    width: 110,
    fontWeight: "bold",
    color: "#5C5C5C",
  },
  userName3: {
    position: "absolute",
    top: 189,
    left: 15,
    fontWeight: "bold",
    color: "#5C5C5C",
  },
});
