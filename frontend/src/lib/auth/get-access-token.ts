import { createSupabaseServerClient } from "@/src/lib/supabase/server";

export async function getAccessToken() {
  const supabase = await createSupabaseServerClient();

  const { data } = await supabase.auth.getSession();

  const token = data.session?.access_token;
  const cleanToken = token?.split(".").slice(0,3).join(".");
  return cleanToken;
}
