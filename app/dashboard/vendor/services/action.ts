"use server";

import { createClient } from "@/lib/supabaseServer";
import { deleteService } from "@/services/server/service-management.service";
import { getVendorByOwnerId } from "@/services/server/vendor.service";
import { revalidatePath } from "next/cache";

export async function deleteServiceAction(formData: FormData) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const vendor = await getVendorByOwnerId(user.id);

  if (!user) {
    throw new Error("Unauthorized");
  }

  if (!vendor) {
    throw new Error("Vendor not found");
  }

  const serviceId = formData.get("serviceId") as string;

  await deleteService(serviceId, vendor.id);

  revalidatePath("/dashboard/vendor/services");
}
