import { getServices } from "@/services/service.service";
import ServicesGrid from "@/components/services/ServicesGrid";

export default async function ServicesPage() {
  const services = await getServices();

  return (
    <div className="section">
      <div className="container-custom">
        <div className="mb-10">
          <h1 className="text-3xl font-bold">Explore Services</h1>
          <p className="text-slate-500 mt-1">Book professionals instantly</p>
        </div>

        <ServicesGrid services={services} />
      </div>
    </div>
  );
}
