import { StyleSheet, Text, View, Animated, Dimensions } from "react-native";
import React, { useState, useEffect, useRef } from "react";

import { supabase } from "../../services/supabase";

import { useUser } from "../../context/UserContext";
import ImageHeader from "../post/ImageHeader";

export default function PostHeader({ item, navigation }) {
  const { user, setUser } = useUser();
  const [userInfo, setUserinfo] = useState();
  const [loading, setLoading] = useState(true);

  const opacity = useRef(new Animated.Value(0.3));

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

  const height = Dimensions.get("window").height;
  const width = Dimensions.get("window").width;

  if (loading) {
    return (
      <View style={{ alignSelf: "center" }}>
        <View style={{ alignSelf: "center" }}>
          <View
            style={{ paddingTop: height * 0.03, paddingBottom: height * 0.01 }}
          >
            <Animated.View
              style={{
                opacity: opacity.current,
                alignSelf: "center",
                height: 5,
                width: 125,
                left: 35,
                borderRadius: 100,
                bottom: 60,
                backgroundColor: "#CFCFCF",
              }}
            />
            <Animated.View
              style={{
                opacity: opacity.current,
                alignSelf: "center",
                height: 5,
                width: 70,
                left: 10,
                borderRadius: 100,
                bottom: 55,
                backgroundColor: "#CFCFCF",
              }}
            />

            <Animated.View
              style={{
                position: "absolute",
                opacity: opacity.current,
                alignSelf: "center",
                height: height * 0.04,
                aspectRatio: 1,
                right: width * 0.25,
                borderRadius: 500,
                bottom: height * 0.06,
                backgroundColor: "#CFCFCF",
              }}
            />
          </View>
        </View>
      </View>
    );
  }

  return (
    <View style={{ alignSelf: "center" }}>
      <ImageHeader navigation={navigation} userInfo={userInfo} />
    </View>
  );
}

const styles = StyleSheet.create({});
