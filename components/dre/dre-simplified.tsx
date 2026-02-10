"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { formatCurrency } from "@/lib/financial-data"

type Period = "jan" | "fev" | "mar" | "abr" | "mai" | "jun"

interface SimplifiedDREItem {
  id: string
  name: string
  level: number
  isTotal?: boolean
  isHighlight?: boolean
  isFinal?: boolean
  isSubtraction?: boolean
  values: Record<Period, number>
}

const simplifiedDREData: SimplifiedDREItem[] = [
  {
    id: "receita-bruta",
    name: "Receita Bruta",
    level: 0,
    isTotal: true,
    values: { jan: 450000, fev: 485000, mar: 520000, abr: 495000, mai: 540000, jun: 580000 },
  },
  {
    id: "deducoes",
    name: "(-) Deduções da Receita",
    level: 0,
    isSubtraction: true,
    values: { jan: -67500, fev: -72750, mar: -78000, abr: -74250, mai: -81000, jun: -87000 },
  },
  {
    id: "receita-liquida",
    name: "Receita Líquida",
    level: 0,
    isTotal: true,
    isHighlight: true,
    values: { jan: 382500, fev: 412250, mar: 442000, abr: 420750, mai: 459000, jun: 493000 },
  },
  {
    id: "cmv",
    name: "(-) CMV / CSV",
    level: 0,
    isSubtraction: true,
    values: { jan: -191250, fev: -206125, mar: -221000, abr: -210375, mai: -229500, jun: -246500 },
  },
  {
    id: "lucro-bruto",
    name: "Lucro Bruto",
    level: 0,
    isTotal: true,
    isHighlight: true,
    values: { jan: 191250, fev: 206125, mar: 221000, abr: 210375, mai: 229500, jun: 246500 },
  },
  {
    id: "despesas-operacionais",
    name: "(-) Despesas Operacionais",
    level: 0,
    isSubtraction: true,
    values: { jan: -114750, fev: -123675, mar: -132600, abr: -126225, mai: -137700, jun: -147900 },
  },
  {
    id: "lucro-operacional",
    name: "Lucro Operacional (EBIT)",
    level: 0,
    isTotal: true,
    isHighlight: true,
    values: { jan: 76500, fev: 82450, mar: 88400, abr: 84150, mai: 91800, jun: 98600 },
  },
  {
    id: "lucro-liquido",
    name: "Lucro Líquido",
    level: 0,
    isTotal: true,
    isHighlight: true,
    isFinal: true,
    values: { jan: 45441, fev: 48975, mar: 52510, abr: 49985, mai: 54529, jun: 58568 },
  },
]

const periodLabels: Record<Period, string> = {
  jan: "Jan/24",
  fev: "Fev/24",
  mar: "Mar/24",
  abr: "Abr/24",
  mai: "Mai/24",
  jun: "Jun/24",
}

export function DRESimplified() {
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
              {simplifiedDREData.map((item) => (
                <tr
                  key={item.id}
                  className={`border-b hover:bg-muted/50 ${
                    item.isHighlight ? "bg-accent/30" : ""
                  } ${item.isFinal ? "bg-primary/10 font-bold" : ""}`}
                >
                  <td className="px-4 py-3">
                    <span className={`${item.level === 0 ? "font-semibold text-base" : ""}`}>
                      {item.name}
                    </span>
                  </td>
                  {(["jan", "fev", "mar", "abr", "mai", "jun"] as Period[]).map((period) => (
                    <td
                      key={period}
                      className={`px-4 py-3 text-right font-medium ${
                        item.level === 0 ? "font-bold" : ""
                      }`}
                    >
                      {formatCurrency(item.values[period])}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  )
}
