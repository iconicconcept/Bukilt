"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { createServiceAction } from "@/app/dashboard/vendor/services/new/actions";

export default function ServiceForm() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const form = new FormData(e.currentTarget);

    try {
      setLoading(true);

      await createServiceAction(form);

      toast.success("Service created");

      router.push("/vendor/services");
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="card p-6 space-y-5">
      <input
        name="title"
        placeholder="Service Title"
        required
        className="w-full border rounded-xl p-3"
      />

      <textarea
        name="description"
        placeholder="Description"
        rows={5}
        required
        className="w-full border rounded-xl p-3"
      />

      <input
        name="price"
        type="number"
        placeholder="Price"
        required
        className="w-full border rounded-xl p-3"
      />

      <input
        name="duration"
        type="number"
        placeholder="Duration (minutes)"
        required
        className="w-full border rounded-xl p-3"
      />

      <button disabled={loading} className="btn-primary w-full">
        {loading ? "Creating..." : "Create Service"}
      </button>
    </form>
  );
}
