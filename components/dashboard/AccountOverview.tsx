type Props = {
  email: string;
  createdAt: string;
  bookingCount: number;
};

export default function AccountOverview({
  email,
  createdAt,
  bookingCount,
}: Props) {
  return (
    <div className="card p-6">
      <h3 className="font-semibold mb-5">Account Overview</h3>

      <div className="space-y-4">
        <div>
          <p className="text-sm text-slate-500">Email</p>

          <p className="font-medium">{email}</p>
        </div>

        <div>
          <p className="text-sm text-slate-500">Joined</p>

          <p className="font-medium">
            {new Date(createdAt).toLocaleDateString()}
          </p>
        </div>

        <div>
          <p className="text-sm text-slate-500">Total Bookings</p>

          <p className="font-medium">{bookingCount}</p>
        </div>
      </div>
    </div>
  );
}
