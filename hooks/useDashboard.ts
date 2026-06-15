"use client";

import { useEffect } from "react";
import { useAuthStore } from "@/store/auth.store";
import { useDashboardStore } from "@/store/dashboard.store";
import { getUserBookings } from "@/services/booking.service";

export function useDashboard() {
  const user = useAuthStore(
    (s) => s.user
  );

  const {
    bookings,
    loading,
    setBookings,
    setLoading,
  } = useDashboardStore();

  useEffect(() => {
    async function load() {
      if (!user) return;

      try {
        const data =
          await getUserBookings(user.id);

        setBookings(data ?? []);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [user, setBookings, setLoading]);

  return {
    bookings,
    loading,
  };
}