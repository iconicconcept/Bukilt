import { supabase } from "@/lib/supabase";
import { createClient } from "@/lib/supabaseServer";

type CreateBookingInput = {
  serviceId: string;
  vendorId: string;
  date: string;
  time: string;
  userId: string;
};

export async function createBooking({
  serviceId,
  vendorId,
  date,
  time,
  userId,
}: CreateBookingInput) {
  const { data, error } = await supabase
    .from("bookings")
    .insert({
      service_id: serviceId,
      vendor_id: vendorId,
      booking_date: date,
      booking_time: time,
      user_id: userId,
      status: "pending",
    })
    .select()
    .single();

  if (error) throw error;

  return data;
}

export async function getUserBookings(userId: string) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("bookings")
    .select(
      `
      *,
      services (
        title,
        price
      ),
      vendors (
        business_name
      )
    `,
    )
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  if (error) throw error;

  return data ?? [];
}
