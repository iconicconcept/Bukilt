import { redirect } from "next/navigation";

import { createClient } from "@/lib/supabaseServer";

import { getVendorByOwnerId } from "@/services/server/vendor.service";

import AvailabilityForm from "@/components/vendor/AvailabilityForm";

import { getVendorAvailability } from "@/services/server/vendorAvailability.service";

export default async function AvailabilityPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/auth/login");
  }

  const vendor = await getVendorByOwnerId(user.id);

  if (!vendor) {
    redirect("/dashboard/vendor/onboarding");
  }

  const availability = await getVendorAvailability(vendor.id);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Availability</h1>

      <AvailabilityForm vendorId={vendor.id} availability={availability} />
    </div>
  );
}
