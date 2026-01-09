import { KPICard } from "@/components/dashboard/kpi-card"
import { dreData, formatCurrency, formatPercent } from "@/lib/financial-data"
import { DollarSign, TrendingUp, Percent, Calculator } from "lucide-react"

export function DREKPIs() {
  const lastPeriod = dreData.periods[dreData.periods.length - 1] as keyof (typeof dreData.categories)[0]["values"]
  const prevPeriod = dreData.periods[dreData.periods.length - 2] as keyof (typeof dreData.categories)[0]["values"]

  const receitaLiquida = dreData.categories.find((c) => c.id === "receita-liquida")?.values[lastPeriod] || 0
  const receitaLiquidaPrev = dreData.categories.find((c) => c.id === "receita-liquida")?.values[prevPeriod] || 0
  const receitaChange = ((receitaLiquida - receitaLiquidaPrev) / receitaLiquidaPrev) * 100

  const lucroLiquido = dreData.categories.find((c) => c.id === "lucro-liquido")?.values[lastPeriod] || 0
  const lucroLiquidoPrev = dreData.categories.find((c) => c.id === "lucro-liquido")?.values[prevPeriod] || 0
  const lucroChange = ((lucroLiquido - lucroLiquidoPrev) / lucroLiquidoPrev) * 100

  const margemLiquida = (lucroLiquido / receitaLiquida) * 100
  const margemLiquidaPrev = (lucroLiquidoPrev / receitaLiquidaPrev) * 100
  const margemChange = margemLiquida - margemLiquidaPrev

  const lucroBruto = dreData.categories.find((c) => c.id === "lucro-bruto")?.values[lastPeriod] || 0
  const margemBruta = (lucroBruto / receitaLiquida) * 100
  const lucroBrutoPrev = dreData.categories.find((c) => c.id === "lucro-bruto")?.values[prevPeriod] || 0
  const margemBrutaPrev = (lucroBrutoPrev / receitaLiquidaPrev) * 100
  const margemBrutaChange = margemBruta - margemBrutaPrev

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <KPICard
        title="Receita Líquida"
        value={formatCurrency(receitaLiquida)}
        change={receitaChange}
        changeLabel="vs. mês anterior"
        icon={DollarSign}
        trend={receitaChange > 0 ? "up" : receitaChange < 0 ? "down" : "neutral"}
      />
      <KPICard
        title="Lucro Líquido"
        value={formatCurrency(lucroLiquido)}
        change={lucroChange}
        changeLabel="vs. mês anterior"
        icon={TrendingUp}
        trend={lucroChange > 0 ? "up" : lucroChange < 0 ? "down" : "neutral"}
      />
      <KPICard
        title="Margem Líquida"
        value={formatPercent(margemLiquida)}
        change={margemChange}
        changeLabel="pp vs. mês anterior"
        icon={Percent}
        trend={margemChange > 0 ? "up" : margemChange < 0 ? "down" : "neutral"}
      />
      <KPICard
        title="Margem Bruta"
        value={formatPercent(margemBruta)}
        change={margemBrutaChange}
        changeLabel="pp vs. mês anterior"
        icon={Calculator}
        trend={margemBrutaChange > 0 ? "up" : margemBrutaChange < 0 ? "down" : "neutral"}
      />
    </div>
  )
}
