import {
  monthlyFinancialData,
  monthlyFinancialWithBalance,
} from "@/src/mocks/financial-dashboard.mock";

import {
  MonthlyFinancialData,
  MonthlyFinancialDataWithBalance,
} from "../types/financial";

export function getFinancialOverview(
  options: { includeBalance: true }
): Promise<MonthlyFinancialDataWithBalance[]>;

export function getFinancialOverview(
  options?: { includeBalance?: false }
): Promise<MonthlyFinancialData[]>;

export async function getFinancialOverview(
  { includeBalance = false }: { includeBalance?: boolean } = {}
) {
  if (includeBalance) {
    return monthlyFinancialWithBalance;
  }

  return monthlyFinancialData;
}