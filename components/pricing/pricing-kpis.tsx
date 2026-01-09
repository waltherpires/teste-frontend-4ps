import { KPICard } from "@/components/dashboard/kpi-card"
import { pricingData, formatPercent, formatCurrency } from "@/lib/financial-data"
import { DollarSign, Percent, TrendingUp, Package } from "lucide-react"

export function PricingKPIs() {
  const { summary } = pricingData

  const healthyProducts = pricingData.products.filter((p) => p.status === "healthy").length
  const totalProducts = pricingData.products.length

  // Simulated changes
  const margemBrutaChange = 1.2
  const margemLiquidaChange = -0.8

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <KPICard
        title="Margem Bruta Média"
        value={formatPercent(summary.margemMediaBruta)}
        change={margemBrutaChange}
        changeLabel="pp vs. período anterior"
        icon={Percent}
        trend={margemBrutaChange > 0 ? "up" : "down"}
      />
      <KPICard
        title="Margem Líquida Média"
        value={formatPercent(summary.margemMediaLiquida)}
        change={margemLiquidaChange}
        changeLabel="pp vs. período anterior"
        icon={TrendingUp}
        trend={margemLiquidaChange > 0 ? "up" : "down"}
      />
      <KPICard
        title="CMV Total"
        value={formatCurrency(summary.cmvTotal)}
        changeLabel="custo total dos produtos"
        icon={DollarSign}
        trend="neutral"
      />
      <KPICard
        title="Produtos Saudáveis"
        value={`${healthyProducts}/${totalProducts}`}
        changeLabel="com margem adequada"
        icon={Package}
        trend={healthyProducts >= totalProducts / 2 ? "up" : "down"}
      />
    </div>
  )
}
