import { createClient } from "@/lib/supabaseServer";

export async function cancelBooking(bookingId: string, userId: string) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("bookings")
    .update({
      status: "cancelled",
    })
    .eq("id", bookingId)
    .eq("user_id", userId)
    .neq("status", "completed")
    .neq("status", "cancelled")
    .select()
    .single();

  if (error) {
    throw error;
  }

  return data;
}
