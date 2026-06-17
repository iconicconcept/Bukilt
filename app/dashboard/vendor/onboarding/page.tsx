import VendorOnboardingForm from "@/components/vendor/VendorOnboardingForm";

export default function VendorOnboardingPage() {
  return (
    <div className="section">
      <div className="container-custom max-w-2xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Become a Vendor</h1>

          <p className="text-slate-500 mt-2">
            Create your vendor profile and start offering services.
          </p>
        </div>

        <VendorOnboardingForm />
      </div>
    </div>
  );
}
