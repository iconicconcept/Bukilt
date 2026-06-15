import { create } from "zustand";

type DashboardState = {
  bookings: any[];
  loading: boolean;

  setBookings: (bookings: any[]) => void;
  setLoading: (loading: boolean) => void;
};

export const useDashboardStore = create<DashboardState>((set) => ({
  bookings: [],
  loading: true,

  setBookings: (bookings) => set({ bookings }),

  setLoading: (loading) => set({ loading }),
}));
