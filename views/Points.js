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

  const [loading, setLoading] = useState(true);
  const FullSeperator = () => <View style={styles.fullSeperator} />;

  return (
    <View>
      <TopHeader navigation={navigation} points={points} />
    </View>
  );
}

const styles = StyleSheet.create({});
