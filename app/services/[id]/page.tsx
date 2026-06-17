import { notFound } from "next/navigation";
import { getService } from "@/services/service.service";
import BookNowButton from "@/components/booking/BookNowButton";

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  let service;

  try {
    service = await getService(id);
  } catch (error) {
    console.error(error);
    return notFound();
  }

  return (
    <div className="section">
      <div className="container-custom grid lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 space-y-6 animate-fade">
          <div className="card p-6">
            <h1 className="text-3xl font-bold">{service.title}</h1>

            <p className="text-slate-500 mt-3">{service.description}</p>
          </div>

          <div className="card p-6">
            <h2 className="text-lg font-semibold mb-2">Offered by</h2>

            <div>
              <p className="font-medium">{service.vendors?.business_name}</p>

              <p className="text-sm text-slate-500">
                {service.vendors?.description}
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="card p-6 sticky top-24">
            <p className="text-2xl font-bold">₦{service.price}</p>

            <p className="text-sm text-slate-500">
              {service.duration} minutes session
            </p>

            <BookNowButton
              serviceId={service.id}
              vendorId={service.vendor_id}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
