import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  RefreshControl,
} from "react-native";
import React, { useState } from "react";
import TopHeader from "../TopHeader";

export default function NoNotifications({ navigation }) {
  const [refreshing, setRefreshing] = useState(false);

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <Text
        style={{
          fontWeight: "700",
          color: "#4F4E4E",
          alignSelf: "center",
          fontSize: 20,
          top: 25,
        }}
      >
        Notifications
      </Text>

      <View style={{ top: 300, alignItems: "center" }}>
        <Text
          style={{
            fontWeight: "600",
            fontSize: 20,
            color: "#686877",
          }}
        >
          You Currently Have No Notifications
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({});
