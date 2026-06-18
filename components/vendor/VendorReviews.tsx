export default function VendorReviews({
  average,
  count,
  reviews,
}: {
  average: string;
  count: number;
  reviews: any[];
}) {
  return (
    <div className="space-y-6 mt-5">
      <div className="card p-6">
        <h2 className="text-xl font-bold">Vendor Rating</h2>

        <p className="text-4xl font-bold mt-3">{average} ⭐</p>

        <p className="text-slate-500">{count} reviews</p>
      </div>

      <div className="card p-6">
        <h2 className="font-bold mb-5">Customer Reviews</h2>

        <div className="space-y-4">
          {reviews.map((review) => (
            <div key={review.created_at} className="border-b pb-4">
              <p className="font-medium">{review.profiles?.email}</p>

              <div className="text-yellow-500">
                {"★".repeat(review.rating)}
                <span className="text-slate-300">
                  {"★".repeat(5 - review.rating)}
                </span>
              </div>

              <p className="text-slate-600 mt-2">{review.comment}</p>

              <p className="text-xs text-slate-400">{review.services?.title}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
