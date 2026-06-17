import { supabaseBrowser } from "@/lib/supabaseBrowser";

export async function signUp(
  email: string,
  password: string,
  fullName: string,
) {
  const { data, error } = await supabaseBrowser.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: fullName,
      },
    },
  });

  if (error) throw error;

  return data;
}

export async function signIn(email: string, password: string) {
  const { data, error } = await supabaseBrowser.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw error;

  return data;
}

export async function signOut() {
  const { error } = await supabaseBrowser.auth.signOut();

  if (error) throw error;
}
