import VendorBookingsTable from "@/components/vendor/VendorBookingsTable";
import { getVendorBookings } from "@/services/server/vendorBooking.service";
import { getVendorByOwnerId } from "@/services/server/vendor.service";
import { createClient } from "@/lib/supabaseServer";
import { redirect } from "next/navigation";

export default async function VendorBookingsPage() {
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

  const bookings = await getVendorBookings(vendor.id);

  return (
    <div className="section">
      <div className="container-custom">
        <h1 className="text-3xl font-bold mb-8">Bookings</h1>

        <VendorBookingsTable bookings={bookings} />
      </div>
    </div>
  );
}
