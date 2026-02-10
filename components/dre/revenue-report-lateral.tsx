"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
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

const revenueData: HierarchicalItem[] = [
  {
    id: "receita-bruta",
    name: "Receita Bruta",
    values: { jan: 450000, fev: 485000, mar: 520000, abr: 495000, mai: 540000, jun: 580000 },
    children: [
      {
        id: "receitas-servicos",
        name: "Receitas por Serviços",
        values: { jan: 130000, fev: 140000, mar: 150000, abr: 145000, mai: 155000, jun: 165000 },
        children: [
          {
            id: "consultoria",
            name: "Consultoria",
            values: { jan: 80000, fev: 85000, mar: 90000, abr: 87000, mai: 95000, jun: 100000 },
            children: [
              {
                id: "cliente-abc",
                name: "Cliente ABC",
                values: { jan: 50000, fev: 52000, mar: 55000, abr: 53000, mai: 58000, jun: 60000 },
              },
              {
                id: "cliente-xyz",
                name: "Cliente XYZ",
                values: { jan: 30000, fev: 33000, mar: 35000, abr: 34000, mai: 37000, jun: 40000 },
              },
            ],
          },
          {
            id: "desenvolvimento",
            name: "Desenvolvimento",
            values: { jan: 50000, fev: 55000, mar: 60000, abr: 58000, mai: 60000, jun: 65000 },
            children: [
              {
                id: "cliente-tech",
                name: "Cliente Tech",
                values: { jan: 30000, fev: 33000, mar: 36000, abr: 35000, mai: 36000, jun: 39000 },
              },
              {
                id: "cliente-startup",
                name: "Cliente Startup",
                values: { jan: 20000, fev: 22000, mar: 24000, abr: 23000, mai: 24000, jun: 26000 },
              },
            ],
          },
        ],
      },
      {
        id: "receitas-produtos",
        name: "Receitas por Produtos",
        values: { jan: 320000, fev: 345000, mar: 370000, abr: 350000, mai: 385000, jun: 415000 },
        children: [
          {
            id: "livros",
            name: "Venda de Livros",
            values: { jan: 150000, fev: 160000, mar: 170000, abr: 165000, mai: 180000, jun: 195000 },
            children: [
              {
                id: "cliente-livraria",
                name: "Livraria Nacional",
                values: { jan: 80000, fev: 85000, mar: 90000, abr: 88000, mai: 100000, jun: 110000 },
              },
              {
                id: "cliente-escola",
                name: "Escola Técnica",
                values: { jan: 70000, fev: 75000, mar: 80000, abr: 77000, mai: 80000, jun: 85000 },
              },
            ],
          },
          {
            id: "software",
            name: "Software",
            values: { jan: 100000, fev: 110000, mar: 120000, abr: 115000, mai: 125000, jun: 135000 },
            children: [
              {
                id: "cliente-corp1",
                name: "Empresa Corporativa 1",
                values: { jan: 60000, fev: 65000, mar: 70000, abr: 68000, mai: 75000, jun: 80000 },
              },
              {
                id: "cliente-corp2",
                name: "Empresa Corporativa 2",
                values: { jan: 40000, fev: 45000, mar: 50000, abr: 47000, mai: 50000, jun: 55000 },
              },
            ],
          },
          {
            id: "hardware",
            name: "Hardware",
            values: { jan: 70000, fev: 75000, mar: 80000, abr: 70000, mai: 80000, jun: 85000 },
            children: [
              {
                id: "cliente-retail",
                name: "Varejista Nacional",
                values: { jan: 40000, fev: 43000, mar: 46000, abr: 40000, mai: 46000, jun: 50000 },
              },
              {
                id: "cliente-ecommerce",
                name: "E-commerce",
                values: { jan: 30000, fev: 32000, mar: 34000, abr: 30000, mai: 34000, jun: 35000 },
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

export function RevenueReportLateral({ data = revenueData }: LateralDrillDownProps) {
  const [expanded, setExpanded] = useState<Set<string>>(new Set(["receita-bruta"]))

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
        <CardTitle>Relatório de Receitas - Drill Down Lateral</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto pb-4">
          <div className="flex gap-6 min-w-max">
            <div className="min-w-75">
              <div className="font-semibold mb-3 text-sm text-muted-foreground">
                RECEITAS
              </div>
              <ColumnSection
                items={data}
                expanded={expanded}
                onToggle={toggleExpand}
                depth={0}
              />
            </div>

            {expanded.has("receita-bruta") && data[0].children && (
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

            {expanded.has("receita-bruta") && data[0].children && (
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

            {expanded.has("receita-bruta") && data[0].children && (
              <>
                {data[0].children.map((category) =>
                  expanded.has(category.id) && category.children
                    ? category.children.map((subcat) =>
                        expanded.has(subcat.id) && subcat.children ? (
                          <div key={`${subcat.id}-clients`} className="min-w-75 pt-8">
                            <div className="font-semibold mb-3 text-sm text-muted-foreground">
                              CLIENTES - {subcat.name.toUpperCase()}
                            </div>
                            <div className="space-y-2">
                              {subcat.children.map((client) => (
                                <div
                                  key={client.id}
                                  className="border rounded-lg p-3 bg-secondary/30 hover:bg-secondary/50 transition-colors"
                                >
                                  <div className="font-medium text-sm">
                                    {client.name}
                                  </div>
                                  <div className="grid grid-cols-2 gap-2 mt-2 text-xs">
                                    {(["jan", "fev", "mar", "abr", "mai", "jun"] as Period[]).map(
                                      (period) => (
                                        <div key={period} className="flex justify-between">
                                          <span className="text-muted-foreground">
                                            {periodLabels[period]}:
                                          </span>
                                          <span className="font-semibold">
                                            {formatCurrency(client.values[period])}
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
