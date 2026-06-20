import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 mt-20">
      <div className="container-custom py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Brand Column */}
          <div className="col-span-1">
            <Link
              href="/"
              className="flex items-center gap-2 font-bold text-lg mb-4 bg-gradient-to-r from-amber-500 to-orange-500 bg-clip-text text-transparent"
            >
              <span className="text-amber-500">◆</span>
              Bukit
            </Link>
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              Nigeria&apos;s modern marketplace for local services. Book trusted
              vendors in seconds.
            </p>
          </div>

          {/* Product Links */}
          <div>
            <h3 className="font-semibold text-slate-900 dark:text-white mb-4">
              Product
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/#services"
                  className="text-sm text-slate-600 dark:text-slate-400 hover:text-amber-500 dark:hover:text-amber-400 transition-colors"
                >
                  Services
                </Link>
              </li>
              <li>
                <Link
                  href="/dashboard/bookings"
                  className="text-sm text-slate-600 dark:text-slate-400 hover:text-amber-500 dark:hover:text-amber-400 transition-colors"
                >
                  My Bookings
                </Link>
              </li>
              <li>
                <Link
                  href="/dashboard/vendor/onboarding"
                  className="text-sm text-slate-600 dark:text-slate-400 hover:text-amber-500 dark:hover:text-amber-400 transition-colors"
                >
                  For Vendors
                </Link>
              </li>
              <li>
                <Link
                  href="/#how-it-works"
                  className="text-sm text-slate-600 dark:text-slate-400 hover:text-amber-500 dark:hover:text-amber-400 transition-colors"
                >
                  How It Works
                </Link>
              </li>
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="font-semibold text-slate-900 dark:text-white mb-4">
              Company
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/about"
                  className="text-sm text-slate-600 dark:text-slate-400 hover:text-amber-500 dark:hover:text-amber-400 transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/blog"
                  className="text-sm text-slate-600 dark:text-slate-400 hover:text-amber-500 dark:hover:text-amber-400 transition-colors"
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  href="/careers"
                  className="text-sm text-slate-600 dark:text-slate-400 hover:text-amber-500 dark:hover:text-amber-400 transition-colors"
                >
                  Careers
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-sm text-slate-600 dark:text-slate-400 hover:text-amber-500 dark:hover:text-amber-400 transition-colors"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-semibold text-slate-900 dark:text-white mb-4">
              Get In Touch
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-amber-500 mt-0.5 flex-shrink-0" />
                <a
                  href="mailto:hello@bukit.com"
                  className="text-sm text-slate-600 dark:text-slate-400 hover:text-amber-500 dark:hover:text-amber-400 transition-colors"
                >
                  hello@bukit.com
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-amber-500 mt-0.5 flex-shrink-0" />
                <a
                  href="tel:+2341234567890"
                  className="text-sm text-slate-600 dark:text-slate-400 hover:text-amber-500 dark:hover:text-amber-400 transition-colors"
                >
                  +234 (0) 123 456 7890
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-amber-500 mt-0.5 flex-shrink-0" />
                <span className="text-sm text-slate-600 dark:text-slate-400">
                  Lagos, Nigeria
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-slate-200 dark:border-slate-800 py-8">
          {/* Bottom Section */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-slate-600 dark:text-slate-400">
              © {currentYear} Bukit. All rights reserved.
            </p>

            <div className="flex items-center gap-6">
              <Link
                href="/privacy"
                className="text-sm text-slate-600 dark:text-slate-400 hover:text-amber-500 dark:hover:text-amber-400 transition-colors"
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms"
                className="text-sm text-slate-600 dark:text-slate-400 hover:text-amber-500 dark:hover:text-amber-400 transition-colors"
              >
                Terms of Service
              </Link>
              <Link
                href="/cookies"
                className="text-sm text-slate-600 dark:text-slate-400 hover:text-amber-500 dark:hover:text-amber-400 transition-colors"
              >
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
