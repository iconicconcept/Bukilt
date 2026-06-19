import { supabase } from "@/lib/supabase";

// GET ALL SERVICES
export async function getServices(filters?: {
  search?: string;
  category?: string;
}) {
  let query = supabase.from("services").select(`
      *,
      vendors(
        category,
        business_name,
        location
      )
    `);

  if (filters?.search) {
    query = query.ilike("title", `%${filters.search}%`);
  }

  if (filters?.category) {
    query = query.eq("vendors.category", filters.category);
  }

  const { data, error } = await query;

  if (error) throw error;

  return data ?? [];
}

// GET SINGLE SERVICE
export async function getService(id: string) {
  const { data, error } = await supabase
    .from("services")
    .select(
      `
      *,
      vendors!services_vendor_id_fkey (
      id,
      business_name,
      description,
      logo,
      category,
      location
      )
      `,
    )
    .eq("id", id)
    .single();

  if (error) throw error;

  return data;
}

export async function getServiceReviews(serviceId: string) {
  const { data, error } = await supabase
    .from("reviews")
    .select(
      `
        rating,
        comment,
        created_at,
        profiles(
          email
        )
        `,
    )
    .eq("service_id", serviceId)
    .order("created_at", {
      ascending: false,
    });

  if (error) {
    throw error;
  }

  const reviews = data ?? [];

  const average = reviews.length
    ? (
        reviews.reduce((sum, item) => sum + item.rating, 0) / reviews.length
      ).toFixed(1)
    : "0";

  return {
    reviews,
    average,
    count: reviews.length,
  };
}
