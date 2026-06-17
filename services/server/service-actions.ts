"use server";

import { createClient } from "@/lib/supabaseServer";
import { revalidatePath } from "next/cache";

export async function deleteService(formData: FormData) {
  const id = formData.get("id") as string;

  const supabase = await createClient();

  await supabase.from("services").delete().eq("id", id);

  revalidatePath("/dashboard/vendor/services");
}
