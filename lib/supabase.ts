import { createBrowserClient } from "@supabase/ssr";

export function createClient() {
  console.log(
    "SUPABASE_URL:",
    process.env.NEXT_PUBLIC_SUPABASE_URL ? "OK" : "MISSING"
  );

  console.log(
    "SUPABASE_KEY:",
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? "OK" : "MISSING"
  );

  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}
