"use client";

import { useState } from "react";
import { toast } from "sonner";
import { signUp } from "@/services/auth.service";
import AuthCard from "@/components/auth/AuthCard";
import AuthRedirect from "@/components/auth/AuthRedirect";

export default function SignupPage() {
  const [loading, setLoading] = useState(false);

  async function handleSubmit(
    e: React.FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();

    const form = new FormData(e.currentTarget);

    const fullName = form.get("fullName") as string;
    const email = form.get("email") as string;
    const password = form.get("password") as string;

    try {
      setLoading(true);

      await signUp(
        email,
        password,
        fullName
      );

      toast.success(
        "Account created successfully"
      );
    } catch (error) {
      console.error(error);

      toast.error(
        "Failed to create account"
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthRedirect>
        <AuthCard
        title="Create Account"
        subtitle="Join Bukil today"
        >
        <form
            onSubmit={handleSubmit}
            className="space-y-4"
        >
            <input
            name="fullName"
            placeholder="Full Name"
            className="w-full border rounded-xl p-3 bg-amber-300 text-black"
            required
            />

            <input
            name="email"
            type="email"
            placeholder="Email"
            className="w-full border rounded-xl p-3 bg-amber-300 text-black"
            required
            />

            <input
            name="password"
            type="password"
            placeholder="Password"
            className="w-full border rounded-xl p-3 bg-amber-300 text-black"
            required
            />

            <button
            disabled={loading}
            className="btn-primary w-full"
            >
            {loading
                ? "Creating..."
                : "Create Account"}
            </button>

        </form>
        </AuthCard>
    </AuthRedirect>
  );
}
