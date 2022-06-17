import { supabase } from "./supabase";

export async function signInUser(email, password) {
  const { user, error } = await supabase.auth.signIn({ email, password });
  if (error) throw error;
  return user;
}

export function getUser() {
  return supabase.auth.user();
}

export async function getUserById(users_id) {
  const resp = await supabase
    .from("profiles")
    .select("*")
    .match({ users_id })
    .single();
  return resp;
}

export function getUserEmail() {
  return supabase.auth.currentUser.email;
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
