// dre.mock.datasource.ts
import { MetricsDataSource } from "@/src/sources/financial/metrics.data-source";
import { dashboardMetrics } from "@/src/mocks/financial-dashboard.mock";


// todo: Criar outro arquivo para DashboardApiDataSource que faz chamada para o backend ou BFF
export class DashboardMockDataSource implements MetricsDataSource {
  async getMetrics() {
    return dashboardMetrics;
  }
}