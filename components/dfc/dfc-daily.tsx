"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowDownRight, ArrowUpRight } from "lucide-react"
import { useState, useMemo } from "react"

interface DailyTransaction {
  id: string
  date: string
  description: string
  amount: number
  category: string
  subcategory?: string
  paymentMethod?: string
  reference?: string // Cliente, fornecedor, projeto, etc.
}

interface DailyFlowData {
  date: string
  income: DailyTransaction[]
  expenses: DailyTransaction[]
}

export function DFCDaily() {
  // Mock data - em produção, virá do contexto de cadastros
  // Aqui estão os lançamentos feitos na tela de Lançamentos
  const [dailyData] = useState<DailyFlowData[]>([
    {
      date: "2026-02-02",
      income: [
        { 
          id: "i1", 
          date: "2026-02-02", 
          description: "Venda de Ventilador", 
          amount: 5000, 
          category: "Vendas de Produtos",
          subcategory: "Produtos",
          paymentMethod: "Dinheiro",
          reference: "Cliente ABC"
        },
        { 
          id: "i2", 
          date: "2026-02-02", 
          description: "Serviço de Consultoria", 
          amount: 3500, 
          category: "Prestação de Serviços",
          subcategory: "Consultoria",
          paymentMethod: "Transferência",
          reference: "Cliente XYZ"
        },
        { 
          id: "i3", 
          date: "2026-02-02", 
          description: "Juros Recebidos", 
          amount: 250, 
          category: "Receitas Financeiras",
          subcategory: "Juros",
          paymentMethod: "Transferência",
          reference: "Banco"
        },
      ],
      expenses: [
        { 
          id: "e1", 
          date: "2026-02-02", 
          description: "Compra de Matéria Prima", 
          amount: 2500, 
          category: "Fornecedores",
          subcategory: "Matéria Prima",
          paymentMethod: "Cheque",
          reference: "Fornecedor A"
        },
        { 
          id: "e2", 
          date: "2026-02-02", 
          description: "Pagamento de Aluguel", 
          amount: 5000, 
          category: "Aluguel",
          subcategory: "Aluguel Escritório",
          paymentMethod: "Transferência",
          reference: "Imobiliária XYZ"
        },
        { 
          id: "e3", 
          date: "2026-02-02", 
          description: "Utilidades (Água, Luz, Internet)", 
          amount: 800, 
          category: "Utilidades",
          subcategory: "Água e Luz",
          paymentMethod: "Débito Automático",
          reference: "Concessionárias"
        },
      ],
    },
    {
      date: "2026-02-01",
      income: [
        { 
          id: "i4", 
          date: "2026-02-01", 
          description: "Venda de Produtos - Lote Grande", 
          amount: 8000, 
          category: "Vendas de Produtos",
          subcategory: "Produtos",
          paymentMethod: "Transferência",
          reference: "Cliente DEF"
        },
        { 
          id: "i5", 
          date: "2026-02-01", 
          description: "Serviço de Manutenção", 
          amount: 2000, 
          category: "Prestação de Serviços",
          subcategory: "Manutenção",
          paymentMethod: "Dinheiro",
          reference: "Cliente GHI"
        },
      ],
      expenses: [
        { 
          id: "e4", 
          date: "2026-02-01", 
          description: "Pagamento de Folha", 
          amount: 25000, 
          category: "Folha de Pagamento",
          subcategory: "Salários",
          paymentMethod: "Transferência",
          reference: "Funcionários"
        },
        { 
          id: "e5", 
          date: "2026-02-01", 
          description: "Compra de Matéria Prima", 
          amount: 4000, 
          category: "Fornecedores",
          subcategory: "Matéria Prima",
          paymentMethod: "Transferência",
          reference: "Fornecedor B"
        },
      ],
    },
    {
      date: "2026-01-31",
      income: [
        { 
          id: "i6", 
          date: "2026-01-31", 
          description: "Venda de Equipamento - Descontinuado", 
          amount: 12000, 
          category: "Vendas de Produtos",
          subcategory: "Equipamentos",
          paymentMethod: "Transferência",
          reference: "Cliente JKL"
        },
      ],
      expenses: [
        { 
          id: "e6", 
          date: "2026-01-31", 
          description: "Investimento em Máquina Nova", 
          amount: 8000, 
          category: "Investimentos",
          subcategory: "Imobilizado",
          paymentMethod: "Transferência",
          reference: "Fornecedor Equipamentos"
        },
      ],
    },
  ])

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value)
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit", year: "numeric" })
  }

  const calculateDailyTotals = (day: DailyFlowData) => {
    const totalIncome = day.income.reduce((sum, t) => sum + t.amount, 0)
    const totalExpenses = day.expenses.reduce((sum, t) => sum + t.amount, 0)
    const balance = totalIncome - totalExpenses
    return { totalIncome, totalExpenses, balance }
  }

  const getWeekdayName = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("pt-BR", { weekday: "long" })
  }

  // Calcular totalizadores
  const totals = useMemo(() => {
    const totalIncome = dailyData.reduce((sum, day) => sum + day.income.reduce((s, t) => s + t.amount, 0), 0)
    const totalExpenses = dailyData.reduce((sum, day) => sum + day.expenses.reduce((s, t) => s + t.amount, 0), 0)
    return {
      income: totalIncome,
      expenses: totalExpenses,
      balance: totalIncome - totalExpenses
    }
  }, [dailyData])

  return (
    <Card className="bg-card border-border">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-foreground">Fluxo de Caixa Diário</CardTitle>
          <div className="flex gap-6 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-green-600 dark:bg-green-500"></div>
              <span className="text-muted-foreground">Receitas: {formatCurrency(totals.income)}</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-red-600 dark:bg-red-500"></div>
              <span className="text-muted-foreground">Despesas: {formatCurrency(totals.expenses)}</span>
            </div>
            <div className="flex items-center gap-2">
              <div className={`w-3 h-3 rounded-full ${totals.balance >= 0 ? 'bg-green-600 dark:bg-green-500' : 'bg-red-600 dark:bg-red-500'}`}></div>
              <span className={totals.balance >= 0 ? 'text-green-600 dark:text-green-500 font-semibold' : 'text-red-600 dark:text-red-500 font-semibold'}>
                Saldo: {formatCurrency(totals.balance)}
              </span>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="combined" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="combined">Consolidado</TabsTrigger>
            <TabsTrigger value="income">Receitas</TabsTrigger>
            <TabsTrigger value="expenses">Despesas</TabsTrigger>
          </TabsList>

          {/* Visão Consolidada */}
          <TabsContent value="combined" className="space-y-4 mt-4">
            <div className="space-y-4">
              {dailyData.map((day) => {
                const { totalIncome, totalExpenses, balance } = calculateDailyTotals(day)
                const weekday = getWeekdayName(day.date)
                const capitalizedWeekday = weekday.charAt(0).toUpperCase() + weekday.slice(1)
                
                return (
                  <div key={day.date} className="border border-border rounded-lg p-4 hover:bg-accent/50 transition-colors">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h3 className="font-semibold text-foreground">{formatDate(day.date)}</h3>
                        <p className="text-xs text-muted-foreground">{capitalizedWeekday}</p>
                      </div>
                      <span className={`text-lg font-bold ${balance >= 0 ? "text-green-600 dark:text-green-500" : "text-red-600 dark:text-red-500"}`}>
                        {formatCurrency(balance)}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* Receitas */}
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-sm text-green-600 dark:text-green-500 font-medium">
                          <ArrowUpRight className="w-4 h-4" />
                          Receitas
                        </div>
                        <div className="space-y-1 pl-6">
                          {day.income.length > 0 ? (
                            <>
                              {day.income.map((transaction) => (
                                <div key={transaction.id} className="flex justify-between text-xs">
                                  <span className="text-muted-foreground flex-1 truncate">{transaction.description}</span>
                                  <span className="text-green-600 dark:text-green-500 font-medium ml-2 shrink-0">{formatCurrency(transaction.amount)}</span>
                                </div>
                              ))}
                              <div className="flex justify-between text-sm font-semibold text-foreground border-t border-border pt-2 mt-2">
                                <span>Subtotal</span>
                                <span className="text-green-600 dark:text-green-500">{formatCurrency(totalIncome)}</span>
                              </div>
                            </>
                          ) : (
                            <p className="text-xs text-muted-foreground italic">Nenhuma receita</p>
                          )}
                        </div>
                      </div>

                      {/* Despesas */}
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-sm text-red-600 dark:text-red-500 font-medium">
                          <ArrowDownRight className="w-4 h-4" />
                          Despesas
                        </div>
                        <div className="space-y-1 pl-6">
                          {day.expenses.length > 0 ? (
                            <>
                              {day.expenses.map((transaction) => (
                                <div key={transaction.id} className="flex justify-between text-xs">
                                  <span className="text-muted-foreground flex-1 truncate">{transaction.description}</span>
                                  <span className="text-red-600 dark:text-red-500 font-medium ml-2 shrink-0">{formatCurrency(transaction.amount)}</span>
                                </div>
                              ))}
                              <div className="flex justify-between text-sm font-semibold text-foreground border-t border-border pt-2 mt-2">
                                <span>Subtotal</span>
                                <span className="text-red-600 dark:text-red-500">{formatCurrency(totalExpenses)}</span>
                              </div>
                            </>
                          ) : (
                            <p className="text-xs text-muted-foreground italic">Nenhuma despesa</p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </TabsContent>

          {/* Visão de Receitas */}
          <TabsContent value="income" className="space-y-4 mt-4">
            <div className="space-y-4">
              {dailyData.map((day) => {
                const totalIncome = day.income.reduce((sum, t) => sum + t.amount, 0)
                const weekday = getWeekdayName(day.date)
                const capitalizedWeekday = weekday.charAt(0).toUpperCase() + weekday.slice(1)
                
                return day.income.length > 0 ? (
                  <div key={day.date} className="border border-border rounded-lg p-4 hover:bg-accent/50 transition-colors">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h3 className="font-semibold text-foreground">{formatDate(day.date)}</h3>
                        <p className="text-xs text-muted-foreground">{capitalizedWeekday}</p>
                      </div>
                      <span className="text-lg font-bold text-green-600 dark:text-green-500">{formatCurrency(totalIncome)}</span>
                    </div>
                    <div className="space-y-2">
                      {day.income.map((transaction) => (
                        <div key={transaction.id} className="flex items-center justify-between p-3 bg-green-50 dark:bg-green-950/20 rounded border border-green-200 dark:border-green-800/30">
                          <div className="flex-1">
                            <p className="text-sm font-medium text-foreground">{transaction.description}</p>
                            <p className="text-xs text-muted-foreground">
                              {transaction.category}
                              {transaction.subcategory && ` • ${transaction.subcategory}`}
                              {transaction.paymentMethod && ` • ${transaction.paymentMethod}`}
                            </p>
                            {transaction.reference && <p className="text-xs text-muted-foreground mt-1">Ref: {transaction.reference}</p>}
                          </div>
                          <span className="ml-4 font-semibold text-green-600 dark:text-green-500 shrink-0">{formatCurrency(transaction.amount)}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : null
              })}
            </div>
          </TabsContent>

          {/* Visão de Despesas */}
          <TabsContent value="expenses" className="space-y-4 mt-4">
            <div className="space-y-4">
              {dailyData.map((day) => {
                const totalExpenses = day.expenses.reduce((sum, t) => sum + t.amount, 0)
                const weekday = getWeekdayName(day.date)
                const capitalizedWeekday = weekday.charAt(0).toUpperCase() + weekday.slice(1)
                
                return day.expenses.length > 0 ? (
                  <div key={day.date} className="border border-border rounded-lg p-4 hover:bg-accent/50 transition-colors">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h3 className="font-semibold text-foreground">{formatDate(day.date)}</h3>
                        <p className="text-xs text-muted-foreground">{capitalizedWeekday}</p>
                      </div>
                      <span className="text-lg font-bold text-red-600 dark:text-red-500">{formatCurrency(totalExpenses)}</span>
                    </div>
                    <div className="space-y-2">
                      {day.expenses.map((transaction) => (
                        <div key={transaction.id} className="flex items-center justify-between p-3 bg-red-50 dark:bg-red-950/20 rounded border border-red-200 dark:border-red-800/30">
                          <div className="flex-1">
                            <p className="text-sm font-medium text-foreground">{transaction.description}</p>
                            <p className="text-xs text-muted-foreground">
                              {transaction.category}
                              {transaction.subcategory && ` • ${transaction.subcategory}`}
                              {transaction.paymentMethod && ` • ${transaction.paymentMethod}`}
                            </p>
                            {transaction.reference && <p className="text-xs text-muted-foreground mt-1">Ref: {transaction.reference}</p>}
                          </div>
                          <span className="ml-4 font-semibold text-red-600 dark:text-red-500 shrink-0">{formatCurrency(transaction.amount)}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : null
              })}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
