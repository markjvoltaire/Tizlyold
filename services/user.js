import { supabase } from "./supabase";

export async function getTrendingCreators() {
  const resp = await supabase
    .from("profiles")
    .select("*")
    .in("id", [217, 176, 212]);

  return resp.body;
}

export async function creatorsYouMayLike() {
  const resp = await supabase
    .from("profiles")
    .select("*")
    .in("id", [233, 215, 177, 217, 239, 231]);

  return resp.body;
}

export async function getAllLikes() {
  const userId = supabase.auth.currentUser.id;
  const resp = await supabase
    .from("notifications")
    .select("*")
    .eq("userId", userId);

  return resp.body;
}

export async function getNewTrendingCreators() {
  const resp = await supabase
    .from("profiles")
    .select("*")
    .in("id", [229, 180, 230]);

  return resp.body;
}
