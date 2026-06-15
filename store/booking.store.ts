import { create } from "zustand";

type BookingState = {
  serviceId: string | null;
  date: string | null;
  time: string | null;
  vendorId: string | null;

  isOpen: boolean;

  setService: (id: string) => void;
  setDate: (date: string) => void;
  setTime: (time: string) => void;
  setVendor: (id: string) => void;

  openModal: () => void;
  closeModal: () => void;

  reset: () => void;
};

export const useBookingStore = create<BookingState>((set) => ({
  serviceId: null,
  vendorId: null,
  date: null,
  time: null,
  isOpen: false,

  setService: (id) => set({ serviceId: id }),
  setVendor: (id) => set({ vendorId: id }),

  setDate: (date) => set({ date }),
  setTime: (time) => set({ time }),

  openModal: () => set({ isOpen: true }),

  closeModal: () =>
    set({
      isOpen: false,
      serviceId: null,
      vendorId: null,
      date: null,
      time: null,
    }),

  reset: () =>
    set({
      serviceId: null,
      vendorId: null,
      date: null,
      time: null,
    }),
}));
