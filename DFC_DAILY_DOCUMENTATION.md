# DFC Diário - Documentação

## Visão Geral

O novo componente `DFCDaily` foi adicionado à tela de DFC para exibir o fluxo de caixa diário de lançamentos, separando receitas e despesas de forma organizada e coerente.

## Localização

- **Componente**: `components/dfc/dfc-daily.tsx`
- **Página**: `app/dashboard/dfc/page.tsx`

## Funcionalidades

### 1. Visão Consolidada
Exibe todos os dias com:
- Receitas do dia com subtotal
- Despesas do dia com subtotal
- Saldo líquido do dia (receitas - despesas)
- Cada transação mostra: descrição, categoria, subcategoria, forma de pagamento e referência (cliente/fornecedor/projeto)

### 2. Visão de Receitas
Filtra apenas as transações de receita:
- Cada dia é exibido separadamente
- Detalhes completos de cada receita
- Total de receitas por dia
- Destaque em verde

### 3. Visão de Despesas
Filtra apenas as transações de despesa:
- Cada dia é exibido separadamente
- Detalhes completos de cada despesa
- Total de despesas por dia
- Destaque em vermelho

## Estrutura de Dados

### Interface DailyTransaction
```typescript
interface DailyTransaction {
  id: string           // Identificador único
  date: string        // Data (formato YYYY-MM-DD)
  description: string // Descrição do lançamento
  amount: number      // Valor
  category: string    // Categoria (ex: "Vendas de Produtos")
  subcategory?: string // Subcategoria (ex: "Produtos")
  paymentMethod?: string // Forma de pagamento (ex: "Transferência")
  reference?: string  // Referência (ex: "Cliente ABC")
}
```

### Interface DailyFlowData
```typescript
interface DailyFlowData {
  date: string        // Data do dia
  income: DailyTransaction[]  // Array de receitas
  expenses: DailyTransaction[] // Array de despesas
}
```

## Integração com Lançamentos

O componente está preparado para integrar com os dados da tela de Lançamentos. Atualmente usa dados mock para demonstração.

### Para integrar com dados reais:

1. **Importar o contexto de cadastros**:
```typescript
import { useCadastros } from "@/lib/cadastros-context"
```

2. **Usar os dados do contexto**:
```typescript
const { 
  incomeRecords,  // Registros de receita
  expenseRecords, // Registros de despesa
  incomeTypes,
  expenseTypes,
  clients,
  suppliers,
  paymentMethods
} = useCadastros()
```

3. **Transformar os dados para o formato DailyFlowData**:
```typescript
// Agrupar registros por data
const groupByDate = (records) => {
  const grouped = {}
  records.forEach(record => {
    if (!grouped[record.date]) {
      grouped[record.date] = []
    }
    grouped[record.date].push(record)
  })
  return grouped
}

// Combinar receitas e despesas
const dailyData = Object.entries(groupByDate({
  ...incomeRecords,
  ...expenseRecords
})).map(([date, records]) => ({
  date,
  income: records.filter(r => 'incomeTypeId' in r),
  expenses: records.filter(r => 'expenseTypeId' in r)
}))
```

## Características Visuais

- **Cores**: Verde para receitas, Vermelho para despesas
- **Icons**: 
  - ArrowUpRight (↗) para receitas
  - ArrowDownRight (↘) para despesas
- **Responsivo**: Layout que se adapta a diferentes tamanhos de tela
- **Tema**: Suporte a light/dark mode

## Estados

- **Sem transações**: Mensagem "Nenhuma receita/despesa"
- **Com transações**: Exibição detalhada de cada lançamento
- **Totalizadores**: Mostrados no header com cores destacadas

## Próximas Melhorias

1. Integração com dados reais do `CadastrosContext`
2. Filtro por período (hoje, últimos 7 dias, últimos 30 dias, etc.)
3. Busca e filtro por categoria
4. Exportação para PDF/Excel
5. Sincronização em tempo real com lançamentos novos
6. Gráficos de tendência diária
7. Alertas para grandes transações
