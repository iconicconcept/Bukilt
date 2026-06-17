import { createClient } from "@/lib/supabaseServer";

type CreateVendorInput = {
  ownerId: string;
  businessName: string;
  description: string;
};

export async function createVendor({
  ownerId,
  businessName,
  description,
}: CreateVendorInput) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("vendors")
    .insert({
      owner_id: ownerId,
      business_name: businessName,
      description,
    })
    .select()
    .single();

  if (error) throw error;

  return data;
}

export async function getVendorByOwnerId(
  ownerId: string,
) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("vendors")
    .select("*")
    .eq("owner_id", ownerId)
    .maybeSingle();

  if (error) throw error;

  return data;
}

export async function isVendor(
  ownerId: string,
) {
  const vendor =
    await getVendorByOwnerId(ownerId);

  return !!vendor;
}
