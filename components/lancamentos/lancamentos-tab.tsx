"use client"

import { useState } from "react"
import { useCadastros } from "@/lib/cadastros-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Trash2, Edit2, Plus } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import type { IncomeType, IncomeSubcategory, ExpenseType, ExpenseSubcategory, Client, Supplier, Project, PaymentMethod } from "@/lib/cadastros-context"

// Registros de receita e gasto
interface IncomeRecord {
  id: string
  incomeTypeId: string
  incomeSubcategoryId: string
  description: string
  amount: number
  date: string
  clientId?: string
  projectId?: string
  paymentMethodId?: string
}

interface ExpenseRecord {
  id: string
  expenseTypeId: string
  expenseSubcategoryId: string
  description: string
  amount: number
  date: string
  supplierId?: string
  projectId?: string
  paymentMethodId?: string
}


export function LancamentosTab() {
  const { incomeTypes, expenseTypes, clients, suppliers, projects, paymentMethods } = useCadastros()
  const [incomeRecords, setIncomeRecords] = useState<IncomeRecord[]>([
    {
      id: "ir1",
      incomeTypeId: "1",
      incomeSubcategoryId: "1-1",
      description: "Venda de Ventilador",
      amount: 5000,
      date: "2026-01-15",
      clientId: "c1",
      projectId: "p1",
      paymentMethodId: "pm1",
    },
  ])

  const [expenseRecords, setExpenseRecords] = useState<ExpenseRecord[]>([
    {
      id: "er1",
      expenseTypeId: "1",
      expenseSubcategoryId: "1-1",
      description: "Compra de Matéria Prima",
      amount: 2500,
      date: "2026-01-16",
      supplierId: "s1",
      projectId: "p1",
      paymentMethodId: "pm2",
    },
  ])

  const [incomeDialogOpen, setIncomeDialogOpen] = useState(false)
  const [expenseDialogOpen, setExpenseDialogOpen] = useState(false)
  const [editingIncomeId, setEditingIncomeId] = useState<string | null>(null)
  const [editingExpenseId, setEditingExpenseId] = useState<string | null>(null)

  const [incomeForm, setIncomeForm] = useState<Partial<IncomeRecord>>({
    incomeTypeId: "",
    incomeSubcategoryId: "",
    description: "",
    amount: 0,
    date: new Date().toISOString().split("T")[0],
  })

  const [expenseForm, setExpenseForm] = useState<Partial<ExpenseRecord>>({
    expenseTypeId: "",
    expenseSubcategoryId: "",
    description: "",
    amount: 0,
    date: new Date().toISOString().split("T")[0],
  })

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value)
  }

  const getIncomeTypeName = (id: string) => {
    return incomeTypes.find((t) => t.id === id)?.name || "-"
  }

  const getIncomeSubcategoryName = (typeId: string, subcategoryId: string) => {
    const type = incomeTypes.find((t) => t.id === typeId)
    return type?.subcategories.find((s) => s.id === subcategoryId)?.name || "-"
  }

  const getExpenseTypeName = (id: string) => {
    return expenseTypes.find((t) => t.id === id)?.name || "-"
  }

  const getExpenseSubcategoryName = (typeId: string, subcategoryId: string) => {
    const type = expenseTypes.find((t) => t.id === typeId)
    return type?.subcategories.find((s) => s.id === subcategoryId)?.name || "-"
  }

  const getClientName = (id?: string) => {
    if (!id) return "-"
    return clients.find((c) => c.id === id)?.name || "-"
  }

  const getSupplierName = (id?: string) => {
    if (!id) return "-"
    return suppliers.find((s) => s.id === id)?.name || "-"
  }

  const getProjectName = (id?: string) => {
    if (!id) return "-"
    return projects.find((p) => p.id === id)?.name || "-"
  }

  const getPaymentMethodName = (id?: string) => {
    if (!id) return "-"
    return paymentMethods.find((pm) => pm.id === id)?.name || "-"
  }

  const getIncomeSubcategoriesByType = (typeId: string) => {
    const type = incomeTypes.find((t) => t.id === typeId)
    return type?.subcategories || []
  }

  const getExpenseSubcategoriesByType = (typeId: string) => {
    const type = expenseTypes.find((t) => t.id === typeId)
    return type?.subcategories || []
  }

  // Funções para Lançamentos de Receita
  const handleAddIncome = () => {
    if (!incomeForm.incomeTypeId?.trim() || !incomeForm.incomeSubcategoryId?.trim() || !incomeForm.description?.trim() || !incomeForm.date) {
      alert("Categoria, subcategoria, descrição e data são obrigatórios")
      return
    }

    if (editingIncomeId) {
      setIncomeRecords(
        incomeRecords.map((rec) =>
          rec.id === editingIncomeId ? { ...rec, ...incomeForm } : rec,
        ) as IncomeRecord[],
      )
      setEditingIncomeId(null)
    } else {
      const newRecord: IncomeRecord = {
        ...incomeForm,
        id: Math.random().toString(36).substr(2, 9),
      } as IncomeRecord
      setIncomeRecords([...incomeRecords, newRecord])
    }

    setIncomeForm({
      incomeTypeId: "",
      incomeSubcategoryId: "",
      description: "",
      amount: 0,
      date: new Date().toISOString().split("T")[0],
    })
    setIncomeDialogOpen(false)
  }

  const handleEditIncome = (record: IncomeRecord) => {
    setEditingIncomeId(record.id)
    setIncomeForm(record)
    setIncomeDialogOpen(true)
  }

  const handleDeleteIncome = (id: string) => {
    setIncomeRecords(incomeRecords.filter((rec) => rec.id !== id))
  }

  // Funções para Lançamentos de Gasto
  const handleAddExpense = () => {
    if (!expenseForm.expenseTypeId?.trim() || !expenseForm.expenseSubcategoryId?.trim() || !expenseForm.description?.trim() || !expenseForm.date) {
      alert("Categoria, subcategoria, descrição e data são obrigatórios")
      return
    }

    if (editingExpenseId) {
      setExpenseRecords(
        expenseRecords.map((rec) =>
          rec.id === editingExpenseId ? { ...rec, ...expenseForm } : rec,
        ) as ExpenseRecord[],
      )
      setEditingExpenseId(null)
    } else {
      const newRecord: ExpenseRecord = {
        ...expenseForm,
        id: Math.random().toString(36).substr(2, 9),
      } as ExpenseRecord
      setExpenseRecords([...expenseRecords, newRecord])
    }

    setExpenseForm({
      expenseTypeId: "",
      expenseSubcategoryId: "",
      description: "",
      amount: 0,
      date: new Date().toISOString().split("T")[0],
    })
    setExpenseDialogOpen(false)
  }

  const handleEditExpense = (record: ExpenseRecord) => {
    setEditingExpenseId(record.id)
    setExpenseForm(record)
    setExpenseDialogOpen(true)
  }

  const handleDeleteExpense = (id: string) => {
    setExpenseRecords(expenseRecords.filter((rec) => rec.id !== id))
  }

  const handleIncomeDialogOpenChange = (open: boolean) => {
    if (!open) {
      setEditingIncomeId(null)
      setIncomeForm({
        incomeTypeId: "",
        incomeSubcategoryId: "",
        description: "",
        amount: 0,
        date: new Date().toISOString().split("T")[0],
      })
    }
    setIncomeDialogOpen(open)
  }

  const handleExpenseDialogOpenChange = (open: boolean) => {
    if (!open) {
      setEditingExpenseId(null)
      setExpenseForm({
        expenseTypeId: "",
        expenseSubcategoryId: "",
        description: "",
        amount: 0,
        date: new Date().toISOString().split("T")[0],
      })
    }
    setExpenseDialogOpen(open)
  }

  return (
    <div className="space-y-6">
      <Tabs defaultValue="income" className="w-full">
        <TabsList>
          <TabsTrigger value="income">Lançamentos de Receita</TabsTrigger>
          <TabsTrigger value="expense">Lançamentos de Gasto</TabsTrigger>
        </TabsList>

        {/* Lançamentos de Receita */}
        <TabsContent value="income" className="mt-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Lançamentos de Receita</CardTitle>
                  <CardDescription>
                    Registre receitas vinculadas aos tipos de receita cadastrados
                  </CardDescription>
                </div>
                <Dialog open={incomeDialogOpen} onOpenChange={handleIncomeDialogOpenChange}>
                  <DialogTrigger asChild>
                    <Button className="gap-2">
                      <Plus className="h-4 w-4" />
                      Novo Lançamento
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle>
                        {editingIncomeId ? "Editar Lançamento" : "Novo Lançamento de Receita"}
                      </DialogTitle>
                      <DialogDescription>
                        {editingIncomeId
                          ? "Atualize o lançamento abaixo"
                          : "Registre uma nova receita"}
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="income-type">Categoria *</Label>
                        <Select
                          value={incomeForm.incomeTypeId || ""}
                          onValueChange={(value) =>
                            setIncomeForm({
                              ...incomeForm,
                              incomeTypeId: value,
                              incomeSubcategoryId: "", // reset subcategory when type changes
                            })
                          }
                        >
                          <SelectTrigger id="income-type">
                            <SelectValue placeholder="Selecione uma categoria" />
                          </SelectTrigger>
                          <SelectContent>
                            {incomeTypes.map((type) => (
                              <SelectItem key={type.id} value={type.id}>
                                {type.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      {incomeForm.incomeTypeId && (
                        <div>
                          <Label htmlFor="income-subcategory">Subcategoria *</Label>
                          <Select
                            value={incomeForm.incomeSubcategoryId || ""}
                            onValueChange={(value) =>
                              setIncomeForm({
                                ...incomeForm,
                                incomeSubcategoryId: value,
                              })
                            }
                          >
                            <SelectTrigger id="income-subcategory">
                              <SelectValue placeholder="Selecione uma subcategoria" />
                            </SelectTrigger>
                            <SelectContent>
                              {getIncomeSubcategoriesByType(incomeForm.incomeTypeId).map((sub) => (
                                <SelectItem key={sub.id} value={sub.id}>
                                  {sub.name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      )}

                      <div>
                        <Label htmlFor="income-description">Descrição *</Label>
                        <Input
                          id="income-description"
                          value={incomeForm.description || ""}
                          onChange={(e) =>
                            setIncomeForm({ ...incomeForm, description: e.target.value })
                          }
                          placeholder="Descrição da receita"
                        />
                      </div>

                      <div>
                        <Label htmlFor="income-amount">Valor *</Label>
                        <Input
                          id="income-amount"
                          type="number"
                          step="0.01"
                          value={incomeForm.amount || ""}
                          onChange={(e) =>
                            setIncomeForm({
                              ...incomeForm,
                              amount: parseFloat(e.target.value) || 0,
                            })
                          }
                          placeholder="0.00"
                        />
                      </div>

                      <div>
                        <Label htmlFor="income-date">Data *</Label>
                        <Input
                          id="income-date"
                          type="date"
                          value={incomeForm.date || ""}
                          onChange={(e) =>
                            setIncomeForm({ ...incomeForm, date: e.target.value })
                          }
                        />
                      </div>

                      <div>
                        <Label htmlFor="income-client">Cliente</Label>
                        <Select
                          value={incomeForm.clientId || ""}
                          onValueChange={(value) =>
                            setIncomeForm({
                              ...incomeForm,
                              clientId: value || undefined,
                            })
                          }
                        >
                          <SelectTrigger id="income-client">
                            <SelectValue placeholder="Selecione um cliente" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="">Nenhum</SelectItem>
                            {clients.map((client) => (
                              <SelectItem key={client.id} value={client.id}>
                                {client.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label htmlFor="income-project">Projeto</Label>
                        <Select
                          value={incomeForm.projectId || ""}
                          onValueChange={(value) =>
                            setIncomeForm({
                              ...incomeForm,
                              projectId: value || undefined,
                            })
                          }
                        >
                          <SelectTrigger id="income-project">
                            <SelectValue placeholder="Selecione um projeto" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="">Nenhum</SelectItem>
                            {projects.map((project) => (
                              <SelectItem key={project.id} value={project.id}>
                                {project.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label htmlFor="income-payment">Forma de Pagamento</Label>
                        <Select
                          value={incomeForm.paymentMethodId || ""}
                          onValueChange={(value) =>
                            setIncomeForm({
                              ...incomeForm,
                              paymentMethodId: value || undefined,
                            })
                          }
                        >
                          <SelectTrigger id="income-payment">
                            <SelectValue placeholder="Selecione uma forma de pagamento" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="">Nenhuma</SelectItem>
                            {paymentMethods.map((method) => (
                              <SelectItem key={method.id} value={method.id}>
                                {method.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="flex gap-2 justify-end">
                        <Button
                          variant="outline"
                          onClick={() => handleIncomeDialogOpenChange(false)}
                        >
                          Cancelar
                        </Button>
                        <Button onClick={handleAddIncome}>
                          {editingIncomeId ? "Atualizar" : "Adicionar"}
                        </Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Data</TableHead>
                      <TableHead>Categoria</TableHead>
                      <TableHead>Subcategoria</TableHead>
                      <TableHead>Descrição</TableHead>
                      <TableHead>Cliente</TableHead>
                      <TableHead className="text-right">Valor</TableHead>
                      <TableHead className="w-24 text-right">Ações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {incomeRecords.length > 0 ? (
                      incomeRecords.map((record) => (
                        <TableRow key={record.id}>
                          <TableCell>
                            {new Date(record.date).toLocaleDateString("pt-BR")}
                          </TableCell>
                          <TableCell>
                            {getIncomeTypeName(record.incomeTypeId)}
                          </TableCell>
                          <TableCell>
                            {getIncomeSubcategoryName(record.incomeTypeId, record.incomeSubcategoryId)}
                          </TableCell>
                          <TableCell>{record.description}</TableCell>
                          <TableCell>{getClientName(record.clientId)}</TableCell>
                          <TableCell className="text-right font-medium">
                            {formatCurrency(record.amount)}
                          </TableCell>
                          <TableCell className="text-right space-x-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleEditIncome(record)}
                            >
                              <Edit2 className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleDeleteIncome(record.id)}
                              className="text-destructive hover:text-destructive"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell
                          colSpan={7}
                          className="text-center text-muted-foreground py-6"
                        >
                          Nenhum lançamento de receita registrado
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Lançamentos de Gasto */}
        <TabsContent value="expense" className="mt-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Lançamentos de Gasto</CardTitle>
                  <CardDescription>
                    Registre gastos vinculados aos tipos de gasto cadastrados
                  </CardDescription>
                </div>
                <Dialog open={expenseDialogOpen} onOpenChange={handleExpenseDialogOpenChange}>
                  <DialogTrigger asChild>
                    <Button className="gap-2">
                      <Plus className="h-4 w-4" />
                      Novo Lançamento
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle>
                        {editingExpenseId ? "Editar Lançamento" : "Novo Lançamento de Gasto"}
                      </DialogTitle>
                      <DialogDescription>
                        {editingExpenseId
                          ? "Atualize o lançamento abaixo"
                          : "Registre um novo gasto"}
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="expense-type">Categoria *</Label>
                        <Select
                          value={expenseForm.expenseTypeId || ""}
                          onValueChange={(value) =>
                            setExpenseForm({
                              ...expenseForm,
                              expenseTypeId: value,
                              expenseSubcategoryId: "", // reset subcategory when type changes
                            })
                          }
                        >
                          <SelectTrigger id="expense-type">
                            <SelectValue placeholder="Selecione uma categoria" />
                          </SelectTrigger>
                          <SelectContent>
                            {expenseTypes.map((type) => (
                              <SelectItem key={type.id} value={type.id}>
                                {type.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      {expenseForm.expenseTypeId && (
                        <div>
                          <Label htmlFor="expense-subcategory">Subcategoria *</Label>
                          <Select
                            value={expenseForm.expenseSubcategoryId || ""}
                            onValueChange={(value) =>
                              setExpenseForm({
                                ...expenseForm,
                                expenseSubcategoryId: value,
                              })
                            }
                          >
                            <SelectTrigger id="expense-subcategory">
                              <SelectValue placeholder="Selecione uma subcategoria" />
                            </SelectTrigger>
                            <SelectContent>
                              {getExpenseSubcategoriesByType(expenseForm.expenseTypeId).map((sub) => (
                                <SelectItem key={sub.id} value={sub.id}>
                                  {sub.name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      )}

                      <div>
                        <Label htmlFor="expense-description">Descrição *</Label>
                        <Input
                          id="expense-description"
                          value={expenseForm.description || ""}
                          onChange={(e) =>
                            setExpenseForm({ ...expenseForm, description: e.target.value })
                          }
                          placeholder="Descrição do gasto"
                        />
                      </div>

                      <div>
                        <Label htmlFor="expense-amount">Valor *</Label>
                        <Input
                          id="expense-amount"
                          type="number"
                          step="0.01"
                          value={expenseForm.amount || ""}
                          onChange={(e) =>
                            setExpenseForm({
                              ...expenseForm,
                              amount: parseFloat(e.target.value) || 0,
                            })
                          }
                          placeholder="0.00"
                        />
                      </div>

                      <div>
                        <Label htmlFor="expense-date">Data *</Label>
                        <Input
                          id="expense-date"
                          type="date"
                          value={expenseForm.date || ""}
                          onChange={(e) =>
                            setExpenseForm({ ...expenseForm, date: e.target.value })
                          }
                        />
                      </div>

                      <div>
                        <Label htmlFor="expense-supplier">Fornecedor</Label>
                        <Select
                          value={expenseForm.supplierId || ""}
                          onValueChange={(value) =>
                            setExpenseForm({
                              ...expenseForm,
                              supplierId: value || undefined,
                            })
                          }
                        >
                          <SelectTrigger id="expense-supplier">
                            <SelectValue placeholder="Selecione um fornecedor" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="">Nenhum</SelectItem>
                            {suppliers.map((supplier) => (
                              <SelectItem key={supplier.id} value={supplier.id}>
                                {supplier.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label htmlFor="expense-project">Projeto</Label>
                        <Select
                          value={expenseForm.projectId || ""}
                          onValueChange={(value) =>
                            setExpenseForm({
                              ...expenseForm,
                              projectId: value || undefined,
                            })
                          }
                        >
                          <SelectTrigger id="expense-project">
                            <SelectValue placeholder="Selecione um projeto" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="">Nenhum</SelectItem>
                            {projects.map((project) => (
                              <SelectItem key={project.id} value={project.id}>
                                {project.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label htmlFor="expense-payment">Forma de Pagamento</Label>
                        <Select
                          value={expenseForm.paymentMethodId || ""}
                          onValueChange={(value) =>
                            setExpenseForm({
                              ...expenseForm,
                              paymentMethodId: value || undefined,
                            })
                          }
                        >
                          <SelectTrigger id="expense-payment">
                            <SelectValue placeholder="Selecione uma forma de pagamento" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="">Nenhuma</SelectItem>
                            {paymentMethods.map((method) => (
                              <SelectItem key={method.id} value={method.id}>
                                {method.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="flex gap-2 justify-end">
                        <Button
                          variant="outline"
                          onClick={() => handleExpenseDialogOpenChange(false)}
                        >
                          Cancelar
                        </Button>
                        <Button onClick={handleAddExpense}>
                          {editingExpenseId ? "Atualizar" : "Adicionar"}
                        </Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Data</TableHead>
                      <TableHead>Categoria</TableHead>
                      <TableHead>Subcategoria</TableHead>
                      <TableHead>Descrição</TableHead>
                      <TableHead>Fornecedor</TableHead>
                      <TableHead className="text-right">Valor</TableHead>
                      <TableHead className="w-24 text-right">Ações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {expenseRecords.length > 0 ? (
                      expenseRecords.map((record) => (
                        <TableRow key={record.id}>
                          <TableCell>
                            {new Date(record.date).toLocaleDateString("pt-BR")}
                          </TableCell>
                          <TableCell>
                            {getExpenseTypeName(record.expenseTypeId)}
                          </TableCell>
                          <TableCell>
                            {getExpenseSubcategoryName(record.expenseTypeId, record.expenseSubcategoryId)}
                          </TableCell>
                          <TableCell>{record.description}</TableCell>
                          <TableCell>
                            {getSupplierName(record.supplierId)}
                          </TableCell>
                          <TableCell className="text-right font-medium">
                            {formatCurrency(record.amount)}
                          </TableCell>
                          <TableCell className="text-right space-x-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleEditExpense(record)}
                            >
                              <Edit2 className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleDeleteExpense(record.id)}
                              className="text-destructive hover:text-destructive"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell
                          colSpan={7}
                          className="text-center text-muted-foreground py-6"
                        >
                          Nenhum lançamento de gasto registrado
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
