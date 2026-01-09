"use client"

import { pricingData, formatCurrency } from "@/lib/financial-data"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts"

export function PricingBreakdown() {
  const chartData = pricingData.products.map((product) => ({
    name: product.name.length > 15 ? product.name.substring(0, 15) + "..." : product.name,
    fullName: product.name,
    "Custos Fixos": product.custosFixos,
    "Custos Variáveis": product.custosVariaveis,
    Margem: product.precoVenda - product.cmv,
  }))

  return (
    <Card className="bg-card border-border">
      <CardHeader>
        <CardTitle className="text-foreground">Composição de Preço por Produto</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={350}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
            <XAxis
              dataKey="name"
              stroke="var(--muted-foreground)"
              fontSize={11}
              angle={-20}
              textAnchor="end"
              height={60}
            />
            <YAxis stroke="var(--muted-foreground)" fontSize={12} tickFormatter={(v) => `R$ ${v}`} />
            <Tooltip
              contentStyle={{
                backgroundColor: "var(--card)",
                border: "1px solid var(--border)",
                borderRadius: "8px",
              }}
              labelStyle={{ color: "var(--foreground)" }}
              formatter={(value: number) => [formatCurrency(value), ""]}
              labelFormatter={(label, payload) => payload?.[0]?.payload?.fullName || label}
            />
            <Legend />
            <Bar dataKey="Custos Fixos" stackId="a" fill="var(--chart-5)" />
            <Bar dataKey="Custos Variáveis" stackId="a" fill="var(--warning)" />
            <Bar dataKey="Margem" stackId="a" fill="var(--success)" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
