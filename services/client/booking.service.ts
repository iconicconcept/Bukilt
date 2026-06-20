import { supabase } from "@/lib/supabase";

import { checkBookingExists } from "../client/availability.service";
import { getAvailableSlots } from "../server/availability.service";

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

  const availableSlots = await getAvailableSlots(vendorId, date);

  if (!availableSlots.includes(time)) {
    throw new Error("This slot is no longer available");
  }

  if (exists) {
    throw new Error("Booking already exists");
  }

  const { data: booking, error } = await supabase
    .from("bookings")
    .insert({
      service_id: serviceId,
      vendor_id: vendorId,
      user_id: userId,
      booking_date: date,
      booking_time: time,
      status: "pending",
    })
    .select()
    .single();

  if (error) {
    if (error.code === "23505") {
      throw new Error("This slot was just booked. Please choose another time.");
    }

    throw error;
  }

  const { error: notificationError } = await supabase
    .from("notifications")
    .insert({
      vendor_id: vendorId,
      type: "booking",
      title: "New Booking",
      message: "You received a new booking request.",
    });

  if (notificationError) {
    throw notificationError;
  }

  return booking;
}
