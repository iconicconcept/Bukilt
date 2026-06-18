"use client";

import { useRouter } from "next/navigation";

export default function LogoutButton() {
  const router = useRouter();

  async function handleLogout() {
    await fetch("/auth/logout", {
      method: "GET",
    });

    router.refresh();

    router.push("/");
  }

  return (
    <button onClick={handleLogout} className="hover:text-primary">
      Logout
    </button>
  );
}
