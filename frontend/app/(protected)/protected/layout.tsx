import { redirect } from "next/navigation";
import { createClient } from "@/src/lib/server";
import { getCompaniesServer } from "@/src/services/company.service";

export default async function ProtectedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.getClaims();

  if (error || !data?.claims) {
    redirect("/auth/login");
  }

  const companies = await getCompaniesServer();

  if (!companies.length) {
    redirect("/protected/no-companies");
  }

  return <>{children}</>;
}
