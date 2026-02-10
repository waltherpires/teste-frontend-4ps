"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { formatCurrency } from "@/lib/financial-data"
import { ChevronRight, ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"

type Period = "jan" | "fev" | "mar" | "abr" | "mai" | "jun"

interface HierarchicalItem {
  id: string
  name: string
  values: Record<Period, number>
  children?: HierarchicalItem[]
}

const expenseData: HierarchicalItem[] = [
  {
    id: "despesas-operacionais",
    name: "Despesas Operacionais",
    values: { jan: -114750, fev: -123675, mar: -132600, abr: -126225, mai: -137700, jun: -147900 },
    children: [
      {
        id: "despesas-administrativas",
        name: "Despesas Administrativas",
        values: { jan: -57375, fev: -61838, mar: -66300, abr: -63113, mai: -68850, jun: -73950 },
        children: [
          {
            id: "salarios",
            name: "Salários",
            values: { jan: -35000, fev: -35000, mar: -35000, abr: -35000, mai: -35000, jun: -35000 },
            children: [
              {
                id: "folha-interna",
                name: "Folha Interna",
                values: { jan: -35000, fev: -35000, mar: -35000, abr: -35000, mai: -35000, jun: -35000 },
              },
            ],
          },
          {
            id: "aluguel",
            name: "Aluguel",
            values: { jan: -15000, fev: -15000, mar: -15000, abr: -15000, mai: -15000, jun: -15000 },
            children: [
              {
                id: "imobiliaria-central",
                name: "Imobiliária Central",
                values: { jan: -15000, fev: -15000, mar: -15000, abr: -15000, mai: -15000, jun: -15000 },
              },
            ],
          },
          {
            id: "utilidades",
            name: "Utilidades",
            values: { jan: -7375, fev: -11838, mar: -16300, abr: -13113, mai: -18850, jun: -23950 },
            children: [
              {
                id: "energia",
                name: "Concessionária Energia",
                values: { jan: -4000, fev: -6000, mar: -8000, abr: -7000, mai: -9000, jun: -11000 },
              },
              {
                id: "agua",
                name: "Companhia Água",
                values: { jan: -2000, fev: -3000, mar: -4500, abr: -4000, mai: -5500, jun: -7000 },
              },
              {
                id: "internet",
                name: "Provedor Internet",
                values: { jan: -1375, fev: -2838, mar: -3800, abr: -2113, mai: -4350, jun: -5950 },
              },
            ],
          },
        ],
      },
      {
        id: "despesas-vendas",
        name: "Despesas com Vendas",
        values: { jan: -38250, fev: -41225, mar: -44200, abr: -42075, mai: -45900, jun: -49300 },
        children: [
          {
            id: "comissoes",
            name: "Comissões",
            values: { jan: -20000, fev: -22000, mar: -24000, abr: -22500, mai: -25000, jun: -27000 },
            children: [
              {
                id: "vendedor1",
                name: "Vendedor Externo 1",
                values: { jan: -12000, fev: -13000, mar: -14000, abr: -13500, mai: -15000, jun: -16000 },
              },
              {
                id: "vendedor2",
                name: "Vendedor Externo 2",
                values: { jan: -8000, fev: -9000, mar: -10000, abr: -9000, mai: -10000, jun: -11000 },
              },
            ],
          },
          {
            id: "publicidade",
            name: "Publicidade e Marketing",
            values: { jan: -18250, fev: -19225, mar: -20200, abr: -19575, mai: -20900, jun: -22300 },
            children: [
              {
                id: "agencia",
                name: "Agência Marketing",
                values: { jan: -10000, fev: -10500, mar: -11000, abr: -10750, mai: -11500, jun: -12500 },
              },
              {
                id: "midia",
                name: "Midia Planejamento",
                values: { jan: -8250, fev: -8725, mar: -9200, abr: -8825, mai: -9400, jun: -9800 },
              },
            ],
          },
        ],
      },
      {
        id: "despesas-financeiras",
        name: "Despesas Financeiras",
        values: { jan: -19125, fev: -20612, mar: -22100, abr: -21037, mai: -22950, jun: -24650 },
        children: [
          {
            id: "juros",
            name: "Juros de Empréstimos",
            values: { jan: -12000, fev: -13000, mar: -14000, abr: -13500, mai: -14500, jun: -15500 },
            children: [
              {
                id: "banco-principal",
                name: "Banco Principal",
                values: { jan: -12000, fev: -13000, mar: -14000, abr: -13500, mai: -14500, jun: -15500 },
              },
            ],
          },
          {
            id: "tarifas",
            name: "Tarifas Bancárias",
            values: { jan: -7125, fev: -7612, mar: -8100, abr: -7537, mai: -8450, jun: -9150 },
            children: [
              {
                id: "banco-tarifas",
                name: "Banco Principal",
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

interface LateralDrillDownProps {
  data: HierarchicalItem[]
}

function ColumnSection({
  items,
  expanded,
  onToggle,
  depth,
}: {
  items: HierarchicalItem[]
  expanded: Set<string>
  onToggle: (id: string) => void
  depth: number
}) {
  return (
    <div className="flex flex-col gap-2">
      {items.map((item) => (
        <div key={item.id} className="space-y-1">
          <div
            className={cn(
              "border rounded-lg p-3 cursor-pointer hover:bg-accent/50 transition-colors",
              expanded.has(item.id) && "bg-primary/10 border-primary",
              depth === 0 && "font-bold bg-secondary",
              depth === 1 && "font-semibold bg-secondary/70",
              depth >= 2 && "bg-secondary/50"
            )}
            onClick={() => item.children && onToggle(item.id)}
          >
            <div className="flex items-center gap-2">
              {item.children && item.children.length > 0 ? (
                expanded.has(item.id) ? (
                  <ChevronDown className="h-4 w-4" />
                ) : (
                  <ChevronRight className="h-4 w-4" />
                )
              ) : (
                <div className="w-4" />
              )}
              <span className="text-sm">{item.name}</span>
            </div>
            <div className="text-xs text-muted-foreground mt-1">
              {formatCurrency(
                Object.values(item.values).reduce((a, b) => a + b, 0)
              )}
            </div>
          </div>

          {expanded.has(item.id) && item.children && item.children.length > 0 && (
            <div className="ml-4 border-l-2 border-primary/30 pl-4">
              <ColumnSection
                items={item.children}
                expanded={expanded}
                onToggle={onToggle}
                depth={depth + 1}
              />
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

export function ExpenseReportLateral({ data = expenseData }: LateralDrillDownProps) {
  const [expanded, setExpanded] = useState<Set<string>>(new Set(["despesas-operacionais"]))

  const toggleExpand = (id: string) => {
    const newExpanded = new Set(expanded)
    if (newExpanded.has(id)) {
      newExpanded.delete(id)
    } else {
      newExpanded.add(id)
    }
    setExpanded(newExpanded)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Relatório de Despesas - Drill Down Lateral</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto pb-4">
          <div className="flex gap-6 min-w-max">
            <div className="min-w-75">
              <div className="font-semibold mb-3 text-sm text-muted-foreground">
                DESPESAS
              </div>
              <ColumnSection
                items={data}
                expanded={expanded}
                onToggle={toggleExpand}
                depth={0}
              />
            </div>

            {expanded.has("despesas-operacionais") && data[0].children && (
              <div className="min-w-75 pt-8">
                <div className="font-semibold mb-3 text-sm text-muted-foreground">
                  CATEGORIAS
                </div>
                <ColumnSection
                  items={data[0].children}
                  expanded={expanded}
                  onToggle={toggleExpand}
                  depth={1}
                />
              </div>
            )}

            {expanded.has("despesas-operacionais") && data[0].children && (
              <>
                {data[0].children.map((category) =>
                  expanded.has(category.id) && category.children ? (
                    <div key={`${category.id}-subcat`} className="min-w-75 pt-8">
                      <div className="font-semibold mb-3 text-sm text-muted-foreground">
                        {category.name.toUpperCase()}
                      </div>
                      <ColumnSection
                        items={category.children}
                        expanded={expanded}
                        onToggle={toggleExpand}
                        depth={2}
                      />
                    </div>
                  ) : null
                )}
              </>
            )}

            {expanded.has("despesas-operacionais") && data[0].children && (
              <>
                {data[0].children.map((category) =>
                  expanded.has(category.id) && category.children
                    ? category.children.map((subcat) =>
                        expanded.has(subcat.id) && subcat.children ? (
                          <div key={`${subcat.id}-suppliers`} className="min-w-75 pt-8">
                            <div className="font-semibold mb-3 text-sm text-muted-foreground">
                              FORNECEDORES - {subcat.name.toUpperCase()}
                            </div>
                            <div className="space-y-2">
                              {subcat.children.map((supplier) => (
                                <div
                                  key={supplier.id}
                                  className="border rounded-lg p-3 bg-secondary/30 hover:bg-secondary/50 transition-colors"
                                >
                                  <div className="font-medium text-sm">
                                    {supplier.name}
                                  </div>
                                  <div className="grid grid-cols-2 gap-2 mt-2 text-xs">
                                    {(["jan", "fev", "mar", "abr", "mai", "jun"] as Period[]).map(
                                      (period) => (
                                        <div key={period} className="flex justify-between">
                                          <span className="text-muted-foreground">
                                            {periodLabels[period]}:
                                          </span>
                                          <span className="font-semibold">
                                            {formatCurrency(supplier.values[period])}
                                          </span>
                                        </div>
                                      )
                                    )}
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        ) : null
                      )
                    : null
                )}
              </>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
