"use server";

import { createClient } from "@/lib/supabaseServer";
import {
  getVendorByOwnerId,
  updateVendor,
} from "@/services/server/vendor.service";

export async function updateVendorProfileAction(formData: FormData) {
  const supabase = await createClient();

  const businessName = formData.get("businessName") as string;

  const description = formData.get("description") as string;

  const category = formData.get("category") as string;

  const phone = formData.get("phone") as string;

  const location = formData.get("location") as string;

  const logo = formData.get("logo") as string;

  const availableDays = formData.getAll("availableDays") as string[];

  const startTime = formData.get("startTime") as string;

  const endTime = formData.get("endTime") as string;

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("Unauthorized");
  }

  const vendor = await getVendorByOwnerId(user.id);

  if (!vendor) {
    throw new Error("Vendor not found");
  }

  await updateVendor(vendor.id, {
    businessName,
    description,
    category,
    phone,
    location,
    logo,
    availableDays,
    startTime,
    endTime,
  });
}
