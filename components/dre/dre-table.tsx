"use client"

import { cn } from "@/lib/utils"
import { formatCurrency } from "@/lib/financial-data"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { FormDialog } from "@/components/ui/form-dialog"
import { ConfirmDialog } from "@/components/ui/confirm-dialog"
import { Plus, Pencil, Trash2 } from "lucide-react"
import { useState } from "react"

type Period = "jan" | "fev" | "mar" | "abr" | "mai" | "jun"

interface DRECategory {
  id: string
  name: string
  level: number
  isTotal?: boolean
  isHighlight?: boolean
  isFinal?: boolean
  isSubtraction?: boolean
  values: Record<Period, number>
}

const initialDreData: DRECategory[] = [
  {
    id: "receita-bruta",
    name: "Receita Bruta",
    level: 0,
    isTotal: true,
    values: { jan: 450000, fev: 485000, mar: 520000, abr: 495000, mai: 540000, jun: 580000 },
  },
  {
    id: "vendas-produtos",
    name: "Vendas de Produtos",
    level: 1,
    values: { jan: 320000, fev: 345000, mar: 370000, abr: 350000, mai: 385000, jun: 415000 },
  },
  {
    id: "vendas-servicos",
    name: "Prestação de Serviços",
    level: 1,
    values: { jan: 130000, fev: 140000, mar: 150000, abr: 145000, mai: 155000, jun: 165000 },
  },
  {
    id: "deducoes",
    name: "(-) Deduções da Receita",
    level: 0,
    isSubtraction: true,
    values: { jan: -67500, fev: -72750, mar: -78000, abr: -74250, mai: -81000, jun: -87000 },
  },
  {
    id: "impostos-vendas",
    name: "Impostos sobre Vendas",
    level: 1,
    isSubtraction: true,
    values: { jan: -54000, fev: -58200, mar: -62400, abr: -59400, mai: -64800, jun: -69600 },
  },
  {
    id: "devolucoes",
    name: "Devoluções e Abatimentos",
    level: 1,
    isSubtraction: true,
    values: { jan: -13500, fev: -14550, mar: -15600, abr: -14850, mai: -16200, jun: -17400 },
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

export function DRETable() {
  const [categories, setCategories] = useState<DRECategory[]>(initialDreData)
  const [selectedPeriods] = useState<Period[]>(["jan", "fev", "mar", "abr", "mai", "jun"])
  const [isAddOpen, setIsAddOpen] = useState(false)
  const [isEditOpen, setIsEditOpen] = useState(false)
  const [isDeleteOpen, setIsDeleteOpen] = useState(false)
  const [editingItem, setEditingItem] = useState<DRECategory | null>(null)
  const [formData, setFormData] = useState({
    name: "",
    level: 0,
    isSubtraction: false,
    jan: 0,
    fev: 0,
    mar: 0,
    abr: 0,
    mai: 0,
    jun: 0,
  })

  const calculateAH = (current: number, previous: number): number => {
    if (previous === 0) return 0
    return ((current - previous) / Math.abs(previous)) * 100
  }

  const calculateAV = (value: number, baseValue: number): number => {
    if (baseValue === 0) return 0
    return (value / baseValue) * 100
  }

  const resetForm = () => {
    setFormData({
      name: "",
      level: 0,
      isSubtraction: false,
      jan: 0,
      fev: 0,
      mar: 0,
      abr: 0,
      mai: 0,
      jun: 0,
    })
  }

  const handleAdd = () => {
    const newCategory: DRECategory = {
      id: `custom-${Date.now()}`,
      name: formData.name,
      level: formData.level,
      isSubtraction: formData.isSubtraction,
      values: {
        jan: formData.isSubtraction ? -Math.abs(formData.jan) : formData.jan,
        fev: formData.isSubtraction ? -Math.abs(formData.fev) : formData.fev,
        mar: formData.isSubtraction ? -Math.abs(formData.mar) : formData.mar,
        abr: formData.isSubtraction ? -Math.abs(formData.abr) : formData.abr,
        mai: formData.isSubtraction ? -Math.abs(formData.mai) : formData.mai,
        jun: formData.isSubtraction ? -Math.abs(formData.jun) : formData.jun,
      },
    }
    setCategories([...categories, newCategory])
    setIsAddOpen(false)
    resetForm()
  }

  const handleEdit = () => {
    if (!editingItem) return
    setCategories(
      categories.map((cat) =>
        cat.id === editingItem.id
          ? {
              ...cat,
              name: formData.name,
              level: formData.level,
              isSubtraction: formData.isSubtraction,
              values: {
                jan: formData.isSubtraction ? -Math.abs(formData.jan) : formData.jan,
                fev: formData.isSubtraction ? -Math.abs(formData.fev) : formData.fev,
                mar: formData.isSubtraction ? -Math.abs(formData.mar) : formData.mar,
                abr: formData.isSubtraction ? -Math.abs(formData.abr) : formData.abr,
                mai: formData.isSubtraction ? -Math.abs(formData.mai) : formData.mai,
                jun: formData.isSubtraction ? -Math.abs(formData.jun) : formData.jun,
              },
            }
          : cat,
      ),
    )
    setIsEditOpen(false)
    setEditingItem(null)
    resetForm()
  }

  const handleDelete = () => {
    if (!editingItem) return
    setCategories(categories.filter((cat) => cat.id !== editingItem.id))
    setIsDeleteOpen(false)
    setEditingItem(null)
  }

  const openEdit = (category: DRECategory) => {
    setEditingItem(category)
    setFormData({
      name: category.name,
      level: category.level,
      isSubtraction: category.isSubtraction || false,
      jan: Math.abs(category.values.jan),
      fev: Math.abs(category.values.fev),
      mar: Math.abs(category.values.mar),
      abr: Math.abs(category.values.abr),
      mai: Math.abs(category.values.mai),
      jun: Math.abs(category.values.jun),
    })
    setIsEditOpen(true)
  }

  const openDelete = (category: DRECategory) => {
    setEditingItem(category)
    setIsDeleteOpen(true)
  }

  return (
    <>
      <Card className="bg-card border-border">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-foreground">Demonstrativo de Resultado do Exercício</CardTitle>
          <div className="flex items-center gap-2">
            <Button onClick={() => setIsAddOpen(true)} size="sm" className="gap-1">
              <Plus className="h-4 w-4" />
              Adicionar Linha
            </Button>
            <Select defaultValue="all">
              <SelectTrigger className="w-40 bg-input border-border">
                <SelectValue placeholder="Períodos" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos os Meses</SelectItem>
                <SelectItem value="q1">1º Trimestre</SelectItem>
                <SelectItem value="q2">2º Trimestre</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent className="overflow-x-auto">
          <table className="w-full min-w-[1000px]">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground sticky left-0 bg-card min-w-[240px]">
                  Descrição
                </th>
                {selectedPeriods.map((period) => (
                  <th
                    key={period}
                    className="text-right py-3 px-4 text-sm font-medium text-muted-foreground min-w-[100px]"
                  >
                    {periodLabels[period]}
                  </th>
                ))}
                <th className="text-right py-3 px-4 text-sm font-medium text-muted-foreground min-w-[80px]">AV %</th>
                <th className="text-right py-3 px-4 text-sm font-medium text-muted-foreground min-w-[80px]">AH %</th>
                <th className="text-center py-3 px-4 text-sm font-medium text-muted-foreground min-w-[100px]">Ações</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((category) => {
                const lastPeriod = selectedPeriods[selectedPeriods.length - 1]
                const firstPeriod = selectedPeriods[0]
                const receitaLiquida = categories.find((c) => c.id === "receita-liquida")?.values[lastPeriod] || 1

                const avValue = calculateAV(category.values[lastPeriod], receitaLiquida)
                const ahValue = calculateAH(category.values[lastPeriod], category.values[firstPeriod])

                return (
                  <tr
                    key={category.id}
                    className={cn(
                      "border-b border-border transition-colors hover:bg-secondary/30 group",
                      category.isHighlight && "bg-secondary/50",
                      category.isFinal && "bg-primary/10",
                    )}
                  >
                    <td
                      className={cn(
                        "py-3 px-4 text-sm sticky left-0",
                        category.level === 1 && "pl-8",
                        category.isTotal ? "font-semibold text-foreground" : "text-foreground",
                        category.isFinal && "text-primary font-bold",
                      )}
                      style={{
                        backgroundColor: category.isFinal
                          ? "var(--primary) / 0.1"
                          : category.isHighlight
                            ? "var(--secondary) / 0.5"
                            : "var(--card)",
                      }}
                    >
                      {category.name}
                    </td>
                    {selectedPeriods.map((period) => (
                      <td
                        key={period}
                        className={cn(
                          "py-3 px-4 text-sm text-right tabular-nums",
                          category.isTotal ? "font-semibold" : "",
                          category.isFinal && "text-primary font-bold",
                          category.values[period] < 0 && !category.isSubtraction && "text-destructive",
                        )}
                      >
                        {formatCurrency(category.values[period])}
                      </td>
                    ))}
                    <td className="py-3 px-4 text-sm text-right tabular-nums text-muted-foreground">
                      {avValue.toFixed(1)}%
                    </td>
                    <td
                      className={cn(
                        "py-3 px-4 text-sm text-right tabular-nums font-medium",
                        ahValue > 0 ? "text-success" : ahValue < 0 ? "text-destructive" : "text-muted-foreground",
                      )}
                    >
                      {ahValue > 0 ? "+" : ""}
                      {ahValue.toFixed(1)}%
                    </td>
                    <td className="py-3 px-4 text-center">
                      <div className="flex items-center justify-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => openEdit(category)}>
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-destructive hover:text-destructive"
                          onClick={() => openDelete(category)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </CardContent>
      </Card>

      {/* Add Dialog */}
      <FormDialog
        open={isAddOpen}
        onOpenChange={setIsAddOpen}
        title="Adicionar Linha DRE"
        description="Preencha os dados para adicionar uma nova linha ao demonstrativo."
      >
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="name">Descrição</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Ex: Outras Receitas"
              className="bg-input border-border"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="level">Nível</Label>
              <Select
                value={String(formData.level)}
                onValueChange={(v) => setFormData({ ...formData, level: Number(v) })}
              >
                <SelectTrigger className="bg-input border-border">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="0">Principal</SelectItem>
                  <SelectItem value="1">Subcategoria</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="type">Tipo</Label>
              <Select
                value={formData.isSubtraction ? "subtraction" : "addition"}
                onValueChange={(v) => setFormData({ ...formData, isSubtraction: v === "subtraction" })}
              >
                <SelectTrigger className="bg-input border-border">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="addition">Receita (+)</SelectItem>
                  <SelectItem value="subtraction">Despesa (-)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-2">
            {(["jan", "fev", "mar", "abr", "mai", "jun"] as Period[]).map((period) => (
              <div key={period} className="grid gap-1">
                <Label htmlFor={period} className="text-xs">
                  {periodLabels[period]}
                </Label>
                <Input
                  id={period}
                  type="number"
                  value={formData[period]}
                  onChange={(e) => setFormData({ ...formData, [period]: Number(e.target.value) })}
                  className="bg-input border-border"
                />
              </div>
            ))}
          </div>
          <div className="flex justify-end gap-2 pt-4">
            <Button variant="outline" onClick={() => setIsAddOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={handleAdd}>Adicionar</Button>
          </div>
        </div>
      </FormDialog>

      {/* Edit Dialog */}
      <FormDialog
        open={isEditOpen}
        onOpenChange={setIsEditOpen}
        title="Editar Linha DRE"
        description="Modifique os dados da linha selecionada."
      >
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="edit-name">Descrição</Label>
            <Input
              id="edit-name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="bg-input border-border"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label>Nível</Label>
              <Select
                value={String(formData.level)}
                onValueChange={(v) => setFormData({ ...formData, level: Number(v) })}
              >
                <SelectTrigger className="bg-input border-border">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="0">Principal</SelectItem>
                  <SelectItem value="1">Subcategoria</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label>Tipo</Label>
              <Select
                value={formData.isSubtraction ? "subtraction" : "addition"}
                onValueChange={(v) => setFormData({ ...formData, isSubtraction: v === "subtraction" })}
              >
                <SelectTrigger className="bg-input border-border">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="addition">Receita (+)</SelectItem>
                  <SelectItem value="subtraction">Despesa (-)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-2">
            {(["jan", "fev", "mar", "abr", "mai", "jun"] as Period[]).map((period) => (
              <div key={period} className="grid gap-1">
                <Label className="text-xs">{periodLabels[period]}</Label>
                <Input
                  type="number"
                  value={formData[period]}
                  onChange={(e) => setFormData({ ...formData, [period]: Number(e.target.value) })}
                  className="bg-input border-border"
                />
              </div>
            ))}
          </div>
          <div className="flex justify-end gap-2 pt-4">
            <Button variant="outline" onClick={() => setIsEditOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={handleEdit}>Salvar</Button>
          </div>
        </div>
      </FormDialog>

      {/* Delete Confirmation */}
      <ConfirmDialog
        open={isDeleteOpen}
        onOpenChange={setIsDeleteOpen}
        title="Excluir Linha"
        description={`Tem certeza que deseja excluir "${editingItem?.name}"? Esta ação não pode ser desfeita.`}
        onConfirm={handleDelete}
        confirmText="Excluir"
        variant="destructive"
      />
    </>
  )
}
