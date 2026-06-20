"use client";


// export default function LogoutButtons() {
//   const router = useRouter();

//   async function handleLogout() {
//     await fetch("/auth/logout", {
//       method: "GET",
//     });

//     router.refresh();

//     router.push("/");
//   }

//   return (
//     <button onClick={handleLogout} className="hover:text-primary">
//       Logout
//     </button>
//   );
// }


import { useState } from "react";
import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";

export default function LogoutButton() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleLogout = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/auth/logout", { method: "POST" });
      if (res.ok) {
        router.push("/");
        router.refresh();
      }
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={handleLogout}
      disabled={isLoading}
      className="flex items-center gap-2 text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-amber-500 dark:hover:text-amber-400 transition-colors disabled:opacity-50"
    >
      <LogOut className="w-4 h-4" />
      {isLoading ? "Logging out..." : "Logout"}
    </button>
  );
}


