import { createClient } from "@/lib/supabaseServer";
import { getUserBookings } from "@/services/booking.service";
// import ProtectedRoute from "@/components/auth/ProtectedRoute";

export default async function DashboardPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return (
      <div className="section">
        <div className="container-custom">
          <p>Please login to view dashboard</p>
        </div>
      </div>
    );
  }

  const bookings = await getUserBookings(user.id);

  return (
    <div className="section">
      <div className="container-custom">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold">My Bookings</h1>
          <p className="text-slate-500">Track and manage your bookings</p>
        </div>

        {/* Table */}
        {bookings?.length === 0 ? (
          <div className="card p-10 text-center text-slate-500">
            No bookings yet
          </div>
        ) : (
          <div className="card overflow-hidden">
            <table className="w-full text-sm">
              <thead className="border-b bg-slate-50 dark:bg-slate-900">
                <tr>
                  <th className="text-left p-4">Service</th>
                  <th className="text-left p-4">Vendor</th>
                  <th className="text-left p-4">Date</th>
                  <th className="text-left p-4">Time</th>
                  <th className="text-left p-4">Status</th>
                </tr>
              </thead>

              <tbody>
                {bookings.map((b: any) => (
                  <tr key={b.id} className="border-b">
                    <td className="p-4 font-medium">{b.services?.title}</td>

                    <td className="p-4 text-slate-500">
                      {b.vendors?.business_name}
                    </td>

                    <td className="p-4">{b.booking_date}</td>

                    <td className="p-4">{b.booking_time}</td>

                    <td className="p-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs ${
                          b.status === "pending"
                            ? "bg-yellow-100 text-yellow-600"
                            : b.status === "confirmed"
                              ? "bg-blue-100 text-blue-600"
                              : b.status === "completed"
                                ? "bg-green-100 text-green-600"
                                : "bg-red-100 text-red-600"
                        }`}
                      >
                        {b.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
