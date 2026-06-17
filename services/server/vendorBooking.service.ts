import { createClient } from "@/lib/supabaseServer";

export async function getVendorBookings(vendorId: string) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("bookings")
    .select(
      `
      id,
      booking_date,
      booking_time,
      status,
      created_at,

      services!bookings_service_fk(
        title,
        price
      ),

      users:user_id(
        email
      )
    `,
    )
    .eq("vendor_id", vendorId)
    .order("created_at", {
      ascending: false,
    });

  if (error) {
    console.log(error);
    throw error;
  }

  return data ?? [];
}

export async function updateBookingStatus(
  bookingId: string,
  status: string,
) {
  const supabase = await createClient();

  const { error } = await supabase
    .from("bookings")
    .update({
      status,
    })
    .eq("id", bookingId);

  if (error) {
    throw error;
  }
}
