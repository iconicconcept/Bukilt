"use client";

import { useState } from "react";
import { toast } from "sonner";

import { createReviewAction } from "@/app/dashboard/bookings/[id]/review-action";

export default function ReviewForm({
  bookingId,
  vendorId,
}: {
  bookingId: string;
  vendorId: string;
}) {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);

  async function submitReview() {
    try {
      setLoading(true);

      const formData = new FormData();

      formData.append("bookingId", bookingId);

      formData.append("vendorId", vendorId);

      formData.append("rating", String(rating));

      formData.append("comment", comment);

      await createReviewAction(formData);

      toast.success("Review submitted");
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => setRating(star)}
            className={
              star <= rating
                ? "text-yellow-500 text-2xl"
                : "text-slate-300 text-2xl"
            }
          >
            ★
          </button>
        ))}
      </div>

      <textarea
        className="w-full border rounded-xl p-3"
        placeholder="Share your experience..."
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />

      <button disabled={loading} onClick={submitReview} className="btn-primary">
        {loading ? "Submitting..." : "Submit Review"}
      </button>
    </div>
  );
}
