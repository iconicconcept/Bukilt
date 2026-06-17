type Props = {
  bookings: any[];
};

export default function UpcomingBookings({ bookings }: Props) {
  if (!bookings.length) {
    return (
      <div className="card p-6">
        <h3 className="font-semibold">Upcoming Bookings</h3>

        <p className="text-slate-500 mt-4">No upcoming bookings.</p>
      </div>
    );
  }

  return (
    <div className="card p-6">
      <h3 className="font-semibold mb-5">Upcoming Bookings</h3>

      <div className="space-y-4">
        {bookings.map((booking) => (
          <div key={booking.id} className="border rounded-xl p-4">
            <div className="flex justify-between">
              <div>
                <h4 className="font-medium">{booking.services?.title}</h4>

                <p className="text-sm text-slate-500">
                  {booking.vendors?.business_name}
                </p>
              </div>

              <span
                className="
                px-3 py-1
                rounded-full
                text-xs
                bg-blue-100
                text-blue-600
              "
              >
                {booking.status}
              </span>
            </div>

            <div className="mt-3 text-sm">
              <p>📅 {booking.booking_date}</p>

              <p>⏰ {booking.booking_time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
