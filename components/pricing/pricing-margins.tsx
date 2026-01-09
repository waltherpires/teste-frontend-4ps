"use client"

import { pricingData, formatPercent } from "@/lib/financial-data"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine, Cell } from "recharts"

export function PricingMargins() {
  const chartData = pricingData.products.map((product) => ({
    name: product.name.length > 12 ? product.name.substring(0, 12) + "..." : product.name,
    fullName: product.name,
    margemBruta: product.margemBruta,
    margemLiquida: product.margemLiquida,
    status: product.status,
  }))

  const getBarColor = (status: string) => {
    switch (status) {
      case "healthy":
        return "var(--success)"
      case "warning":
        return "var(--warning)"
      case "risk":
        return "var(--destructive)"
      default:
        return "var(--primary)"
    }
  }

  return (
    <Card className="bg-card border-border">
      <CardHeader>
        <CardTitle className="text-foreground">Comparativo de Margens (%)</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={350}>
          <BarChart data={chartData} layout="vertical">
            <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
            <XAxis
              type="number"
              stroke="var(--muted-foreground)"
              fontSize={12}
              tickFormatter={(v) => `${v}%`}
              domain={[0, 50]}
            />
            <YAxis type="category" dataKey="name" stroke="var(--muted-foreground)" fontSize={11} width={100} />
            <Tooltip
              contentStyle={{
                backgroundColor: "var(--card)",
                border: "1px solid var(--border)",
                borderRadius: "8px",
              }}
              labelStyle={{ color: "var(--foreground)" }}
              formatter={(value: number) => [formatPercent(value), ""]}
              labelFormatter={(label, payload) => payload?.[0]?.payload?.fullName || label}
            />
            <ReferenceLine
              x={15}
              stroke="var(--destructive)"
              strokeDasharray="3 3"
              label={{ value: "Min 15%", fill: "var(--destructive)", fontSize: 10 }}
            />
            <ReferenceLine
              x={25}
              stroke="var(--success)"
              strokeDasharray="3 3"
              label={{ value: "Meta 25%", fill: "var(--success)", fontSize: 10 }}
            />
            <Bar dataKey="margemLiquida" name="Margem Líquida" radius={[0, 4, 4, 0]}>
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={getBarColor(entry.status)} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
        <div className="flex items-center justify-center gap-6 mt-4">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-success" />
            <span className="text-sm text-muted-foreground">Saudável (≥25%)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-warning" />
            <span className="text-sm text-muted-foreground">Atenção (15-25%)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-destructive" />
            <span className="text-sm text-muted-foreground">Risco (&lt;15%)</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
