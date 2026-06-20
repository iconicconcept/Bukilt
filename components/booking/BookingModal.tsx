"use client";

import { useState } from "react";
import { createBooking } from "@/services/client/booking.service";
import { useAuthStore } from "@/store/auth.store";
import { useBookingStore } from "@/store/booking.store";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function BookingModal() {
  const { isOpen, closeModal, date, setDate, time, setTime } =
    useBookingStore();
  const [loading, setLoading] = useState(false);
  const [slots, setSlots] = useState<string[]>([]);
  const router = useRouter();
  const user = useAuthStore((state) => state.user);

  if (!isOpen) return null;

  async function loadSlots(vendorId: string, date: string) {
    const response = await fetch(
      `/api/availability?vendorId=${vendorId}&date=${date}`,
    );

    const data = await response.json();

    setSlots(data);
  }

  const handleConfirm = async () => {
    try {
      setLoading(true);

      if (!user) {
        toast.error("Please login first");
        return;
      }

      const { serviceId, vendorId, date, time, closeModal } =
        useBookingStore.getState();

      if (!serviceId || !vendorId || !date || !time) {
        toast.error("Select date and time");
        return;
      }

      if (!date) {
        toast.error("Select a date");
        return;
      }

      if (!time) {
        toast.error("Select a time");
        return;
      }

      await createBooking({
        serviceId,
        vendorId,
        date,
        time,
        userId: user.id,
      });

      toast.success("Booking confirmed successfully!");

      setDate("");
      setTime("");

      closeModal();

      router.push("/dashboard/bookings");
    } catch (err: any) {
      console.error("Booking error:", err);
      toast.error(err.message || "Booking failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={closeModal}
      />

      {/* Modal */}
      <div className="relative w-full max-w-md card p-6 animate-fade">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Book Service</h2>

          <button
            onClick={closeModal}
            className="text-slate-500 hover:text-black"
          >
            ✕
          </button>
        </div>

        {/* STEP 1: DATE */}
        <div className="space-y-2">
          <label className="text-sm text-slate-500">Select Date</label>

          <input
            type="date"
            min={new Date().toISOString().split("T")[0]}
            className="w-full border rounded-xl p-2"
            value={date || ""}
            onChange={async (e) => {
              const selectedDate = e.target.value;

              setDate(selectedDate);

              const { vendorId } = useBookingStore.getState();

              if (!vendorId) return;

              const response = await fetch(
                `/api/availability?vendorId=${vendorId}&date=${selectedDate}`,
              );

              const data = await response.json();

              setSlots(data);
            }}
          />
        </div>

        {/* STEP 2: TIME */}
        <div className="space-y-2 mt-4">
          <label className="text-sm text-slate-500">Select Time</label>

          <select
            value={time || ""}
            onChange={(e) => setTime(e.target.value)}
            className="w-full border rounded-xl p-3"
          >
            <option value="">Select Time</option>

            {slots.map((slot) => (
              <option key={slot} value={slot}>
                {slot}
              </option>
            ))}
          </select>
        </div>

        {date && slots.length === 0 && (
          <p className="text-red-500 text-sm">
            No available slots for this day.
          </p>
        )}

        {/* ACTION */}
        <button
          onClick={handleConfirm}
          disabled={loading}
          className="
            btn-primary
            w-full
            mt-6
            disabled:opacity-50
          "
        >
          {loading ? "Processing..." : "Confirm Booking"}
        </button>
      </div>
    </div>
  );
}
