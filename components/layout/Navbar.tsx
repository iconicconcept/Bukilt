import Link from "next/link";

import { createClient } from "@/lib/supabaseServer";

import { isVendor } from "@/services/server/vendor.service";

import { getUserNotifications } from "@/services/server/notification.service";

import NotificationBell from "@/components/common/NotificationBell";

import MobileNav from "./MobileNav";
import LogoutButton from "../auth/LogOutButton";

export default async function Navbar() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  let vendor = false;

  let notifications: any[] = [];

  if (user) {
    vendor = await isVendor(user.id);

    notifications = await getUserNotifications(user.id);
  }

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-950/80 backdrop-blur-md">
      <div className="container-custom h-16 flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-1 font-bold text-xl bg-gradient-to-r from-amber-500 to-orange-500 bg-clip-text text-transparent"
        >
          <span className="text-amber-500">◆</span>
          Bukit
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          <Link
            href="/#services"
            className="text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-amber-500 dark:hover:text-amber-400 transition-colors"
          >
            Services
          </Link>

          {user && (
            <>
              <Link
                href="/dashboard/bookings"
                className="text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-amber-500 dark:hover:text-amber-400 transition-colors"
              >
                My Bookings
              </Link>

              <NotificationBell notifications={notifications} />

              {vendor ? (
                <Link
                  href="/dashboard/vendor"
                  className="text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-amber-500 dark:hover:text-amber-400 transition-colors"
                >
                  Vendor Dashboard
                </Link>
              ) : (
                <Link
                  href="/dashboard/vendor/onboarding"
                  className="text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-amber-500 dark:hover:text-amber-400 transition-colors"
                >
                  Become Vendor
                </Link>
              )}

              <LogoutButton />
            </>
          )}

          {!user && (
            <>
              <Link
                href="/auth/login"
                className="text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-amber-500 dark:hover:text-amber-400 transition-colors"
              >
                Login
              </Link>

              <Link
                href="/auth/signup"
                className="btn-primary px-4 py-2 rounded-lg bg-gradient-to-r from-amber-500 to-orange-500 text-white font-medium hover:shadow-lg hover:shadow-amber-500/30 transition-all"
              >
                Get Started
              </Link>
            </>
          )}
        </nav>

        {/* Mobile Navigation */}
        <MobileNav user={!!user} vendor={vendor} />
      </div>
    </header>
  );
}
