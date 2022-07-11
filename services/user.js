import { supabase } from "./supabase";
import { useUser } from "../context/UserContext";

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
  console.log("userEmail", userEmail);
  return userEmail;
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

export async function createPost(
  title,
  description,
  username,
  displayName,
  profileimage,
  bio,
  media
) {
  const userId = supabase.auth.currentUser.id;
  const { data, error } = await supabase.from("post").insert([
    {
      user_id: userId,
      title: title,
      description: description,
      username: username,
      DisplayName: displayName,
      profileImage: profileimage,
      bio: bio,
      media: media,
    },
  ]);
}

export async function getUsers() {
  const resp = await supabase.from("profiles").select("*");

  return resp;
}

export async function getPosts() {
  const resp = await supabase.from("post").select("*");
  return resp;
}

export async function getUserByIds() {
  const { user, setUser } = useUser();
  const userId = supabase.auth.currentUser.id;
  console.log("user", userId);

  const { data } = await supabase
    .from("profiles")
    .select("*")
    .eq("user_id", userId)
    .single();
  setUser(data);
  console.log("currentUserContext", user);
}

export async function signUp(email, password) {
  let { user } = await supabase.auth
    .signUp({
      email: email,
      password: password,
    })
    .then(() =>
      console.log("supabase.auth.currentUser", supabase.auth.currentUser)
    )
    .then(() => navigation.navigate("Username"));

  return { user, error };
}

export async function editProfile(username, displayName, bio) {
  const userId = supabase.auth.currentUser.id;

  const { data, error } = await supabase
    .from("profiles")
    .update({ username: username, displayName: displayName, bio: bio })
    .eq("user_id", userId);
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
