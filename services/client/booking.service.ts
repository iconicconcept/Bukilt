import { supabase } from "@/lib/supabase";
import { checkBookingExists } from "../client/availability.service";

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
  const exists = await checkBookingExists({
    serviceId,
    date,
    time,
  });

  if (exists) {
    throw new Error("Booking already exists");
  }
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
