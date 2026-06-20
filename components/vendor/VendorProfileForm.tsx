"use client";

import { useState } from "react";
import { toast } from "sonner";
import { updateVendorProfileAction } from "@/app/dashboard/vendor/profile/actions";

type Props = {
  vendor: any;
};

function formatTime(time: string) {
  const [hours, minutes] =
    time.split(":");

  const date = new Date();

  date.setHours(Number(hours));
  date.setMinutes(Number(minutes));

  return date.toLocaleTimeString(
    "en-US",
    {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    }
  );
}

export default function VendorProfileForm({ vendor }: Props) {
  const [loading, setLoading] = useState(false);
  //   const [uploading, setUploading] = useState(false);
  const days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  const [selectedDays, setSelectedDays] = useState<string[]>(
    vendor.available_days ?? [],
  );

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

      <div className="space-y-4">
        <label className="font-medium">Available Days</label>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {days.map((day) => {
            const active = selectedDays.includes(day);

            return (
              <label
                key={day}
                className={`
          cursor-pointer
          rounded-xl
          border
          p-3
          text-center
          ${active ? "bg-primary text-white" : "bg-white"}
          `}
              >
                <input
                  type="checkbox"
                  name="availableDays"
                  value={day}
                  checked={active}
                  onChange={() => {
                    setSelectedDays((prev) =>
                      prev.includes(day)
                        ? prev.filter((d) => d !== day)
                        : [...prev, day],
                    );
                  }}
                  className="hidden"
                />

                {day}
              </label>
            );
          })}
        </div>

        <div>
          <label>Start Time</label>

          <input
            type="time"
            name="startTime"
            defaultValue={vendor.start_time ?? ""}
            className="w-full border rounded-xl p-3"
          />
        </div>

        <div>
          <label>End Time</label>

          <input
            type="time"
            name="endTime"
            defaultValue={vendor.end_time ?? ""}
            className="w-full border rounded-xl p-3"
          />
        </div>
      </div>

      {vendor.available_days?.length > 0 && (
        <div className="mt-4">
          <p className="font-semibold">Availability</p>

          <p className="text-slate-500">{vendor.available_days.join(", ")}</p>

          <p className="text-slate-500">
            {formatTime(vendor.start_time)}
            {" - "}
            {formatTime(vendor.end_time)}
          </p>
        </div>
      )}

      <input type="file" name="logo" accept="image/*" className="w-full" />

      <button disabled={loading} className="btn-primary w-full">
        {loading ? "Saving..." : "Save Changes"}
      </button>
    </form>
  );
}
