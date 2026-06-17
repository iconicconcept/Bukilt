import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabaseServer";
import { getVendorByOwnerId } from "@/services/server/vendor.service";
import { getVendorServices } from "@/services/server/service-management.service";
import { getVendorBookings } from "@/services/server/vendorBooking.service";

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
    redirect("/dashboard/vendor/onboarding");
  }

  const services = await getVendorServices(vendor.id);
  const bookings = await getVendorBookings(vendor.id);

  const totalServices = services.length;

  const totalBookings = bookings.length;

  const revenue = bookings
    .filter((booking: any) => booking.status === "completed")
    .reduce(
      (total: number, booking: any) =>
        total + Number(booking.services?.price ?? 0),
      0,
    );

  return (
    <div>
      <h1 className="text-3xl font-bold">Dashboard</h1>

      <p className="text-slate-500 mt-2">
        Welcome back, {vendor.business_name}
      </p>

      <div className="grid md:grid-cols-3 gap-6 mt-8">
        <DashboardCard title="Services" value={String(totalServices)} />

        <DashboardCard title="Bookings" value={String(totalBookings)} />

        <DashboardCard title="Revenue" value={`₦${revenue}`} />
      </div>
    </div>
  );
}

function DashboardCard({ title, value }: { title: string; value: string }) {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm">
      <p className="text-sm text-slate-500">{title}</p>

      <h2 className="text-3xl font-bold mt-2">{value}</h2>
    </div>
  );
}
