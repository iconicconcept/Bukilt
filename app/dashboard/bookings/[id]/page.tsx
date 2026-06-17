import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabaseServer";
import { getBookingById } from "@/services/server/bookingDetails.service";
import CancelBookingButton from "@/components/dashboard/CancelBookingButton";

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

          <CancelBookingButton
            bookingId={booking.id}
            status={booking.status}
          />
        </div>
      </div>
    </div>
  );
}
