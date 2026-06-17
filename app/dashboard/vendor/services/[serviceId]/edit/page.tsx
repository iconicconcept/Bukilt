import ServiceForm from "@/components/vendor/ServiceForm";

import { getServiceById } from "@/services/server/service-management.service";

export default async function EditServicePage({
  params,
}: {
  params: Promise<{
    serviceId: string;
  }>;
}) {
  const { serviceId } = await params;

  const service = await getServiceById(serviceId);

  return (
    <div className="section">
      <div className="container-custom max-w-2xl">
        <h1 className="text-3xl font-bold mb-6">Edit Service</h1>

        <ServiceForm service={service} />
      </div>
    </div>
  );
}
