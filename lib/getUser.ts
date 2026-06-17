// import { supabase } from "@/lib/supabase";

// export async function getUser() {
//   const { data } = await supabase.auth.getUser();
//   return data.user;
// }

"use client";

import { supabase } from "@/lib/supabase";

export async function getUser() {
  const {
    data: { session },
  } = await supabase.auth.getSession();

  return session?.user ?? null;
}
