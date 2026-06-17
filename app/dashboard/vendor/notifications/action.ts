"use server";

import { createClient } from "@/lib/supabaseServer";

export async function markNotificationsAsRead(ids: string[]) {
  if (!ids.length) return;

  const supabase = await createClient();

  const { error } = await supabase
    .from("notifications")
    .update({
      read: true,
    })
    .in("id", ids);

  if (error) {
    throw error;
  }
}
