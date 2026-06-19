import { getServices } from "@/services/service.service";
import ServiceFilters from "@/components/services/ServiceFilters";

export default async function ServicesPage({
  searchParams,
}: {
  searchParams: Promise<{
    search?: string;
    category?: string;
  }>;
}) {
  const params = await searchParams;
  const services = await getServices({
    search: params.search,
    category: params.category,
  });

  return (
    <div className="section">
      <div className="container-custom">
        <div className="mb-10">
          <h1 className="text-3xl font-bold">Explore Services</h1>

          <p className="text-slate-500 mt-2">Book professionals instantly</p>
        </div>

        <ServiceFilters services={services} />
      </div>
    </div>
  );
}
