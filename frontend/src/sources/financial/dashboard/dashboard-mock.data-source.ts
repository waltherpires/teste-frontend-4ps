// dashboard-mock.data-source.ts
import { MetricsDataSource, MetricsFilter } from "@/src/sources/financial/metrics.data-source";
import { aggregateMetrics } from "@/src/mocks/financial-dashboard.mock";
import { DateRange } from "@/src/types/date-range";

// todo: Criar outro arquivo para DashboardApiDataSource que faz chamada para o backend ou BFF
export class DashboardMockDataSource implements MetricsDataSource {
  async getMetrics(_period: DateRange, filter?: MetricsFilter) {
    const activeCompanyId = filter?.activeCompanyId ?? "company-1";
    const additionalCompanyIds = filter?.additionalCompanyIds ?? [];

    const allCompanyIds = Array.from(
      new Set([activeCompanyId, ...additionalCompanyIds])
    );

    return aggregateMetrics(allCompanyIds);
  }
}