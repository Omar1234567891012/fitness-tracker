"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function UserMenu() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function loadUser() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user) {
        setEmail(user.email ?? "");
      }
    }

    loadUser();
  }, []);

  async function logout() {
    setLoading(true);

    await supabase.auth.signOut();

    router.replace("/login");
    router.refresh();
  }

  return (
    <div className="flex items-center gap-4">
      <div className="text-right">
        <p className="text-sm text-gray-500">
          Angemeldet als
        </p>

        <p className="font-semibold">
          {email}
        </p>
      </div>

      <button
        onClick={logout}
        disabled={loading}
        className="rounded-lg bg-red-600 px-4 py-2 text-white hover:bg-red-700 disabled:opacity-50"
      >
        {loading ? "..." : "Logout"}
      </button>
    </div>
  );
}