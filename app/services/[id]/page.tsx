import { notFound } from "next/navigation";
import { getService, getServiceReviews } from "@/services/service.service";
import ServiceReviews from "@/components/reviews/ServiceReviews";
import BookNowButton from "@/components/booking/BookNowButton";

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const reviewSummary = await getServiceReviews(id);

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
            {service.image && (
              <img
                src={service.image}
                className="w-full h-72 object-cover rounded-2xl"
              />
            )}
            <h1 className="text-3xl font-bold">{service.title}</h1>

            <p className="text-slate-500 mt-3">{service.description}</p>
          </div>

          <div className="card p-6">
            <h2 className="text-lg font-semibold mb-2">Offered by</h2>

            <div className="flex gap-4 items-center">
              {service.vendors?.logo ? (
                <img
                  src={service.vendors.logo}
                  alt="vendor logo"
                  className="w-16 h-16 rounded-full object-cover"
                />
              ) : (
                <div className="w-16 h-16 rounded-full bg-slate-200 flex items-center justify-center">
                  {service.vendors?.business_name?.charAt(0)}
                </div>
              )}

              <div>
                <p className="font-semibold">
                  {service.vendors?.business_name}
                </p>

                <p className="text-sm text-slate-500">
                  {service.vendors?.category}
                </p>

                <p className="text-sm text-slate-500">
                  {service.vendors?.location}
                </p>

                <p className="text-sm mt-2">{service.vendors?.description}</p>
              </div>
            </div>
          </div>

          <div className="mt-3 text-yellow-500">
            ⭐ {service.vendors?.rating ?? "New"}
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
      <ServiceReviews
        average={reviewSummary.average}
        count={reviewSummary.count}
        reviews={reviewSummary.reviews}
      />
    </div>
  );
}
