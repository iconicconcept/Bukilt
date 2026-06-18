import { createClient } from "@/lib/supabaseServer";

export async function createReview({
  bookingId,
  userId,
  vendorId,
  rating,
  comment,
}: {
  bookingId: string;
  userId: string;
  vendorId: string;
  rating: number;
  comment: string;
}) {
  const supabase = await createClient();

  // Get booking first
  const { data: booking, error: bookingError } = await supabase
    .from("bookings")
    .select(
      `
        id,
        user_id,
        vendor_id,
        service_id,
        status
        `,
    )
    .eq("id", bookingId)
    .single();

  if (bookingError) {
    throw bookingError;
  }

  if (!booking) {
    throw new Error("Booking not found");
  }

  if (booking.user_id !== userId) {
    throw new Error("Unauthorized");
  }

  if (booking.status !== "completed") {
    throw new Error("Only completed bookings can be reviewed");
  }

  const { data, error } = await supabase
    .from("reviews")
    .insert({
      booking_id: bookingId,
      user_id: userId,
      vendor_id: vendorId,
      service_id: booking.service_id,
      rating,
      comment,
    })
    .select()
    .single();

  if (error) {
    if (error.code === "23505") {
      throw new Error("You already reviewed this booking");
    }

    throw error;
  }

  return data;
}

export async function getBookingReview(bookingId: string) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("reviews")
    .select("*")
    .eq("booking_id", bookingId)
    .maybeSingle();

  if (error) {
    throw error;
  }

  return data;
}

export async function getVendorReviewSummary(vendorId: string) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("reviews")
    .select(
      `
        rating,
        comment,
        created_at,
        profiles(
          email
        ),
        services(
          title
        )
        `,
    )
    .eq("vendor_id", vendorId)
    .order("created_at", {
      ascending: false,
    });

  if (error) {
    throw error;
  }

  const reviews = data ?? [];

  const average = reviews.length
    ? (
        reviews.reduce((sum, item) => sum + item.rating, 0) / reviews.length
      ).toFixed(1)
    : "0";

  return {
    reviews,
    average,
    count: reviews.length,
  };
}

export async function getVendorRating(vendorId: string) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("reviews")
    .select("rating")
    .eq("vendor_id", vendorId);

  if (error) throw error;

  if (!data.length) return 0;

  const total = data.reduce((sum, r) => sum + r.rating, 0);

  return (total / data.length).toFixed(1);
}
