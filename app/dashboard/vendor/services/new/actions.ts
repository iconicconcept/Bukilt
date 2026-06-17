"use server";

import { createClient } from "@/lib/supabaseServer";
import { getVendorByOwnerId } from "@/services/server/vendor.service";
import { createService } from "@/services/server/service-management.service";

export async function createServiceAction(
  formData: FormData,
) {
  const supabase =
    await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("Unauthorized");
  }

  const vendor =
    await getVendorByOwnerId(
      user.id,
    );

  if (!vendor) {
    throw new Error(
      "Vendor profile not found",
    );
  }

  const title =
    formData.get("title") as string;

  const description =
    formData.get(
      "description",
    ) as string;

  const price = Number(
    formData.get("price"),
  );

  const duration = Number(
    formData.get("duration"),
  );

  return createService({
    vendorId: vendor.id,
    title,
    description,
    price,
    duration,
  });
}