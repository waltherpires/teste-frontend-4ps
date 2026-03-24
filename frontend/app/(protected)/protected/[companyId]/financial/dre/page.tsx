import HeaderFinancial from "@/src/components/financial/header";
import { MetricCards } from "@/src/components/metric-cards";
import { dreMetricRepository } from "@/src/repository/financial/dre.repository";

export default async function FinancialDrePage() {
  const period = { startDate: "123", endDate: "123" };
  const metrics = await dreMetricRepository.getMetrics(period);

  return (
    <>
    <HeaderFinancial title="DRE" description="Demonstrativo de Resultado do Exercício - Análise por período"/>
      <div className="w-full mt-4">
      <MetricCards metrics={metrics} />
      </div>
    </>
  );
}
