"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { createServiceAction } from "@/app/dashboard/vendor/services/new/actions";
import { updateServiceAction } from "@/app/dashboard/vendor/services/[serviceId]/edit/actions";

type ServiceFormProps = {
  service?: {
    id: string;
    title: string;
    description: string;
    price: number;
    duration: number;
  };
};

export default function ServiceForm({ service }: ServiceFormProps) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const form = new FormData(e.currentTarget);

    try {
      setLoading(true);

      const imageFile = form.get("image") as File;

      if (imageFile && imageFile.size > 0) {
        const uploadForm = new FormData();

        uploadForm.append("file", imageFile);

        const response = await fetch("/api/upload/service", {
          method: "POST",
          body: uploadForm,
        });

        const result = await response.json();

        if (!response.ok) {
          throw new Error(result.error);
        }

        form.set("image", result.url);
      } else {
        form.delete("image");
      }

      if (service) {
        await updateServiceAction(form);

        toast.success("Service updated");
      } else {
        await createServiceAction(form);

        toast.success("Service created");
      }

      router.push("/dashboard/vendor/services");
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="card p-6 space-y-5">
      <input
        name="image"
        type="file"
        accept="image/*"
        className="w-full border rounded-xl p-3"
      />

      <input
        name="title"
        defaultValue={service?.title}
        placeholder="Service Title"
        required
        className="w-full border rounded-xl p-3"
      />

      <textarea
        name="description"
        defaultValue={service?.description}
        placeholder="Description"
        rows={5}
        required
        className="w-full border rounded-xl p-3"
      />

      <input
        name="price"
        defaultValue={service?.price}
        type="number"
        placeholder="Price"
        required
        className="w-full border rounded-xl p-3"
      />

      <input
        name="duration"
        defaultValue={service?.duration}
        placeholder="Duration (minutes)"
        required
        className="w-full border rounded-xl p-3"
      />

      {service && <input type="hidden" name="id" value={service.id} />}

      <button disabled={loading} className="btn-primary w-full">
        {loading
          ? service
            ? "Updating..."
            : "Creating..."
          : service
            ? "Update Service"
            : "Create Service"}
      </button>
    </form>
  );
}
