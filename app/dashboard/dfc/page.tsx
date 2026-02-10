"use client"

import { Header } from "@/components/dashboard/header"
import { DFCTable } from "@/components/dfc/dfc-table"
import { DFCChart } from "@/components/dfc/dfc-chart"
import { DFCKPIs } from "@/components/dfc/dfc-kpis"
import { DFCDaily } from "@/components/dfc/dfc-daily"

export default function DFCPage() {
  return (
    <div className="flex flex-col h-full">
      <Header
        title="DFC"
        description="Demonstrativo de Fluxo de Caixa - Análise de entradas, saídas e saldo por período"
      />

      <div className="flex-1 p-6 space-y-6">
        <DFCKPIs />
        <DFCTable />
        <DFCChart />
        <DFCDaily />
      </div>
    </div>
  )
}
