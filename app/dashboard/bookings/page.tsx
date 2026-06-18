import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabaseServer";
import BookingTabs from "@/components/dashboard/BookingTabs";

export default async function BookingsPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/auth/login");
  }

  const { data: bookings, error } = await supabase
    .from("bookings")
    .select(
      `
        id,
        booking_date,
        booking_time,
        status,

        services(
          title,
          price
        ),

        vendors(
          business_name,
          logo
        )
        `,
    )
    .eq("user_id", user.id)
    .order("created_at", {
      ascending: false,
    });

  if (error) {
    throw error;
  }

  return (
    <div className="section">
      <div className="container-custom">
        <h1 className="text-3xl font-bold mb-8">My Bookings</h1>

        <BookingTabs bookings={bookings ?? []} />
      </div>
    </div>
  );
}
