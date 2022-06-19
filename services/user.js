import { supabase } from "./supabase";

export async function signInUser(email, password) {
  const { user, error } = await supabase.auth.signIn({ email, password });
  if (error) throw error;
  return user;
}

export function getUser() {
  return supabase.auth.user();
}

export async function getUserById(id) {
  const resp = await supabase
    .from("profiles")
    .select("*")
    .match({ id })
    .single();
  return resp;
}

export function getUserEmail() {
  const userEmail = supabase.auth.currentUser.email;
  console.log("userEmail", userEmail);
  return userEmail;
}

export async function getUsername() {
  try {
    await supabase.auth.user();
  } catch (error) {
    if (error) {
      return error;
    }
  }
}

export async function addUsername(username) {
  const { data, error } = await supabase
    .from("profiles")
    .insert([{ username: username, users_id: supabase.auth.currentUser.id }]);
}
