"use client";

import { useState } from "react";
import Link from "next/link";

export default function BookingTabs({ bookings }: { bookings: any[] }) {
  const [active, setActive] = useState("all");

  const filters = [
    "all",
    "pending",
    "accepted",
    "completed",
    "cancelled",
    "rejected",
  ];

  const filtered =
    active === "all" ? bookings : bookings.filter((b) => b.status === active);

  return (
    <div>
      <div className="flex gap-3 flex-wrap mb-8">
        {filters.map((filter) => (
          <button
            key={filter}
            onClick={() => setActive(filter)}
            className={`
                px-4 py-2 rounded-xl border
                ${active === filter ? "bg-primary text-white" : "bg-white"}
                `}
          >
            {filter}
          </button>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {filtered.map((booking) => (
          <div key={booking.id} className="card p-6">
            <h3 className="font-bold text-lg">{booking.services?.title}</h3>

            <p className="text-slate-500">{booking.vendors?.business_name}</p>

            <div className="mt-4">
              <p>📅 {booking.booking_date}</p>

              <p>⏰ {booking.booking_time}</p>
            </div>

            <div className="mt-4 flex justify-between items-center">
              <span className="badge">{booking.status}</span>

              <Link
                href={`/dashboard/bookings/${booking.id}`}
                className="text-primary"
              >
                View
              </Link>
            </div>
          </div>
        ))}

        {!filtered.length && <div className="card p-8">No bookings found</div>}
      </div>
    </div>
  );
}
