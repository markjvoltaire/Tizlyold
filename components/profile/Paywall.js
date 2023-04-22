import { StyleSheet, Text, View, Image, Dimensions } from "react-native";
import React from "react";

export default function Paywall({ textCount, videoCount, photoCount }) {
  let height = Dimensions.get("window").height;
  let width = Dimensions.get("window").width;
  return (
    <>
      <View>
        <Text
          style={{
            alignSelf: "center",
            bottom: height * 0.1,
            fontWeight: "700",
            color: "#3C3C47",
          }}
        >
          Subscribers Access Only
        </Text>
      </View>
      <View
        style={{
          flexDirection: "row",
          alignSelf: "center",
          bottom: height * 0.08,
        }}
      >
        <View>
          <Image
            style={{
              height: height * 0.145,
              aspectRatio: 1,
              right: 5,
            }}
            source={require("../../assets/subBox.png")}
          />
          <Text
            style={{
              position: "absolute",
              alignSelf: "center",
              fontWeight: "600",
              color: "white",
              top: 15,
              fontSize: 17,
            }}
          >
            Photos
          </Text>
          <Text
            style={{
              position: "absolute",
              alignSelf: "center",
              top: 55,
              fontWeight: "600",
              fontSize: 28,
              color: "white",
            }}
          >
            {photoCount.length}
          </Text>
        </View>

        <View>
          <Image
            style={{ height: height * 0.145, aspectRatio: 1 }}
            source={require("../../assets/subBox.png")}
          />
          <Text
            style={{
              position: "absolute",
              alignSelf: "center",
              fontWeight: "600",
              color: "white",
              top: 15,
              fontSize: 17,
            }}
          >
            Videos
          </Text>
          <Text
            style={{
              position: "absolute",
              alignSelf: "center",
              top: 55,
              fontWeight: "600",
              fontSize: 28,
              color: "white",
            }}
          >
            {videoCount.length}
          </Text>
        </View>

        <View>
          <Image
            style={{
              height: height * 0.145,
              aspectRatio: 1,
              left: 5,
            }}
            source={require("../../assets/subBox.png")}
          />
          <Text
            style={{
              position: "absolute",
              alignSelf: "center",
              fontWeight: "600",
              color: "white",
              top: 15,
              fontSize: 17,
            }}
          >
            Text
          </Text>
          <Text
            style={{
              position: "absolute",
              alignSelf: "center",
              top: 55,
              fontWeight: "600",
              fontSize: 28,
              color: "white",
            }}
          >
            {textCount.length}
          </Text>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({});
