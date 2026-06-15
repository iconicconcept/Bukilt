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
