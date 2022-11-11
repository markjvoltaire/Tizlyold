import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
  Dimensions,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useUser } from "../context/UserContext";
import { usePoints } from "../context/PointsContext";
import { supabase } from "../services/supabase";

import { getUserPoints } from "../services/points";

export default function TopHeader({ navigation, tizlyPoints }) {
  const { user, setUser } = useUser();
  const { points, setPoints } = usePoints();
  const [query, setQuery] = useState();

  const [loading, setLoading] = useState(true);
  const FullSeperator = () => (
    <View
      style={{
        borderBottomColor: "#EDEDED",
        borderBottomWidth: 2.0,
        opacity: 1.8,
        width: 900,
        left: 1,
        top: height * 0.06,
        height: 3,
      }}
    />
  );

  let height = Dimensions.get("window").height;
  let width = Dimensions.get("window").width;

  return (
    <SafeAreaView
      style={{
        backgroundColor: "white",
        height: height * 0.11,
        borderBottomWidth: 0.8,
        borderBottomColor: "#EDEDED",
      }}
    >
      <View style={{ alignSelf: "center", bottom: height * 0.01 }}>
        <Image
          resizeMode="contain"
          style={{
            width: width * 0.12,
          }}
          source={require("../assets/tizlyicon.jpg")}
        />
      </View>

      <View style={{ bottom: height * 0.07, left: width * 0.03 }}>
        <Image
          resizeMode="contain"
          style={{
            width: width * 0.09,
            aspectRatio: 1,
            borderRadius: 100,
          }}
          source={
            user.profileimage === null
              ? require("../assets/noProfilePic.jpeg")
              : { uri: user.profileimage }
          }
        />
      </View>

      <View style={{ bottom: height * 0.1, left: width * 0.78 }}>
        <Image
          resizeMode="contain"
          style={{ width: 20, height: 20, borderRadius: 100 }}
          source={require("../assets/coin.png")}
        />

        <View style={{ left: width * 0.08, bottom: height * 0.022 }}>
          <Text style={{ fontWeight: "600" }}>{points}</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

{
  /* <FullSeperator />
      <Image
        style={{
          height: height * 0.039,
          left: width * 0.05,
          aspectRatio: 1,
          borderRadius: 100,
          position: "absolute",
        }}
        source={
          user.profileimage === null
            ? require("../assets/noProfilePic.jpeg")
            : { uri: user.profileimage }
        }
      />
      <Text style={{ left: width * 0.87, fontWeight: "600" }}>{points}</Text>
      <Image
        style={{
          aspectRatio: 1,
          alignSelf: "center",
          resizeMode: "contain",
          bottom: "43%",
          height: height * 0.06,
        }}
        source={require("../assets/tizlyicon.jpg")}
      />
      <View style={{ left: width * 0.78, bottom: "20%" }}>
        <Image
          style={{
            aspectRatio: 1,
            height: height * 0.025,
            bottom: height * 0.06,
          }}
          source={require("../assets/coin.png")}
        />
      </View> */
}

const styles = StyleSheet.create({
  componentContainer: {
    backgroundColor: "white",
    height: 100,
    borderBottomWidth: 2.0,
    borderBottomColor: "#EDEDED",
  },
  setting: {
    position: "absolute",
    height: 22,
    width: 22,
    left: 308,
    top: 15,
  },

  logo: {
    position: "absolute",
    resizeMode: "contain",
    width: 52,
    height: 26,
    backgroundColor: "white",
    alignSelf: "center",
    top: 50,
  },
  logoContainer: {
    alignItems: "center",
  },
  searchContainer: {
    alignItems: "center",
  },
  searchIcon: {
    height: 20,
    width: 20,
    top: 63,
    right: 75,
  },
  notification: {
    position: "absolute",
    height: 24,
    width: 24,
    top: 20,
    left: 320,
  },
  profileimage: {
    height: 35,
    width: 35,
    borderRadius: 100,
    left: 16,
    top: 12,
  },
  fullSeperator: {
    borderBottomColor: "#EDEDED",
    borderBottomWidth: 2.0,
    opacity: 1.8,
    width: 900,
    left: 1,
    top: 54,
    height: 3,
  },
});
