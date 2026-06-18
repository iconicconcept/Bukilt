"use client";

import { useState } from "react";
import ServicesGrid from "./ServicesGrid";

export default function ServiceFilters({ services }: { services: any[] }) {
  const [search, setSearch] = useState("");

  const [category, setCategory] = useState("");

  const categories = [
    ...new Set(services.map((s) => s.vendors?.category).filter(Boolean)),
  ];

  const filtered = services.filter((service) => {
    const matchesSearch = service.title
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesCategory = category
      ? service.vendors?.category === category
      : true;

    return matchesSearch && matchesCategory;
  });

  return (
    <div>
      <div className="grid md:grid-cols-2 gap-4 mb-8">
        <input
          placeholder="Search services..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="
            w-full
            border
            rounded-xl
            p-3
            "
        />

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="
            border
            rounded-xl
            p-3
            "
        >
          <option value="">All categories</option>

          {categories.map((cat: any) => (
            <option key={cat}>{cat}</option>
          ))}
        </select>
      </div>

      <ServicesGrid services={filtered} />
    </div>
  );
}
