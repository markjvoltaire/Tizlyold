import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Pressable,
} from "react-native";
import React, { useState } from "react";
import UserButtons from "./UserButtons";
import {
  SharedElement,
  createSharedElementStackNavigator,
} from "react-navigation-shared-element";
import CurrentUserButtons from "./CurrentUserButtons";
import { useUser } from "../../context/UserContext";
import VideoHeader from "../post/VideoHeader";

export default function ImagePost({ item, navigation, followingId }) {
  const [status, setStatus] = React.useState({});
  const [isPressed, setIsPressed] = useState(false);
  const [saveIsPressed, setSaveIsPressed] = useState(false);
  const FullSeperator = () => <View style={styles.fullSeperator} />;
  const { user, setUser } = useUser();

  return (
    <>
      <View style={{ paddingBottom: 45, top: 60 }}>
        <View style={{ alignSelf: "center", right: 20, bottom: 10 }}>
          <Pressable
            onPress={() =>
              navigation.push("ProfileDetail2", {
                username: item.username,
                displayName: item.displayName,
                user_id: item.user_id,
                profileimage: item.profileimage,
                bannerImage: item.bannerImage,
              })
            }
          >
            <Image
              style={{
                height: 35,
                width: 35,
                borderRadius: 100,
                bottom: 30,
              }}
              source={{ uri: item.profileimage }}
            />
            <View style={{ bottom: 63, left: 40 }}>
              <Text style={{ fontWeight: "800" }}>{item.displayName}</Text>
              <Text style={{ fontWeight: "600", color: "#A1A1B3" }}>
                @{item.username}
              </Text>
            </View>
          </Pressable>
        </View>

        <Image
          style={{
            height: 398,
            aspectRatio: 1,
            alignSelf: "center",
            borderRadius: 10,
            bottom: 50,
          }}
          source={{ uri: item.media }}
          resizeMode="cover"
        />

        <Image
          style={{
            alignSelf: "center",
            resizeMode: "stretch",
            height: 200,
            width: 398,
            top: 217,
            borderRadius: 12,
            position: "absolute",
          }}
          resizeMode="stretch"
          source={require("../../assets/fader.png")}
        />

        <TouchableOpacity
          onPress={() => {
            navigation.navigate("ProfileDetail2", {
              user_id: item.user_id,
            });
          }}
          style={{ position: "absolute" }}
        ></TouchableOpacity>

        <View style={{ bottom: 50 }}>
          <Text
            style={{
              left: 13,
              top: 12,
              fontWeight: "700",
              textAlign: "left",
              width: 390,
              paddingBottom: 6,
              lineHeight: 20,
            }}
          >
            {item.title}
          </Text>
          <Text
            style={{
              left: 13,
              top: 12,
              fontWeight: "600",
              color: "#4F4E4E",
              textAlign: "left",
              width: 390,
              paddingBottom: 30,
              lineHeight: 20,
            }}
          >
            {item.description}
          </Text>

          <Image
            resizeMode="contain"
            style={{ width: 70, left: 10, bottom: 30 }}
            source={require("../../assets/photoBean.png")}
          />
        </View>

        <View style={{ bottom: 90 }}>
          {item.user_id === user.user_id ? (
            <CurrentUserButtons
              isPressed={isPressed}
              setIsPressed={setIsPressed}
              saveIsPressed={saveIsPressed}
              setSaveIsPressed={setSaveIsPressed}
              navigation={navigation}
              item={item}
            />
          ) : (
            <UserButtons
              isPressed={isPressed}
              setIsPressed={setIsPressed}
              saveIsPressed={saveIsPressed}
              setSaveIsPressed={setSaveIsPressed}
              item={item}
              navigation={navigation}
            />
          )}
        </View>
      </View>
      <FullSeperator />
    </>
  );
}

{
  /* <Image
            style={{
              height: 35,
              width: 35,
              borderRadius: 100,
              position: "absolute",
              left: 20,
              top: 330,
            }}
            source={{ uri: item.profileimage }}
          />
          <Text
            style={{
              position: "absolute",
              color: "white",
              top: 342,
              left: 60,
              fontWeight: "500",
              fontSize: 15,
            }}
          >
            {item.username}
          </Text> */
}

const styles = StyleSheet.create({
  fullSeperator: {
    borderBottomColor: "#EDEDED",
    borderBottomWidth: 2.0,
    opacity: 1.3,
    width: 390,
    alignSelf: "center",
  },
});
