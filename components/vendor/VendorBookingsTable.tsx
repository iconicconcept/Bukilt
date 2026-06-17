"use client";

import { updateBookingAction } from "@/app/dashboard/vendor/bookings/actions";

export default function VendorBookingsTable({ bookings }: { bookings: any[] }) {
  if (!bookings.length) {
    return (
      <div className="card p-8 text-center">
        <p className="text-slate-500">No bookings yet.</p>
      </div>
    );
  }

  return (
    <div className="card overflow-hidden">
      <table className="w-full text-sm">
        <thead className="bg-slate-50">
          <tr>
            <th className="p-4 text-left">Service</th>

            <th className="p-4 text-left">Customer</th>

            <th className="p-4 text-left">Date</th>

            <th className="p-4 text-left">Status</th>

            <th />
          </tr>
        </thead>

        <tbody>
          {bookings.map((booking) => (
            <tr key={booking.id} className="border-b">
              <td className="p-4">{booking.services?.title}</td>

              <td className="p-4">{booking.users?.email}</td>

              <td className="p-4">
                {booking.booking_date}

                <br />

                {booking.booking_time}
              </td>

              <td className="p-4">
                <span
                  className="
                    px-3 py-1
                    rounded-full
                    text-xs
                    bg-slate-100
                    "
                >
                  {booking.status}
                </span>
              </td>

              <td className="p-4">
                <div className="flex gap-2">
                  {booking.status === "pending" && (
                    <>
                      <form action={updateBookingAction}>
                        <input
                          type="hidden"
                          name="bookingId"
                          value={booking.id}
                        />

                        <input type="hidden" name="status" value="accepted" />

                        <button className="btn-primary text-sm">Accept</button>
                      </form>

                      <form action={updateBookingAction}>
                        <input
                          type="hidden"
                          name="bookingId"
                          value={booking.id}
                        />

                        <input type="hidden" name="status" value="rejected" />

                        <button
                          className="
                            px-3 py-2
                            rounded-xl
                            border
                            border-red-500
                            text-red-500
                            "
                        >
                          Reject
                        </button>
                      </form>
                    </>
                  )}
                  {booking.status === "accepted" && (
                    <form action={updateBookingAction}>
                      <input
                        type="hidden"
                        name="bookingId"
                        value={booking.id}
                      />

                      <input type="hidden" name="status" value="completed" />

                      <button
                        className="
                        px-3 py-2
                        rounded-xl
                        bg-green-600
                        text-white
                        cursor-pointer
                        "
                      >
                        Complete
                      </button>
                    </form>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
