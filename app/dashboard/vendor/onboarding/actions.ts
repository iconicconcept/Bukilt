"use server";

import { createClient } from "@/lib/supabaseServer";
import {
  createVendor,
  getVendorByOwnerId,
} from "@/services/server/vendor.service";

export async function createVendorAction(formData: FormData) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("Unauthorized");
  }

  const businessName = formData.get("businessName") as string;

  const description = formData.get("description") as string;

  const existingVendor = await getVendorByOwnerId(user.id);

  if (existingVendor) {
    throw new Error("Vendor profile already exists");
  }

  return createVendor({
    ownerId: user.id,
    businessName,
    description,
  });
}
