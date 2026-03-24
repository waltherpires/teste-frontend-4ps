export const dynamic = "force-dynamic";

import { redirect } from "next/navigation";
import { getCompaniesServer } from "@/src/services/company.service";

export default async function ProtectedIndexPage() {
  const companies = await getCompaniesServer();

  if (!companies.length) {
    redirect("/protected/no-companies"); 
  }

  const firstCompany = companies[0];

  redirect(`/protected/${firstCompany.company_id}`);
}