import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Dimensions,
} from "react-native";
import React, { useState } from "react";
import ProfileGrid from "./ProfileGrid";
import SubLoading from "../loading/SubLoading";

export default function ProfileNav({
  navigation,
  profile,
  posts,
  subStatus,
  videoCount,
  textCount,
  photoCount,
  subLoading,
  subscribeToUser,
  freePosts,
}) {
  const [nav, setNav] = useState("Home");
  const FullSeperator = () => <View style={styles.fullSeperator} />;

  let height = Dimensions.get("window").height;
  let width = Dimensions.get("window").width;

  return (
    <View style={{ top: 120 }}>
      <TouchableOpacity onPress={() => setNav("Home")}>
        {nav === "Home" ? (
          <Text style={styles.home}>Home</Text>
        ) : (
          <Text style={styles.homeInactive}>Home</Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity onPress={() => setNav("Subscribers")}>
        {nav === "Subscribers" ? (
          <Text style={styles.subscribers}>Subscribers</Text>
        ) : (
          <Text style={styles.subscribersInactive}>Subscribers</Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity onPress={() => setNav("Shop")}>
        {nav === "Shop" ? (
          <Text style={styles.shop}>Shop</Text>
        ) : (
          <Text style={styles.shopInactive}>Shop</Text>
        )}
      </TouchableOpacity>

      <FullSeperator />

      <View style={{ top: height * 0.6 }}>
        <ProfileGrid
          freePosts={freePosts}
          nav={nav}
          posts={posts}
          subStatus={subStatus}
          photoCount={photoCount}
          videoCount={videoCount}
          textCount={textCount}
          profile={profile}
          navigation={navigation}
        />

        {(subStatus === false && nav === "Subscribers") ||
        (nav === "Home" && freePosts.length === 0) ? (
          <View style={{ alignItems: "center", bottom: height * 0.16 }}>
            {subLoading === "idle" ? (
              <TouchableOpacity onPress={() => subscribeToUser()}>
                <Image
                  style={{
                    resizeMode: "contain",
                    height: 215,
                    width: 215,
                    alignSelf: "center",
                  }}
                  source={require("../../assets/accessButton.png")}
                />
              </TouchableOpacity>
            ) : null}
          </View>
        ) : null}

        {subLoading === "idle" ? null : subLoading === "loading" ? (
          <SubLoading />
        ) : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  profileNav: {
    position: "absolute",
    top: 120,
    width: 4000,
  },
  home: {
    position: "absolute",
    fontWeight: "bold",
    top: 390,
    left: 28,
    fontSize: 16,
  },
  homeInactive: {
    position: "absolute",
    fontWeight: "900",
    top: 390,
    left: 28,
    color: "#A1A1B3",
  },
  shopInactive: {
    position: "absolute",
    fontWeight: "900",
    top: 390,
    left: 330,
    color: "#A1A1B3",
  },
  subscribersInactive: {
    position: "absolute",
    fontWeight: "900",
    top: 390,
    left: 165,
    color: "#A1A1B3",
  },
  shop: {
    position: "absolute",
    fontWeight: "bold",
    top: 390,
    left: 330,
    fontSize: 16,
  },
  media: {
    position: "absolute",
    fontWeight: "bold",
    top: 390,
    left: 117,
    fontSize: 16,
  },
  subscribers: {
    position: "absolute",
    fontWeight: "bold",
    top: 390,
    left: 165,
    fontSize: 16,
  },
  fullSeperator: {
    borderBottomColor: "grey",
    borderBottomWidth: StyleSheet.hairlineWidth,
    opacity: 0.5,
    width: 900,
    left: 1,
    top: 430,
  },
});
