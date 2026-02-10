export const dreData = {
  categories: [
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
      id: "despesas-administrativas",
      name: "Despesas Administrativas",
      level: 1,
      isSubtraction: true,
      values: { jan: -57375, fev: -61838, mar: -66300, abr: -63113, mai: -68850, jun: -73950 },
    },
    {
      id: "despesas-vendas",
      name: "Despesas com Vendas",
      level: 1,
      isSubtraction: true,
      values: { jan: -38250, fev: -41225, mar: -44200, abr: -42075, mai: -45900, jun: -49300 },
    },
    {
      id: "despesas-financeiras",
      name: "Despesas Financeiras",
      level: 1,
      isSubtraction: true,
      values: { jan: -19125, fev: -20612, mar: -22100, abr: -21037, mai: -22950, jun: -24650 },
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
      id: "resultado-financeiro",
      name: "(+/-) Resultado Financeiro",
      level: 0,
      values: { jan: -7650, fev: -8245, mar: -8840, abr: -8415, mai: -9180, jun: -9860 },
    },
    {
      id: "lucro-antes-ir",
      name: "Lucro Antes do IR/CSLL",
      level: 0,
      isTotal: true,
      values: { jan: 68850, fev: 74205, mar: 79560, abr: 75735, mai: 82620, jun: 88740 },
    },
    {
      id: "ir-csll",
      name: "(-) IR/CSLL",
      level: 0,
      isSubtraction: true,
      values: { jan: -23409, fev: -25230, mar: -27050, abr: -25750, mai: -28091, jun: -30172 },
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
  ],
  periods: ["jan", "fev", "mar", "abr", "mai", "jun"],
  periodLabels: {
    jan: "Jan/24",
    fev: "Fev/24",
    mar: "Mar/24",
    abr: "Abr/24",
    mai: "Mai/24",
    jun: "Jun/24",
  },
}

// DFC (Cash Flow Statement) Data
export const dfcData = {
  operacional: [
    {
      id: "lucro-liquido-dfc",
      name: "Lucro Líquido do Período",
      values: { jan: 45441, fev: 48975, mar: 52510, abr: 49985, mai: 54529, jun: 58568 },
    },
    {
      id: "depreciacao",
      name: "(+) Depreciação e Amortização",
      values: { jan: 12000, fev: 12000, mar: 12000, abr: 12000, mai: 12000, jun: 12000 },
    },
    {
      id: "var-clientes",
      name: "(+/-) Variação de Clientes",
      values: { jan: -15000, fev: -8000, mar: -12000, abr: 5000, mai: -18000, jun: -10000 },
    },
    {
      id: "var-estoques",
      name: "(+/-) Variação de Estoques",
      values: { jan: -8000, fev: -5000, mar: -10000, abr: 3000, mai: -7000, jun: -12000 },
    },
    {
      id: "var-fornecedores",
      name: "(+/-) Variação de Fornecedores",
      values: { jan: 10000, fev: 7000, mar: 15000, abr: -2000, mai: 12000, jun: 8000 },
    },
  ],
  investimento: [
    {
      id: "aquisicao-imob",
      name: "(-) Aquisição de Imobilizado",
      values: { jan: -25000, fev: -15000, mar: -30000, abr: -20000, mai: -35000, jun: -40000 },
    },
    {
      id: "venda-ativos",
      name: "(+) Venda de Ativos",
      values: { jan: 0, fev: 5000, mar: 0, abr: 0, mai: 10000, jun: 0 },
    },
    {
      id: "aplicacoes",
      name: "(-) Aplicações Financeiras",
      values: { jan: -10000, fev: -5000, mar: -15000, abr: -10000, mai: -20000, jun: -15000 },
    },
  ],
  financiamento: [
    {
      id: "emprestimos",
      name: "(+/-) Empréstimos e Financiamentos",
      values: { jan: -5000, fev: -5000, mar: 20000, abr: -8000, mai: -5000, jun: 15000 },
    },
    {
      id: "dividendos",
      name: "(-) Dividendos Pagos",
      values: { jan: -15000, fev: -15000, mar: -15000, abr: -15000, mai: -15000, jun: -15000 },
    },
    {
      id: "aporte-capital",
      name: "(+) Aporte de Capital",
      values: { jan: 0, fev: 0, mar: 0, abr: 0, mai: 50000, jun: 0 },
    },
  ],
  saldoInicial: { jan: 150000, fev: 139441, mar: 159416, abr: 176926, mai: 190911, jun: 228440 },
  periods: ["jan", "fev", "mar", "abr", "mai", "jun"],
  periodLabels: {
    jan: "Jan/24",
    fev: "Fev/24",
    mar: "Mar/24",
    abr: "Abr/24",
    mai: "Mai/24",
    jun: "Jun/24",
  },
}

// Budget Planning Data
export const budgetData = {
  categories: [
    { id: "receita-orcada", name: "Receita Bruta", planned: 3100000, actual: 3070000 },
    { id: "cmv-orcado", name: "CMV / CSV", planned: 1550000, actual: 1504750 },
    { id: "despesas-admin", name: "Despesas Administrativas", planned: 400000, actual: 391426 },
    { id: "despesas-venda", name: "Despesas com Vendas", planned: 260000, actual: 260950 },
    { id: "despesas-fin", name: "Despesas Financeiras", planned: 130000, actual: 130474 },
    { id: "marketing", name: "Marketing e Publicidade", planned: 80000, actual: 92000 },
    { id: "ti", name: "Tecnologia da Informação", planned: 60000, actual: 55000 },
    { id: "rh", name: "Recursos Humanos", planned: 45000, actual: 48500 },
  ],
  monthly: [
    { month: "Jan", planned: 450000, actual: 450000 },
    { month: "Fev", planned: 480000, actual: 485000 },
    { month: "Mar", planned: 510000, actual: 520000 },
    { month: "Abr", planned: 520000, actual: 495000 },
    { month: "Mai", planned: 550000, actual: 540000 },
    { month: "Jun", planned: 590000, actual: 580000 },
  ],
}

// Delinquency Data
export const delinquencyData = {
  summary: {
    totalAtrasado: 245000,
    percentualInadimplencia: 4.2,
    tempoMedioAtraso: 32,
    clientesInadimplentes: 18,
  },
  clients: [
    {
      id: 1,
      name: "Tech Solutions Ltda",
      document: "12.345.678/0001-90",
      totalDue: 45000,
      daysOverdue: 45,
      status: "critical",
    },
    {
      id: 2,
      name: "Comercial ABC S.A.",
      document: "23.456.789/0001-01",
      totalDue: 38000,
      daysOverdue: 38,
      status: "critical",
    },
    {
      id: 3,
      name: "Indústria XYZ Ltda",
      document: "34.567.890/0001-12",
      totalDue: 32000,
      daysOverdue: 30,
      status: "warning",
    },
    {
      id: 4,
      name: "Serviços Beta ME",
      document: "45.678.901/0001-23",
      totalDue: 28000,
      daysOverdue: 28,
      status: "warning",
    },
    {
      id: 5,
      name: "Construtora Delta",
      document: "56.789.012/0001-34",
      totalDue: 25000,
      daysOverdue: 22,
      status: "warning",
    },
    {
      id: 6,
      name: "Distribuidora Omega",
      document: "67.890.123/0001-45",
      totalDue: 22000,
      daysOverdue: 18,
      status: "attention",
    },
    {
      id: 7,
      name: "Consultoria Gama",
      document: "78.901.234/0001-56",
      totalDue: 18000,
      daysOverdue: 15,
      status: "attention",
    },
    {
      id: 8,
      name: "Loja Central",
      document: "89.012.345/0001-67",
      totalDue: 15000,
      daysOverdue: 12,
      status: "attention",
    },
  ],
  aging: [
    { range: "1-15 dias", value: 55000, count: 5 },
    { range: "16-30 dias", value: 85000, count: 7 },
    { range: "31-60 dias", value: 83000, count: 4 },
    { range: "> 60 dias", value: 22000, count: 2 },
  ],
}

// Payable/Accounts Payable Data (Endividamento)
export const payableData = {
  summary: {
    totalAPagar: 285000,
    pagamentosNoMes: 12,
    tempoMedioPagamento: 35,
    fornecedoresAtivos: 15,
  },
  suppliers: [
    {
      id: 1,
      name: "Fornecedor Premium Ltda",
      document: "11.111.111/0001-11",
      totalAmount: 52000,
      daysUntilDue: -15,
      status: "overdue",
    },
    {
      id: 2,
      name: "Materiais ABC S.A.",
      document: "22.222.222/0001-22",
      totalAmount: 48000,
      daysUntilDue: -8,
      status: "overdue",
    },
    {
      id: 3,
      name: "Insumos Industriais Ltda",
      document: "33.333.333/0001-33",
      totalAmount: 42000,
      daysUntilDue: 3,
      status: "critical",
    },
    {
      id: 4,
      name: "Distribuidor Beta ME",
      document: "44.444.444/0001-44",
      totalAmount: 38000,
      daysUntilDue: 8,
      status: "warning",
    },
    {
      id: 5,
      name: "Peças Técnicas Omega",
      document: "55.555.555/0001-55",
      totalAmount: 35000,
      daysUntilDue: 12,
      status: "warning",
    },
    {
      id: 6,
      name: "Serviços Logísticos Gama",
      document: "66.666.666/0001-66",
      totalAmount: 30000,
      daysUntilDue: 18,
      status: "attention",
    },
    {
      id: 7,
      name: "Fornecedor Delta Ltda",
      document: "77.777.777/0001-77",
      totalAmount: 25000,
      daysUntilDue: 22,
      status: "attention",
    },
    {
      id: 8,
      name: "Supplier Iota Comércio",
      document: "88.888.888/0001-88",
      totalAmount: 15000,
      daysUntilDue: 28,
      status: "normal",
    },
  ],
  dueDateAnalysis: [
    { range: "Vencido", value: 100000, count: 2 },
    { range: "1-7 dias", value: 42000, count: 1 },
    { range: "8-30 dias", value: 93000, count: 5 },
    { range: "> 30 dias", value: 50000, count: 2 },
  ],
}

// Pricing/CMV Data
export const pricingData = {
  products: [
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
  ],
  summary: {
    margemMediaBruta: 31.52,
    margemMediaLiquida: 16.58,
    cmvTotal: 1274.0,
    receitaTotal: 1868.6,
  },
}

// Helper function to format currency
export function formatCurrency(value: number): string {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value)
}

// Helper function to format percentage
export function formatPercent(value: number): string {
  return `${value.toFixed(1)}%`
}
