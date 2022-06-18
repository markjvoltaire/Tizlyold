import { StyleSheet, Text, View, TextInput } from "react-native";
import React from "react";
import Header from "../components/home/Header";

export default function Explore() {
  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "white",
      }}
    >
      {" "}
      <TextInput
        style={styles.passwordInput}
        placeholder="Password"
        autoCapitalize="none"
        autoCorrect={false}
        secureTextEntry={true}
        textContentType="password"
        onChangeText={(text) => setPassword(text)}
        value={password}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  ontainer: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
  },
});
