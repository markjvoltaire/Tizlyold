import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import React from "react";

export default function VideoHeader({ route, navigation }) {
  const FullSeperator = () => <View style={styles.fullSeperator} />;
  return (
    <View>
      <Image
        style={styles.logo}
        source={require("../../assets/tizlyicon.jpg")}
      />
      <FullSeperator />
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Image
          style={styles.backButton}
          source={require("../../assets/backButton.png")}
        />
      </TouchableOpacity>

      <View style={{ bottom: 40 }}>
        <Image
          style={{
            position: "absolute",
            width: 100,
            height: 80,
            resizeMode: "contain",
            top: 118,
            left: 300,
          }}
          source={require("../../assets/goToProfile.png")}
        />
        <Image
          style={{
            top: 142,
            left: 15,
            height: 30,
            width: 30,
            borderRadius: 100,
          }}
          source={{ uri: route.params.profileimage }}
        />
        <Text style={{ top: 110, left: 50, fontWeight: "600" }}>
          {route.params.displayName}
        </Text>
        <Text
          style={{ top: 110, left: 50, color: "#4F4E4E", fontWeight: "500" }}
        >
          @{route.params.username}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  logo: {
    position: "absolute",
    alignSelf: "center",
    top: 60,
    resizeMode: "contain",
    width: 52,
    height: 26,
  },
  fullSeperator: {
    borderBottomColor: "#EDEDED",
    borderBottomWidth: 1.8,
    opacity: 0.8,
    width: 900,
    left: 1,
    height: 3,
    top: 100,
  },
  backButton: {
    height: 20,
    width: 20,
    top: 60,
    left: 20,
  },
});
