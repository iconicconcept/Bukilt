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
