"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Zap,
  Users,
  TrendingUp,
  Star,
} from "lucide-react";

const stats = [
  { label: "Verified Vendors", value: "2k+" },
  { label: "Bookings Completed", value: "15k+" },
  { label: "Average Rating", value: "4.9★" },
  { label: "Service Categories", value: "30+" },
];

const services = [
  { icon: "✂️", name: "Beauty & Hair", desc: "Barbers, MUAs, nail artists" },
  {
    icon: "🏠",
    name: "Home Services",
    desc: "Cleaners, plumbers, electricians",
  },
  { icon: "📸", name: "Photography", desc: "Portraits, events, products" },
  { icon: "📚", name: "Education", desc: "Tutors, coaches, instructors" },
  { icon: "🎉", name: "Events & Décor", desc: "Planners, DJs, caterers" },
  {
    icon: "💪",
    name: "Fitness & Wellness",
    desc: "PTs, yoga, massage therapists",
  },
];

const steps = [
  {
    num: "01",
    title: "Search & Discover",
    desc: "Browse hundreds of local services by category or keyword. View vendor profiles, portfolios, pricing, and real customer reviews.",
  },
  {
    num: "02",
    title: "Pick a Time",
    desc: "See the vendor's live availability. Only open slots are shown — no double-booking, no wasted calls.",
  },
  {
    num: "03",
    title: "Book & Relax",
    desc: "Confirm your booking instantly. Track its status, cancel if plans change, and leave a review when it's done.",
  },
];

const vendorPerks = [
  {
    icon: <Zap className="w-5 h-5" />,
    title: "Smart Availability",
    desc: "Set your working hours once. Bukit handles the rest — customers only see open slots.",
  },
  {
    icon: <TrendingUp className="w-5 h-5" />,
    title: "Revenue Tracking",
    desc: "See your earnings grow in real time. Every completed booking updates your dashboard instantly.",
  },
  {
    icon: <Users className="w-5 h-5" />,
    title: "Instant Notifications",
    desc: "Get notified the moment a new booking lands so you're always one step ahead.",
  },
];

const reviews = [
  {
    text: "Found my barber in under a minute. Booked him, got reminded, showed up — it was just smooth. The whole thing felt premium.",
    author: "Tunde Owolabi",
    service: "Haircut · Lagos",
    initials: "TO",
  },
  {
    text: "As a makeup artist, Bukit has brought me clients I never would have found on Instagram alone. My bookings are up and I look professional.",
    author: "Funke Ibidapo",
    service: "Makeup Artist · Abuja",
    initials: "FI",
  },
  {
    text: "I booked a cleaner and an electrician in the same week. Both were on time, both were rated. This is how services should work in Nigeria.",
    author: "Chinyere Nwosu",
    service: "Home Services · Port Harcourt",
    initials: "CN",
  },
];

function ScrollReveal({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 },
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
    >
      {children}
    </div>
  );
}

export default function HomePage() {
  return (
    <div className="w-full">
      {/* HERO SECTION */}
      <section className="relative min-h-[80vh] flex flex-col items-center justify-center py-20 px-4 overflow-hidden">
        {/* Gradient Background */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-20 left-1/2 -translate-x-1/2 w-96 h-96 bg-amber-500/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-80 h-80 bg-orange-500/10 rounded-full blur-3xl"></div>
        </div>

        {/* Hero Content */}
        <ScrollReveal>
          <div className="text-center max-w-4xl mx-auto">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full bg-amber-500/10 border border-amber-500/30">
              <div className="w-2 h-2 rounded-full bg-amber-500 animate-pulse"></div>
              <span className="text-sm font-medium text-amber-600 dark:text-amber-400">
                Nigeria&pos;s Service Marketplace
              </span>
            </div>

            {/* Heading */}
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6">
              Book trusted
              <br />
              <span className="bg-gradient-to-r from-amber-500 to-orange-500 bg-clip-text text-transparent">
                local services
              </span>
              <br />
              in seconds
            </h1>

            {/* Subheading */}
            <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 mb-8 max-w-2xl mx-auto leading-relaxed">
              Discover vetted barbers, cleaners, photographers, tutors, and more
              — all bookable online, right where you are.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/services"
                className="px-8 py-3 rounded-lg bg-gradient-to-r from-amber-500 to-orange-500 text-white font-medium hover:shadow-lg hover:shadow-amber-500/40 transition-all transform hover:-translate-y-1"
              >
                Find a Service
              </Link>
              <Link
                href="/dashboard/vendor/onboarding"
                className="px-8 py-3 rounded-lg border-2 border-amber-500/30 text-slate-900 dark:text-white font-medium hover:bg-amber-500/10 transition-all"
              >
                List Your Business{" "}
                <ArrowRight className="w-4 h-4 inline ml-2" />
              </Link>
            </div>
          </div>
        </ScrollReveal>

        {/* Floating Service Cards */}
        <div className="mt-16 w-full max-w-5xl">
          <ScrollReveal>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 px-4">
              {[
                "✂️ Barber",
                "💄 Makeup",
                "🔌 Electrician",
                "📸 Photographer",
              ].map((service, i) => (
                <div
                  key={i}
                  className="p-4 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-amber-500/50 transition-all hover:shadow-md"
                >
                  <p className="text-sm font-medium text-slate-700 dark:text-slate-300">
                    {service}
                  </p>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* STATS SECTION */}
      <section className="border-y border-slate-200 dark:border-slate-800 py-16 px-4">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <ScrollReveal key={i}>
                <div className="text-center">
                  <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-amber-500 to-orange-500 bg-clip-text text-transparent mb-2">
                    {stat.value}
                  </div>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    {stat.label}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how-it-works" className="py-20 px-4">
        <div className="container-custom">
          <ScrollReveal>
            <div className="text-center mb-16">
              <p className="text-sm font-medium text-amber-600 dark:text-amber-400 mb-2">
                HOW IT WORKS
              </p>
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                Three steps to your perfect service
              </h2>
              <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
                No calls, no haggling. Find, book, and relax — all from your
                phone.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid md:grid-cols-3 gap-8 mt-12">
            {steps.map((step, i) => (
              <ScrollReveal key={i}>
                <div className="group relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-amber-500 to-orange-500 rounded-lg opacity-0 group-hover:opacity-10 transition-opacity"></div>
                  <div className="relative p-8 rounded-lg border border-slate-200 dark:border-slate-800 hover:border-amber-500/50 transition-all">
                    <div className="text-4xl font-bold text-amber-500 mb-4">
                      {step.num}
                    </div>
                    <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                    <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                      {step.desc}
                    </p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section
        id="services"
        className="py-20 px-4 bg-slate-50 dark:bg-slate-900/50 border-y border-slate-200 dark:border-slate-800"
      >
        <div className="container-custom">
          <ScrollReveal>
            <div className="text-center mb-16">
              <p className="text-sm font-medium text-amber-600 dark:text-amber-400 mb-2">
                SERVICE CATEGORIES
              </p>
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                Whatever you need, we've got it covered
              </h2>
              <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
                From beauty to home repair, find professionals across 30+
                categories.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid md:grid-cols-3 gap-6 mt-12">
            {services.map((service, i) => (
              <ScrollReveal key={i}>
                <Link href={`/services?category=${service.name}`}>
                  <div className="p-6 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-amber-500/50 hover:shadow-md transition-all cursor-pointer group">
                    <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">
                      {service.icon}
                    </div>
                    <h3 className="font-bold text-lg mb-2">{service.name}</h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      {service.desc}
                    </p>
                  </div>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* VENDOR SECTION */}
      <section className="py-20 px-4">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <ScrollReveal>
              <div>
                <p className="text-sm font-medium text-amber-600 dark:text-amber-400 mb-2">
                  FOR VENDORS
                </p>
                <h2 className="text-4xl md:text-5xl font-bold mb-6">
                  Grow your business, your way
                </h2>
                <p className="text-slate-600 dark:text-slate-400 mb-8 leading-relaxed">
                  Your own professional dashboard — manage services, bookings,
                  and revenue with no extra tools needed.
                </p>

                <div className="space-y-4">
                  {vendorPerks.map((perk, i) => (
                    <div key={i} className="flex gap-4 items-start">
                      <div className="p-3 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-500 flex-shrink-0">
                        {perk.icon}
                      </div>
                      <div>
                        <h4 className="font-bold mb-1">{perk.title}</h4>
                        <p className="text-sm text-slate-600 dark:text-slate-400">
                          {perk.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <Link
                  href="/dashboard/vendor/onboarding"
                  className="mt-8 inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-gradient-to-r from-amber-500 to-orange-500 text-white font-medium hover:shadow-lg transition-all"
                >
                  Start Earning <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </ScrollReveal>

            <ScrollReveal>
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-amber-500 to-orange-500 rounded-2xl opacity-20 blur-2xl"></div>
                <div className="relative bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-xl">
                  <div className="text-xs font-bold text-amber-600 dark:text-amber-400 mb-4 flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-green-500"></div>
                    Vendor Dashboard
                  </div>
                  <div className="grid grid-cols-3 gap-3 mb-6">
                    <div className="bg-slate-100 dark:bg-slate-800 rounded-lg p-4 text-center">
                      <div className="text-2xl font-bold text-amber-500">
                        ₦182k
                      </div>
                      <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                        Revenue
                      </p>
                    </div>
                    <div className="bg-slate-100 dark:bg-slate-800 rounded-lg p-4 text-center">
                      <div className="text-2xl font-bold text-amber-500">
                        47
                      </div>
                      <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                        Bookings
                      </p>
                    </div>
                    <div className="bg-slate-100 dark:bg-slate-800 rounded-lg p-4 text-center">
                      <div className="text-2xl font-bold text-amber-500">
                        4.8★
                      </div>
                      <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                        Rating
                      </p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800 rounded-lg text-sm">
                      <div>
                        <p className="font-medium">Amara Okoye</p>
                        <p className="text-xs text-slate-600 dark:text-slate-400">
                          Today, 11:00 AM
                        </p>
                      </div>
                      <span className="text-xs font-bold text-green-600">
                        ● Confirmed
                      </span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800 rounded-lg text-sm">
                      <div>
                        <p className="font-medium">Bolu Adewale</p>
                        <p className="text-xs text-slate-600 dark:text-slate-400">
                          Today, 2:00 PM
                        </p>
                      </div>
                      <span className="text-xs font-bold text-amber-600">
                        ● Pending
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* REVIEWS */}
      <section className="py-20 px-4 bg-slate-50 dark:bg-slate-900/50 border-t border-slate-200 dark:border-slate-800">
        <div className="container-custom">
          <ScrollReveal>
            <div className="text-center mb-16">
              <p className="text-sm font-medium text-amber-600 dark:text-amber-400 mb-2">
                CUSTOMER REVIEWS
              </p>
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                Real people, real results
              </h2>
              <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
                Every review is from a verified, completed booking — because
                trust matters.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid md:grid-cols-3 gap-6 mt-12">
            {reviews.map((review, i) => (
              <ScrollReveal key={i}>
                <div className="p-6 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-amber-500/50 transition-all">
                  <div className="flex gap-1 mb-4">
                    {[...Array(5)].map((_, j) => (
                      <Star
                        key={j}
                        className="w-4 h-4 fill-amber-500 text-amber-500"
                      />
                    ))}
                  </div>
                  <p className="text-slate-700 dark:text-slate-300 mb-4">
                    {`"${review.text}"`}
                  </p>
                  <div className="flex items-center gap-3 pt-4 border-t border-slate-200 dark:border-slate-800">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 flex items-center justify-center text-white font-bold text-sm">
                      {review.initials}
                    </div>
                    <div>
                      <p className="font-medium text-sm">{review.author}</p>
                      <p className="text-xs text-slate-600 dark:text-slate-400">
                        {review.service}
                      </p>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-20 px-4">
        <div className="container-custom">
          <ScrollReveal>
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 p-12 md:p-16">
              <div className="absolute inset-0 opacity-10">
                <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,.2)_25%,rgba(255,255,255,.2)_50%,transparent_50%,transparent_75%,rgba(255,255,255,.2)_75%,rgba(255,255,255,.2))] bg-[length:40px_40px] animate-pulse"></div>
              </div>

              <div className="relative text-center text-white max-w-2xl mx-auto">
                <h2 className="text-4xl md:text-5xl font-bold mb-4">
                  Ready to find your next great service?
                </h2>
                <p className="text-lg opacity-95 mb-8">
                  Join thousands of Nigerians who've already discovered a better
                  way to book local services.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <Link
                    href="/services"
                    className="px-8 py-3 rounded-lg bg-white text-amber-600 font-bold hover:bg-slate-100 transition-all"
                  >
                    Browse Services
                  </Link>
                  <Link
                    href="/dashboard/vendor/onboarding"
                    className="px-8 py-3 rounded-lg border-2 border-white text-white font-medium hover:bg-white/10 transition-all"
                  >
                    Become a Vendor
                  </Link>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
