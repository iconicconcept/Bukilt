import { createClient } from "@/lib/supabaseServer";

type CreateServiceInput = {
  vendorId: string;
  title: string;
  description: string;
  price: number;
  duration: number;
};

export async function createService({
  vendorId,
  title,
  description,
  price,
  duration,
}: CreateServiceInput) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("services")
    .insert({
      vendor_id: vendorId,
      title,
      description,
      price,
      duration,
    })
    .select()
    .single();

  if (error) throw error;

  return data;
}

export async function getVendorServices(vendorId: string) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("services")
    .select("*")
    .eq("vendor_id", vendorId)
    .order("created_at", {
      ascending: false,
    });

  if (error) throw error;

  return data ?? [];
}
