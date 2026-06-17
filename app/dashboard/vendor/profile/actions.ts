"use server";

import { createClient } from "@/lib/supabaseServer";

import {
  getVendorByOwnerId,
  updateVendor,
} from "@/services/server/vendor.service";

export async function updateVendorProfileAction(formData: FormData) {
  const supabase = await createClient();

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

  let logoUrl = vendor.logo;

  const file = formData.get("logo") as File;

  if (file && file.size > 0) {
    const ext = file.name.split(".").pop();

    const fileName = `${user.id}-${Date.now()}.${ext}`;

    const { error: uploadError } = await supabase.storage
      .from("vendor-assets")
      .upload(fileName, file, {
        contentType: file.type,
      });

    if (uploadError) throw uploadError;

    const { data } = supabase.storage
      .from("vendor-assets")
      .getPublicUrl(fileName);

    logoUrl = data.publicUrl;
  }

  return updateVendor(vendor.id, {
    businessName: formData.get("businessName") as string,

    description: formData.get("description") as string,

    category: formData.get("category") as string,

    phone: formData.get("phone") as string,

    location: formData.get("location") as string,

    logo: logoUrl,
  });
}
