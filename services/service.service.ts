import { supabase } from "@/lib/supabase";

// GET ALL SERVICES
export async function getServices() {
  const { data, error } = await supabase.from("services").select("*");

  if (error) throw error;

  return data;
}

// GET SINGLE SERVICE
export async function getService(id: string) {
  const { data, error } = await supabase
    .from("services")
    .select(
      `
      *,
      vendors (
        id,
        business_name,
        description
      )
    `,
    )
    .eq("id", id)
    .single();

  if (error) throw error;

  return data;
}
