"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ScrollReveal } from "./ScrollReveal";

export function HeroSection() {
  return (
    <section className="relative min-h-[80vh] flex flex-col items-center justify-center py-20 px-4 overflow-hidden">
      {/* Gradient Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-96 h-96 bg-amber-500/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-orange-500/10 rounded-full blur-3xl"></div>
      </div>

      <ScrollReveal>
        <div className="text-center max-w-4xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full bg-amber-500/10 border border-amber-500/30">
            <div className="w-2 h-2 rounded-full bg-amber-500 animate-pulse"></div>
            <span className="text-sm font-medium text-amber-600 dark:text-amber-400">
              Nigeria`s Service Marketplace
            </span>
          </div>

          {/* Heading */}
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6">
            Book trusted
            <br />
            <span className="bg-linear-to-r from-amber-500 to-orange-500 bg-clip-text text-transparent">
              local services
            </span>
            <br />
            in seconds
          </h1>

          {/* Subheading */}
          <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 mb-8 max-w-2xl mx-auto leading-relaxed">
            Discover vetted barbers, cleaners, photographers, tutors, and more —
            all bookable online, right where you are.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/services"
              className="px-8 py-3 rounded-lg bg-linear-to-r from-amber-500 to-orange-500 text-white font-medium hover:shadow-lg hover:shadow-amber-500/40 transition-all transform hover:-translate-y-1"
            >
              Find a Service
            </Link>
            <Link
              href="/dashboard/vendor/onboarding"
              className="px-8 py-3 rounded-lg border-2 border-amber-500/30 text-slate-900 dark:text-white font-medium hover:bg-amber-500/10 transition-all"
            >
              List Your Business <ArrowRight className="w-4 h-4 inline ml-2" />
            </Link>
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
}
