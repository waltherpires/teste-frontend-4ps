import { KPICard } from "@/components/dashboard/kpi-card"
import { delinquencyData, formatCurrency } from "@/lib/financial-data"
import { AlertTriangle, Percent, Clock, Users } from "lucide-react"

export function DelinquencyKPIs() {
  const { summary } = delinquencyData

  // Simulated previous period for comparison
  const prevTotalAtrasado = 220000
  const prevPercentual = 3.8
  const prevTempoMedio = 28
  const prevClientes = 15

  const valorChange = ((summary.totalAtrasado - prevTotalAtrasado) / prevTotalAtrasado) * 100
  const percentualChange = summary.percentualInadimplencia - prevPercentual
  const tempoChange = ((summary.tempoMedioAtraso - prevTempoMedio) / prevTempoMedio) * 100
  const clientesChange = ((summary.clientesInadimplentes - prevClientes) / prevClientes) * 100

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <KPICard
        title="Total em Atraso"
        value={formatCurrency(summary.totalAtrasado)}
        change={valorChange}
        changeLabel="vs. período anterior"
        icon={AlertTriangle}
        trend={valorChange > 0 ? "down" : valorChange < 0 ? "up" : "neutral"}
      />
      <KPICard
        title="Taxa de Inadimplência"
        value={`${summary.percentualInadimplencia.toFixed(1)}%`}
        change={percentualChange}
        changeLabel="pp vs. período anterior"
        icon={Percent}
        trend={percentualChange > 0 ? "down" : percentualChange < 0 ? "up" : "neutral"}
      />
      <KPICard
        title="Tempo Médio de Atraso"
        value={`${summary.tempoMedioAtraso} dias`}
        change={tempoChange}
        changeLabel="vs. período anterior"
        icon={Clock}
        trend={tempoChange > 0 ? "down" : tempoChange < 0 ? "up" : "neutral"}
      />
      <KPICard
        title="Clientes Inadimplentes"
        value={summary.clientesInadimplentes.toString()}
        change={clientesChange}
        changeLabel="vs. período anterior"
        icon={Users}
        trend={clientesChange > 0 ? "down" : clientesChange < 0 ? "up" : "neutral"}
      />
    </div>
  )
}
