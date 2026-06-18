import Link from "next/link";

type Service = {
  id: string;
  title: string;
  description: string;
  price: number;
  duration: number;
  image: string;
};

export default function ServiceCard({ service }: { service: Service }) {
  return (
    <div className="card p-5 flex flex-col gap-3 hover-lift animate-soft">
      {service.image ? (
        <img
          src={service.image}
          className="w-full h-48 object-cover rounded-xl"
        />
      ) : (
        <div className="w-full h-48 bg-slate-100 rounded-xl flex items-center justify-center">
          No Image
        </div>
      )}

      {/* Title */}
      <h2 className="text-lg font-semibold">{service.title}</h2>

      {/* Description */}
      <p className="text-sm text-slate-500 line-clamp-2">
        {service.description}
      </p>

      {/* Meta */}
      <div className="flex justify-between text-sm text-slate-600">
        <span>₦{service.price}</span>
        <span>{service.duration} min</span>
      </div>

      {/* CTA */}
      <Link
        href={`/services/${service.id}`}
        className="btn-primary text-center mt-2"
      >
        View Details
      </Link>
    </div>
  );
}
