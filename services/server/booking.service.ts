import { createClient } from "@/lib/supabaseServer";

export async function getUserBookings(userId: string) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("bookings")
    .select(
      `
        *,
        services!bookings_service_fk (
            title,
            price
        ),
        vendors!bookings_vendor_fk (
        business_name
        )
        `,
    )
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  if (error) throw error;

  return data ?? [];
}
