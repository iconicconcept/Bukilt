"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import LogoutButton from "../auth/LogOutButton";

type Props = {
  user: boolean;
  vendor: boolean;
};

export default function MobileNav({ user, vendor }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <div className="md:hidden">
      <button
        onClick={() => setOpen(!open)}
        className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
      >
        {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </button>

      {open && (
        <div
          className="absolute top-16 right-4 left-4 bg-white dark:bg-slate-900 rounded-xl shadow-xl border border-slate-200 dark:border-slate-800 p-4 z-50 animate-in fade-in slide-in-from-top-2"
          onClick={() => setOpen(false)}
        >
          <div className="flex flex-col gap-3">
            <Link
              href="/#services"
              className="px-3 py-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors font-medium"
            >
              Services
            </Link>

            {user && (
              <>
                <Link
                  href="/dashboard/bookings"
                  className="px-3 py-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors font-medium"
                >
                  My Bookings
                </Link>

                {vendor ? (
                  <Link
                    href="/dashboard/vendor"
                    className="px-3 py-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors font-medium"
                  >
                    Vendor Dashboard
                  </Link>
                ) : (
                  <Link
                    href="/dashboard/vendor/onboarding"
                    className="px-3 py-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors font-medium"
                  >
                    Become Vendor
                  </Link>
                )}

                <div className="pt-2 border-t border-slate-200 dark:border-slate-700">
                  <LogoutButton />
                </div>
              </>
            )}

            {!user && (
              <>
                <Link
                  href="/auth/login"
                  className="px-3 py-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors font-medium"
                >
                  Login
                </Link>

                <Link
                  href="/auth/signup"
                  className="px-3 py-2 rounded-lg bg-gradient-to-r from-amber-500 to-orange-500 text-white font-medium text-center hover:shadow-lg transition-all"
                >
                  Get Started
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
