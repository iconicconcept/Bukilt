export default function ServiceCardSkeleton() {
  return (
    <div className="card p-5 space-y-4 animate-pulse">
      <div className="skeleton h-5 w-2/3" />

      <div className="skeleton h-4 w-full" />
      <div className="skeleton h-4 w-4/5" />

      <div className="flex justify-between">
        <div className="skeleton h-4 w-16" />
        <div className="skeleton h-4 w-16" />
      </div>

      <div className="skeleton h-10 w-full rounded-xl" />
    </div>
  );
}
