"use client";

import { cancelBooking } from "@/app/actions/bookingActions";
import { useTransition } from "react";

export default function CancelBookingButton({
  bookingId,
  status,
}: {
  bookingId: string;
  status: string;
}) {
  const [pending, startTransition] = useTransition();

  if (status === "cancelled") {
    return null;
  }

  return (
    <button
      disabled={pending}
      onClick={() => {
        startTransition(async () => {
          await cancelBooking(bookingId);

          window.location.reload();
        });
      }}
      className="btn-danger"
    >
      {pending ? "Cancelling..." : "Cancel Booking"}
    </button>
  );
}
