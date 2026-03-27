"use client";

import { useMemo } from "react";
import { useCompanies } from "@/src/hooks/useCompanies";
import { useParams, useRouter, useSearchParams, usePathname } from "next/navigation";
import { Button } from "@/src/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from "@/src/components/ui/dropdown-menu";

export function CompanyAggregatorSelector() {
  const { data: companies, loading } = useCompanies();
  const params = useParams();
  const activeCompanyId = params.companyId;

  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const currentAggregated = useMemo(() => {
    const value = searchParams?.get("aggregatedCompanies") ?? "";
    return value.split(",").filter((v) => v && v !== activeCompanyId);
  }, [searchParams, activeCompanyId]);

  const updateAggregatedCompanies = (next: string[]) => {
    const paramsCopy = new URLSearchParams(searchParams?.toString() ?? "");
    if (next.length === 0) {
      paramsCopy.delete("aggregatedCompanies");
    } else {
      paramsCopy.set("aggregatedCompanies", next.join(","));
    }

    const query = paramsCopy.toString();
    const destination = query ? `${pathname ?? "/"}?${query}` : pathname ?? "/";

    router.push(destination);
    router.refresh();
  };

  const toggleCompany = (companyId: string, checked: boolean) => {
    const nextSet = new Set(currentAggregated);
    if (checked) {
      nextSet.add(companyId);
    } else {
      nextSet.delete(companyId);
    }
    updateAggregatedCompanies(Array.from(nextSet));
  };

  const selectedCount = currentAggregated.length;

  if (loading) {
    return (
      <Button variant="outline" size="sm" disabled>
        Carregando...
      </Button>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size="sm" variant="outline">
          Agregar empresas {selectedCount > 0 ? `(${selectedCount})` : ""}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent sideOffset={5} className="w-56">
        <DropdownMenuLabel>Empresas adicionais</DropdownMenuLabel>
        {companies
          .filter((company) => company.company_id !== activeCompanyId)
          .map((company) => (
            <DropdownMenuCheckboxItem
              key={company.company_id}
              checked={currentAggregated.includes(company.company_id)}
              onCheckedChange={(checked) =>
                toggleCompany(company.company_id, Boolean(checked))
              }
            >
              {company.name}
            </DropdownMenuCheckboxItem>
          ))}
        <DropdownMenuSeparator />
        <DropdownMenuCheckboxItem
          checked={false}
          onCheckedChange={() => updateAggregatedCompanies([])}
        >
          Limpar seleção
        </DropdownMenuCheckboxItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}