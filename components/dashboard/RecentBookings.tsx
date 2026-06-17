type Props = {
  bookings: any[];
};

export default function RecentBookings({ bookings }: Props) {
  if (!bookings.length) {
    return (
      <div className="card p-6">
        <h3 className="font-semibold">Recent Bookings</h3>

        <p className="text-slate-500 mt-4">No bookings yet.</p>
      </div>
    );
  }

  return (
    <div className="card overflow-hidden">
      <div className="p-6 border-b">
        <h3 className="font-semibold">Recent Bookings</h3>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-slate-50 dark:bg-slate-900">
            <tr>
              <th className="text-left p-4">Service</th>

              <th className="text-left p-4">Vendor</th>

              <th className="text-left p-4">Date</th>

              <th className="text-left p-4">Time</th>

              <th className="text-left p-4">Status</th>
            </tr>
          </thead>

          <tbody>
            {bookings.slice(0, 5).map((booking) => (
              <tr key={booking.id} className="border-b">
                <td className="p-4 font-medium">{booking.services?.title}</td>

                <td className="p-4 text-slate-500">
                  {booking.vendors?.business_name}
                </td>

                <td className="p-4">{booking.booking_date}</td>

                <td className="p-4">{booking.booking_time}</td>

                <td className="p-4">
                  <span
                    className={`
                    px-3 py-1
                    rounded-full
                    text-xs

                    ${
                      booking.status === "completed"
                        ? "bg-green-100 text-green-600"
                        : booking.status === "cancelled"
                          ? "bg-red-100 text-red-600"
                          : "bg-blue-100 text-blue-600"
                    }
                  `}
                  >
                    {booking.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
