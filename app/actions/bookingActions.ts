"use server";

import { createClient } from "@/lib/supabaseServer";

export async function cancelBooking(bookingId: string) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("Unauthorized");
  }

  const { error } = await supabase
    .from("bookings")
    .update({
      status: "cancelled",
    })
    .eq("id", bookingId)
    .eq("user_id", user.id);

  if (error) {
    throw error;
  }

  return {
    success: true,
  };
}
