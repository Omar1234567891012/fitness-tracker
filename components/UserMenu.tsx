"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase";

export default function UserMenu() {
  const supabase = createClient(); // <-- HIER hinein verschieben
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
    // ...
  );
}