import { redirect } from "next/navigation";

import { createClient } from "@/lib/supabaseServer";

import { getVendorByOwnerId } from "@/services/server/vendor.service";

import VendorProfileForm from "@/components/vendor/VendorProfileForm";

export default async function ProfilePage() {
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

  return (
    <div className="section">
      <div className="container-custom max-w-3xl">
        <h1 className="text-3xl font-bold mb-6">Vendor Profile</h1>

        <VendorProfileForm vendor={vendor} />
      </div>
    </div>
  );
}
