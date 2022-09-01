import {
  StyleSheet,
  Text,
  View,
  Pressable,
  Image,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import UserButtons from "../home/UserButtons";

export default function ProfileImagePost({ item }) {
  const [status, setStatus] = React.useState({});
  const [isPressed, setIsPressed] = useState(false);
  const [saveIsPressed, setSaveIsPressed] = useState(false);
  const FullSeperator = () => <View style={styles.fullSeperator} />;

  // const month = item.posted.slice(5);
  // const date = month.concat("-");
  // const year = item.posted.slice(0, 4);

  // const postDate = date + year;
  // const milliseconds = status.durationMillis;
  // const seconds = milliseconds / 1000;

  return (
    <View style={{ paddingBottom: 90, top: 10.5 }}>
      <Pressable>
        <Image
          source={{ uri: item.media }}
          style={{
            height: 398,
            aspectRatio: 1,
            alignSelf: "center",
            borderRadius: 10,
          }}
          resizeMode="cover"
        />
        <Image
          style={{
            alignSelf: "center",
            resizeMode: "stretch",
            height: 200,
            width: 398,
            top: 200,
            borderRadius: 12,
            position: "absolute",
          }}
          resizeMode="stretch"
          source={require("../../assets/fader.png")}
        />
      </Pressable>

      <View style={{ position: "absolute", top: 370, left: 20 }}>
        <Text style={{ color: "white", fontWeight: "700" }}>{item.title}</Text>
      </View>

      <View style={{ position: "absolute" }}>
        <Image
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
        </Text>
      </View>

      <View>
        <Text
          style={{
            left: 15,
            top: 12,
            fontWeight: "700",
            color: "#4F4E4E",
            textAlign: "left",
            width: 390,
            paddingBottom: 30,
          }}
        >
          {item.description}
        </Text>

        {/* <Text style={{ left: 17, fontWeight: "700", color: "#4F4E4E" }}>
          {postDate}
        </Text> */}
      </View>

      <UserButtons
        isPressed={isPressed}
        setIsPressed={setIsPressed}
        saveIsPressed={saveIsPressed}
        setSaveIsPressed={setSaveIsPressed}
        item={item}
      />
    </View>
  );
}

const styles = StyleSheet.create({});
