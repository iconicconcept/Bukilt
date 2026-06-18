import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabaseServer";
import { getBookingById } from "@/services/server/bookingDetails.service";
import CancelBookingButton from "@/components/dashboard/CancelBookingButton";
import ReviewForm from "@/components/reviews/ReviewForm";
import { getBookingReview } from "@/services/server/review.service";

// type BookingDetails = {
//   id: string;
//   booking_date: string;
//   booking_time: string;
//   status: string;

//   services: {
//     title: string;
//     price: number;
//     description: string;
//   };

//   vendors: {
//     business_name: string;
//     phone: string;
//     email: string;
//   };
// };

export default async function BookingDetailsPage({
  params,
}: {
  params: Promise<{
    id: string;
  }>;
}) {
  const { id } = await params;
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/auth/login");
  }

  const booking = await getBookingById(id, user.id);
  const review = await getBookingReview(id);

  return (
    <div className="section">
      <div className="container-custom">
        <h1 className="text-3xl font-bold mb-6">Booking Details</h1>

        <div className="card p-6 space-y-5">
          <div>
            <p className="text-slate-500">Service</p>

            <h2 className="font-semibold">{booking.services.title}</h2>
          </div>

          <div>
            <p className="text-slate-500">Vendor</p>

            <h2>{booking.vendors.business_name}</h2>
          </div>

          <div>
            <p className="text-slate-500">Date</p>

            <p>{booking.booking_date}</p>
          </div>

          <div>
            <p className="text-slate-500">Time</p>

            <p>{booking.booking_time}</p>
          </div>

          <div>
            <p className="text-slate-500">Status</p>

            <span className="badge">{booking.status}</span>
          </div>

          {booking.status !== "completed" && booking.status !== "cancelled" && (
            <CancelBookingButton
              bookingId={booking.id}
              status={booking.status}
            />
          )}

          {booking.status === "completed" && !review && (
            <div className="mt-8 border-t pt-6">
              <h3 className="text-xl font-bold mb-4">Rate this service</h3>

              <ReviewForm bookingId={booking.id} vendorId={booking.vendor_id} />
            </div>
          )}

          {review && (
            <div className="mt-8 border-t pt-6">
              <h3 className="font-bold">Your Review</h3>

              <div className="mt-3">
                <div className="text-yellow-500">
                  {"★".repeat(review.rating)}
                  <span className="text-slate-300">
                    {"★".repeat(5 - review.rating)}
                  </span>
                </div>

                <p className="text-slate-500 mt-2">{review.comment}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
