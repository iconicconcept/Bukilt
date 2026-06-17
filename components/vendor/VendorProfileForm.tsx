"use client";

import { useState } from "react";
import { toast } from "sonner";
import { updateVendorProfileAction } from "@/app/dashboard/vendor/profile/actions";

type Props = {
  vendor: any;
};

export default function VendorProfileForm({ vendor }: Props) {
  const [loading, setLoading] = useState(false);
//   const [uploading, setUploading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const form = new FormData(e.currentTarget);

    try {
      setLoading(true);

      await updateVendorProfileAction(form);

      toast.success("Profile updated");
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="card p-6 space-y-5">
      {vendor.logo && (
        <img
          src={vendor.logo}
          className="w-24 h-24 rounded-full object-cover"
        />
      )}

      <input
        name="businessName"
        defaultValue={vendor.business_name}
        placeholder="Business Name"
        className="w-full border rounded-xl p-3"
        required
      />

      <input
        name="category"
        defaultValue={vendor.category ?? ""}
        placeholder="Category"
        className="w-full border rounded-xl p-3"
      />

      <input
        name="phone"
        defaultValue={vendor.phone ?? ""}
        placeholder="Phone Number"
        className="w-full border rounded-xl p-3"
      />

      <input
        name="location"
        defaultValue={vendor.location ?? ""}
        placeholder="Location"
        className="w-full border rounded-xl p-3"
      />

      <textarea
        name="description"
        defaultValue={vendor.description ?? ""}
        rows={5}
        placeholder="Business Description"
        className="w-full border rounded-xl p-3"
      />

      <input type="file" name="logo" accept="image/*" className="w-full" />

      <button disabled={loading} className="btn-primary w-full">
        {loading ? "Saving..." : "Save Changes"}
      </button>
    </form>
  );
}
