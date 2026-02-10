"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { formatCurrency } from "@/lib/financial-data"
import { ChevronRight, ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"

type Period = "jan" | "fev" | "mar" | "abr" | "mai" | "jun"

interface DREItem {
  id: string
  name: string
  level: number
  type: "category" | "total" | "detail" | "client-supplier"
  isTotal?: boolean
  isHighlight?: boolean
  isFinal?: boolean
  isSubtraction?: boolean
  values: Record<Period, number>
  hasChildren?: boolean
  children?: DREItem[]
}

const unifiedDREData: DREItem[] = [
  {
    id: "receita-bruta",
    name: "Receita Bruta",
    level: 0,
    type: "category",
    isTotal: true,
    values: { jan: 450000, fev: 485000, mar: 520000, abr: 495000, mai: 540000, jun: 580000 },
    hasChildren: true,
    children: [
      {
        id: "receitas-servicos",
        name: "Receitas por Serviços",
        level: 1,
        type: "detail",
        values: { jan: 130000, fev: 140000, mar: 150000, abr: 145000, mai: 155000, jun: 165000 },
        hasChildren: true,
        children: [
          {
            id: "servico-consultoria",
            name: "Consultoria",
            level: 2,
            type: "detail",
            values: { jan: 80000, fev: 85000, mar: 90000, abr: 87000, mai: 95000, jun: 100000 },
            hasChildren: true,
            children: [
              {
                id: "cliente-abc",
                name: "Cliente ABC",
                level: 3,
                type: "client-supplier",
                values: { jan: 50000, fev: 52000, mar: 55000, abr: 53000, mai: 58000, jun: 60000 },
              },
              {
                id: "cliente-xyz",
                name: "Cliente XYZ",
                level: 3,
                type: "client-supplier",
                values: { jan: 30000, fev: 33000, mar: 35000, abr: 34000, mai: 37000, jun: 40000 },
              },
            ],
          },
          {
            id: "servico-desenvolvimento",
            name: "Desenvolvimento",
            level: 2,
            type: "detail",
            values: { jan: 50000, fev: 55000, mar: 60000, abr: 58000, mai: 60000, jun: 65000 },
            hasChildren: true,
            children: [
              {
                id: "cliente-tech",
                name: "Cliente Tech",
                level: 3,
                type: "client-supplier",
                values: { jan: 30000, fev: 33000, mar: 36000, abr: 35000, mai: 36000, jun: 39000 },
              },
              {
                id: "cliente-startup",
                name: "Cliente Startup",
                level: 3,
                type: "client-supplier",
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
        type: "detail",
        values: { jan: 320000, fev: 345000, mar: 370000, abr: 350000, mai: 385000, jun: 415000 },
        hasChildren: true,
        children: [
          {
            id: "produto-software",
            name: "Software",
            level: 2,
            type: "detail",
            values: { jan: 200000, fev: 215000, mar: 230000, abr: 220000, mai: 240000, jun: 260000 },
            hasChildren: true,
            children: [
              {
                id: "cliente-corp1",
                name: "Empresa Corporativa 1",
                level: 3,
                type: "client-supplier",
                values: { jan: 120000, fev: 130000, mar: 140000, abr: 135000, mai: 145000, jun: 160000 },
              },
              {
                id: "cliente-corp2",
                name: "Empresa Corporativa 2",
                level: 3,
                type: "client-supplier",
                values: { jan: 80000, fev: 85000, mar: 90000, abr: 85000, mai: 95000, jun: 100000 },
              },
            ],
          },
          {
            id: "produto-hardware",
            name: "Hardware",
            level: 2,
            type: "detail",
            values: { jan: 120000, fev: 130000, mar: 140000, abr: 130000, mai: 145000, jun: 155000 },
            hasChildren: true,
            children: [
              {
                id: "cliente-retail",
                name: "Varejista Nacional",
                level: 3,
                type: "client-supplier",
                values: { jan: 70000, fev: 75000, mar: 80000, abr: 75000, mai: 85000, jun: 90000 },
              },
              {
                id: "cliente-ecommerce",
                name: "E-commerce",
                level: 3,
                type: "client-supplier",
                values: { jan: 50000, fev: 55000, mar: 60000, abr: 55000, mai: 60000, jun: 65000 },
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "deducoes",
    name: "(-) Deduções da Receita",
    level: 0,
    type: "category",
    isSubtraction: true,
    values: { jan: -67500, fev: -72750, mar: -78000, abr: -74250, mai: -81000, jun: -87000 },
    hasChildren: true,
    children: [
      {
        id: "impostos-vendas",
        name: "Impostos sobre Vendas",
        level: 1,
        type: "detail",
        isSubtraction: true,
        values: { jan: -54000, fev: -58200, mar: -62400, abr: -59400, mai: -64800, jun: -69600 },
      },
      {
        id: "devolucoes",
        name: "Devoluções e Abatimentos",
        level: 1,
        type: "detail",
        isSubtraction: true,
        values: { jan: -13500, fev: -14550, mar: -15600, abr: -14850, mai: -16200, jun: -17400 },
      },
    ],
  },
  {
    id: "receita-liquida",
    name: "Receita Líquida",
    level: 0,
    type: "total",
    isTotal: true,
    isHighlight: true,
    values: { jan: 382500, fev: 412250, mar: 442000, abr: 420750, mai: 459000, jun: 493000 },
  },
  {
    id: "cmv",
    name: "(-) CMV / CSV",
    level: 0,
    type: "category",
    isSubtraction: true,
    values: { jan: -191250, fev: -206125, mar: -221000, abr: -210375, mai: -229500, jun: -246500 },
  },
  {
    id: "lucro-bruto",
    name: "Lucro Bruto",
    level: 0,
    type: "total",
    isTotal: true,
    isHighlight: true,
    values: { jan: 191250, fev: 206125, mar: 221000, abr: 210375, mai: 229500, jun: 246500 },
  },
  {
    id: "despesas-operacionais",
    name: "(-) Despesas Operacionais",
    level: 0,
    type: "category",
    isSubtraction: true,
    values: { jan: -114750, fev: -123675, mar: -132600, abr: -126225, mai: -137700, jun: -147900 },
    hasChildren: true,
    children: [
      {
        id: "despesas-administrativas",
        name: "Despesas Administrativas",
        level: 1,
        type: "detail",
        isSubtraction: true,
        values: { jan: -57375, fev: -61838, mar: -66300, abr: -63113, mai: -68850, jun: -73950 },
        hasChildren: true,
        children: [
          {
            id: "salarios-admin",
            name: "Salários",
            level: 2,
            type: "detail",
            isSubtraction: true,
            values: { jan: -35000, fev: -35000, mar: -35000, abr: -35000, mai: -35000, jun: -35000 },
            hasChildren: true,
            children: [
              {
                id: "fornecedor-rh",
                name: "Folha Interna",
                level: 3,
                type: "client-supplier",
                isSubtraction: true,
                values: { jan: -35000, fev: -35000, mar: -35000, abr: -35000, mai: -35000, jun: -35000 },
              },
            ],
          },
          {
            id: "aluguel",
            name: "Aluguel",
            level: 2,
            type: "detail",
            isSubtraction: true,
            values: { jan: -15000, fev: -15000, mar: -15000, abr: -15000, mai: -15000, jun: -15000 },
            hasChildren: true,
            children: [
              {
                id: "fornecedor-imobiliaria",
                name: "Imobiliária Central",
                level: 3,
                type: "client-supplier",
                isSubtraction: true,
                values: { jan: -15000, fev: -15000, mar: -15000, abr: -15000, mai: -15000, jun: -15000 },
              },
            ],
          },
          {
            id: "utilidades",
            name: "Utilidades",
            level: 2,
            type: "detail",
            isSubtraction: true,
            values: { jan: -7375, fev: -11838, mar: -16300, abr: -13113, mai: -18850, jun: -23950 },
            hasChildren: true,
            children: [
              {
                id: "fornecedor-energia",
                name: "Concessionária Energia",
                level: 3,
                type: "client-supplier",
                isSubtraction: true,
                values: { jan: -4000, fev: -6000, mar: -8000, abr: -7000, mai: -9000, jun: -11000 },
              },
              {
                id: "fornecedor-agua",
                name: "Companhia Água",
                level: 3,
                type: "client-supplier",
                isSubtraction: true,
                values: { jan: -2000, fev: -3000, mar: -4500, abr: -4000, mai: -5500, jun: -7000 },
              },
              {
                id: "fornecedor-internet",
                name: "Provedor Internet",
                level: 3,
                type: "client-supplier",
                isSubtraction: true,
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
        type: "detail",
        isSubtraction: true,
        values: { jan: -38250, fev: -41225, mar: -44200, abr: -42075, mai: -45900, jun: -49300 },
        hasChildren: true,
        children: [
          {
            id: "comissoes",
            name: "Comissões",
            level: 2,
            type: "detail",
            isSubtraction: true,
            values: { jan: -20000, fev: -22000, mar: -24000, abr: -22500, mai: -25000, jun: -27000 },
            hasChildren: true,
            children: [
              {
                id: "fornecedor-vendedor1",
                name: "Vendedor Externo 1",
                level: 3,
                type: "client-supplier",
                isSubtraction: true,
                values: { jan: -12000, fev: -13000, mar: -14000, abr: -13500, mai: -15000, jun: -16000 },
              },
              {
                id: "fornecedor-vendedor2",
                name: "Vendedor Externo 2",
                level: 3,
                type: "client-supplier",
                isSubtraction: true,
                values: { jan: -8000, fev: -9000, mar: -10000, abr: -9000, mai: -10000, jun: -11000 },
              },
            ],
          },
          {
            id: "publicidade",
            name: "Publicidade e Marketing",
            level: 2,
            type: "detail",
            isSubtraction: true,
            values: { jan: -18250, fev: -19225, mar: -20200, abr: -19575, mai: -20900, jun: -22300 },
            hasChildren: true,
            children: [
              {
                id: "fornecedor-agencia",
                name: "Agência Marketing",
                level: 3,
                type: "client-supplier",
                isSubtraction: true,
                values: { jan: -10000, fev: -10500, mar: -11000, abr: -10750, mai: -11500, jun: -12500 },
              },
              {
                id: "fornecedor-midia",
                name: "Midia Planejamento",
                level: 3,
                type: "client-supplier",
                isSubtraction: true,
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
        type: "detail",
        isSubtraction: true,
        values: { jan: -19125, fev: -20612, mar: -22100, abr: -21037, mai: -22950, jun: -24650 },
        hasChildren: true,
        children: [
          {
            id: "juros-emprestimos",
            name: "Juros de Empréstimos",
            level: 2,
            type: "detail",
            isSubtraction: true,
            values: { jan: -12000, fev: -13000, mar: -14000, abr: -13500, mai: -14500, jun: -15500 },
            hasChildren: true,
            children: [
              {
                id: "fornecedor-banco1",
                name: "Banco Principal",
                level: 3,
                type: "client-supplier",
                isSubtraction: true,
                values: { jan: -12000, fev: -13000, mar: -14000, abr: -13500, mai: -14500, jun: -15500 },
              },
            ],
          },
          {
            id: "tarifas-bancarias",
            name: "Tarifas Bancárias",
            level: 2,
            type: "detail",
            isSubtraction: true,
            values: { jan: -7125, fev: -7612, mar: -8100, abr: -7537, mai: -8450, jun: -9150 },
            hasChildren: true,
            children: [
              {
                id: "fornecedor-banco2",
                name: "Banco Principal",
                level: 3,
                type: "client-supplier",
                isSubtraction: true,
                values: { jan: -7125, fev: -7612, mar: -8100, abr: -7537, mai: -8450, jun: -9150 },
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "lucro-operacional",
    name: "Lucro Operacional (EBIT)",
    level: 0,
    type: "total",
    isTotal: true,
    isHighlight: true,
    values: { jan: 76500, fev: 82450, mar: 88400, abr: 84150, mai: 91800, jun: 98600 },
  },
  {
    id: "lucro-liquido",
    name: "Lucro Líquido",
    level: 0,
    type: "total",
    isTotal: true,
    isHighlight: true,
    isFinal: true,
    values: { jan: 45441, fev: 48975, mar: 52510, abr: 49985, mai: 54529, jun: 58568 },
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

function DRERow({
  item,
  expandedIds,
  onToggleExpand,
}: {
  item: DREItem
  expandedIds: Set<string>
  onToggleExpand: (id: string) => void
}) {
  const isExpanded = expandedIds.has(item.id)

  return (
    <>
      <tr className={cn(
        "border-b hover:bg-muted/50",
        item.isHighlight && "bg-accent/30",
        item.isFinal && "bg-primary/10 font-bold"
      )}>
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
                item.level === 0 && "font-semibold text-base",
                item.level === 1 && "font-medium",
                item.type === "client-supplier" && "text-sm"
              )}>
                {item.name}
              </span>
            </div>
          </div>
        </td>
        {(["jan", "fev", "mar", "abr", "mai", "jun"] as Period[]).map((period) => (
          <td key={period} className={cn(
            "px-4 py-3 text-right font-medium",
            item.level === 0 && "font-bold",
            item.type === "client-supplier" && "text-sm"
          )}>
            {formatCurrency(item.values[period])}
          </td>
        ))}
      </tr>
      {isExpanded && item.children && (
        <>
          {item.children.map((child) => (
            <DRERow
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

export function DREUnified() {
  const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set(["receita-bruta", "despesas-operacionais"]))

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
        <CardTitle>Demonstrativo de Resultado do Exercício (DRE)</CardTitle>
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
              {unifiedDREData.map((item) => (
                <DRERow
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
