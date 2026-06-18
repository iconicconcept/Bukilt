"use server";

import { createClient } from "@/lib/supabaseServer";
import { createReview } from "@/services/server/review.service";
import { revalidatePath } from "next/cache";

export async function createReviewAction(formData: FormData) {
  const bookingId = formData.get("bookingId") as string;

  const vendorId = formData.get("vendorId") as string;

  const rating = Number(formData.get("rating"));

  const comment = formData.get("comment") as string;

  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("Unauthorized");
  }

  const review = await createReview({
    bookingId,
    userId: user.id,
    vendorId,
    rating,
    comment,
  });

  revalidatePath(`/dashboard/bookings/${bookingId}`);

  return review;
}
