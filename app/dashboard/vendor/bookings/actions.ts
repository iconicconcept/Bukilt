"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabaseServer";

export async function updateBookingAction(formData: FormData) {
  const bookingId = formData.get("bookingId") as string;

  const status = formData.get("status") as string;

  const supabase = await createClient();

  // update booking

  const { data: booking, error } = await supabase
    .from("bookings")
    .update({
      status,
    })
    .eq("id", bookingId)
    .select(
      `
 user_id,
 service_id,
 services(
  title
 )
`,
    )
    .single();

  if (error) {
    throw error;
  }

  // notify customer

  let title = "";
  let message = "";

  const { data: service } = await supabase
    .from("services")
    .select("title")
    .eq("id", booking.service_id)
    .single();

  const serviceTitle = service?.title ?? "service";

  if (status === "accepted") {
    title = "Booking Accepted";

    message = `Your booking for ${serviceTitle} was accepted`;
  }

  if (status === "rejected") {
    title = "Booking Rejected";

    message = `Your booking for ${serviceTitle} was rejected`;
  }

  if (status === "completed") {
    title = "Service Completed";

    message = `Your service ${serviceTitle} has been completed`;
  }

  if (title) {
    await supabase.from("notifications").insert({
      user_id: booking.user_id,

      type: "booking_update",

      title,

      message,
    });
  }

  revalidatePath("/dashboard/vendor/bookings");
}
