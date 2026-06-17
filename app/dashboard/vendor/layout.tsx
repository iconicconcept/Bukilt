import { ReactNode } from "react";

export default function DashboardLayout({ children }: { children: ReactNode }) {
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

          <a href="/dashboard/vendor/profile" className="block">
            Profile
          </a>
        </nav>
      </aside>

      <main className="flex-1 p-6">{children}</main>
    </div>
  );
}
