// dre.mock.datasource.ts
import { MetricsDataSource, MetricsFilter } from "@/src/sources/financial/metrics.data-source";
import { dreMetrics } from "@/src/mocks/financial-dre.mock";
import { DateRange } from "@/src/types/date-range";

// todo: Criar outro arquivo para DreApiDataSource que faz chamada para o backend ou BFF
export class DreMockDataSource implements MetricsDataSource {
  async getMetrics(_period: DateRange, _filter?: MetricsFilter) {
    return dreMetrics;
  }
}