"use server";

import { createClient } from "@/lib/supabaseServer";
import { updateService } from "@/services/server/service-management.service";

export async function updateServiceAction(formData: FormData) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("Unauthorized");
  }

  const id = formData.get("id") as string;

  const title = formData.get("title") as string;

  const description = formData.get("description") as string;

  const price = Number(formData.get("price"));

  const duration = Number(formData.get("duration"));

  return updateService(id, {
    title,
    description,
    price,
    duration,
  });
}
