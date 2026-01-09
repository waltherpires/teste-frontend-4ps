"use client"

import { useState } from "react"
import { Plus, Pencil, Trash2 } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { FormDialog } from "@/components/ui/form-dialog"
import { ConfirmDialog } from "@/components/ui/confirm-dialog"
import { formatCurrency } from "@/lib/financial-data"

interface TituloReceber {
  id: string
  data: string
  documento: string
  planoConta: string
  tipo: string
  nomeCliente: string
  descricao: string
  banco: string
  valor: number
  parcelas: string
  valorParcela: number
  vencimento: string
  recebimento: string
  status: string
  statusRecebimento: string
}

const initialData: TituloReceber[] = [
  {
    id: "1",
    data: "2025-01-06",
    documento: "Boleto",
    planoConta: "Receita com Produtos",
    tipo: "Recorrente",
    nomeCliente: "Empresa XYZ Ltda",
    descricao: "Curso A",
    banco: "Stone",
    valor: 5000,
    parcelas: "1 de 1",
    valorParcela: 5000,
    vencimento: "2025-01-20",
    recebimento: "2025-01-20",
    status: "Recebido",
    statusRecebimento: "Em dia",
  },
  {
    id: "2",
    data: "2025-01-05",
    documento: "Cartão Recorrência",
    planoConta: "Receita com Produtos",
    tipo: "Recorrente",
    nomeCliente: "João Silva",
    descricao: "Intensivo B",
    banco: "Cora",
    valor: 2500,
    parcelas: "1 de 3",
    valorParcela: 2500,
    vencimento: "2025-02-05",
    recebimento: "",
    status: "Em Aberto",
    statusRecebimento: "Em dia",
  },
]

const documentoOptions = [
  { value: "boleto", label: "Boleto" },
  { value: "cartao-parcelado", label: "Cartão Parcelado" },
  { value: "cartao-recorrencia", label: "Cartão Recorrência" },
  { value: "transferencia", label: "Transferência" },
  { value: "pix", label: "PIX" },
]

const planoContaOptions = [
  { value: "receita-produtos", label: "Receita com Produtos" },
  { value: "outras-receitas", label: "Outras Receitas" },
  { value: "receita-servicos", label: "Receita de Serviços" },
]

const tipoOptions = [
  { value: "recorrente", label: "Recorrente" },
  { value: "parcelas", label: "Parcelas" },
  { value: "unica", label: "Única" },
]

const bancoOptions = [
  { value: "stone", label: "Stone" },
  { value: "cora", label: "Cora" },
  { value: "banco-brasil", label: "Banco do Brasil" },
  { value: "caixa", label: "Caixa" },
  { value: "nubank", label: "Nubank" },
]

const statusOptions = [
  { value: "recebido", label: "Recebido" },
  { value: "em-aberto", label: "Em Aberto" },
  { value: "cancelado", label: "Cancelado" },
]

const statusRecebimentoOptions = [
  { value: "em-dia", label: "Em dia" },
  { value: "em-atraso", label: "Em atraso" },
  { value: "atrasado", label: "Atrasado" },
]

export function TitulosAReceber() {
  const [items, setItems] = useState<TituloReceber[]>(initialData)
  const [isAddOpen, setIsAddOpen] = useState(false)
  const [isEditOpen, setIsEditOpen] = useState(false)
  const [isDeleteOpen, setIsDeleteOpen] = useState(false)
  const [editingItem, setEditingItem] = useState<TituloReceber | null>(null)
  const [formData, setFormData] = useState<Omit<TituloReceber, "id">>({
    data: "",
    documento: "",
    planoConta: "",
    tipo: "",
    nomeCliente: "",
    descricao: "",
    banco: "",
    valor: 0,
    parcelas: "",
    valorParcela: 0,
    vencimento: "",
    recebimento: "",
    status: "",
    statusRecebimento: "",
  })

  const resetForm = () => {
    setFormData({
      data: "",
      documento: "",
      planoConta: "",
      tipo: "",
      nomeCliente: "",
      descricao: "",
      banco: "",
      valor: 0,
      parcelas: "",
      valorParcela: 0,
      vencimento: "",
      recebimento: "",
      status: "",
      statusRecebimento: "",
    })
    setEditingItem(null)
  }

  const handleAdd = () => {
    const newItem: TituloReceber = {
      id: `receber-${Date.now()}`,
      ...formData,
    }
    setItems([...items, newItem])
    resetForm()
    setIsAddOpen(false)
  }

  const handleEdit = () => {
    if (!editingItem) return
    setItems(items.map((item) => (item.id === editingItem.id ? { ...editingItem, ...formData } : item)))
    resetForm()
    setIsEditOpen(false)
  }

  const handleDelete = () => {
    if (!editingItem) return
    setItems(items.filter((item) => item.id !== editingItem.id))
    resetForm()
    setIsDeleteOpen(false)
  }

  const openEditDialog = (item: TituloReceber) => {
    setEditingItem(item)
    setFormData(item)
    setIsEditOpen(true)
  }

  const openDeleteDialog = (item: TituloReceber) => {
    setEditingItem(item)
    setIsDeleteOpen(true)
  }

  const formatDate = (dateString: string) => {
    if (!dateString) return "-"
    const date = new Date(dateString)
    return date.toLocaleDateString("pt-BR")
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Títulos a Receber</CardTitle>
        <Button onClick={() => setIsAddOpen(true)} className="gap-2">
          <Plus className="h-4 w-4" />
          Novo Título a Receber
        </Button>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b">
                <th className="text-left py-3 px-4 font-semibold">Data</th>
                <th className="text-left py-3 px-4 font-semibold">Documento</th>
                <th className="text-left py-3 px-4 font-semibold">Cliente</th>
                <th className="text-left py-3 px-4 font-semibold">Descrição</th>
                <th className="text-left py-3 px-4 font-semibold">Valor</th>
                <th className="text-left py-3 px-4 font-semibold">Vencimento</th>
                <th className="text-left py-3 px-4 font-semibold">Status</th>
                <th className="text-left py-3 px-4 font-semibold">Ações</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item.id} className="border-b hover:bg-muted/50">
                  <td className="py-3 px-4">{formatDate(item.data)}</td>
                  <td className="py-3 px-4">{item.documento}</td>
                  <td className="py-3 px-4 font-medium">{item.nomeCliente}</td>
                  <td className="py-3 px-4">{item.descricao}</td>
                  <td className="py-3 px-4">{formatCurrency(item.valor)}</td>
                  <td className="py-3 px-4">{formatDate(item.vencimento)}</td>
                  <td className="py-3 px-4">
                    <span
                      className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                        item.status === "Recebido"
                          ? "bg-green-100 text-green-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {item.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 flex gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => openEditDialog(item)}
                      className="h-8 w-8"
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => openDeleteDialog(item)}
                      className="h-8 w-8 text-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>

      {/* Dialog de Adicionar */}
      <FormDialog
        open={isAddOpen}
        onOpenChange={setIsAddOpen}
        title="Novo Título a Receber"
      >
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="data">Data</Label>
              <Input
                id="data"
                type="date"
                value={formData.data}
                onChange={(e) => setFormData({ ...formData, data: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="documento">Documento</Label>
              <Select value={formData.documento} onValueChange={(v) => setFormData({ ...formData, documento: v })}>
                <SelectTrigger id="documento">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {documentoOptions.map((opt) => (
                    <SelectItem key={opt.value} value={opt.value}>
                      {opt.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="planoConta">Plano de Conta</Label>
              <Select value={formData.planoConta} onValueChange={(v) => setFormData({ ...formData, planoConta: v })}>
                <SelectTrigger id="planoConta">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {planoContaOptions.map((opt) => (
                    <SelectItem key={opt.value} value={opt.value}>
                      {opt.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="tipo">Tipo</Label>
              <Select value={formData.tipo} onValueChange={(v) => setFormData({ ...formData, tipo: v })}>
                <SelectTrigger id="tipo">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {tipoOptions.map((opt) => (
                    <SelectItem key={opt.value} value={opt.value}>
                      {opt.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <Label htmlFor="nomeCliente">Nome do Cliente</Label>
            <Input
              id="nomeCliente"
              value={formData.nomeCliente}
              onChange={(e) => setFormData({ ...formData, nomeCliente: e.target.value })}
            />
          </div>

          <div>
            <Label htmlFor="descricao">Descrição</Label>
            <Input
              id="descricao"
              value={formData.descricao}
              onChange={(e) => setFormData({ ...formData, descricao: e.target.value })}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="banco">Recebido pelo Banco</Label>
              <Select value={formData.banco} onValueChange={(v) => setFormData({ ...formData, banco: v })}>
                <SelectTrigger id="banco">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {bancoOptions.map((opt) => (
                    <SelectItem key={opt.value} value={opt.value}>
                      {opt.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="valor">Valor</Label>
              <Input
                id="valor"
                type="number"
                step="0.01"
                value={formData.valor}
                onChange={(e) => setFormData({ ...formData, valor: parseFloat(e.target.value) || 0 })}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="parcelas">Parcelas</Label>
              <Input
                id="parcelas"
                placeholder="ex: 1 de 1"
                value={formData.parcelas}
                onChange={(e) => setFormData({ ...formData, parcelas: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="valorParcela">Valor da Parcela</Label>
              <Input
                id="valorParcela"
                type="number"
                step="0.01"
                value={formData.valorParcela}
                onChange={(e) => setFormData({ ...formData, valorParcela: parseFloat(e.target.value) || 0 })}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="vencimento">Vencimento</Label>
              <Input
                id="vencimento"
                type="date"
                value={formData.vencimento}
                onChange={(e) => setFormData({ ...formData, vencimento: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="recebimento">Recebimento</Label>
              <Input
                id="recebimento"
                type="date"
                value={formData.recebimento}
                onChange={(e) => setFormData({ ...formData, recebimento: e.target.value })}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="status">Status</Label>
              <Select value={formData.status} onValueChange={(v) => setFormData({ ...formData, status: v })}>
                <SelectTrigger id="status">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {statusOptions.map((opt) => (
                    <SelectItem key={opt.value} value={opt.value}>
                      {opt.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="statusRecebimento">Status de Recebimento</Label>
              <Select
                value={formData.statusRecebimento}
                onValueChange={(v) => setFormData({ ...formData, statusRecebimento: v })}
              >
                <SelectTrigger id="statusRecebimento">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {statusRecebimentoOptions.map((opt) => (
                    <SelectItem key={opt.value} value={opt.value}>
                      {opt.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="flex justify-end gap-2 pt-4">
            <Button variant="outline" onClick={() => setIsAddOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={handleAdd}>Adicionar</Button>
          </div>
        </div>
      </FormDialog>

      {/* Dialog de Editar */}
      <FormDialog
        open={isEditOpen}
        onOpenChange={setIsEditOpen}
        title="Editar Título a Receber"
      >
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="data-edit">Data</Label>
              <Input
                id="data-edit"
                type="date"
                value={formData.data}
                onChange={(e) => setFormData({ ...formData, data: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="documento-edit">Documento</Label>
              <Select value={formData.documento} onValueChange={(v) => setFormData({ ...formData, documento: v })}>
                <SelectTrigger id="documento-edit">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {documentoOptions.map((opt) => (
                    <SelectItem key={opt.value} value={opt.value}>
                      {opt.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="planoConta-edit">Plano de Conta</Label>
              <Select value={formData.planoConta} onValueChange={(v) => setFormData({ ...formData, planoConta: v })}>
                <SelectTrigger id="planoConta-edit">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {planoContaOptions.map((opt) => (
                    <SelectItem key={opt.value} value={opt.value}>
                      {opt.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="tipo-edit">Tipo</Label>
              <Select value={formData.tipo} onValueChange={(v) => setFormData({ ...formData, tipo: v })}>
                <SelectTrigger id="tipo-edit">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {tipoOptions.map((opt) => (
                    <SelectItem key={opt.value} value={opt.value}>
                      {opt.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <Label htmlFor="nomeCliente-edit">Nome do Cliente</Label>
            <Input
              id="nomeCliente-edit"
              value={formData.nomeCliente}
              onChange={(e) => setFormData({ ...formData, nomeCliente: e.target.value })}
            />
          </div>

          <div>
            <Label htmlFor="descricao-edit">Descrição</Label>
            <Input
              id="descricao-edit"
              value={formData.descricao}
              onChange={(e) => setFormData({ ...formData, descricao: e.target.value })}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="banco-edit">Recebido pelo Banco</Label>
              <Select value={formData.banco} onValueChange={(v) => setFormData({ ...formData, banco: v })}>
                <SelectTrigger id="banco-edit">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {bancoOptions.map((opt) => (
                    <SelectItem key={opt.value} value={opt.value}>
                      {opt.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="valor-edit">Valor</Label>
              <Input
                id="valor-edit"
                type="number"
                step="0.01"
                value={formData.valor}
                onChange={(e) => setFormData({ ...formData, valor: parseFloat(e.target.value) || 0 })}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="parcelas-edit">Parcelas</Label>
              <Input
                id="parcelas-edit"
                placeholder="ex: 1 de 1"
                value={formData.parcelas}
                onChange={(e) => setFormData({ ...formData, parcelas: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="valorParcela-edit">Valor da Parcela</Label>
              <Input
                id="valorParcela-edit"
                type="number"
                step="0.01"
                value={formData.valorParcela}
                onChange={(e) => setFormData({ ...formData, valorParcela: parseFloat(e.target.value) || 0 })}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="vencimento-edit">Vencimento</Label>
              <Input
                id="vencimento-edit"
                type="date"
                value={formData.vencimento}
                onChange={(e) => setFormData({ ...formData, vencimento: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="recebimento-edit">Recebimento</Label>
              <Input
                id="recebimento-edit"
                type="date"
                value={formData.recebimento}
                onChange={(e) => setFormData({ ...formData, recebimento: e.target.value })}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="status-edit">Status</Label>
              <Select value={formData.status} onValueChange={(v) => setFormData({ ...formData, status: v })}>
                <SelectTrigger id="status-edit">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {statusOptions.map((opt) => (
                    <SelectItem key={opt.value} value={opt.value}>
                      {opt.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="statusRecebimento-edit">Status de Recebimento</Label>
              <Select
                value={formData.statusRecebimento}
                onValueChange={(v) => setFormData({ ...formData, statusRecebimento: v })}
              >
                <SelectTrigger id="statusRecebimento-edit">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {statusRecebimentoOptions.map((opt) => (
                    <SelectItem key={opt.value} value={opt.value}>
                      {opt.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="flex justify-end gap-2 pt-4">
            <Button variant="outline" onClick={() => setIsEditOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={handleEdit}>Atualizar</Button>
          </div>
        </div>
      </FormDialog>

      {/* Dialog de Deletar */}
      <ConfirmDialog
        open={isDeleteOpen}
        onOpenChange={setIsDeleteOpen}
        title="Deletar Título a Receber"
        description={`Tem certeza que deseja deletar o título a receber de ${editingItem?.nomeCliente}?`}
        onConfirm={handleDelete}
        variant="destructive"
      />
    </Card>
  )
}
