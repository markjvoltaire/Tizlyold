import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Animated,
  Dimensions,
} from "react-native";
import React, { useState } from "react";
import {
  SharedElement,
  createSharedElementStackNavigator,
} from "react-navigation-shared-element";
import { useUser } from "../../context/UserContext";
import { Video } from "expo-av";
import UserButtons from "../home/UserButtons";

export default function ProfileHeader({
  item,
  navigation,
  userInfo,
  profile,
  posts,
  subloading,
}) {
  const defaultImageAnimated = new Animated.Value(0);
  let height = Dimensions.get("window").height;
  let width = Dimensions.get("window").width;
  const video = React.useRef(null);
  const [status, setStatus] = React.useState({});

  const [isPressed, setIsPressed] = useState(false);
  const [saveIsPressed, setSaveIsPressed] = useState(false);

  const handleDefaultImageLoad = () => {
    Animated.timing(defaultImageAnimated, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  const { user } = useUser();

  return (
    <View
      style={{ position: "absolute", top: height * 0.2, alignSelf: "center" }}
    >
      {profile.bannerImageType === "image" ? (
        <>
          <Animated.Image
            style={{
              width: width,
              height: height * 0.54,
              opacity: defaultImageAnimated,
              bottom: height * 0.2,
            }}
            source={{ uri: profile.bannerImage }}
            onLoad={handleDefaultImageLoad}
          />
          <Image
            style={{
              width: width,
              height: height * 0.54,
              position: "absolute",
              bottom: height * 0.2,
            }}
            source={require("../../assets/fader.png")}
          />
        </>
      ) : (
        <>
          <Video
            source={{ uri: profile.bannerImage }}
            ref={video}
            isLooping
            shouldPlay
            isMuted
            style={{
              height: height * 0.54,
              aspectRatio: 1,
              alignSelf: "center",
              borderRadius: 10,
              position: "absolute",
              bottom: height * 0.2,
            }}
            resizeMode="cover"
            onPlaybackStatusUpdate={(status) => setStatus(() => status)}
          />
          <Image
            style={{
              width: width,
              height: height * 0.54,
              bottom: height * 0.2,
            }}
            source={require("../../assets/fader.png")}
          />
        </>
      )}
      <View style={{ position: "absolute" }}>
        <Image
          style={{
            position: "absolute",
            top: height * 0.16,
            left: width * 0.04,
            width: 50,
            height: 50,
            resizeMode: "contain",

            borderRadius: 100,
            aspectRatio: 1,
          }}
          source={
            profile.profileimage === null
              ? require("../../assets/noProfilePic.jpeg")
              : { uri: profile.profileimage }
          }
        />
      </View>

      <View
        style={{ position: "absolute", left: width * 0.19, top: height * 0.16 }}
      >
        <Text
          style={{
            fontWeight: "bold",
            fontSize: 22,
            width: 400,
            color: "white",
          }}
        >
          {profile.displayName}
        </Text>
        <Text
          style={{
            fontSize: 15,
            width: 400,
            color: "white",
            fontWeight: "500",
          }}
        >
          @{profile.username}
        </Text>

        <Text
          style={{
            color: "white",
            right: width * 0.15,
            top: height * 0.025,
            fontWeight: "700",
          }}
        >
          {profile.bio}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({});

// <View style={{ alignSelf: "center", marginBottom: 1000 }}>
//   {profile.bannerImageType === "image" ? (
//     <>
//       <Animated.Image
//         style={{
//           width: width,
//           height: height * 0.54,
//           opacity: defaultImageAnimated,
//         }}
//         source={{ uri: profile.bannerImage }}
//         onLoad={handleDefaultImageLoad}
//       />
//       <Image
//         style={{
//           width: width,
//           height: height * 0.54,
//           position: "absolute",
//         }}
//         source={require("../../assets/fader.png")}
//       />
//     </>
//   ) : (
//     <>
//       <Video
//         source={{ uri: profile.bannerImage }}
//         ref={video}
//         isLooping
//         shouldPlay
//         isMuted
//         style={{
//           height: height * 0.54,
//           aspectRatio: 1,
//           alignSelf: "center",
//           borderRadius: 10,
//           position: "absolute",
//         }}
//         resizeMode="cover"
//         onPlaybackStatusUpdate={(status) => setStatus(() => status)}
//       />
//       <Image
//         style={{
//           width: width,
//           height: height * 0.54,
//         }}
//         source={require("../../assets/fader.png")}
//       />
//     </>
//   )}
//   <View style={{ bottom: height * 0.18, left: width * 0.19 }}>
//     <Image
//       style={{
//         position: "absolute",
//         right: width * 1.04,
//         width: 50,
//         height: 50,
//         resizeMode: "contain",

//         borderRadius: 100,
//         aspectRatio: 1,
//       }}
//       source={
//         profile.profileimage === null
//           ? require("../../assets/noProfilePic.jpeg")
//           : { uri: profile.profileimage }
//       }
//     />
//     <Text
//       style={{
//         fontWeight: "bold",
//         fontSize: 22,
//         width: 400,
//         color: "white",
//       }}
//     >
//       {profile.displayName}
//     </Text>
//     <Text
//       style={{
//         fontSize: 15,
//         width: 400,
//         color: "white",
//       }}
//     >
//       @{profile.username}
//     </Text>

//     <Text
//       style={{
//         color: "white",
//         right: width * 0.15,
//         top: height * 0.025,
//         fontWeight: "700",
//       }}
//     >
//       {profile.bio}
//     </Text>
//     <TouchableOpacity>
//       <Image
//         style={{
//           width: width * 0.21,
//           resizeMode: "contain",
//           right: width * 0.7,
//           position: "absolute",
//         }}
//         source={require("../../assets/messageButton.png")}
//       />
//     </TouchableOpacity>

//     <TouchableOpacity>
//       <Image
//         style={{
//           width: width * 0.21,
//           resizeMode: "contain",
//           right: width * 0.96,
//           position: "absolute",
//         }}
//         source={require("../../assets/followbutton.png")}
//       />
//     </TouchableOpacity>
//   </View>
// </View>
