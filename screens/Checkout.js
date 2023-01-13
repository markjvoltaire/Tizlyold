import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  TouchableOpacity,
} from "react-native";
import React from "react";

import LottieView from "lottie-react-native";

export default function Checkout({ navigation }) {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <View style={{ top: 150 }}>
        <Text
          style={{
            alignSelf: "center",
            fontSize: 20,
            position: "absolute",
            fontWeight: "700",
            color: "#4F4E4E",
          }}
        >
          Upload Complete!
        </Text>
        <View style={{ position: "absolute", alignSelf: "center", top: 350 }}>
          <TouchableOpacity onPress={() => navigation.navigate("HomeScreen")}>
            <Image
              style={{
                position: "absolute",
                resizeMode: "contain",
                width: 315,
                top: 130,
                alignSelf: "center",
              }}
              source={require("../assets/buttonBlue.png")}
            />
          </TouchableOpacity>
        </View>
        <SafeAreaView>
          <LottieView
            style={{
              top: 10,
              height: 400,
              width: 400,
              position: "absolute",
              alignSelf: "center",
            }}
            source={require("../assets/lottie/uploadComplete.json")}
            autoPlay
          />
        </SafeAreaView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});
