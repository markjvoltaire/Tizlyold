import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  TextInput,
  Dimensions,
  Animated,
} from "react-native";
import React, { useEffect, useState } from "react";
import { supabase } from "../../services/supabase";
import { useUser } from "../../context/UserContext";

export default function HomeBoard({ navigation }) {
  const HalfSeperator = () => <View style={styles.halfSeperator} />;
  const { user } = useUser();

  let height = Dimensions.get("window").height;
  let width = Dimensions.get("window").width;
  const defaultImageAnimated = new Animated.Value(0);

  const handleDefaultImageLoad = () => {
    Animated.timing(defaultImageAnimated, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };
  const images = [];

  return (
    <View style={{ height: height * 0.3, bottom: 50 }}>
      <View style={{ alignItems: "center", bottom: 10 }}>
        <TouchableOpacity>
          <Animated.Image
            style={{
              width: width * 0.95,
              height: height * 0.42,
              position: "absolute",
              opacity: defaultImageAnimated,
              alignSelf: "center",
              resizeMode: "contain",
            }}
            source={require("../../assets/exploreBoardBig.png")}
            onLoad={handleDefaultImageLoad}
          />
        </TouchableOpacity>
        <HalfSeperator />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 300,
    bottom: 40,
  },
  halfSeperator: {
    borderBottomColor: "grey",
    borderBottomWidth: 0.8,
    opacity: 0,
    width: 298,
    top: 70,
  },

  title: {
    fontWeight: "600",
    fontSize: 15,
    position: "absolute",
    left: 20,
    top: 20,
  },

  homeboard: {
    height: 210,

    alignSelf: "center",
    bottom: 20,
  },
  username: {
    fontWeight: "bold",
    fontSize: 14,
    bottom: 13,
    left: 9,
  },
  homeboardContainer: {
    top: 50,
  },
});
