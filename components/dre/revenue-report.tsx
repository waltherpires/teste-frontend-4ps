"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { formatCurrency } from "@/lib/financial-data"
import { ChevronRight, ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"

type Period = "jan" | "fev" | "mar" | "abr" | "mai" | "jun"

interface RevenueItem {
  id: string
  name: string
  level: number
  parentId?: string
  type: "category" | "revenue-type" | "service" | "product" | "client"
  values: Record<Period, number>
  hasChildren?: boolean
  children?: RevenueItem[]
}

const revenueData: RevenueItem[] = [
  {
    id: "receita-bruta",
    name: "Receita Bruta",
    level: 0,
    type: "category",
    values: { jan: 450000, fev: 485000, mar: 520000, abr: 495000, mai: 540000, jun: 580000 },
    hasChildren: true,
    children: [
      {
        id: "receitas-servicos",
        name: "Receitas por Serviços",
        level: 1,
        parentId: "receita-bruta",
        type: "revenue-type",
        values: { jan: 130000, fev: 140000, mar: 150000, abr: 145000, mai: 155000, jun: 165000 },
        hasChildren: true,
        children: [
          {
            id: "servico-consultoria",
            name: "Consultoria",
            level: 2,
            parentId: "receitas-servicos",
            type: "service",
            values: { jan: 80000, fev: 85000, mar: 90000, abr: 87000, mai: 95000, jun: 100000 },
            hasChildren: true,
            children: [
              {
                id: "cliente-abc",
                name: "Cliente ABC",
                level: 3,
                parentId: "servico-consultoria",
                type: "client",
                values: { jan: 50000, fev: 52000, mar: 55000, abr: 53000, mai: 58000, jun: 60000 },
              },
              {
                id: "cliente-xyz",
                name: "Cliente XYZ",
                level: 3,
                parentId: "servico-consultoria",
                type: "client",
                values: { jan: 30000, fev: 33000, mar: 35000, abr: 34000, mai: 37000, jun: 40000 },
              },
            ],
          },
          {
            id: "servico-desenvolvimento",
            name: "Desenvolvimento",
            level: 2,
            parentId: "receitas-servicos",
            type: "service",
            values: { jan: 50000, fev: 55000, mar: 60000, abr: 58000, mai: 60000, jun: 65000 },
            hasChildren: true,
            children: [
              {
                id: "cliente-tech",
                name: "Cliente Tech",
                level: 3,
                parentId: "servico-desenvolvimento",
                type: "client",
                values: { jan: 30000, fev: 33000, mar: 36000, abr: 35000, mai: 36000, jun: 39000 },
              },
              {
                id: "cliente-startup",
                name: "Cliente Startup",
                level: 3,
                parentId: "servico-desenvolvimento",
                type: "client",
                values: { jan: 20000, fev: 22000, mar: 24000, abr: 23000, mai: 24000, jun: 26000 },
              },
            ],
          },
        ],
      },
      {
        id: "receitas-produtos",
        name: "Receitas por Produtos",
        level: 1,
        parentId: "receita-bruta",
        type: "revenue-type",
        values: { jan: 320000, fev: 345000, mar: 370000, abr: 350000, mai: 385000, jun: 415000 },
        hasChildren: true,
        children: [
          {
            id: "produto-software",
            name: "Software",
            level: 2,
            parentId: "receitas-produtos",
            type: "product",
            values: { jan: 200000, fev: 215000, mar: 230000, abr: 220000, mai: 240000, jun: 260000 },
            hasChildren: true,
            children: [
              {
                id: "cliente-corp1",
                name: "Empresa Corporativa 1",
                level: 3,
                parentId: "produto-software",
                type: "client",
                values: { jan: 120000, fev: 130000, mar: 140000, abr: 135000, mai: 145000, jun: 160000 },
              },
              {
                id: "cliente-corp2",
                name: "Empresa Corporativa 2",
                level: 3,
                parentId: "produto-software",
                type: "client",
                values: { jan: 80000, fev: 85000, mar: 90000, abr: 85000, mai: 95000, jun: 100000 },
              },
            ],
          },
          {
            id: "produto-hardware",
            name: "Hardware",
            level: 2,
            parentId: "receitas-produtos",
            type: "product",
            values: { jan: 120000, fev: 130000, mar: 140000, abr: 130000, mai: 145000, jun: 155000 },
            hasChildren: true,
            children: [
              {
                id: "cliente-retail",
                name: "Varejista Nacional",
                level: 3,
                parentId: "produto-hardware",
                type: "client",
                values: { jan: 70000, fev: 75000, mar: 80000, abr: 75000, mai: 85000, jun: 90000 },
              },
              {
                id: "cliente-ecommerce",
                name: "E-commerce",
                level: 3,
                parentId: "produto-hardware",
                type: "client",
                values: { jan: 50000, fev: 55000, mar: 60000, abr: 55000, mai: 60000, jun: 65000 },
              },
            ],
          },
        ],
      },
    ],
  },
]

const periodLabels: Record<Period, string> = {
  jan: "Jan",
  fev: "Fev",
  mar: "Mar",
  abr: "Abr",
  mai: "Mai",
  jun: "Jun",
}

function RevenueRow({
  item,
  expandedIds,
  onToggleExpand,
}: {
  item: RevenueItem
  expandedIds: Set<string>
  onToggleExpand: (id: string) => void
}) {
  const isExpanded = expandedIds.has(item.id)

  return (
    <>
      <tr className="border-b hover:bg-muted/50">
        <td className="px-4 py-3">
          <div className="flex items-center">
            <div style={{ marginLeft: `${item.level * 20}px` }} className="flex items-center gap-2 w-full">
              {item.hasChildren ? (
                <button
                  onClick={() => onToggleExpand(item.id)}
                  className="p-1 hover:bg-accent rounded transition-colors"
                >
                  {isExpanded ? (
                    <ChevronDown className="h-4 w-4" />
                  ) : (
                    <ChevronRight className="h-4 w-4" />
                  )}
                </button>
              ) : (
                <div className="w-6" />
              )}
              <span className={cn(
                item.level === 0 && "font-semibold",
                item.level === 1 && "font-medium"
              )}>
                {item.name}
              </span>
            </div>
          </div>
        </td>
        {(["jan", "fev", "mar", "abr", "mai", "jun"] as Period[]).map((period) => (
          <td key={period} className="px-4 py-3 text-right text-sm font-medium">
            {formatCurrency(item.values[period])}
          </td>
        ))}
      </tr>
      {isExpanded && item.children && (
        <>
          {item.children.map((child) => (
            <RevenueRow
              key={child.id}
              item={child}
              expandedIds={expandedIds}
              onToggleExpand={onToggleExpand}
            />
          ))}
        </>
      )}
    </>
  )
}

export function RevenueReport() {
  const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set(["receita-bruta"]))

  const toggleExpand = (id: string) => {
    const newExpanded = new Set(expandedIds)
    if (newExpanded.has(id)) {
      newExpanded.delete(id)
    } else {
      newExpanded.add(id)
    }
    setExpandedIds(newExpanded)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Relatório de Receitas</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b bg-muted/50">
                <th className="px-4 py-3 text-left text-sm font-semibold">Descrição</th>
                {(["jan", "fev", "mar", "abr", "mai", "jun"] as Period[]).map((period) => (
                  <th key={period} className="px-4 py-3 text-right text-sm font-semibold">
                    {periodLabels[period]}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {revenueData.map((item) => (
                <RevenueRow
                  key={item.id}
                  item={item}
                  expandedIds={expandedIds}
                  onToggleExpand={toggleExpand}
                />
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  )
}
