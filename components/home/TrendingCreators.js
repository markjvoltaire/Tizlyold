import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { useLinkTo } from "@react-navigation/native";
import { getUserEmail, getUsers } from "../../services/user";
import ProfileDetail from "../../screens/ProfileDetail";
import { useUser } from "../../context/UserContext";

export default function TrendingCreators({ navigation, route }) {
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user, setUser } = useUser();

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
        width: 500,
        right: -40,
        top: 50,
        height: 100,
      }}
    >
      <View>
        <Text style={styles.trendTitle}> TrendingCreators </Text>
      </View>
      {users.map((user) => {
        return (
          <>
            <View style={styles.trendingUsers}>
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
                    path: user.username,
                  })
                }
              >
                <Image
                  style={{
                    height: 70,
                    width: 70,
                    borderRadius: 5,

                    marginHorizontal: 35,
                    marginVertical: 10,
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
