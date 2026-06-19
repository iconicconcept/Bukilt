import { createClient } from "@/lib/supabaseServer";

function formatSlot(hour: number) {
  const date = new Date();

  date.setHours(hour);
  date.setMinutes(0);

  return date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
}

export async function checkBookingExists({
  serviceId,
  date,
  time,
}: {
  serviceId: string;
  date: string;
  time: string;
}) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("bookings")
    .select("id")
    .eq("service_id", serviceId)
    .eq("booking_date", date)
    .eq("booking_time", time)
    .in("status", ["pending", "confirmed"])
    .maybeSingle();

  if (error) {
    throw error;
  }

  return !!data;
}

export async function getAvailableSlots(vendorId: string, date: string) {
  const supabase = await createClient();

  const { data: vendor } = await supabase
    .from("vendors")
    .select(
      `
      available_days,
      start_time,
      end_time
    `,
    )
    .eq("id", vendorId)
    .single();

  if (!vendor) {
    return [];
  }

  const dayName = new Date(date).toLocaleDateString("en-US", {
    weekday: "long",
  });

  if (!vendor.available_days?.includes(dayName)) {
    return [];
  }

  const slots: string[] = [];

  const startHour = Number(vendor.start_time.split(":")[0]);

  const endHour = Number(vendor.end_time.split(":")[0]);

  for (let hour = startHour; hour < endHour; hour++) {
    slots.push(formatSlot(hour));
  }

  const { data: bookings } = await supabase
    .from("bookings")
    .select("booking_time")
    .eq("vendor_id", vendorId)
    .eq("booking_date", date)
    .in("status", ["pending", "confirmed"]);

  const booked = bookings?.map((b) => b.booking_time) ?? [];

  return slots.filter((slot) => !booked.includes(slot));
}
