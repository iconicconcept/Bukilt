export default function Footer() {
  return (
    <footer className="border-t border-slate-200 dark:border-slate-800 py-10 mt-10">
      <div className="container-custom flex justify-between text-sm text-slate-500">
        <p>© {new Date().getFullYear()} Bukil</p>
        <p className="opacity-70">Modern booking infrastructure</p>
      </div>
    </footer>
  );
}
