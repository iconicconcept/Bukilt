import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabaseServer";
import { getVendorByOwnerId } from "@/services/server/vendor.service";
import { getVendorReviewSummary } from "@/services/server/review.service";

export default async function VendorReviewsPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/auth/login");
  }

  const vendor = await getVendorByOwnerId(user.id);

  if (!vendor) {
    redirect("/dashboard/vendor/onboarding");
  }

  const { reviews, average } = await getVendorReviewSummary(vendor.id);

  return (
    <div className="section">
      <div className="container-custom">
        <h1 className="text-3xl font-bold">Reviews</h1>

        <div className="card p-6 mt-6">
          <p className="text-slate-500">Average Rating</p>

          <h2 className="text-4xl font-bold mt-2">⭐ {average}</h2>
        </div>

        <div className="mt-8 space-y-5">
          {reviews.map((review: any) => (
            <div key={review.id} className="card p-6">
              <div className="text-yellow-500">{"★".repeat(review.rating)}</div>

              <p className="mt-3">{review.comment}</p>

              <p className="text-sm text-slate-500 mt-3">
                {review.profiles?.email}
              </p>
            </div>
          ))}

          {!reviews.length && (
            <div className="card p-8 text-center">No reviews yet</div>
          )}
        </div>
      </div>
    </div>
  );
}
