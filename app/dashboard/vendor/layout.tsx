import { ReactNode } from "react";
import NotificationBell from "@/components/common/NotificationBell";
import { createClient } from "@/lib/supabaseServer";
import { getVendorByOwnerId } from "@/services/server/vendor.service";
import { getVendorNotifications } from "@/services/server/notification.service";

export default async function DashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  let notifications: any[] = [];

  if (user) {
    const vendor = await getVendorByOwnerId(user.id);

    if (vendor) {
      notifications = await getVendorNotifications(vendor.id);
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 flex">
      <aside className="w-64 bg-white border-r p-6 hidden md:block">
        <h2 className="text-xl font-bold mb-8">Bukil Vendor</h2>

        <nav className="space-y-3">
          <a href="/dashboard/vendor" className="block">
            Overview
          </a>

          <a href="/dashboard/vendor/services" className="block">
            Services
          </a>

          <a href="/dashboard/vendor/bookings" className="block">
            Bookings
          </a>

          <a href="/dashboard/vendor/reviews" className="block">
            Reviews
          </a>

          <a href="/dashboard/vendor/profile" className="block">
            Profile
          </a>
        </nav>
      </aside>

      <div className="flex-1">
        <div className="h-16 bg-white border-b flex justify-end items-center px-6">
          <NotificationBell notifications={notifications} />
        </div>

        <main className="p-6">{children}</main>
      </div>
    </div>
  );
}
