import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import React, { useState, useEffect } from "react";
import { getNewTrendingCreators } from "../../services/user";

export default function NewToTizly({ navigation }) {
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadTrendingCreators = async () => {
      const creators = await getNewTrendingCreators();
      setProfiles(creators);
    };
    loadTrendingCreators();
  }, []);

  console.log("profiles", profiles);

  return (
    <View style={styles.container}>
      <Text style={{ position: "absolute", fontWeight: "600", fontSize: 15 }}>
        New To Tizly
      </Text>
      {profiles.map((item) => {
        return (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("ProfileDetail", {
                username: item.username,
                displayName: item.displayName,
                profileimage: item.profileimage,
                bannerImage: item.bannerImage,
                bio: item.bio,
                id: item.id,
              })
            }
          >
            <View>
              <Image
                style={{ width: 124, height: 130, borderRadius: 13 }}
                source={{ uri: item.profileimage }}
              />
              <Image
                style={{
                  width: 124,
                  height: 93,
                  top: 37,
                  borderRadius: 13,
                  position: "absolute",
                }}
                source={require("../../assets/fader.png")}
              />
              <Text
                style={{
                  position: "absolute",
                  top: 90,
                  color: "white",
                  fontWeight: "800",
                  left: 2,
                }}
              >
                {item.displayName}
              </Text>
              <Text
                style={{
                  position: "absolute",
                  top: 105,
                  color: "#D7D8DA",
                  fontWeight: "600",
                  left: 2,
                }}
              >
                @{item.username}
              </Text>
            </View>
          </TouchableOpacity>
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
