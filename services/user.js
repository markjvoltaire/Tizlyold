import { supabase } from "./supabase";
import { useUser } from "../context/UserContext";
import { useEffect } from "react";

export async function signInUser(email, password) {
  const { user, error } = await supabase.auth.signIn({ email, password });
  if (error) throw error;
  return user;
}

export function getUser() {
  return supabase.auth.user();
}

export async function userId() {
  const users = getUser().id;
  return users;
}

export function getUserEmail() {
  const userEmail = supabase.auth.currentUser.email;

  return userEmail;
}

export async function getType() {
  const resp = await supabase.storage.extension().from("posts");

  return resp;
}

export async function addUser(username, displayName) {
  const userId = supabase.auth.currentUser.id;

  const { data, error } = await supabase.from("profiles").insert([
    {
      username: username,
      user_id: userId,
      email: supabase.auth.currentUser.email,
      displayName: displayName,
    },
  ]);
}

export async function addPost(username, displayName, title, description) {
  const userId = supabase.auth.currentUser.id;
  const resp = await supabase.from("post").insert([
    {
      username: username,
      user_id: userId,
      DisplayName: displayName,
      title: title,
      description: description,
    },
  ]);

  return resp;
}

export async function getUsers() {
  const resp = await supabase.from("profiles").select("*");

  return resp;
}

export async function getCurrentUserPosts() {
  const resp = await supabase
    .from("post")
    .select("*")
    .eq("user_id", userId)
    .order("id", { ascending: false });

  return resp;
}

export async function getAllUsers() {
  const resp = await supabase
    .from("profiles")
    .select("*")
    .order("id", { ascending: false });
  return resp;
}

export async function getPostsById(user_id) {
  const resp = await supabase
    .from("post")
    .select("*")
    .eq("user_id", user_id)
    .order("id", { ascending: false });
  return resp;
}

export async function getUserByIds() {
  const { user, setUser } = useUser();
  const userId = supabase.auth.currentUser.id;

  const { data } = await supabase
    .from("profiles")
    .select("*")
    .eq("user_id", userId)
    .single();
  setUser(data);
}

export async function getProfileDetail(user_id) {
  const resp = await supabase
    .from("profiles")
    .select("*")
    .eq("user_id", user_id);

  return resp;
}

export async function getTrendingCreators() {
  const resp = await supabase
    .from("profiles")
    .select("*")
    .in("id", [217, 176, 212]);

  return resp.body;
}

export async function getCreatorsYouMayLike() {
  const resp = await supabase
    .from("profiles")
    .select("*")
    .in("id", [214, 180, 216]);

  return resp.body;
}

export async function getNewTrendingCreators() {
  const resp = await supabase
    .from("profiles")
    .select("*")
    .in("id", [214, 180, 216]);

  return resp.body;
}

export async function signUp(email, password) {
  let { user } = await supabase.auth
    .signUp({
      email: email,
      password: password,
    })
    .then(() => navigation.navigate("Username"));

  return { user, error };
}

export async function editProfile(username, displayName, bio) {
  const userId = supabase.auth.currentUser.id;

  const { data, error } = await supabase
    .from("profiles")
    .update({ username: username, displayName: displayName, bio: bio })
    .eq("user_id", userId);

  const editProfileImage = async (userProfileImage) => {
    const userId = supabase.auth.currentUser.id;

    const resp = await supabase
      .from("comments")
      .update({ userProfileImage: userProfileImage })
      .eq("userId", userId);
  };

  editProfileImage();
}

export async function editPost(title, description, id) {
  const { data, error } = await supabase
    .from("post")
    .update({ title: title, description: description })
    .eq("id", id);
}

export async function createPost(
  username,
  displayName,
  title,
  publicURL,
  description
) {
  const userId = supabase.auth.currentUser.id;

  const resp = await supabase.from("post").insert([
    {
      username: username,
      user_id: userId,
      DisplayName: displayName,
      title: title,
      media: publicURL,
      description: description,
    },
  ]);

  return resp;
}

export async function createProfileImage(photo) {
  await supabase.storage
    .from("profile-images")
    .upload(`public/${photo}`, { upsert: true });

  const { publicURL } = await supabase.storage
    .from("profile-images")
    .getPublicUrl(`public/${photo}`);

  const resp = await supabase.from("profiles").insert({
    profileimage: publicURL,
  });
  return error(resp);
}

export async function getLikes(item) {
  const resp = await supabase
    .from("likes")
    .select("*")
    .eq("userId", userId)
    .eq("postId", item.id)
    .eq("liked_Id", item.likeId);

  return resp.body;
}

export async function getAllLikes() {
  const userId = supabase.auth.currentUser.id;
  const resp = await supabase.from("likes").select("*").eq("userId", userId);

  return resp.body;
}

export async function getFollowing() {
  const userId = supabase.auth.currentUser.id;
  const resp = await supabase
    .from("following")
    .select("*")
    .eq("following", true)
    .eq("userId", userId);

  setFollow(resp.body);

  return resp.body;
}

export async function likePost(item, user) {
  const resp = await supabase.from("likes").insert([
    {
      creatorId: item.user_id,
      userId: user.user_id,
      userProfileImage: user.profileimage,
      postId: item.id,
      userUsername: user.username,
      creatorUsername: item.username,
      liked_Id: item.likeId,
      creatorDisplayname: item.displayName,
      userDisplayname: user.displayName,
      creatorProfileImage: item.profileimage,
    },
  ]);

  return resp;
}

export async function unlikePost(item) {
  const resp = await supabase
    .from("likes")
    .delete()
    .eq("postId", item.id)
    .eq("liked_Id", item.likeId);
  return resp;
}

export async function getUserLikes(userId, item) {
  const resp = await supabase
    .from("likes")
    .select("*")
    .eq("userId", userId)
    .eq("postId", item.id)
    .eq("liked_Id", item.likeId);

  return resp.body;
}
