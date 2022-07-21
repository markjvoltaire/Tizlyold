import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Button,
  Image,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { Video, AVPlaybackStatus } from "expo-av";

export default function Player({ route, navigation }) {
  const video = React.useRef(null);
  const [status, setStatus] = useState({});

  const FullSeperator = () => <View style={styles.fullSeperator} />;
  return (
    <SafeAreaView style={{ backgroundColor: "#FFFFFF", flex: 1 }}>
      <View style={{ alignItems: "center" }}>
        <Image
          style={styles.logo}
          source={require("../assets/tizlyicon.jpg")}
        />
        <FullSeperator />
      </View>
      <View style={{ bottom: 40 }}>
        <Image
          style={{
            position: "absolute",
            width: 100,
            height: 80,
            resizeMode: "contain",
            top: 120,
            left: 300,
          }}
          source={require("../assets/goToProfile.png")}
        />
        <Image
          style={{
            position: "absolute",
            width: 26,
            height: 26,
            top: 147,
            borderRadius: 100,
            left: 10,
          }}
          source={{ uri: route.params.profileimage }}
        />
        <Text
          style={{
            position: "absolute",
            top: 143,
            left: 41,
            fontWeight: "700",
          }}
        >
          {route.params.displayName}
        </Text>
        <Text
          style={{
            position: "absolute",
            top: 157,
            left: 41,
            fontWeight: "500",
            color: "grey",
          }}
        >
          @{route.params.username}
        </Text>
        <View style={{ alignItems: "center" }}>
          <Video
            source={{ uri: route.params.media }}
            ref={video}
            useNativeControls
            shouldPlay={true}
            style={{
              height: 209,
              width: 413.5,
              top: 181,
            }}
            resizeMode="cover"
            onPlaybackStatusUpdate={(status) => setStatus(() => status)}
          />
        </View>
        <View>
          <Text style={{ position: "absolute", top: 220 }}>
            {route.params.title}
          </Text>
        </View>
        <Text style={{ position: "absolute", top: 480 }}>
          {route.params.description}
        </Text>
      </View>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Image
          style={styles.backButton}
          source={require("../assets/backButton2.png")}
        />
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  backButton: {
    position: "absolute",
    resizeMode: "contain",
    width: 35,
    height: 50,
    left: 21,
    bottom: 160,
  },
  logo: {
    position: "absolute",
    top: 5,
    resizeMode: "contain",
    width: 52,
    height: 26,
    backgroundColor: "white",
  },
  fullSeperator: {
    borderBottomColor: "#EDEDED",
    borderBottomWidth: 2.0,
    opacity: 0.8,
    width: 900,
    left: 1,
    top: 55,
    height: 3,
  },
});