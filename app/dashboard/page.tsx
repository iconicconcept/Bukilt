import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabaseServer";
import { getUserBookings } from "@/services/server/booking.service";
import { getDashboardStats } from "@/utils/dashboard";
import UpcomingBookings from "@/components/dashboard/UpcomingBookings";
import { getUpcomingBookings } from "@/utils/dashboard";
import RecentBookings from "@/components/dashboard/RecentBookings";
import AccountOverview from "@/components/dashboard/AccountOverview";

export default async function DashboardPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  console.log("SERVER USER:", user);

  if (!user) {
    redirect("/auth/login");
  }

  const bookings = await getUserBookings(user.id);
  const stats = getDashboardStats(bookings);
  const upcomingBookings = getUpcomingBookings(bookings);

  return (
    <div className="section">
      <div className="container-custom">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Dashboard</h1>

          <p className="text-slate-500">Manage your bookings and activity.</p>
        </div>

        <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">
          <div className="card p-6">
            <p className="text-sm text-slate-500">Total Bookings</p>

            <h2 className="text-3xl font-bold mt-2">{stats.total}</h2>
          </div>

          <div className="card p-6">
            <p className="text-sm text-slate-500">Upcoming</p>

            <h2 className="text-3xl font-bold mt-2">{stats.upcoming}</h2>
          </div>

          <div className="card p-6">
            <p className="text-sm text-slate-500">Completed</p>

            <h2 className="text-3xl font-bold mt-2">{stats.completed}</h2>
          </div>

          <div className="card p-6">
            <p className="text-sm text-slate-500">Cancelled</p>

            <h2 className="text-3xl font-bold mt-2">{stats.cancelled}</h2>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6 mt-8">
          <div className="lg:col-span-2">
            <UpcomingBookings bookings={upcomingBookings} />
          </div>

          <AccountOverview
            email={user.email ?? ""}
            createdAt={user.created_at}
            bookingCount={bookings.length}
          />
        </div>

        <div className="mt-8">
          <RecentBookings bookings={bookings} />
        </div>
      </div>
    </div>
  );
}
