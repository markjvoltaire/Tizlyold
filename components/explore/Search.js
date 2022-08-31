import { StyleSheet, Text, TextInput, View, Image } from "react-native";
import React, { useState } from "react";

export default function Search() {
  const [query, setQuery] = useState();
  return (
    <View style={{ backgroundColor: "white" }}>
      <TextInput
        style={styles.searchInput}
        placeholder="Still Looking?"
        autoCapitalize="none"
        onChangeText={(text) => setQuery(text)}
        onFocus={() => console.log("ACTIVE")}
        onBlur={() => console.log("NOT ACTIVE ")}
      />
      <Image
        style={styles.searchIcon}
        source={require("../../assets/Search.png")}
      />

      <SearchView />
    </View>
  );
}

const styles = StyleSheet.create({
  searchInput: {
    top: 15,
    alignSelf: "center",
    paddingLeft: 63,
    borderColor: "grey",
    borderWidth: 0.1,
    borderRadius: 15,
    backgroundColor: "#F3F3F9",
    width: 300,
    height: 45,
  },
  searchIcon: {
    height: 20,
    width: 20,
    bottom: 20,
    left: 80,
  },
});
