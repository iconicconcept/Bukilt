"use client";

import { useState } from "react";
import { createVendorAction } from "@/app/dashboard/vendor/onboarding/actions";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function VendorOnboardingForm() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const form = new FormData(e.currentTarget);

    try {
      setLoading(true);

      await createVendorAction(form);

      toast.success("Vendor profile created");

      router.push("/dashboard/vendor");
    } catch (error: any) {
      toast.error(error.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="card p-6 space-y-5">
      <div>
        <label className="block text-sm mb-2">Business Name</label>

        <input
          name="businessName"
          required
          className="w-full border rounded-xl p-3"
        />
      </div>

      <div>
        <label className="block text-sm mb-2">Description</label>

        <textarea
          name="description"
          rows={4}
          required
          className="w-full border rounded-xl p-3"
        />
      </div>

      <div>
        <label className="block text-sm mb-2">Phone Number</label>

        <input name="phone" required className="w-full border rounded-xl p-3" />
      </div>

      <button disabled={loading} className="btn-primary w-full">
        {loading ? "Creating..." : "Create Vendor Profile"}
      </button>
    </form>
  );
}
