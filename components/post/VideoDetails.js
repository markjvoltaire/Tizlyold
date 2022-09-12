import {
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  TextInput,
  Button,
} from "react-native";
import React from "react";
import VideoHeader from "./VideoHeader";
import { Video, AVPlaybackStatus } from "expo-av";
import VideoPostDetails from "./VideoPostDetails";

export default function VideoDetails({ post, route, navigation }) {
  return (
    <View style={{ backgroundColor: "white", flex: 1 }}>
      <VideoHeader navigation={navigation} />
      {post.map((item) => {
        return (
          <View key={item.id} style={{ top: 80 }}>
            <Video
              source={{ uri: item.media }}
              isLooping
              useNativeControls
              shouldPlay={true}
              style={{ height: 229, width: 415 }}
            />
            <VideoPostDetails route={route} item={item} />
          </View>
        );
      })}
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
      >
        <View style={styles.inner}>
          <TextInput
            autoCapitalize="none"
            autoCorrect={true}
            placeholder="Leave A Comment"
            value={comment}
            onChangeText={(text) => setComment(text)}
            style={styles.commentInput}
          />
          <View style={{ position: "absolute", top: 207, left: 80 }}>
            <TouchableOpacity
              onPress={() =>
                createComment()
                  .then(() => refreshFeed().then(() => Keyboard.dismiss()))
                  .then(() => setComment())
              }
            >
              <Image
                style={{
                  width: 100,
                  bottom: 117,
                  left: 200,
                  resizeMode: "contain",

                  position: "absolute",
                }}
                source={require("../../assets/commentPost.png")}
              />
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({});

// <View style={{ backgroundColor: "white", flex: 1 }}>
// <View>
//   <VideoHeader post={post} navigation={navigation} route={route} />
//   {post.map((item) => {
//     return (
//       <View key={item.id} style={{ top: 80 }}>
//         <Video
//           source={{ uri: item.media }}
//           isLooping
//           useNativeControls
//           shouldPlay={true}
//           style={{ height: 229, width: 415 }}
//         />
//       </View>
//     );
//   })}
// </View>
// <View style={{ top: 100, flex: 1 }}>
//   <FlatList
//     refreshing={refreshing}
//     onRefresh={() => refreshFeed()}
//     keyExtractor={(item) => item.id}
//     data={post}
//     renderItem={({ item }) => (
//       <View>
//         <UserPostDetails
//           displayName={displayName}
//           postUserId={postUserId}
//           navigation={navigation}
//           post={item}
//           commentList={commentList}
//           route={route}
//         />
//       </View>
//     )}
//   />
// </View>
// <FullSeperator />
// <KeyboardAvoidingView
//   behavior={Platform.OS === "ios" ? "padding" : "height"}
//   style={styles.container}
// >
//   <View style={styles.inner}>
//     <TextInput
//       autoCapitalize="none"
//       autoCorrect={true}
//       placeholder="Leave A Comment"
//       value={comment}
//       onChangeText={(text) => setComment(text)}
//       style={styles.commentInput}
//     />
//     <View style={{ position: "absolute", top: 207, left: 80 }}>
//       <TouchableOpacity
//         onPress={() =>
//           createComment()
//             .then(() => refreshFeed().then(() => Keyboard.dismiss()))
//             .then(() => setComment())
//         }
//       >
//         <Image
//           style={{
//             width: 100,
//             bottom: 117,
//             left: 200,
//             resizeMode: "contain",

//             position: "absolute",
//           }}
//           source={require("../assets/commentPost.png")}
//         />
//       </TouchableOpacity>
//     </View>
//   </View>
// </KeyboardAvoidingView>
// </View>
