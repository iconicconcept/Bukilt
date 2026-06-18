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
    <header
      className="
      sticky
      top-0
      z-50
      bg-white
      border-b
    "
    >
      <div
        className="
        container-custom
        h-16
        flex
        items-center
        justify-between
      "
      >
        {/* Logo */}
        <Link
          href="/"
          className="
          font-bold
          text-xl
        "
        >
          Bukil
        </Link>

        {/* Desktop */}
        <nav
          className="
          hidden
          md:flex
          items-center
          gap-6
        "
        >
          <Link href="/services">Services</Link>

          {user && (
            <>
              <Link href="/dashboard/bookings">My Bookings</Link>

              <NotificationBell notifications={notifications} />

              {vendor ? (
                <Link href="/dashboard/vendor">Vendor Dashboard</Link>
              ) : (
                <Link href="/dashboard/vendor/onboarding">Become Vendor</Link>
              )}

              <LogoutButton />
            </>
          )}

          {!user && (
            <>
              <Link href="/auth/login">Login</Link>

              <Link
                href="/auth/signup"
                className="
                btn-primary
              "
              >
                Get Started
              </Link>
            </>
          )}
        </nav>

        {/* Mobile */}
        <MobileNav user={!!user} vendor={vendor} />
      </div>
    </header>
  );
}
