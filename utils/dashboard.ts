export function getDashboardStats(bookings: any[]) {
  return {
    total: bookings.length,

    upcoming: bookings.filter(
      (b) => b.status === "pending" || b.status === "confirmed",
    ).length,

    completed: bookings.filter((b) => b.status === "completed").length,

    cancelled: bookings.filter((b) => b.status === "cancelled").length,
  };
}

export function getUpcomingBookings(bookings: any[]) {
  return bookings
    .filter(
      (booking) =>
        booking.status === "pending" || booking.status === "confirmed",
    )
    .slice(0, 3);
}
