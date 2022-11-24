import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { useUser } from "../context/UserContext";
import { usePoints } from "../context/PointsContext";

export default function BackHeader({ navigation }) {
  const { user, setUser } = useUser();
  const { points, setPoints } = usePoints();

  let height = Dimensions.get("window").height;
  let width = Dimensions.get("window").width;

  return (
    <SafeAreaView style={{ backgroundColor: "white", height: height * 0.11 }}>
      <View style={{ alignSelf: "center", bottom: height * 0.001 }}>
        <Image
          resizeMode="contain"
          style={{
            width: width * 0.12,
          }}
          source={require("../assets/tizlyicon.jpg")}
        />
      </View>

      <View style={{ bottom: height * 0.05, left: width * 0.05 }}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
            resizeMode="contain"
            style={{
              height: height * 0.029,
              aspectRatio: 1,
              borderRadius: 100,
            }}
            source={require("../assets/backButton.png")}
          />
        </TouchableOpacity>
      </View>

      <View style={{ bottom: height * 0.075, left: width * 0.78 }}>
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

const styles = StyleSheet.create({});
