import { createClient } from "@/src/lib/server";
import { redirect } from "next/navigation";

export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.getClaims();


  if (!error && data?.claims) {
    redirect(`/protected`);
  }

  return <>{children}</>;
}
