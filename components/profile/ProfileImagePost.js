import {
  StyleSheet,
  Text,
  View,
  Image,
  Modal,
  TouchableOpacity,
  Dimensions,
  Pressable,
} from "react-native";
import React, { useState } from "react";
import UserButtons from "../home/UserButtons";
import GestureRecognizer, {
  swipeDirections,
} from "react-native-swipe-gestures";

export default function ProfileImagePost({ item, profile, navigation }) {
  const [modalVisible, setModalVisible] = useState(false);
  let height = Dimensions.get("window").height;
  let width = Dimensions.get("window").width;

  const FullSeperator = () => (
    <View
      style={{
        borderBottomWidth: 1.8,
        opacity: 0.1,
        width: 900,
        left: 1,
        position: "absolute",
      }}
    />
  );
  return (
    <>
      <View
        key={item.id}
        style={{
          alignSelf: "center",
          bottom: height * 0.1,
        }}
      >
        <FullSeperator />
        <View
          style={{
            flexDirection: "row",
            alignSelf: "center",
            marginBottom: 10,
            paddingBottom: 15,
            top: height * 0.015,
          }}
        >
          <Image
            source={{ uri: profile.profileimage }}
            style={styles.profileImage}
          />
          <View style={styles.userTextContainer}>
            <Text
              style={{
                fontWeight: "bold",
                fontSize: 12,
              }}
            >
              {item.displayName}
            </Text>
            <Text style={styles.username}>@{item.username}</Text>
          </View>
        </View>

        <Pressable onPress={() => setModalVisible(true)}>
          <Image
            style={{
              height: height * 0.45,
              width: width * 0.995,
              borderRadius: 18,
            }}
            source={{ uri: item.media }}
          />
          <Image
            style={{
              height: height * 0.45,
              width: width * 0.995,
              borderRadius: 18,
              position: "absolute",
            }}
            source={require("../../assets/fader.png")}
          />
        </Pressable>

        <Text
          style={{
            fontWeight: "600",
            fontSize: 14,
            lineHeight: 22,
            paddingBottom: 10,
            left: width * 0.02,
            top: 5,
          }}
        >
          {item.description}
        </Text>
        <UserButtons navigation={navigation} item={item} />
      </View>

      <View style={{ bottom: height * 0.012, paddingBottom: 30 }}>
        <Modal animationType="fade" visible={modalVisible}>
          <View style={{ backgroundColor: "black", flex: 1, opacity: 1 }}>
            <TouchableOpacity onPress={() => setModalVisible(!modalVisible)}>
              <Text style={{ top: 100, color: "white", left: 20 }}>Close</Text>
            </TouchableOpacity>
            <Image
              style={{
                width: width,
                alignSelf: "center",
                top: height * 0.25,
                aspectRatio: 1,
              }}
              source={{ uri: item.media }}
            />
          </View>
        </Modal>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  tweetContainer: {
    flexDirection: "column",
    alignItems: "center",
    padding: 10,
  },
  fullSeperator: {
    borderBottomColor: "grey",
    borderBottomWidth: 1.8,
    opacity: 0.2,
    width: 900,
    left: 1,
    position: "absolute",
  },
  userContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    paddingBottom: 15,
  },
  profileImage: {
    width: 25,
    height: 25,
    borderRadius: 25,
    marginRight: 10,
  },
  userTextContainer: {
    justifyContent: "center",
  },
  name: {
    fontWeight: "bold",
    fontSize: 12,
  },
  username: {
    color: "#A1A1B3",
    fontSize: 12,
  },
  textContainer: {
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  tweet: {
    textAlign: "left",
    fontWeight: "600",
    fontSize: 17,
    lineHeight: 22,
  },
});
