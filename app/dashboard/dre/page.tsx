"use client"

import { Header } from "@/components/dashboard/header"
import { DRETable } from "@/components/dre/dre-table"
import { DREChart } from "@/components/dre/dre-chart"
import { DREKPIs } from "@/components/dre/dre-kpis"

export default function DREPage() {
  return (
    <div className="flex flex-col h-full">
      <Header title="DRE" description="Demonstrativo de Resultado do Exercício - Análise detalhada por período" />

      <div className="flex-1 p-6 space-y-6">
        <DREKPIs />
        <DRETable />
        <DREChart />
      </div>
    </div>
  )
}
