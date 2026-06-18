import { createClient } from "@/lib/supabaseServer";

export async function getBookingById(id: string, userId: string) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("bookings")
    .select(
      `
        id,
        user_id,
        vendor_id,
        booking_date,
        booking_time,
        status,

        services!bookings_service_fk (
          title,
          price,
          description
        ),

        vendors!bookings_vendor_fk (
          business_name
        )
        `,
    )
    .eq("id", id)
    .eq("user_id", userId)
    .single();

  if (error) {
    console.log("BOOKING DETAIL ERROR:", error);

    throw error;
  }

  return {
    ...data,
    services: Array.isArray(data.services) ? data.services[0] : data.services,

    vendors: Array.isArray(data.vendors) ? data.vendors[0] : data.vendors,
  };
}
