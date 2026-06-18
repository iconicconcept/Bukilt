import { createClient } from "@/lib/supabaseServer";

export async function createNotification(data: {
  userId?: string;
  vendorId?: string;
  type: string;
  title: string;
  message: string;
}) {
  const supabase = await createClient();

  const { error } = await supabase.from("notifications").insert({
    user_id: data.userId,

    vendor_id: data.vendorId,

    type: data.type,

    title: data.title,

    message: data.message,
  });

  if (error) throw error;
}

export async function getVendorNotifications(vendorId: string) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("notifications")
    .select("*")
    .eq("vendor_id", vendorId)
    .order("created_at", {
      ascending: false,
    });

  if (error) {
    throw error;
  }

  return data ?? [];
}

export async function getUserNotifications(userId: string) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("notifications")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", {
      ascending: false,
    });

  if (error) {
    throw error;
  }

  return data ?? [];
}
