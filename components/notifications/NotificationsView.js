import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  Pressable,
} from "react-native";
import React, { useState } from "react";
import NotificationsList from "./NotificationsList";

export default function NotificationsView({ notifications, navigation }) {
  const [refreshing, setRefreshing] = useState(false);
  console.log("notifications", notifications);
  return (
    <View style={{ backgroundColor: "white", flex: 1, top: 60, left: 10 }}>
      <FlatList
        data={notifications}
        refreshing={refreshing}
        onRefresh={() => console.log("YOOO")}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <NotificationsList navigation={navigation} item={item} />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({});
