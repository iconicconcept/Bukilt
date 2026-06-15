import { useAuthStore } from "@/store/auth.store";
import Link from "next/link";


export default function Navbar() {
//     const isAuthenticated =
//   useAuthStore(
//     (state) => state.isAuthenticated
//   );
  
  return (
    <header className="sticky top-0 z-50 glass border-b border-slate-200 dark:border-slate-800">
      <div className="container-custom flex items-center justify-between h-16">
        {/* Logo */}
        <Link
          href="/"
          className="font-bold text-xl tracking-tight hover:opacity-80 animate-soft"
        >
          Bukil
        </Link>

        {/* Nav */}
        <nav className="hidden md:flex gap-6 text-sm text-slate-600 dark:text-slate-300">
          <Link className="hover:text-primary animate-soft" href="/services">
            Services
          </Link>
          <Link className="hover:text-primary animate-soft" href="/dashboard">
            Dashboard
          </Link>
        </nav>

        {/* CTA */}
        <div className="flex gap-3 items-center">
          <Link
            className="text-sm hover:text-primary animate-soft"
            href="/auth/login"
          >
            Login
          </Link>

          <Link className="btn-primary hover-lift" href="/signup">
            Get Started
          </Link>
        </div>
      </div>
    </header>
  );
}
