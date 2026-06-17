"use server";

import { revalidatePath } from "next/cache";

import { updateBookingStatus } from "@/services/server/vendorBooking.service";

export async function updateBookingAction(formData: FormData) {
  const bookingId = formData.get("bookingId") as string;

  const status = formData.get("status") as string;

  await updateBookingStatus(bookingId, status);

  revalidatePath("/dashboard/vendor/bookings");
}
