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

interface TituloPagar {
  id: string
  dataDocumento: string
  documento: string
  planoConta: string
  projeto: string
  conta: string
  tipo: string
  fornecedor: string
  descricao: string
  banco: string
  valor: number
  parcelas: string
  valorParcela: number
  vencimento: string
  pagamento: string
  status: string
  statusPagamento: string
}

const initialData: TituloPagar[] = [
  {
    id: "1",
    dataDocumento: "2025-01-10",
    documento: "Fatura",
    planoConta: "Despesas com Serviços",
    projeto: "Projeto A",
    conta: "Taxa Cartão de Crédito",
    tipo: "Recorrente",
    fornecedor: "Google",
    descricao: "Publicidade no Google Ads",
    banco: "Cora",
    valor: 5000,
    parcelas: "1 de 1",
    valorParcela: 5000,
    vencimento: "2025-01-20",
    pagamento: "2025-01-20",
    status: "Pago",
    statusPagamento: "Em dia",
  },
  {
    id: "2",
    dataDocumento: "2025-01-08",
    documento: "Boleto",
    planoConta: "Custos Variáveis",
    projeto: "Projeto B",
    conta: "Reforma e Construção",
    tipo: "Parcelas",
    fornecedor: "Empresa X",
    descricao: "Reforma da sala",
    banco: "Stone",
    valor: 15000,
    parcelas: "2 de 3",
    valorParcela: 5000,
    vencimento: "2025-02-10",
    pagamento: "",
    status: "Pendente",
    statusPagamento: "Em dia",
  },
]

const documentoOptions = [
  { value: "fatura", label: "Fatura" },
  { value: "debito-automatico", label: "Débito Automático" },
  { value: "boleto", label: "Boleto" },
  { value: "pix", label: "PIX" },
  { value: "cheque", label: "Cheque" },
]

const planoContaOptions = [
  { value: "despesas-servicos", label: "Despesas com Serviços" },
  { value: "custos-variaveis", label: "Custos Variáveis" },
  { value: "despesas-ocupacao", label: "Despesas com Ocupação" },
  { value: "despesas-administrativas", label: "Despesas Administrativas" },
  { value: "despesas-comerciais", label: "Despesas Comerciais" },
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
  { value: "pago", label: "Pago" },
  { value: "pendente", label: "Pendente" },
  { value: "cancelado", label: "Cancelado" },
]

const statusPagamentoOptions = [
  { value: "em-dia", label: "Em dia" },
  { value: "em-atraso", label: "Em atraso" },
  { value: "atrasado", label: "Atrasado" },
]

// Mock data para os selects dinâmicos
const projetosOptions = [
  { value: "projeto-a", label: "Projeto A" },
  { value: "projeto-b", label: "Projeto B" },
  { value: "projeto-c", label: "Projeto C" },
]

const contasOptions = [
  { value: "taxa-cartao", label: "Taxa Cartão de Crédito" },
  { value: "reforma-construcao", label: "Reforma e Construção" },
  { value: "equipamento-eletronico", label: "Equipamento Eletrônico" },
  { value: "salario-contrato", label: "Salário por Contrato" },
  { value: "fatura-cartao", label: "Fatura Cartão" },
  { value: "saque", label: "Saque" },
]

const fornecedoresOptions = [
  { value: "google", label: "Google" },
  { value: "facebook", label: "Facebook" },
  { value: "empresa-x", label: "Empresa X" },
  { value: "empresa-y", label: "Empresa Y" },
  { value: "provedor-internet", label: "Provedor Internet" },
]

export function TitulosAPagar() {
  const [items, setItems] = useState<TituloPagar[]>(initialData)
  const [isAddOpen, setIsAddOpen] = useState(false)
  const [isEditOpen, setIsEditOpen] = useState(false)
  const [isDeleteOpen, setIsDeleteOpen] = useState(false)
  const [editingItem, setEditingItem] = useState<TituloPagar | null>(null)
  const [formData, setFormData] = useState<Omit<TituloPagar, "id">>({
    dataDocumento: "",
    documento: "",
    planoConta: "",
    projeto: "",
    conta: "",
    tipo: "",
    fornecedor: "",
    descricao: "",
    banco: "",
    valor: 0,
    parcelas: "",
    valorParcela: 0,
    vencimento: "",
    pagamento: "",
    status: "",
    statusPagamento: "",
  })

  const resetForm = () => {
    setFormData({
      dataDocumento: "",
      documento: "",
      planoConta: "",
      projeto: "",
      conta: "",
      tipo: "",
      fornecedor: "",
      descricao: "",
      banco: "",
      valor: 0,
      parcelas: "",
      valorParcela: 0,
      vencimento: "",
      pagamento: "",
      status: "",
      statusPagamento: "",
    })
    setEditingItem(null)
  }

  const handleAdd = () => {
    const newItem: TituloPagar = {
      id: `pagar-${Date.now()}`,
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

  const openEditDialog = (item: TituloPagar) => {
    setEditingItem(item)
    setFormData(item)
    setIsEditOpen(true)
  }

  const openDeleteDialog = (item: TituloPagar) => {
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
        <CardTitle>Títulos a Pagar</CardTitle>
        <Button onClick={() => setIsAddOpen(true)} className="gap-2">
          <Plus className="h-4 w-4" />
          Novo Título a Pagar
        </Button>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b">
                <th className="text-left py-3 px-4 font-semibold">Data</th>
                <th className="text-left py-3 px-4 font-semibold">Documento</th>
                <th className="text-left py-3 px-4 font-semibold">Fornecedor</th>
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
                  <td className="py-3 px-4">{formatDate(item.dataDocumento)}</td>
                  <td className="py-3 px-4">{item.documento}</td>
                  <td className="py-3 px-4 font-medium">{item.fornecedor}</td>
                  <td className="py-3 px-4">{item.descricao}</td>
                  <td className="py-3 px-4">{formatCurrency(item.valor)}</td>
                  <td className="py-3 px-4">{formatDate(item.vencimento)}</td>
                  <td className="py-3 px-4">
                    <span
                      className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                        item.status === "Pago"
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
        title="Novo Título a Pagar"
      >
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="dataDocumento">Data do Documento</Label>
              <Input
                id="dataDocumento"
                type="date"
                value={formData.dataDocumento}
                onChange={(e) => setFormData({ ...formData, dataDocumento: e.target.value })}
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
              <Label htmlFor="projeto">Projeto</Label>
              <Select value={formData.projeto} onValueChange={(v) => setFormData({ ...formData, projeto: v })}>
                <SelectTrigger id="projeto">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {projetosOptions.map((opt) => (
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
              <Label htmlFor="conta">Conta</Label>
              <Select value={formData.conta} onValueChange={(v) => setFormData({ ...formData, conta: v })}>
                <SelectTrigger id="conta">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {contasOptions.map((opt) => (
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

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="fornecedor">Fornecedor</Label>
              <Select value={formData.fornecedor} onValueChange={(v) => setFormData({ ...formData, fornecedor: v })}>
                <SelectTrigger id="fornecedor">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {fornecedoresOptions.map((opt) => (
                    <SelectItem key={opt.value} value={opt.value}>
                      {opt.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="descricao">Descrição</Label>
              <Input
                id="descricao"
                value={formData.descricao}
                onChange={(e) => setFormData({ ...formData, descricao: e.target.value })}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="banco">Pago pelo Banco</Label>
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
              <Label htmlFor="pagamento">Pagamento</Label>
              <Input
                id="pagamento"
                type="date"
                value={formData.pagamento}
                onChange={(e) => setFormData({ ...formData, pagamento: e.target.value })}
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
              <Label htmlFor="statusPagamento">Status do Pagamento</Label>
              <Select
                value={formData.statusPagamento}
                onValueChange={(v) => setFormData({ ...formData, statusPagamento: v })}
              >
                <SelectTrigger id="statusPagamento">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {statusPagamentoOptions.map((opt) => (
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
        title="Editar Título a Pagar"
      >
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="dataDocumento-edit">Data do Documento</Label>
              <Input
                id="dataDocumento-edit"
                type="date"
                value={formData.dataDocumento}
                onChange={(e) => setFormData({ ...formData, dataDocumento: e.target.value })}
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
              <Label htmlFor="projeto-edit">Projeto</Label>
              <Select value={formData.projeto} onValueChange={(v) => setFormData({ ...formData, projeto: v })}>
                <SelectTrigger id="projeto-edit">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {projetosOptions.map((opt) => (
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
              <Label htmlFor="conta-edit">Conta</Label>
              <Select value={formData.conta} onValueChange={(v) => setFormData({ ...formData, conta: v })}>
                <SelectTrigger id="conta-edit">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {contasOptions.map((opt) => (
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

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="fornecedor-edit">Fornecedor</Label>
              <Select value={formData.fornecedor} onValueChange={(v) => setFormData({ ...formData, fornecedor: v })}>
                <SelectTrigger id="fornecedor-edit">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {fornecedoresOptions.map((opt) => (
                    <SelectItem key={opt.value} value={opt.value}>
                      {opt.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="descricao-edit">Descrição</Label>
              <Input
                id="descricao-edit"
                value={formData.descricao}
                onChange={(e) => setFormData({ ...formData, descricao: e.target.value })}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="banco-edit">Pago pelo Banco</Label>
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
              <Label htmlFor="pagamento-edit">Pagamento</Label>
              <Input
                id="pagamento-edit"
                type="date"
                value={formData.pagamento}
                onChange={(e) => setFormData({ ...formData, pagamento: e.target.value })}
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
              <Label htmlFor="statusPagamento-edit">Status do Pagamento</Label>
              <Select
                value={formData.statusPagamento}
                onValueChange={(v) => setFormData({ ...formData, statusPagamento: v })}
              >
                <SelectTrigger id="statusPagamento-edit">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {statusPagamentoOptions.map((opt) => (
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
        title="Deletar Título a Pagar"
        description={`Tem certeza que deseja deletar o título a pagar para ${editingItem?.fornecedor}?`}
        onConfirm={handleDelete}
        variant="destructive"
      />
    </Card>
  )
}
