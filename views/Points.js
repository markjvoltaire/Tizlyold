import { StyleSheet, Text, View } from "react-native";
import React, { useState, useEffect } from "react";
import { useUser } from "../context/UserContext";
import { usePoints } from "../context/PointsContext";
import { supabase } from "../services/supabase";
import TopHeader from "../components/TopHeader";
import { getUserPoints } from "../services/points";

export default function Points({ navigation }) {
  const { user, setUser } = useUser();
  const { points, setPoints } = usePoints();
  const [query, setQuery] = useState();
  const [tizlyPoints, setTizlyPoints] = useState(points);
  const [loading, setLoading] = useState(true);
  const FullSeperator = () => <View style={styles.fullSeperator} />;

  // async function getUserPoints() {
  //   const userId = supabase.auth.currentUser.id;

  //   const { data: profiles, error } = await supabase
  //     .from("profiles")
  //     .select("tizlyPoints")
  //     .eq("user_id", userId);

  //   return profiles;
  // }

  useEffect(() => {
    const getPoints = async () => {
      const resp = await getUserPoints();
      resp.map((i) => setPoints(i.tizlyPoints));
      resp.map((i) => setTizlyPoints(i.tizlyPoints));
    };
    getPoints();
  }, [tizlyPoints]);

  return (
    <View>
      <TopHeader
        navigation={navigation}
        points={points}
        tizlyPoints={tizlyPoints}
      />
    </View>
  );
}

const styles = StyleSheet.create({});
