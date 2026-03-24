"use client";

import { useState, useEffect, useMemo } from "react";

import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "../../ui/chart";

import {
  Bar,
  CartesianGrid,
  Line,
  XAxis,
  YAxis,
  ComposedChart,
} from "recharts";

import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card";

import { MonthlyFinancialDataWithBalance } from "@/src/types/financial";
import { getFinancialOverview } from "@/src/services/financial.service";

export function ClashFlowEvolutionCard() {
  const financialChartConfig = {
    revenue: {
      label: "Receita",
      color: "hsl(var(--chart-3))",
    },
    expense: {
      label: "Despesas",
      color: "hsl(var(--chart-2))",
    },
    finalBalance: {
      label: "Saldo Final",
      color: "hsl(var(--chart-6))",
    },
  } satisfies ChartConfig;

  const [data, setData] = useState<MonthlyFinancialDataWithBalance[]>([]);

  useEffect(() => {
    async function loadData() {
      const result = await getFinancialOverview({
        includeBalance: true,
      });

      const transformed = result.map((r) => ({
        ...r,
        expense: -Math.abs(r.expense),
      }));

      setData(transformed);
    }

    loadData();
  }, []);

  const maxAbsValue = useMemo(() => {
    if (!data.length) return 0;

    return Math.max(
      ...data.flatMap((d) => [
        Math.abs(d.revenue),
        Math.abs(d.expense),
        Math.abs(d.finalBalance),
      ]),
    );
  }, [data]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Evolução do Fluxo de Caixa</CardTitle>
      </CardHeader>

      <CardContent>
        <ChartContainer config={financialChartConfig}>
          <ComposedChart
            data={data}
            margin={{
              top: 20,
              right: 20,
              left: 0,
              bottom: 0,
            }}
          >
            {/* Grid */}
            <CartesianGrid strokeDasharray="3 3" vertical={false} />

            {/* X Axis */}
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
            />

            <YAxis
              domain={[-maxAbsValue, maxAbsValue]}
              tickFormatter={(value) => `R$ ${(value / 1000).toFixed(0)}k`}
            />

            <Bar
              dataKey="revenue"
              fill="var(--chart-3)"
              radius={[4, 4, 0, 0]}
            />

            <Bar
              dataKey="expense"
              fill="var(--chart-2)"
              radius={[4, 4, 0, 0]}
            />

            <Line
              dataKey="finalBalance"
              type="monotone"
              stroke="var(--chart-6)"
              strokeWidth={3}
              dot={{ r: 4 }}
            />

            <ChartTooltip content={<ChartTooltipContent />} />
            <ChartLegend content={<ChartLegendContent />} />
          </ComposedChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
