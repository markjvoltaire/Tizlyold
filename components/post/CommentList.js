import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
  VirtualizedList,
} from "react-native";
import React from "react";
import UserButtons from "../home/UserButtons";

export default function CommentList({
  item,
  commentList,
  isPressed,
  setIsPressed,
  navigation,
  saveIsPressed,
  setSaveIsPressed,
}) {

  return (
    <View style={{ paddingBottom: 310 }}>
      <View style={{ top: 10 }}>
        <UserButtons
          isPressed={isPressed}
          setIsPressed={setIsPressed}
          navigation={navigation}
          saveIsPressed={saveIsPressed}
          setSaveIsPressed={setSaveIsPressed}
          item={item}
        />
      </View>
      {/* {commentList.length === 0 ? (
        <View>
          <Text style={styles.commentsHeader}>No Comments</Text>
        </View>
      ) : (
        <Text style={styles.commentsHeader}>Comments</Text>
      )} */}
      <View style={{ top: 130 }}>
        {/* {commentList.map((comment) => {
          return (
            <ScrollView>
              <Image
                style={{ height: 30, width: 30, borderRadius: 40 }}
                source={{ uri: comment.userProfileImage }}
              />

              <View style={{ left: 40, bottom: 30 }}>
                <Text style={{ fontWeight: "600" }}>
                  {comment.userDisplayName}
                </Text>

                <Text
                  style={{
                    color: "#4F4E4E",
                    fontWeight: "500",
                    fontSize: 12,
                  }}
                >
                  @{comment.userUsername}
                </Text>
              </View>

              <View style={{ bottom: 35 }}>
                <Text
                  style={{
                    fontWeight: "600",
                    paddingTop: 10,
                    paddingBottom: 10,
                  }}
                >
                  {comment.comment}
                </Text>
              </View>
            </ScrollView>
          );
        })} */}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  commentsHeader: {
    alignSelf: "center",
    top: 110,
    color: "#73738B",
    fontSize: 20,
    fontWeight: "600",
    paddingBottom: 70,
    position: "absolute",
  },
});
