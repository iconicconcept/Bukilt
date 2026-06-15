"use client";

import ServiceCard from "@/components/common/ServiceCard";
import ServiceCardSkeleton from "@/components/common/ServiceCardSkeleton";
import EmptyState from "@/components/common/EmptyState";

type Props = {
  services: any[];
  loading?: boolean;
};

export default function ServicesGrid({
  services,
  loading,
}: Props) {
  if (loading) {
    return (
      <div className="grid md:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <ServiceCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (!services?.length) {
    return <EmptyState />;
  }

  return (
    <div className="grid md:grid-cols-3 gap-6 animate-fade">
      {services.map((service) => (
        <ServiceCard key={service.id} service={service} />
      ))}
    </div>
  );
}