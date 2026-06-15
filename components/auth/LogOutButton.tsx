"use client";

import { signOut } from "@/services/auth.service";

export default function LogoutButton() {
  return (
    <button
      onClick={async () => {
        await signOut();
      }}
      className="btn-secondary mt-4 bg-red-200"
    >
      Logout
    </button>
  );
}
