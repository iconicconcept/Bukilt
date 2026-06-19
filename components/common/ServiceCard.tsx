import Link from "next/link";

type Service = {
  id: string;
  title: string;
  description: string;
  price: number;
  duration: number;
  image?: string;

  vendors?: {
    business_name: string;
    category: string;
  };
};

export default function ServiceCard({ service }: { service: Service }) {
  return (
    <div className="card overflow-hidden hover-lift animate-soft">
      {service.image ? (
        <img
          src={service.image}
          alt={service.title}
          className="w-full h-52 object-cover"
        />
      ) : (
        <div className="w-full h-52 bg-slate-100 flex items-center justify-center text-slate-400">
          No Image
        </div>
      )}

      <div className="p-5">
        <div className="flex justify-between items-start mb-2">
          <h2 className="font-semibold text-lg line-clamp-1">
            {service.title}
          </h2>

          <span className="text-sm text-primary font-medium">
            ₦{service.price}
          </span>
        </div>

        {service.vendors && (
          <div className="mb-3">
            <p className="text-sm font-medium">
              {service.vendors.business_name}
            </p>

            <p className="text-xs text-slate-500">{service.vendors.category}</p>
          </div>
        )}

        <p className="text-sm text-slate-500 line-clamp-2">
          {service.description}
        </p>

        <div className="flex justify-between items-center mt-4">
          <span className="text-sm text-slate-500">
            {service.duration} mins
          </span>

          <Link href={`/services/${service.id}`} className="btn-primary">
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
}
