type Props = {
  title: string;
  subtitle: string;
  children: React.ReactNode;
};

export default function AuthCard({ title, subtitle, children }: Props) {
  return (
    <div className="min-h-[80vh] flex items-center justify-center">
      <div className="card w-full max-w-md p-8">
        <h1 className="text-2xl font-bold">{title}</h1>

        <p className="text-slate-500 mt-2 mb-6">{subtitle}</p>

        {children}
      </div>
    </div>
  );
}
