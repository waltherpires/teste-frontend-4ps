"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { dfcData, formatCurrency } from "@/lib/financial-data"
import { ComposedChart, Bar, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts"

type Period = "jan" | "fev" | "mar" | "abr" | "mai" | "jun"

export function DFCChart() {
  const periods: Period[] = ["jan", "fev", "mar", "abr", "mai", "jun"]

  const calculateTotal = (items: Array<{ values: Record<string, number> }>, period: Period): number => {
    return items.reduce((sum, item) => sum + item.values[period], 0)
  }

  const calculateSaldoFinal = (period: Period): number => {
    const saldoInicial = dfcData.saldoInicial[period]
    const operacional = calculateTotal(dfcData.operacional, period)
    const investimento = calculateTotal(dfcData.investimento, period)
    const financiamento = calculateTotal(dfcData.financiamento, period)
    return saldoInicial + operacional + investimento + financiamento
  }

  const chartData = periods.map((period) => ({
    period: dfcData.periodLabels[period],
    Operacional: calculateTotal(dfcData.operacional, period),
    Investimento: calculateTotal(dfcData.investimento, period),
    Financiamento: calculateTotal(dfcData.financiamento, period),
    "Saldo Final": calculateSaldoFinal(period),
  }))

  return (
    <Card className="bg-card border-border">
      <CardHeader>
        <CardTitle className="text-foreground">Evolução do Fluxo de Caixa</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={350}>
          <ComposedChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
            <XAxis dataKey="period" stroke="var(--muted-foreground)" fontSize={12} />
            <YAxis
              stroke="var(--muted-foreground)"
              fontSize={12}
              tickFormatter={(value) => `R$ ${(value / 1000).toFixed(0)}k`}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "var(--card)",
                border: "1px solid var(--border)",
                borderRadius: "8px",
              }}
              labelStyle={{ color: "var(--foreground)" }}
              formatter={(value: number) => [formatCurrency(value), ""]}
            />
            <Legend />
            <Bar dataKey="Operacional" fill="var(--primary)" radius={[4, 4, 0, 0]} />
            <Bar dataKey="Investimento" fill="var(--chart-4)" radius={[4, 4, 0, 0]} />
            <Bar dataKey="Financiamento" fill="var(--chart-5)" radius={[4, 4, 0, 0]} />
            <Line
              type="monotone"
              dataKey="Saldo Final"
              stroke="var(--chart-2)"
              strokeWidth={3}
              dot={{ fill: "var(--chart-2)", strokeWidth: 2 }}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
