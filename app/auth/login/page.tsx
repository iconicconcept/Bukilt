"use client";

import { useState } from "react";
import { toast } from "sonner";
import { signIn } from "@/services/auth.service";
import AuthCard from "@/components/auth/AuthCard";

export default function SignupPage() {
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const form = new FormData(e.currentTarget);

    const email = form.get("email") as string;
    const password = form.get("password") as string;

    try {
      setLoading(true);

      await signIn(email, password);

      toast.success("Signed in successfully");
    } catch (error) {
      console.error(error);

      toast.error("Failed to sign in");
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthCard title="Create Account" subtitle="Join Bukil today">
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* <input
          name="fullName"
          placeholder="Full Name"
          className="w-full border rounded-xl p-3"
          required
        /> */}

        <input
          name="email"
          type="email"
          placeholder="Email"
          className="w-full border rounded-xl p-3 bg-yellow-300 text-black"
          required
        />

        <input
          name="password"
          type="password"
          placeholder="Password"
          className="w-full border rounded-xl p-3 bg-yellow-300 text-black"
          required
        />

        <button disabled={loading} className="btn-primary w-full">
          {loading ? "Logging in..." : "Log In"}
        </button>

      </form>
    </AuthCard>
  );
}
