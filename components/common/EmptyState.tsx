export default function EmptyState({
  title = "No services found",
  description = "Check back later or add new services.",
}: {
  title?: string;
  description?: string;
}) {
  return (
    <div className="text-center py-20 text-slate-500">
      <h2 className="text-lg font-semibold text-slate-700">{title}</h2>
      <p className="text-sm mt-2">{description}</p>
    </div>
  );
}
