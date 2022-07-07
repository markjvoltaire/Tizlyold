import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { useLinkTo } from "@react-navigation/native";
import { getUserEmail, getUsers } from "../../services/user";

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
      }}
    >
      {users.map((user) => {
        return (
          <>
            <Text>{user.email}</Text>
            <Image source={{ uri: user.profileimage }} />
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

  userIcon: {
    marginLeft: 10,
    resizeMode: "contain",
    marginHorizontal: 2,
    top: 50,
    width: 127,
    height: 123,
    right: 20,
  },

  trendTitle: {
    position: "absolute",
    top: 3,
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
