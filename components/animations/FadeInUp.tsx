"use client"

import { useScrollReveal } from "@/lib/hooks/useScrollReveal";

interface FadeInUpProps {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
}

export function FadeInUp({
  children,
  delay = 0,
  duration = 700,
}: FadeInUpProps) {
  const { ref, isVisible } = useScrollReveal();

  return (
    <div
      ref={ref}
      style={{
        transitionDuration: `${duration}ms`,
        transitionDelay: `${delay}ms`,
      }}
      className={`transition-all ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
    >
      {children}
    </div>
  );
}