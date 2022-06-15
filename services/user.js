import { supabase } from "./supabase";

export async function signInUser(email, password) {
  const { user, error } = await supabase.auth.signIn({ email, password });
  if (error) throw error;
  return user;
}

export function getUser() {
  return supabase.auth.user();
}

export function getUserEmail() {
  return supabase.auth.currentUser.email;
}
