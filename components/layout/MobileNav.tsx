"use client";

import Link from "next/link";
import { useState } from "react";
import LogoutButton from "../auth/LogOutButton";

type Props = {
  user: boolean;
  vendor: boolean;
};

export default function MobileNav({ user, vendor }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <div className="md:hidden">
      <button onClick={() => setOpen(!open)} className="text-xl">
        ☰
      </button>

      {open && (
        <div
          className="
          absolute
          top-16
          right-4
          bg-white
          rounded-xl
          shadow-lg
          border
          p-4
          w-60
          z-50
        "
        >
          <div className="flex flex-col gap-3">
            <Link href="/services">Services</Link>

            {user && (
              <>
                <Link href="/dashboard/bookings">My Bookings</Link>

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

                <Link href="/signup">Get Started</Link>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
