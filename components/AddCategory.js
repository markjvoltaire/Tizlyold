import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import SelectList from "react-native-dropdown-select-list";

export default function AddCategory() {
  const [selected, setSelected] = useState("");

  console.log("selected", selected);

  const data = [
    { key: "Entertainment", value: "Entertainment" },
    { key: "Fitness", value: "Fitness" },
    { key: "Podcast", value: "Podcast" },
    { key: "Music", value: "Music" },
    { key: "Sports", value: "Sports" },
    { key: "Cooking", value: "Cooking" },
    { key: "Gaming", value: "Gaming" },
    { key: "Beauty", value: "Beauty" },
    { key: "Content Creation", value: "Content Creation" },
  ];

  return (
    <View>
      <SelectList
        placeholder="Select a category"
        data={data}
        setSelected={setSelected}
        inputStyles={{ fontWeight: "600" }}
        dropdownStyles={{ height: 130 }}
        search={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({});
