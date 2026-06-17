import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabaseServer";
import { getVendorByOwnerId } from "@/services/server/vendor.service";

export default async function VendorDashboardPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/auth/login");
  }

  const vendor = await getVendorByOwnerId(user.id);

  if (!vendor) {
    redirect("/vendor/onboarding");
  }

  return (
    <div className="section">
      <div className="container-custom">
        <h1 className="text-3xl font-bold mb-2">Vendor Dashboard</h1>

        <p className="text-slate-500 mb-8">
          Welcome back, {vendor.business_name}
        </p>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="card p-6">
            <p className="text-slate-500 text-sm">Total Services</p>

            <h2 className="text-3xl font-bold mt-2">--</h2>
          </div>

          <div className="card p-6">
            <p className="text-slate-500 text-sm">Pending Bookings</p>

            <h2 className="text-3xl font-bold mt-2">--</h2>
          </div>

          <div className="card p-6">
            <p className="text-slate-500 text-sm">Revenue</p>

            <h2 className="text-3xl font-bold mt-2">--</h2>
          </div>
        </div>
      </div>
    </div>
  );
}
