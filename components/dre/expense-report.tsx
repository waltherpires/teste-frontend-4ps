"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { formatCurrency } from "@/lib/financial-data"
import { ChevronRight, ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"

type Period = "jan" | "fev" | "mar" | "abr" | "mai" | "jun"

interface ExpenseItem {
  id: string
  name: string
  level: number
  parentId?: string
  type: "category" | "expense-type" | "subcategory" | "supplier"
  values: Record<Period, number>
  hasChildren?: boolean
  children?: ExpenseItem[]
}

const expenseData: ExpenseItem[] = [
  {
    id: "despesas-operacionais",
    name: "Despesas Operacionais",
    level: 0,
    type: "category",
    values: { jan: -114750, fev: -123675, mar: -132600, abr: -126225, mai: -137700, jun: -147900 },
    hasChildren: true,
    children: [
      {
        id: "despesas-administrativas",
        name: "Despesas Administrativas",
        level: 1,
        parentId: "despesas-operacionais",
        type: "expense-type",
        values: { jan: -57375, fev: -61838, mar: -66300, abr: -63113, mai: -68850, jun: -73950 },
        hasChildren: true,
        children: [
          {
            id: "salarios-admin",
            name: "Salários",
            level: 2,
            parentId: "despesas-administrativas",
            type: "subcategory",
            values: { jan: -35000, fev: -35000, mar: -35000, abr: -35000, mai: -35000, jun: -35000 },
            hasChildren: true,
            children: [
              {
                id: "fornecedor-rh",
                name: "Folha Interna",
                level: 3,
                parentId: "salarios-admin",
                type: "supplier",
                values: { jan: -35000, fev: -35000, mar: -35000, abr: -35000, mai: -35000, jun: -35000 },
              },
            ],
          },
          {
            id: "aluguel",
            name: "Aluguel",
            level: 2,
            parentId: "despesas-administrativas",
            type: "subcategory",
            values: { jan: -15000, fev: -15000, mar: -15000, abr: -15000, mai: -15000, jun: -15000 },
            hasChildren: true,
            children: [
              {
                id: "fornecedor-imobiliaria",
                name: "Imobiliária Central",
                level: 3,
                parentId: "aluguel",
                type: "supplier",
                values: { jan: -15000, fev: -15000, mar: -15000, abr: -15000, mai: -15000, jun: -15000 },
              },
            ],
          },
          {
            id: "utilidades",
            name: "Utilidades",
            level: 2,
            parentId: "despesas-administrativas",
            type: "subcategory",
            values: { jan: -7375, fev: -11838, mar: -16300, abr: -13113, mai: -18850, jun: -23950 },
            hasChildren: true,
            children: [
              {
                id: "fornecedor-energia",
                name: "Concessionária Energia",
                level: 3,
                parentId: "utilidades",
                type: "supplier",
                values: { jan: -4000, fev: -6000, mar: -8000, abr: -7000, mai: -9000, jun: -11000 },
              },
              {
                id: "fornecedor-agua",
                name: "Companhia Água",
                level: 3,
                parentId: "utilidades",
                type: "supplier",
                values: { jan: -2000, fev: -3000, mar: -4500, abr: -4000, mai: -5500, jun: -7000 },
              },
              {
                id: "fornecedor-internet",
                name: "Provedor Internet",
                level: 3,
                parentId: "utilidades",
                type: "supplier",
                values: { jan: -1375, fev: -2838, mar: -3800, abr: -2113, mai: -4350, jun: -5950 },
              },
            ],
          },
        ],
      },
      {
        id: "despesas-vendas",
        name: "Despesas com Vendas",
        level: 1,
        parentId: "despesas-operacionais",
        type: "expense-type",
        values: { jan: -38250, fev: -41225, mar: -44200, abr: -42075, mai: -45900, jun: -49300 },
        hasChildren: true,
        children: [
          {
            id: "comissoes",
            name: "Comissões",
            level: 2,
            parentId: "despesas-vendas",
            type: "subcategory",
            values: { jan: -20000, fev: -22000, mar: -24000, abr: -22500, mai: -25000, jun: -27000 },
            hasChildren: true,
            children: [
              {
                id: "fornecedor-vendedor1",
                name: "Vendedor Externo 1",
                level: 3,
                parentId: "comissoes",
                type: "supplier",
                values: { jan: -12000, fev: -13000, mar: -14000, abr: -13500, mai: -15000, jun: -16000 },
              },
              {
                id: "fornecedor-vendedor2",
                name: "Vendedor Externo 2",
                level: 3,
                parentId: "comissoes",
                type: "supplier",
                values: { jan: -8000, fev: -9000, mar: -10000, abr: -9000, mai: -10000, jun: -11000 },
              },
            ],
          },
          {
            id: "publicidade",
            name: "Publicidade e Marketing",
            level: 2,
            parentId: "despesas-vendas",
            type: "subcategory",
            values: { jan: -18250, fev: -19225, mar: -20200, abr: -19575, mai: -20900, jun: -22300 },
            hasChildren: true,
            children: [
              {
                id: "fornecedor-agencia",
                name: "Agência Marketing",
                level: 3,
                parentId: "publicidade",
                type: "supplier",
                values: { jan: -10000, fev: -10500, mar: -11000, abr: -10750, mai: -11500, jun: -12500 },
              },
              {
                id: "fornecedor-midia",
                name: "Midia Planejamento",
                level: 3,
                parentId: "publicidade",
                type: "supplier",
                values: { jan: -8250, fev: -8725, mar: -9200, abr: -8825, mai: -9400, jun: -9800 },
              },
            ],
          },
        ],
      },
      {
        id: "despesas-financeiras",
        name: "Despesas Financeiras",
        level: 1,
        parentId: "despesas-operacionais",
        type: "expense-type",
        values: { jan: -19125, fev: -20612, mar: -22100, abr: -21037, mai: -22950, jun: -24650 },
        hasChildren: true,
        children: [
          {
            id: "juros-emprestimos",
            name: "Juros de Empréstimos",
            level: 2,
            parentId: "despesas-financeiras",
            type: "subcategory",
            values: { jan: -12000, fev: -13000, mar: -14000, abr: -13500, mai: -14500, jun: -15500 },
            hasChildren: true,
            children: [
              {
                id: "fornecedor-banco1",
                name: "Banco Principal",
                level: 3,
                parentId: "juros-emprestimos",
                type: "supplier",
                values: { jan: -12000, fev: -13000, mar: -14000, abr: -13500, mai: -14500, jun: -15500 },
              },
            ],
          },
          {
            id: "tarifas-bancarias",
            name: "Tarifas Bancárias",
            level: 2,
            parentId: "despesas-financeiras",
            type: "subcategory",
            values: { jan: -7125, fev: -7612, mar: -8100, abr: -7537, mai: -8450, jun: -9150 },
            hasChildren: true,
            children: [
              {
                id: "fornecedor-banco2",
                name: "Banco Principal",
                level: 3,
                parentId: "tarifas-bancarias",
                type: "supplier",
                values: { jan: -7125, fev: -7612, mar: -8100, abr: -7537, mai: -8450, jun: -9150 },
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

function ExpenseRow({
  item,
  expandedIds,
  onToggleExpand,
}: {
  item: ExpenseItem
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
            <ExpenseRow
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

export function ExpenseReport() {
  const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set(["despesas-operacionais"]))

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
        <CardTitle>Relatório de Despesas</CardTitle>
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
              {expenseData.map((item) => (
                <ExpenseRow
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
