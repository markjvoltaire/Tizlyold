import { supabase } from "./supabase";

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
  const { data, error } = await supabase.from("profiles").insert([
    {
      username: username,
      user_id: supabase.auth.currentUser.id,
      email: supabase.auth.currentUser.email,
      displayName: displayName,
    },
  ]);
}

export async function getUsers() {
  const { data: profiles, error } = await supabase.from("profiles").select("*");
}

export async function getUserById() {
  const userId = supabase.auth.currentUser.id;
  console.log("user", userId);

  const { data } = await supabase
    .from("profiles")
    .select("*")
    .eq("user_id", userId)
    .single();
  setCurrentUser(data);
  console.log("currentUser", currentUser.username);
}
