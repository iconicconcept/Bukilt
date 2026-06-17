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

export async function getVendorByOwnerId(ownerId: string) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("vendors")
    .select("*")
    .eq("owner_id", ownerId)
    .maybeSingle();

  if (error) throw error;

  return data;
}

export async function isVendor(ownerId: string) {
  const vendor = await getVendorByOwnerId(ownerId);

  return !!vendor;
}

export async function updateVendor(
  vendorId: string,
  data: {
    businessName: string;
    description: string;
    category: string;
    phone: string;
    location: string;
    logo?: string;
  },
) {
  const supabase = await createClient();

  const { data: vendor, error } = await supabase
    .from("vendors")
    .update({
      business_name: data.businessName,
      description: data.description,
      category: data.category,
      phone: data.phone,
      location: data.location,
      logo: data.logo,
    })
    .eq("id", vendorId)
    .select()
    .single();

  if (error) throw error;

  return vendor;
}
