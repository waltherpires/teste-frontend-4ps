"use client";

import { useRouter, usePathname, useParams } from "next/navigation";
import { Button } from "@/src/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/src/components/ui/dropdown-menu";
import { useCompanies } from "../hooks/useCompanies";
import { Spinner } from "./ui/spinner";

export type Props = {
  size?: "sm" | "default" | "lg" | "icon" | "icon-sm" | "icon-lg" | null | undefined;
  className?: string;
}

export function CompanySwitcher({size = "default", className = ""}: Props) {
  const { data: companies, loading } = useCompanies();

  const params = useParams();
  const activeCompanyId = params.companyId;
  const router = useRouter();
  const pathname = usePathname();

  const activeCompany = companies.find((c) => c.company_id === activeCompanyId);

  function switchCompany(companyId: string) {
    const segments = pathname.split("/");

    if (segments.length >= 3) {
      segments[2] = companyId;
    }

    router.push(segments.join("/"));
  }

  if (loading)
    return (
      <Button variant="outline" disabled size={size} className={className}>
        <Spinner />
      </Button>
    );

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size={size} className={className}>
          {activeCompany?.name ?? "Selecionar empresa"}
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent>
        {companies.map((company) => (
          <DropdownMenuItem
            key={company.company_id}
            onClick={() => switchCompany(company.company_id)}
          >
            {company.name}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
