import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabaseServer";
import { getUserBookings } from "@/services/server/booking.service";

import BookingHistoryTable from "@/components/dashboard/BookingHistoryTable";

export default async function BookingsPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/auth/login");
  }

  const bookings = await getUserBookings(user.id);

  return (
    <div className="section">
      <div className="container-custom">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">My Bookings</h1>

          <p className="text-slate-500">Manage all your bookings.</p>
        </div>

        <BookingHistoryTable bookings={bookings} />
      </div>
    </div>
  );
}
