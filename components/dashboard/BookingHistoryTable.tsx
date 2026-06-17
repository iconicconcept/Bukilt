"use client";

import Link from "next/link";

export default function BookingHistoryTable({ bookings }: { bookings: any[] }) {
  if (!bookings.length) {
    return (
      <div className="card p-8 text-center">
        <p className="text-slate-500">No bookings found.</p>
      </div>
    );
  }

  return (
    <div className="card overflow-hidden">
      <table className="w-full text-sm">
        <thead className="bg-slate-50">
          <tr>
            <th className="p-4 text-left">Service</th>

            <th className="p-4 text-left">Vendor</th>

            <th className="p-4 text-left">Date</th>

            <th className="p-4 text-left">Status</th>

            <th />
          </tr>
        </thead>

        <tbody>
          {bookings.map((booking) => (
            <tr key={booking.id} className="border-b">
              <td className="p-4">{booking.services?.title}</td>

              <td className="p-4">{booking.vendors?.business_name}</td>

              <td className="p-4">{booking.booking_date}</td>

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
                <Link
                  href={`/dashboard/bookings/${booking.id}`}
                  className="text-primary"
                >
                  View
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
