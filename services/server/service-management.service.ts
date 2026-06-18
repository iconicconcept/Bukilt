import { createClient } from "@/lib/supabaseServer";

type CreateServiceInput = {
  vendorId: string;
  title: string;
  description: string;
  price: number;
  duration: number;
  image?: string;
};

export async function createService({
  vendorId,
  title,
  description,
  price,
  duration,
  image,
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
      image,
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

export async function getServiceById(serviceId: string) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("services")
    .select("*")
    .eq("id", serviceId)
    .single();

  if (error) throw error;

  return data;
}

export async function updateService(
  serviceId: string,
  data: {
    title: string;
    description: string;
    price: number;
    duration: number;
    image: string;
  },
) {
  const supabase = await createClient();

  const { data: service, error } = await supabase
    .from("services")
    .update({
      title: data.title,
      description: data.description,
      price: data.price,
      duration: data.duration,
      image: data.image
    })
    .eq("id", serviceId)
    .select()
    .single();

  if (error) throw error;

  return service;
}

export async function deleteService(serviceId: string, vendorId: string) {
  const supabase = await createClient();

  const { error } = await supabase
    .from("services")
    .delete()
    .eq("id", serviceId)
    .eq("vendor_id", vendorId);

  if (error) throw error;
}
