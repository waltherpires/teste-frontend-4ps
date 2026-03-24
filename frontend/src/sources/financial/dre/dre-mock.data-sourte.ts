// dre.mock.datasource.ts
import { MetricsDataSource } from "@/src/sources/financial/metrics.data-source";
import { dreMetrics } from "@/src/mocks/financial-dre.mock";


// todo: Criar outro arquivo para DreApiDataSource que faz chamada para o backend ou BFF
export class DreMockDataSource implements MetricsDataSource {
  async getMetrics() {
    return dreMetrics;
  }
}