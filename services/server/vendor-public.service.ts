import { createClient } from "@/lib/supabaseServer";

export async function getPublicVendor(vendorId: string) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("vendors")
    .select("*")
    .eq("id", vendorId)
    .single();

  if (error) {
    throw error;
  }

  return data;
}

export async function getPublicVendorServices(vendorId: string) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("services")
    .select("*")
    .eq("vendor_id", vendorId);

  if (error) {
    throw error;
  }

  return data ?? [];
}
