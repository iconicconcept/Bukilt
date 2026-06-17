import ServiceForm from "@/components/vendor/ServiceForm";

export default function NewServicePage() {
  return (
    <div className="section">
      <div className="container-custom max-w-2xl">

        <h1 className="text-3xl font-bold mb-6">
          Add Service
        </h1>

        <ServiceForm />

      </div>
    </div>
  );
}