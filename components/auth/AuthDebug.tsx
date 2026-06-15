"use client";

import { useAuthStore } from "@/store/auth.store";

export default function AuthDebug() {
  const user = useAuthStore(
    (state) => state.user
  );

  return (
    <pre className="bg-gray-100 p-4 rounded-lg text-sm overflow-x-auto">
      {JSON.stringify(user, null, 2)}
    </pre>
  );
}