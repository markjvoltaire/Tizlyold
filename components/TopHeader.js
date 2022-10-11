import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
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
  // const [tizlyPoints, setTizlyPoints] = useState(points);
  const [loading, setLoading] = useState(true);
  const FullSeperator = () => <View style={styles.fullSeperator} />;

  return (
    <SafeAreaView style={styles.componentContainer}>
      <Image style={styles.logo} source={require("../assets/tizlyicon.jpg")} />

      <View style={{ position: "absolute", top: 35, left: 16 }}>
        <Image style={styles.setting} source={require("../assets/coin.png")} />
        <Text style={{ left: 350, top: 22, fontWeight: "700" }}>{points}</Text>
      </View>

      {/* <TouchableOpacity
        onPress={() => {
          navigation.navigate("SettingsScreen");
        }}
      >
        <Image
          style={styles.setting}
          source={require("../assets/Setting.jpg")}
        />
      </TouchableOpacity> */}

      <View style={{ position: "absolute", top: 35 }}>
        <Image
          style={styles.profileimage}
          source={{ uri: user.profileimage }}
        />
      </View>
    </SafeAreaView>
  );
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
    height: 29,
    width: 29,
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
});
