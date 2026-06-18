export default function ServiceReviews({
  average,
  count,
  reviews,
}: {
  average: string;
  count: number;
  reviews: any[];
}) {
  return (
    <div className="space-y-6 mt-10">
      <div className="card p-6">
        <h2 className="text-xl font-bold">Customer Reviews</h2>

        <div className="text-3xl font-bold mt-3">{average} ⭐</div>

        <p className="text-slate-500">{count} reviews</p>
      </div>

      <div className="card p-6">
        {reviews.length === 0 ? (
          <p className="text-slate-500">No reviews yet</p>
        ) : (
          <div className="space-y-5">
            {reviews.map((review) => (
              <div key={review.created_at} className="border-b pb-4">
                <p className="font-medium">{review.profiles?.email}</p>

                <div className="text-yellow-500">
                  {"★".repeat(review.rating)}

                  <span className="text-slate-300">
                    {"★".repeat(5 - review.rating)}
                  </span>
                </div>

                <p className="mt-2 text-slate-600">{review.comment}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
