"use client";

import { useState } from "react";
import { toast } from "sonner";
import { updateVendorProfileAction } from "@/app/dashboard/vendor/profile/actions";

const DAYS = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

type Props = {
  vendorId: string;
  availability: {
    available_days?: string[];
    start_time?: string;
    end_time?: string;
  };
};

export default function AvailabilityForm({ availability }: Props) {
  const [loading, setLoading] = useState(false);

  const [selectedDays, setSelectedDays] = useState<string[]>(
    availability.available_days ?? [],
  );

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    try {
      setLoading(true);

      const form = new FormData(e.currentTarget);

      selectedDays.forEach((day) => {
        form.append("availableDays", day);
      });

      await updateVendorProfileAction(form);

      toast.success("Availability updated");
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  }

  function toggleDay(day: string) {
    setSelectedDays((prev) =>
      prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day],
    );
  }

  return (
    <form onSubmit={handleSubmit} className="card p-6 space-y-6">
      <div>
        <h3 className="font-semibold mb-3">Available Days</h3>

        <div className="flex flex-wrap gap-3">
          {DAYS.map((day) => {
            const active = selectedDays.includes(day);

            return (
              <button
                key={day}
                type="button"
                onClick={() => toggleDay(day)}
                className={`
                  px-4 py-2 rounded-xl border
                  ${
                    active
                      ? "bg-blue-600 text-white border-blue-600"
                      : "bg-white text-slate-700"
                  }
                `}
              >
                {day}
              </button>
            );
          })}
        </div>
      </div>

      <div>
        <label className="block mb-2">Start Time</label>

        <input
          type="time"
          name="startTime"
          defaultValue={availability.start_time ?? ""}
          className="w-full border rounded-xl p-3"
          required
        />
      </div>

      <div>
        <label className="block mb-2">End Time</label>

        <input
          type="time"
          name="endTime"
          defaultValue={availability.end_time ?? ""}
          className="w-full border rounded-xl p-3"
          required
        />
      </div>

      <button type="submit" disabled={loading} className="btn-primary w-full">
        {loading ? "Saving..." : "Save Availability"}
      </button>
    </form>
  );
}
