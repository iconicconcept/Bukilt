import { notFound } from "next/navigation";
import {
  getPublicVendor,
  getPublicVendorServices,
} from "@/services/server/vendor-public.service";
import { getVendorReviewSummary } from "@/services/server/review.service";
import ServiceCard from "@/components/common/ServiceCard";
import { formatTime } from "@/lib/time";

export default async function VendorProfilePage({
  params,
}: {
  params: Promise<{
    vendorId: string;
  }>;
}) {
  const { vendorId } = await params;

  let vendor;

  try {
    vendor = await getPublicVendor(vendorId);
  } catch {
    return notFound();
  }

  const services = await getPublicVendorServices(vendorId);

  const reviewSummary = await getVendorReviewSummary(vendorId);

  return (
    <div className="section">
      <div className="container-custom">
        <div className="card p-8">
          {vendor.logo && (
            <img
              src={vendor.logo}
              className="w-24 h-24 rounded-full object-cover mb-4"
            />
          )}

          <h1 className="text-3xl font-bold">{vendor.business_name}</h1>

          <p className="text-slate-500 mt-2">{vendor.category}</p>

          <div className="mt-4">
            <p>
              ⭐ {reviewSummary.average} ({reviewSummary.count} reviews)
            </p>

            {vendor.location && <p>📍 {vendor.location}</p>}

            {vendor.phone && <p>📞 {vendor.phone}</p>}

            {vendor.available_days?.length > 0 && (
              <div className="mt-4">
                <p className="font-semibold">Availability</p>

                <p className="text-slate-500">
                  {vendor.available_days.join(", ")}
                </p>

                <p className="text-slate-500">
                  {formatTime(vendor.start_time)} -{" "}
                  {formatTime(vendor.end_time)}
                </p>
              </div>
            )}
          </div>

          {vendor.description && (
            <p className="mt-6 text-slate-600">{vendor.description}</p>
          )}
        </div>

        <div className="mt-10">
          <h2 className="text-2xl font-bold mb-6">Services</h2>

          <div className="grid md:grid-cols-3 gap-6">
            {services.map((service: any) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        </div>

        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-6">Reviews</h2>

          <div className="space-y-4">
            {reviewSummary.reviews.map((review: any, index: number) => (
              <div key={index} className="card p-5">
                <div className="text-yellow-500">
                  {"★".repeat(review.rating)}
                </div>

                <p className="mt-2">{review.comment}</p>

                <p className="text-sm text-slate-500 mt-2">
                  {review.profiles?.email}
                </p>
              </div>
            ))}

            {!reviewSummary.reviews.length && (
              <div className="card p-6">No reviews yet</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
