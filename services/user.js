import { supabase, client } from "./supabase";

export async function signUpWithEmail() {
  setLoading(true);
  const { user, error } = await supabase.auth.signUp({
    email: email,
    password: password,
  });

  if (error) Alert.alert(error.message);
  setLoading(false);

  return user;
}
