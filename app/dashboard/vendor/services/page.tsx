import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabaseServer";
import { getVendorByOwnerId } from "@/services/server/vendor.service";
import { getVendorServices } from "@/services/server/service-management.service";
import { deleteService } from "@/services/server/service-actions";
import { deleteServiceAction } from "./action";

export default async function VendorServicesPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/auth/login");
  }

  const vendor = await getVendorByOwnerId(user.id);

  if (!vendor) {
    redirect("/dashboard/vendor/onboarding");
  }

  const services = await getVendorServices(vendor.id);

  return (
    <div className="section">
      <div className="container-custom">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold">My Services</h1>
          </div>

          <Link href="/dashboard/vendor/services/new" className="btn-primary">
            Add Service
          </Link>
        </div>

        {services.length === 0 ? (
          <div className="card p-10 text-center">No services yet</div>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">
            {services.map((service: any) => (
              <div key={service.id} className="card p-6">
                <h3 className="font-semibold">{service.title}</h3>

                <p className="text-slate-500 mt-2">{service.description}</p>

                <p className="mt-4 font-bold">₦{service.price}</p>

                <div className="mt-5 flex gap-3">
                  <Link
                    href={`/dashboard/vendor/services/${service.id}/edit`}
                    className="btn-secondary"
                  >
                    Edit
                  </Link>

                  <form action={deleteServiceAction}>
                    <input type="hidden" name="serviceId" value={service.id} />

                    <button
                      type="submit"
                      className="px-4 py-2 rounded-xl border border-red-500 text-red-500"
                    >
                      Delete
                    </button>
                  </form>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
