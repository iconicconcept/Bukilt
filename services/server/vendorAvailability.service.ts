import { createClient } from "@/lib/supabaseServer";

export async function getVendorAvailability(vendorId: string) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("vendor_availability")
    .select("*")
    .eq("vendor_id", vendorId)
    .order("day_of_week");

  if (error) throw error;

  return data ?? [];
}

export async function saveAvailability(vendorId: string, availability: any[]) {
  const supabase = await createClient();

  await supabase.from("vendor_availability").delete().eq("vendor_id", vendorId);

  const rows = availability.map((item) => ({
    vendor_id: vendorId,
    day_of_week: item.day_of_week,
    start_time: item.start_time,
    end_time: item.end_time,
  }));

  const { error } = await supabase.from("vendor_availability").insert(rows);

  if (error) throw error;
}
