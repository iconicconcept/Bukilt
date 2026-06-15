import { notFound } from "next/navigation";
import { getService } from "@/services/service.service";
import BookNowButton from "@/components/booking/BookNowButton";

export default async function ServiceDetailPage({
  params,
}: {
  params: { id: string };
}) {
  let service;

  try {
    service = await getService(params.id);
  } catch {
    return notFound();
  }

  return (
    <div className="section">
      <div className="container-custom grid lg:grid-cols-3 gap-10">
        {/* LEFT: MAIN CONTENT */}
        <div className="lg:col-span-2 space-y-6 animate-fade">
          {/* HERO */}
          <div className="card p-6">
            <h1 className="text-3xl font-bold">{service.title}</h1>

            <p className="text-slate-500 mt-3">{service.description}</p>
          </div>

          {/* VENDOR SECTION */}
          <div className="card p-6">
            <h2 className="text-lg font-semibold mb-2">Offered by</h2>

            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">{service.vendors?.business_name}</p>
                <p className="text-sm text-slate-500">
                  {service.vendors?.description}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT: BOOKING PANEL (IMPORTANT) */}
        <div className="space-y-4">
          <div className="card p-6 sticky top-24 animate-soft">
            <p className="text-2xl font-bold">₦{service.price}</p>

            <p className="text-sm text-slate-500">
              {service.duration} minutes session
            </p>

            <BookNowButton
              serviceId={service.id}
              vendorId={service.vendor_id}
            />

            <p className="text-xs text-slate-400 mt-3">
              Secure booking powered by Bukil
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
