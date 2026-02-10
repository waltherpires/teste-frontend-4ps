# 🧪 Guia de Teste e Integração - DFC Diário

## 🚀 Começando

### 1. Verificar se o Componente Está Renderizando

A tela de DFC agora deve mostrar:
1. **KPIs** (Cards de resumo) - Parte superior
2. **Tabela de DFC** (Fluxo mensal) - Meio superior
3. **Gráfico de Evolução** - Meio
4. **Fluxo de Caixa Diário** ✨ NOVO - Parte inferior

### 2. Testar as Abas

Na seção "Fluxo de Caixa Diário":

#### Aba "Consolidado"
- [ ] Clique na aba "Consolidado"
- [ ] Verify que mostra receitas e despesas lado a lado
- [ ] Verify que o saldo está correto (receitas - despesas)
- [ ] Verify que mostra o dia da semana
- [ ] Verify que as cores estão corretas (verde/vermelho)

#### Aba "Receitas"
- [ ] Clique na aba "Receitas"
- [ ] Verify que mostra apenas dias com receitas
- [ ] Verify que cada transação mostra: descrição, categoria, subcategoria, forma de pagamento, referência
- [ ] Verify que o fundo dos itens é verde

#### Aba "Despesas"
- [ ] Clique na aba "Despesas"
- [ ] Verify que mostra apenas dias com despesas
- [ ] Verify que cada transação mostra os mesmos detalhes
- [ ] Verify que o fundo dos itens é vermelho

### 3. Testar Responsividade

#### Desktop (1920px+)
- [ ] Layout consolidado em 2 colunas
- [ ] Todos os elementos visíveis
- [ ] Sem scroll horizontal

#### Tablet (768px - 1024px)
- [ ] Layout adapta corretamente
- [ ] Legível em ambas as orientações

#### Mobile (< 768px)
- [ ] Layout em coluna única
- [ ] Receitas acima das despesas
- [ ] Texto não é truncado incorretamente

### 4. Testar Dark/Light Mode

- [ ] Verificar comportamento com tema claro
- [ ] Verificar comportamento com tema escuro
- [ ] Cores contrastam bem em ambos

## 🔗 Integração com Dados Reais

### Passo 1: Preparar o Contexto

Certifique-se que o `CadastrosContext` exporta os registros de lançamentos:

```typescript
// Adicionar ao cadastros-context.tsx
export interface CadastrosContextType {
  // ... existing interfaces ...
  incomeRecords: IncomeRecord[]
  expenseRecords: ExpenseRecord[]
}
```

### Passo 2: Modificar o Componente DFCDaily

Substitua a seção de mock data:

```typescript
import { useCadastros } from "@/lib/cadastros-context"

export function DFCDaily() {
  const { incomeRecords, expenseRecords, clients, suppliers, paymentMethods } = useCadastros()
  
  // Função para agrupar registros por data
  const groupByDate = (records: any[]) => {
    const grouped: Record<string, any[]> = {}
    records.forEach(record => {
      if (!grouped[record.date]) {
        grouped[record.date] = []
      }
      grouped[record.date].push(record)
    })
    return grouped
  }

  // Transformar dados
  const dailyData = useMemo(() => {
    const incomeByDate = groupByDate(incomeRecords)
    const expenseByDate = groupByDate(expenseRecords)
    
    const allDates = new Set([
      ...Object.keys(incomeByDate),
      ...Object.keys(expenseByDate)
    ])

    return Array.from(allDates)
      .sort((a, b) => new Date(b).getTime() - new Date(a).getTime()) // Ordem decrescente
      .map(date => ({
        date,
        income: (incomeByDate[date] || []).map(record => ({
          id: record.id,
          date: record.date,
          description: record.description,
          amount: record.amount,
          category: incomeTypes.find(t => t.id === record.incomeTypeId)?.name || '-',
          subcategory: incomeTypes
            .find(t => t.id === record.incomeTypeId)
            ?.subcategories.find(s => s.id === record.incomeSubcategoryId)?.name,
          paymentMethod: paymentMethods.find(pm => pm.id === record.paymentMethodId)?.name,
          reference: clients.find(c => c.id === record.clientId)?.name,
        })),
        expenses: (expenseByDate[date] || []).map(record => ({
          id: record.id,
          date: record.date,
          description: record.description,
          amount: record.amount,
          category: expenseTypes.find(t => t.id === record.expenseTypeId)?.name || '-',
          subcategory: expenseTypes
            .find(t => t.id === record.expenseTypeId)
            ?.subcategories.find(s => s.id === record.expenseSubcategoryId)?.name,
          paymentMethod: paymentMethods.find(pm => pm.id === record.paymentMethodId)?.name,
          reference: suppliers.find(s => s.id === record.supplierId)?.name,
        })),
      }))
  }, [incomeRecords, expenseRecords, clients, suppliers, paymentMethods])

  // ... resto do componente ...
}
```

### Passo 3: Adicionar Import do Contexto

No topo do arquivo `dfc-daily.tsx`:

```typescript
import { useCadastros } from "@/lib/cadastros-context"
```

### Passo 4: Testar a Integração

1. Navegue até a tela de Lançamentos
2. Crie um novo lançamento de receita
3. Volte para a tela de DFC
4. Verify que o novo lançamento aparece no DFC Diário

## 🎯 Casos de Teste

### Caso 1: Sem Lançamentos
**Situação**: Usuário abre DFC sem nenhum lançamento registrado
**Esperado**: Mensagem "Nenhuma receita/despesa" em cada aba

### Caso 2: Apenas Receitas
**Situação**: Usuário registrou apenas receitas
**Esperado**: 
- Aba "Consolidado" mostra receitas e despesas vazias
- Aba "Receitas" mostra as transações
- Aba "Despesas" mostra "Nenhuma despesa"

### Caso 3: Apenas Despesas
**Situação**: Usuário registrou apenas despesas
**Esperado**: Comportamento inverso do Caso 2

### Caso 4: Múltiplos Dias
**Situação**: Usuário tem lançamentos em vários dias
**Esperado**: Cada dia é mostrado em seu próprio card
**Ordem**: Do mais recente para o mais antigo

### Caso 5: Grande Valor
**Situação**: Uma transação com valor muito alto (ex: R$ 999.999,99)
**Esperado**: Formatação correta em moeda

### Caso 6: Descrição Longa
**Situação**: Uma transação com descrição muito longa
**Esperado**: Texto é truncado com ellipsis (...)

## 🐛 Troubleshooting

### Componente não aparece
- [ ] Verify que o import está correto
- [ ] Verify que o arquivo `dfc-daily.tsx` existe
- [ ] Verify que não há erros no console

### Dados não aparecem
- [ ] Verify que `useCadastros` está retornando dados
- [ ] Verify que há registros com datas válidas
- [ ] Verify no console se há erros de JavaScript

### Formatação incorreta
- [ ] Verify as datas estão no formato YYYY-MM-DD
- [ ] Verify os valores são números válidos
- [ ] Verify as strings de moeda estão em português

### Cores incorretas
- [ ] Verify que as classes Tailwind estão sendo aplicadas
- [ ] Verify que `dark:` prefixes estão corretos
- [ ] Limpe o cache do navegador (Ctrl+Shift+Delete)

## 📊 Métricas de Sucesso

- ✅ Componente renderiza sem erros
- ✅ Todas as 3 abas funcionam
- ✅ Dados são exibidos corretamente
- ✅ Layout é responsivo
- ✅ Cores e ícones estão corretos
- ✅ Integração com dados reais funciona
- ✅ Performance não é afetada

## 📞 Suporte

Se encontrar problemas:
1. Verificar a documentação em `DFC_DAILY_DOCUMENTATION.md`
2. Verificar o console do navegador para erros
3. Verificar se os dados estão sendo passados corretamente
4. Revisar o código do componente

---

**Última Atualização**: 02/02/2026
