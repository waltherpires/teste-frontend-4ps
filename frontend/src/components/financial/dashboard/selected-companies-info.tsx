"use client";

import { useCompanies } from "@/src/hooks/useCompanies";
import { aggregateMetrics } from "@/src/mocks/financial-dashboard.mock";

interface SelectedCompaniesInfoProps {
  activeCompanyId: string;
  additionalCompanyIds: string[];
}

export function SelectedCompaniesInfo({
  activeCompanyId,
  additionalCompanyIds,
}: SelectedCompaniesInfoProps) {
  const { data: companies, loading } = useCompanies();
  const activeCompany = companies.find((c) => c.company_id === activeCompanyId);
  const additional = additionalCompanyIds
    .map((id) => companies.find((c) => c.company_id === id))
    .filter((x): x is NonNullable<typeof x> => Boolean(x));

  const activeMetrics = aggregateMetrics([activeCompanyId]);
  const aggregatedMetrics = aggregateMetrics(
    [activeCompanyId, ...additionalCompanyIds]
  );
  const faturamentoAtivo =
    activeMetrics.find((m) => m.title === "Faturamento")?.value ?? 0;
  const faturamentoAgregado =
    aggregatedMetrics.find((m) => m.title === "Faturamento")?.value ?? 0;

  if (loading) {
    return (
      <div className="m-4 p-4 rounded-lg border bg-white shadow-sm">
        <p>Carregando empresas selecionadas...</p>
      </div>
    );
  }

  return (
    <div className="m-4 p-4 rounded-lg border bg-white shadow-sm">
      <h2 className="font-semibold text-base">Empresas no filtro de dados</h2>
      <p className="text-sm text-muted-foreground">
        Empresa ativa: <strong>{activeCompany?.name ?? activeCompanyId}</strong>
      </p>
      <p className="text-sm text-muted-foreground">
        Empresas adicionais: {additional.length > 0 ? (
          <span>{additional.map((item) => item.name).join(", ")}</span>
        ) : (
          <span className="text-foreground">nenhuma empresa adicionada</span>
        )}
      </p>
    </div>
  );
}