"use client"

import { cn } from "@/lib/utils"
import { formatCurrency, formatPercent } from "@/lib/financial-data"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { FormDialog } from "@/components/ui/form-dialog"
import { ConfirmDialog } from "@/components/ui/confirm-dialog"
import { Plus, Pencil, Trash2 } from "lucide-react"
import { useState } from "react"

interface Product {
  id: number
  name: string
  custosFixos: number
  custosVariaveis: number
  cmv: number
  precoVenda: number
  margemBruta: number
  margemLiquida: number
  status: "healthy" | "warning" | "risk"
}

const initialProducts: Product[] = [
  {
    id: 1,
    name: "Produto A - Premium",
    custosFixos: 15.0,
    custosVariaveis: 35.0,
    cmv: 50.0,
    precoVenda: 89.9,
    margemBruta: 44.38,
    margemLiquida: 28.5,
    status: "healthy",
  },
  {
    id: 2,
    name: "Produto B - Standard",
    custosFixos: 12.0,
    custosVariaveis: 28.0,
    cmv: 40.0,
    precoVenda: 59.9,
    margemBruta: 33.22,
    margemLiquida: 18.2,
    status: "healthy",
  },
  {
    id: 3,
    name: "Produto C - Basic",
    custosFixos: 8.0,
    custosVariaveis: 22.0,
    cmv: 30.0,
    precoVenda: 39.9,
    margemBruta: 24.81,
    margemLiquida: 10.5,
    status: "warning",
  },
  {
    id: 4,
    name: "Serviço X - Consultoria",
    custosFixos: 200.0,
    custosVariaveis: 80.0,
    cmv: 280.0,
    precoVenda: 450.0,
    margemBruta: 37.78,
    margemLiquida: 22.3,
    status: "healthy",
  },
  {
    id: 5,
    name: "Serviço Y - Implementação",
    custosFixos: 500.0,
    custosVariaveis: 350.0,
    cmv: 850.0,
    precoVenda: 1200.0,
    margemBruta: 29.17,
    margemLiquida: 14.8,
    status: "warning",
  },
  {
    id: 6,
    name: "Produto D - Econômico",
    custosFixos: 6.0,
    custosVariaveis: 18.0,
    cmv: 24.0,
    precoVenda: 29.9,
    margemBruta: 19.73,
    margemLiquida: 5.2,
    status: "risk",
  },
]

export function PricingTable() {
  const [products, setProducts] = useState<Product[]>(initialProducts)
  const [isAddOpen, setIsAddOpen] = useState(false)
  const [isEditOpen, setIsEditOpen] = useState(false)
  const [isDeleteOpen, setIsDeleteOpen] = useState(false)
  const [editingItem, setEditingItem] = useState<Product | null>(null)
  const [formData, setFormData] = useState({
    name: "",
    custosFixos: 0,
    custosVariaveis: 0,
    precoVenda: 0,
    status: "healthy" as Product["status"],
  })

  const resetForm = () =>
    setFormData({ name: "", custosFixos: 0, custosVariaveis: 0, precoVenda: 0, status: "healthy" })

  const calculateMargins = (custosFixos: number, custosVariaveis: number, precoVenda: number) => {
    const cmv = custosFixos + custosVariaveis
    const margemBruta = precoVenda > 0 ? ((precoVenda - cmv) / precoVenda) * 100 : 0
    const margemLiquida = margemBruta * 0.65
    return { cmv, margemBruta, margemLiquida }
  }

  const handleAdd = () => {
    const { cmv, margemBruta, margemLiquida } = calculateMargins(
      formData.custosFixos,
      formData.custosVariaveis,
      formData.precoVenda,
    )
    const newProduct: Product = {
      id: Date.now(),
      name: formData.name,
      custosFixos: formData.custosFixos,
      custosVariaveis: formData.custosVariaveis,
      cmv,
      precoVenda: formData.precoVenda,
      margemBruta,
      margemLiquida,
      status: formData.status,
    }
    setProducts([...products, newProduct])
    setIsAddOpen(false)
    resetForm()
  }

  const handleEdit = () => {
    if (!editingItem) return
    const { cmv, margemBruta, margemLiquida } = calculateMargins(
      formData.custosFixos,
      formData.custosVariaveis,
      formData.precoVenda,
    )
    setProducts(
      products.map((p) =>
        p.id === editingItem.id
          ? {
              ...p,
              name: formData.name,
              custosFixos: formData.custosFixos,
              custosVariaveis: formData.custosVariaveis,
              cmv,
              precoVenda: formData.precoVenda,
              margemBruta,
              margemLiquida,
              status: formData.status,
            }
          : p,
      ),
    )
    setIsEditOpen(false)
    setEditingItem(null)
    resetForm()
  }

  const handleDelete = () => {
    if (!editingItem) return
    setProducts(products.filter((p) => p.id !== editingItem.id))
    setIsDeleteOpen(false)
    setEditingItem(null)
  }

  const openEdit = (product: Product) => {
    setEditingItem(product)
    setFormData({
      name: product.name,
      custosFixos: product.custosFixos,
      custosVariaveis: product.custosVariaveis,
      precoVenda: product.precoVenda,
      status: product.status,
    })
    setIsEditOpen(true)
  }

  const openDelete = (product: Product) => {
    setEditingItem(product)
    setIsDeleteOpen(true)
  }

  const getStatusConfig = (status: string) => {
    switch (status) {
      case "healthy":
        return { label: "Saudável", className: "bg-success/20 text-success border-success/30" }
      case "warning":
        return { label: "Atenção", className: "bg-warning/20 text-warning border-warning/30" }
      case "risk":
        return { label: "Risco", className: "bg-destructive/20 text-destructive border-destructive/30" }
      default:
        return { label: "Normal", className: "bg-muted text-muted-foreground" }
    }
  }

  return (
    <>
      <Card className="bg-card border-border">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-foreground">Análise de Precificação por Produto/Serviço</CardTitle>
          <Button onClick={() => setIsAddOpen(true)} size="sm" className="gap-1">
            <Plus className="h-4 w-4" />
            Adicionar Produto
          </Button>
        </CardHeader>
        <CardContent className="overflow-x-auto">
          <table className="w-full min-w-[1000px]">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Produto/Serviço</th>
                <th className="text-right py-3 px-4 text-sm font-medium text-muted-foreground">Custos Fixos</th>
                <th className="text-right py-3 px-4 text-sm font-medium text-muted-foreground">Custos Variáveis</th>
                <th className="text-right py-3 px-4 text-sm font-medium text-muted-foreground">CMV Total</th>
                <th className="text-right py-3 px-4 text-sm font-medium text-muted-foreground">Preço Venda</th>
                <th className="text-right py-3 px-4 text-sm font-medium text-muted-foreground">Margem Bruta</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground min-w-[120px]">
                  Margem Líquida
                </th>
                <th className="text-center py-3 px-4 text-sm font-medium text-muted-foreground">Status</th>
                <th className="text-center py-3 px-4 text-sm font-medium text-muted-foreground">Ações</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => {
                const statusConfig = getStatusConfig(product.status)
                return (
                  <tr
                    key={product.id}
                    className={cn(
                      "border-b border-border hover:bg-secondary/30 transition-colors group",
                      product.status === "risk" && "bg-destructive/5",
                    )}
                  >
                    <td className="py-3 px-4 text-sm font-medium text-foreground">{product.name}</td>
                    <td className="py-3 px-4 text-sm text-right tabular-nums text-muted-foreground">
                      {formatCurrency(product.custosFixos)}
                    </td>
                    <td className="py-3 px-4 text-sm text-right tabular-nums text-muted-foreground">
                      {formatCurrency(product.custosVariaveis)}
                    </td>
                    <td className="py-3 px-4 text-sm text-right tabular-nums font-medium text-foreground">
                      {formatCurrency(product.cmv)}
                    </td>
                    <td className="py-3 px-4 text-sm text-right tabular-nums font-semibold text-primary">
                      {formatCurrency(product.precoVenda)}
                    </td>
                    <td
                      className={cn(
                        "py-3 px-4 text-sm text-right tabular-nums font-medium",
                        product.margemBruta >= 30
                          ? "text-success"
                          : product.margemBruta >= 20
                            ? "text-warning"
                            : "text-destructive",
                      )}
                    >
                      {formatPercent(product.margemBruta)}
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <Progress
                          value={product.margemLiquida}
                          className={cn(
                            "h-2 flex-1",
                            product.status === "healthy" && "[&>div]:bg-success",
                            product.status === "warning" && "[&>div]:bg-warning",
                            product.status === "risk" && "[&>div]:bg-destructive",
                          )}
                        />
                        <span
                          className={cn(
                            "text-xs font-medium w-12 text-right",
                            product.margemLiquida >= 15
                              ? "text-success"
                              : product.margemLiquida >= 10
                                ? "text-warning"
                                : "text-destructive",
                          )}
                        >
                          {formatPercent(product.margemLiquida)}
                        </span>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-center">
                      <Badge variant="outline" className={statusConfig.className}>
                        {statusConfig.label}
                      </Badge>
                    </td>
                    <td className="py-3 px-4 text-center">
                      <div className="flex items-center justify-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => openEdit(product)}>
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-destructive hover:text-destructive"
                          onClick={() => openDelete(product)}
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

      <FormDialog
        open={isAddOpen}
        onOpenChange={setIsAddOpen}
        title="Adicionar Produto/Serviço"
        description="Cadastre um novo produto ou serviço para análise de precificação."
      >
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label>Nome do Produto/Serviço</Label>
            <Input
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Ex: Produto Premium"
              className="bg-input border-border"
            />
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div className="grid gap-2">
              <Label>Custos Fixos (R$)</Label>
              <Input
                type="number"
                step="0.01"
                value={formData.custosFixos}
                onChange={(e) => setFormData({ ...formData, custosFixos: Number(e.target.value) })}
                className="bg-input border-border"
              />
            </div>
            <div className="grid gap-2">
              <Label>Custos Variáveis (R$)</Label>
              <Input
                type="number"
                step="0.01"
                value={formData.custosVariaveis}
                onChange={(e) => setFormData({ ...formData, custosVariaveis: Number(e.target.value) })}
                className="bg-input border-border"
              />
            </div>
            <div className="grid gap-2">
              <Label>Preço de Venda (R$)</Label>
              <Input
                type="number"
                step="0.01"
                value={formData.precoVenda}
                onChange={(e) => setFormData({ ...formData, precoVenda: Number(e.target.value) })}
                className="bg-input border-border"
              />
            </div>
          </div>
          <div className="grid gap-2">
            <Label>Status</Label>
            <Select
              value={formData.status}
              onValueChange={(v) => setFormData({ ...formData, status: v as Product["status"] })}
            >
              <SelectTrigger className="bg-input border-border">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="healthy">Saudável</SelectItem>
                <SelectItem value="warning">Atenção</SelectItem>
                <SelectItem value="risk">Risco</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex justify-end gap-2 pt-4">
            <Button variant="outline" onClick={() => setIsAddOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={handleAdd}>Adicionar</Button>
          </div>
        </div>
      </FormDialog>

      <FormDialog
        open={isEditOpen}
        onOpenChange={setIsEditOpen}
        title="Editar Produto/Serviço"
        description="Modifique os dados do produto."
      >
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label>Nome do Produto/Serviço</Label>
            <Input
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="bg-input border-border"
            />
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div className="grid gap-2">
              <Label>Custos Fixos (R$)</Label>
              <Input
                type="number"
                step="0.01"
                value={formData.custosFixos}
                onChange={(e) => setFormData({ ...formData, custosFixos: Number(e.target.value) })}
                className="bg-input border-border"
              />
            </div>
            <div className="grid gap-2">
              <Label>Custos Variáveis (R$)</Label>
              <Input
                type="number"
                step="0.01"
                value={formData.custosVariaveis}
                onChange={(e) => setFormData({ ...formData, custosVariaveis: Number(e.target.value) })}
                className="bg-input border-border"
              />
            </div>
            <div className="grid gap-2">
              <Label>Preço de Venda (R$)</Label>
              <Input
                type="number"
                step="0.01"
                value={formData.precoVenda}
                onChange={(e) => setFormData({ ...formData, precoVenda: Number(e.target.value) })}
                className="bg-input border-border"
              />
            </div>
          </div>
          <div className="grid gap-2">
            <Label>Status</Label>
            <Select
              value={formData.status}
              onValueChange={(v) => setFormData({ ...formData, status: v as Product["status"] })}
            >
              <SelectTrigger className="bg-input border-border">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="healthy">Saudável</SelectItem>
                <SelectItem value="warning">Atenção</SelectItem>
                <SelectItem value="risk">Risco</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex justify-end gap-2 pt-4">
            <Button variant="outline" onClick={() => setIsEditOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={handleEdit}>Salvar</Button>
          </div>
        </div>
      </FormDialog>

      <ConfirmDialog
        open={isDeleteOpen}
        onOpenChange={setIsDeleteOpen}
        title="Excluir Produto"
        description={`Tem certeza que deseja excluir "${editingItem?.name}"?`}
        onConfirm={handleDelete}
        confirmText="Excluir"
        variant="destructive"
      />
    </>
  )
}
