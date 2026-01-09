"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { dreData, formatCurrency } from "@/lib/financial-data"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts"

export function DREChart() {
  const chartData = dreData.periods.map((period) => {
    const receitaLiquida = dreData.categories.find((c) => c.id === "receita-liquida")?.values[period as keyof typeof dreData.periodLabels] || 0
    const lucroBruto = dreData.categories.find((c) => c.id === "lucro-bruto")?.values[period as keyof typeof dreData.periodLabels] || 0
    const lucroOperacional = dreData.categories.find((c) => c.id === "lucro-operacional")?.values[period as keyof typeof dreData.periodLabels] || 0
    const lucroLiquido = dreData.categories.find((c) => c.id === "lucro-liquido")?.values[period as keyof typeof dreData.periodLabels] || 0

    return {
      period: dreData.periodLabels[period as keyof typeof dreData.periodLabels],
      "Receita Líquida": receitaLiquida,
      "Lucro Bruto": lucroBruto,
      "Lucro Operacional": lucroOperacional,
      "Lucro Líquido": lucroLiquido,
    }
  })

  return (
    <Card className="bg-card border-border">
      <CardHeader>
        <CardTitle className="text-foreground">Evolução dos Resultados</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={350}>
          <BarChart data={chartData}>
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
            <Bar dataKey="Receita Líquida" fill="var(--chart-1)" radius={[4, 4, 0, 0]} />
            <Bar dataKey="Lucro Bruto" fill="var(--chart-2)" radius={[4, 4, 0, 0]} />
            <Bar dataKey="Lucro Operacional" fill="var(--chart-4)" radius={[4, 4, 0, 0]} />
            <Bar dataKey="Lucro Líquido" fill="var(--primary)" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
