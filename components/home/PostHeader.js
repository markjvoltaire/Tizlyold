import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  FlatList,
} from "react-native";
import React, { useState, useEffect } from "react";
import {
  SharedElement,
  createSharedElementStackNavigator,
} from "react-navigation-shared-element";
import { supabase } from "../../services/supabase";

import { useUser } from "../../context/UserContext";
import ImageHeader from "../post/ImageHeader";

export default function PostHeader({ item, navigation }) {
  const { user, setUser } = useUser();
  const [userInfo, setUserinfo] = useState();
  const [loading, setLoading] = useState(true);

  async function getAvi() {
    const resp = await supabase
      .from("profiles")
      .select("*")
      .eq("user_id", item.user_id);

    return resp.body;
  }

  useEffect(() => {
    const getUserInfo = async () => {
      const resp = await getAvi();
      setUserinfo(resp);

      setTimeout(() => {
        setLoading(false);
      }, 1000);
    };
    getUserInfo();
  }, []);

  if (loading) {
    return <Text> loading</Text>;
  }

  return (
    <View style={{ alignSelf: "center" }}>
      <ImageHeader navigation={navigation} userInfo={userInfo} />
    </View>
  );
}

const styles = StyleSheet.create({});

{
  /* <View style={{ alignSelf: "center" }}>
        <TouchableOpacity
          onPress={() => navigation.push("ProfileDetail2", { item })}
        >
          <SharedElement id={item.id}>
            <Image
              style={{
                height: 35,
                width: 35,
                borderRadius: 100,
                bottom: 30,
              }}
              source={{ uri: item.profileimage }}
            />
          </SharedElement>
          <View style={{ bottom: 63, left: 40 }}>
            <Text style={{ fontWeight: "800" }}>{item.displayName}</Text>
            <Text
              style={{
                fontWeight: "600",
                color: "#A1A1B3",
              }}
            >
              @{item.username}
            </Text>
          </View>
        </TouchableOpacity>
      </View> */
}
