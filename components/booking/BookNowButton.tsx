"use client";

import { useBookingStore } from "@/store/booking.store";

export default function BookNowButton({
  serviceId,
  vendorId,
}: {
  serviceId: string;
  vendorId: string;
}) {
  const setService = useBookingStore((s) => s.setService);
  const setVendor = useBookingStore((s) => s.setVendor);
  const openModal = useBookingStore((s) => s.openModal);

  const handleClick = () => {
    setService(serviceId);
    setVendor(vendorId);
    openModal();
  };

  return (
    <button onClick={handleClick} className="btn-primary w-full mt-5">
      Book Now
    </button>
  );
}
