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

      <View
        style={{
          position: "absolute",
          top: height * 0.2,
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
          top: height * 0.13,
        }}
        placeholder="Current Password"
      />

      <View
        style={{
          position: "absolute",
          top: height * 0.35,
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
          top: height * 0.23,
        }}
        placeholder="Current Password"
      />

      <View
        style={{
          position: "absolute",
          top: height * 0.5,
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
          top: height * 0.32,
        }}
        placeholder="Current Password"
      />

      <View style={{ top: height * 0.4 }}>
        <TouchableOpacity>
          <Image
            style={{
              resizeMode: "contain",
              height: height * 0.06,
              alignSelf: "center",
            }}
            source={require("../assets/buttonBlue.png")}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({});
