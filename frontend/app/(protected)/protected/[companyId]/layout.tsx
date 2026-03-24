import { getCompaniesServer } from "@/src/services/company.service";
import { redirect } from "next/navigation";

export default async function ProtectedCompanyLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ companyId: string }>;
}) {
  const { companyId } = await params;
  const companies = await getCompaniesServer();

  const hasAccess = companies.some(
    (company) => company.company_id === companyId,
  );

  if (!hasAccess) {
    redirect(`/protected`);
  }

  return <>{children}</>;
}
