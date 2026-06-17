import { supabase } from "@/lib/supabase";

export async function checkBookingExists({
  serviceId,
  date,
  time,
}: {
  serviceId: string;
  date: string;
  time: string;
}) {
  const { data, error } = await supabase
    .from("bookings")
    .select("id")
    .eq("service_id", serviceId)
    .eq("booking_date", date)
    .eq("booking_time", time)
    .in("status", ["pending", "confirmed"])
    .maybeSingle();

  if (error) throw error;

  return !!data;
}
