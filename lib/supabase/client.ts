import { createBrowserClient, type SupabaseClient } from "@supabase/ssr"

let supabase: SupabaseClient | undefined

export function createClient() {
  if (supabase) return supabase

  supabase = createBrowserClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!)

  return supabase
}
