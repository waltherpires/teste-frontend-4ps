"use client"

import React, { createContext, useContext, useState } from "react"

// ==================== Tipos ====================

export interface IncomeSubcategory {
  id: string
  name: string
}

export interface IncomeType {
  id: string
  name: string
  isDefault: boolean
  subcategories: IncomeSubcategory[]
}

export interface ExpenseSubcategory {
  id: string
  name: string
}

export interface ExpenseType {
  id: string
  name: string
  isDefault: boolean
  subcategories: ExpenseSubcategory[]
}

export interface Client {
  id: string
  name: string
  address?: string
  city?: string
  state?: string
  phone?: string
  email?: string
  contactName?: string
  type: "pf" | "pj"
  cpfCnpj?: string
}

export interface Supplier {
  id: string
  name: string
  address?: string
  city?: string
  state?: string
  phone?: string
  email?: string
  contactName?: string
  type: "pf" | "pj"
  cpfCnpj?: string
}

export interface Project {
  id: string
  name: string
  consolidated: boolean
}

export interface PaymentMethod {
  id: string
  name: string
  isDefault?: boolean
}

// ==================== Context Type ====================

interface CadastrosContextType {
  // Income Types
  incomeTypes: IncomeType[]
  addIncomeType: (type: IncomeType) => void
  updateIncomeType: (id: string, name: string) => void
  deleteIncomeType: (id: string) => void
  addIncomeSubcategory: (typeId: string, subcategory: IncomeSubcategory) => void
  updateIncomeSubcategory: (typeId: string, subId: string, name: string) => void
  deleteIncomeSubcategory: (typeId: string, subId: string) => void

  // Expense Types
  expenseTypes: ExpenseType[]
  addExpenseType: (type: ExpenseType) => void
  updateExpenseType: (id: string, name: string) => void
  deleteExpenseType: (id: string) => void
  addExpenseSubcategory: (typeId: string, subcategory: ExpenseSubcategory) => void
  updateExpenseSubcategory: (typeId: string, subId: string, name: string) => void
  deleteExpenseSubcategory: (typeId: string, subId: string) => void

  // Clients
  clients: Client[]
  addClient: (client: Omit<Client, 'id'>) => void
  updateClient: (id: string, client: Omit<Client, 'id'>) => void
  deleteClient: (id: string) => void

  // Suppliers
  suppliers: Supplier[]
  addSupplier: (supplier: Omit<Supplier, 'id'>) => void
  updateSupplier: (id: string, supplier: Omit<Supplier, 'id'>) => void
  deleteSupplier: (id: string) => void

  // Projects
  projects: Project[]
  addProject: (project: Project) => void
  updateProject: (id: string, project: Partial<Project>) => void
  deleteProject: (id: string) => void

  // Payment Methods
  paymentMethods: PaymentMethod[]
  addPaymentMethod: (name: string) => void
  updatePaymentMethod: (id: string, name: string) => void
  deletePaymentMethod: (id: string) => void
}

// ==================== Default Values ====================

const DEFAULT_INCOME_TYPES: IncomeType[] = [
  {
    id: "1",
    name: "Receita com Produtos",
    isDefault: true,
    subcategories: [
      { id: "1-1", name: "Ventilador" },
      { id: "1-2", name: "Ar-condicionado" },
      { id: "1-3", name: "Notebook" },
    ],
  },
  {
    id: "2",
    name: "Receita com Serviços",
    isDefault: true,
    subcategories: [
      { id: "2-1", name: "Serviço de Instalação" },
      { id: "2-2", name: "Consultoria" },
    ],
  },
  {
    id: "3",
    name: "Receitas Financeiras",
    isDefault: true,
    subcategories: [
      { id: "3-1", name: "Juros" },
      { id: "3-2", name: "Rendimentos" },
    ],
  },
  {
    id: "4",
    name: "Outras Receitas",
    isDefault: true,
    subcategories: [{ id: "4-1", name: "Receitas Diversas" }],
  },
]

const DEFAULT_EXPENSE_TYPES: ExpenseType[] = [
  {
    id: "1",
    name: "Custos Variáveis",
    isDefault: true,
    subcategories: [
      { id: "1-1", name: "Matéria-prima" },
      { id: "1-2", name: "Embalagem" },
      { id: "1-3", name: "Combustível de Produção" },
    ],
  },
  {
    id: "2",
    name: "Despesas em Ocupação",
    isDefault: true,
    subcategories: [
      { id: "2-1", name: "Aluguel" },
      { id: "2-2", name: "Energia Elétrica" },
      { id: "2-3", name: "Material de Limpeza" },
    ],
  },
  {
    id: "3",
    name: "Despesas com Serviços",
    isDefault: true,
    subcategories: [
      { id: "3-1", name: "Manutenção" },
      { id: "3-2", name: "Limpeza" },
    ],
  },
  {
    id: "4",
    name: "Despesas com Pessoal",
    isDefault: true,
    subcategories: [
      { id: "4-1", name: "Salários" },
      { id: "4-2", name: "Encargos Sociais" },
    ],
  },
  {
    id: "5",
    name: "Deduções sobre Vendas",
    isDefault: true,
    subcategories: [{ id: "5-1", name: "Devoluções" }],
  },
  {
    id: "6",
    name: "Impostos Diretos",
    isDefault: true,
    subcategories: [
      { id: "6-1", name: "ICMS" },
      { id: "6-2", name: "IPI" },
    ],
  },
  {
    id: "7",
    name: "Investimentos",
    isDefault: true,
    subcategories: [
      { id: "7-1", name: "Equipamentos" },
      { id: "7-2", name: "Infraestrutura" },
    ],
  },
  {
    id: "8",
    name: "Despesas Financeiras",
    isDefault: true,
    subcategories: [
      { id: "8-1", name: "Juros de Empréstimo" },
      { id: "8-2", name: "Tarifas Bancárias" },
    ],
  },
  {
    id: "9",
    name: "Outras Despesas",
    isDefault: true,
    subcategories: [{ id: "9-1", name: "Despesas Diversas" }],
  },
]

const DEFAULT_CLIENTS: Client[] = [
  {
    id: "c1",
    name: "Cliente ABC",
    type: "pj",
    city: "São Paulo",
    state: "SP",
    email: "contato@clienteabc.com",
  },
  {
    id: "c2",
    name: "Cliente XYZ",
    type: "pf",
    city: "Rio de Janeiro",
    state: "RJ",
    email: "contato@clientexyz.com",
  },
]

const DEFAULT_SUPPLIERS: Supplier[] = [
  {
    id: "s1",
    name: "Fornecedor 01",
    type: "pj",
    city: "São Paulo",
    state: "SP",
    email: "contato@fornecedor01.com",
  },
  {
    id: "s2",
    name: "Fornecedor 02",
    type: "pj",
    city: "Belo Horizonte",
    state: "MG",
    email: "contato@fornecedor02.com",
  },
]

const DEFAULT_PROJECTS: Project[] = [
  { id: "p1", name: "Projeto A", consolidated: false },
  { id: "p2", name: "Projeto B", consolidated: true },
]

const DEFAULT_PAYMENT_METHODS: PaymentMethod[] = [
  { id: "pm1", name: "Boleto", isDefault: true },
  { id: "pm2", name: "Fatura", isDefault: true },
  { id: "pm3", name: "Pix", isDefault: true },
  { id: "pm4", name: "Transferência", isDefault: true },
]

// ==================== Context Creation ====================

const CadastrosContext = createContext<CadastrosContextType | undefined>(undefined)

// ==================== Provider ====================

export function CadastrosProvider({ children }: { children: React.ReactNode }) {
  const [incomeTypes, setIncomeTypes] = useState(DEFAULT_INCOME_TYPES)
  const [expenseTypes, setExpenseTypes] = useState(DEFAULT_EXPENSE_TYPES)
  const [clients, setClients] = useState(DEFAULT_CLIENTS)
  const [suppliers, setSuppliers] = useState(DEFAULT_SUPPLIERS)
  const [projects, setProjects] = useState(DEFAULT_PROJECTS)
  const [paymentMethods, setPaymentMethods] = useState(DEFAULT_PAYMENT_METHODS)

  // ========== Income Types ==========
  const addIncomeType = (type: IncomeType) => {
    setIncomeTypes([...incomeTypes, type])
  }

  const updateIncomeType = (id: string, name: string) => {
    setIncomeTypes(
      incomeTypes.map((type) => (type.id === id ? { ...type, name } : type))
    )
  }

  const deleteIncomeType = (id: string) => {
    setIncomeTypes(incomeTypes.filter((type) => type.id !== id))
  }

  const addIncomeSubcategory = (typeId: string, subcategory: IncomeSubcategory) => {
    setIncomeTypes(
      incomeTypes.map((type) =>
        type.id === typeId
          ? { ...type, subcategories: [...type.subcategories, subcategory] }
          : type
      )
    )
  }

  const updateIncomeSubcategory = (typeId: string, subId: string, name: string) => {
    setIncomeTypes(
      incomeTypes.map((type) =>
        type.id === typeId
          ? {
              ...type,
              subcategories: type.subcategories.map((sub) =>
                sub.id === subId ? { ...sub, name } : sub
              ),
            }
          : type
      )
    )
  }

  const deleteIncomeSubcategory = (typeId: string, subId: string) => {
    setIncomeTypes(
      incomeTypes.map((type) =>
        type.id === typeId
          ? {
              ...type,
              subcategories: type.subcategories.filter((sub) => sub.id !== subId),
            }
          : type
      )
    )
  }

  // ========== Expense Types ==========
  const addExpenseType = (type: ExpenseType) => {
    setExpenseTypes([...expenseTypes, type])
  }

  const updateExpenseType = (id: string, name: string) => {
    setExpenseTypes(
      expenseTypes.map((type) => (type.id === id ? { ...type, name } : type))
    )
  }

  const deleteExpenseType = (id: string) => {
    setExpenseTypes(expenseTypes.filter((type) => type.id !== id))
  }

  const addExpenseSubcategory = (typeId: string, subcategory: ExpenseSubcategory) => {
    setExpenseTypes(
      expenseTypes.map((type) =>
        type.id === typeId
          ? { ...type, subcategories: [...type.subcategories, subcategory] }
          : type
      )
    )
  }

  const updateExpenseSubcategory = (typeId: string, subId: string, name: string) => {
    setExpenseTypes(
      expenseTypes.map((type) =>
        type.id === typeId
          ? {
              ...type,
              subcategories: type.subcategories.map((sub) =>
                sub.id === subId ? { ...sub, name } : sub
              ),
            }
          : type
      )
    )
  }

  const deleteExpenseSubcategory = (typeId: string, subId: string) => {
    setExpenseTypes(
      expenseTypes.map((type) =>
        type.id === typeId
          ? {
              ...type,
              subcategories: type.subcategories.filter((sub) => sub.id !== subId),
            }
          : type
      )
    )
  }

  // ========== Clients ==========
  const addClient = (client: Omit<Client, 'id'>) => {
    const newClient: Client = {
      id: Math.random().toString(36).substr(2, 9),
      ...client,
    }
    setClients([...clients, newClient])
  }

  const updateClient = (id: string, updates: Omit<Client, 'id'>) => {
    setClients(
      clients.map((client) => (client.id === id ? { ...client, ...updates } : client))
    )
  }

  const deleteClient = (id: string) => {
    setClients(clients.filter((client) => client.id !== id))
  }

  // ========== Suppliers ==========
  const addSupplier = (supplier: Omit<Supplier, 'id'>) => {
    const newSupplier: Supplier = {
      id: Math.random().toString(36).substr(2, 9),
      ...supplier,
    }
    setSuppliers([...suppliers, newSupplier])
  }

  const updateSupplier = (id: string, updates: Omit<Supplier, 'id'>) => {
    setSuppliers(
      suppliers.map((supplier) =>
        supplier.id === id ? { ...supplier, ...updates } : supplier
      )
    )
  }

  const deleteSupplier = (id: string) => {
    setSuppliers(suppliers.filter((supplier) => supplier.id !== id))
  }

  // ========== Projects ==========
  const addProject = (project: Project) => {
    setProjects([...projects, project])
  }

  const updateProject = (id: string, updates: Partial<Project>) => {
    setProjects(
      projects.map((project) =>
        project.id === id ? { ...project, ...updates } : project
      )
    )
  }

  const deleteProject = (id: string) => {
    setProjects(projects.filter((project) => project.id !== id))
  }

  // ========== Payment Methods ==========
  const addPaymentMethod = (name: string) => {
    const newMethod: PaymentMethod = {
      id: Math.random().toString(36).substr(2, 9),
      name,
      isDefault: false,
    }
    setPaymentMethods([...paymentMethods, newMethod])
  }

  const updatePaymentMethod = (id: string, name: string) => {
    setPaymentMethods(
      paymentMethods.map((method) =>
        method.id === id ? { ...method, name } : method
      )
    )
  }

  const deletePaymentMethod = (id: string) => {
    const method = paymentMethods.find((m) => m.id === id)
    if (method?.isDefault) {
      alert("Formas de pagamento padrão não podem ser removidas")
      return
    }
    setPaymentMethods(paymentMethods.filter((method) => method.id !== id))
  }

  const value: CadastrosContextType = {
    incomeTypes,
    addIncomeType,
    updateIncomeType,
    deleteIncomeType,
    addIncomeSubcategory,
    updateIncomeSubcategory,
    deleteIncomeSubcategory,
    expenseTypes,
    addExpenseType,
    updateExpenseType,
    deleteExpenseType,
    addExpenseSubcategory,
    updateExpenseSubcategory,
    deleteExpenseSubcategory,
    clients,
    addClient,
    updateClient,
    deleteClient,
    suppliers,
    addSupplier,
    updateSupplier,
    deleteSupplier,
    projects,
    addProject,
    updateProject,
    deleteProject,
    paymentMethods,
    addPaymentMethod,
    updatePaymentMethod,
    deletePaymentMethod,
  }

  return (
    <CadastrosContext.Provider value={value}>{children}</CadastrosContext.Provider>
  )
}

// ==================== Hook ====================

export function useCadastros() {
  const context = useContext(CadastrosContext)
  if (context === undefined) {
    throw new Error("useCadastros must be used within a CadastrosProvider")
  }
  return context
}
