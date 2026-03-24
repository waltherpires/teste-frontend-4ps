import FinancialSidebar from "@/src/components/financial/sidebar";
import { SidebarProvider } from "@/src/components/ui/sidebar";
import { CustomTrigger } from "@/src/components/ui/sidebar-trigger";
import { createClient } from "@/src/lib/server";
import { getModulesServer } from "@/src/services/company.service";
import { redirect } from "next/navigation";

type Params = {
  companyId: string;
};

export default async function FinancialLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Params | Promise<Params>;
}>) {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getClaims();
  const resolvedParams = await params;
  const { companyId } = resolvedParams;
  const modules = await getModulesServer({ companyId });

  const financialIsActive = modules.find(
    (m) => m.slug === "finance" && m.is_active,
  );

  if (!financialIsActive) {
    redirect(`/protected/${companyId}`);
  }

  return (
    <SidebarProvider>
      <FinancialSidebar claims={data?.claims} />
      <main className="bg-slate-50 w-full min-h-screen relative">
        {children}
      </main>
    </SidebarProvider>
  );
}
