import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Dimensions,
  Image,
  TouchableOpacity,
} from "react-native";
import React, { useState, useEffect } from "react";
import BackHeader from "../components/BackHeader";
import { supabase } from "../services/supabase";

export default function ForgotPassword({ navigation }) {
  let height = Dimensions.get("window").height;
  let width = Dimensions.get("window").width;

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <BackHeader navigation={navigation} />

      <View style={{ bottom: height * 0.07 }}>
        <View
          style={{
            position: "absolute",
            top: height * 0.16,
            left: width * 0.14,
          }}
        >
          <Text style={{ fontWeight: "600" }}>Enter Current Password</Text>
        </View>
        <TextInput
          secureTextEntry={true}
          textContentType="password"
          style={{
            borderColor: "grey",
            borderWidth: 0.5,
            height: 50,
            width: 311,
            borderRadius: 10,
            paddingLeft: 30,
            alignSelf: "center",
            top: height * 0.2,
          }}
          placeholder="Current Password"
        />

        <View
          style={{
            position: "absolute",
            top: height * 0.3,
            left: width * 0.14,
          }}
        >
          <Text style={{ fontWeight: "600" }}>Enter New Password</Text>
        </View>
        <TextInput
          secureTextEntry={true}
          textContentType="password"
          style={{
            borderColor: "grey",
            borderWidth: 0.5,
            height: 50,
            width: 311,
            borderRadius: 10,
            paddingLeft: 30,
            alignSelf: "center",
            top: height * 0.28,
          }}
          placeholder="Current Password"
        />

        <View
          style={{
            position: "absolute",
            top: height * 0.425,
            left: width * 0.14,
          }}
        >
          <Text style={{ fontWeight: "600" }}>Confirm New Password</Text>
        </View>
        <TextInput
          secureTextEntry={true}
          textContentType="password"
          style={{
            borderColor: "grey",
            borderWidth: 0.5,
            height: 50,
            width: 311,
            borderRadius: 10,
            paddingLeft: 30,
            alignSelf: "center",
            top: height * 0.35,
          }}
          placeholder="Current Password"
        />
      </View>
      <TouchableOpacity style={{ top: height * 0.22 }}>
        <Image
          style={{
            aspectRatio: 1,
            resizeMode: "contain",
            height: height * 0.35,
            alignSelf: "center",
          }}
          source={require("../assets/buttonBlue.png")}
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({});
