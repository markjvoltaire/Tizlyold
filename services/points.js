import { supabase } from "./supabase";
import { useUser } from "../context/UserContext";
import { usePoints } from "../context/PointsContext";
import { Alert } from "react-native";

export async function getUserPoints() {
  const userId = supabase.auth.currentUser.id;

  const { data: profiles, error } = await supabase
    .from("profiles")
    .select("tizlyPoints")
    .eq("user_id", userId);

  return profiles;
}

export async function handleSubscriptions(points, item) {
  if (points - item.subCost < 0) {
    Alert.alert("Insufficent Coins To Access Content");
  } else {
    subtractCoins();
    addCoins();
    setIsFollowing(true);
  }
}

async function subtractCoins(points, item) {
  const userId = supabase.auth.currentUser.id;
  const { data: profiles, error } = await supabase
    .from("profiles")
    .update({ tizlyPoints: points - 10 })
    .eq("user_id", userId);

  // setUser(profiles);

  error === null ? handleFollow() : console.log("error", error);

  console.log("profiles", profiles);

  return profiles;
}

async function addCoins(userTizlyPoints, item) {
  const userId = supabase.auth.currentUser.id;
  const { data: profiles, error } = await supabase
    .from("profiles")
    .update({ tizlyPoints: userTizlyPoints + item.subCost })
    .eq("user_id", item.user_id);

  // error === null ? handleFollow() : console.log("error", error);
}
