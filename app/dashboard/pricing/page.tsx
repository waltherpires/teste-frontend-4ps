"use client"

import { Header } from "@/components/dashboard/header"
import { PricingTable } from "@/components/pricing/pricing-table"
import { PricingBreakdown } from "@/components/pricing/pricing-breakdown"
import { PricingMargins } from "@/components/pricing/pricing-margins"
import { PricingKPIs } from "@/components/pricing/pricing-kpis"

export default function PricingPage() {
  return (
    <div className="flex flex-col h-full">
      <Header title="Precificação" description="Análise de CMV, formação de preço e margens de lucro" />

      <div className="flex-1 p-6 space-y-6">
        <PricingKPIs />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <PricingBreakdown />
          <PricingMargins />
        </div>

        <PricingTable />
      </div>
    </div>
  )
}
