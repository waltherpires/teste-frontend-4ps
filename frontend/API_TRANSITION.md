# 🔁 Transição de Mocks para API e Manutenção de SSR

Este documento descreve o caminho recomendado para migrar o sistema de métricas do estado atual (com *mocks* carregados diretamente no código) para um fluxo onde o frontend envia um **período para uma API** e recebe os dados reais em resposta. Também aborda como manter o render no servidor quando possível e como lidar com seleção de período pelo usuário.

---

## 🧱 Estado Atual

- `app/protected/financial/*/page.tsx` chama o repositório (`dashboardMetricRepository`, `dreMetricRepository`) e aguarda `getMetrics(period)` no servidor.
- Repositório usa `DreMockDataSource` ou `DashboardMockDataSource` que retornam arrays estáticos de `MetricDTO`.
- Os componentes de cliente (`MetricCards`) recebem já os `metrics: MetricDTO[]` prontos para renderizar.
- O `period` também é hard‑coded na página.

### Vantagens ativas

- **Server-side rendering completo**: a página já vem renderizada com dados da requisição do Next.
- **Performance inicial**: nada precisa ser carregado no cliente.
- **Simples transição**: basta trocar a implementação do DataSource.

### Objetivo futuro

- API externa aceita `period` e retorna métricas reais.
- Usuário pode escolher um período via UI (input, botão, calendário).
- Cada mudança de período dispara uma nova consulta à API.
- Repositório continua abstraindo a origem de dados.

---

## 🛠️ Passo a passo da migração

### 1. Criar DataSource para chamar a API

```ts
// src/sources/financial/dre/dre-api.data-source.ts
import { MetricsDataSource } from "@/src/sources/financial/metrics.data-source";
import { MetricDTO } from "@/src/types/dtos/metric.dto";
import { fetcher } from "@/src/lib/client"; // http client genérico ou `fetch`

export class DreApiDataSource implements MetricsDataSource {
  async getMetrics(period: DateRange): Promise<MetricDTO[]> {
    const query = new URLSearchParams(period as any).toString();
    return fetcher(`/api/financial/dre/metrics?${query}`);
  }
}
```

(Replicar para outras fontes, como `DashboardApiDataSource`.)

### 2. Preparar rota HTTP no Next

Caso deseje usar um *backend* interno em `/app/api` ou rotas externas:

```ts
// app/api/financial/dre/metrics/route.ts
import { NextResponse } from "next/server";
import { getDreMetrics } from "@/src/services/financial-api"; // função que chama backend real

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const period: DateRange = {
    startDate: searchParams.get("startDate") || "",
    endDate: searchParams.get("endDate") || "",
  };

  const metrics = await getDreMetrics(period);
  return NextResponse.json(metrics);
}
```

> Essa rota pode simplesmente repassar a requisição para um BFF ou backend externo.

### 3. Injetar a nova implementação no repositório

```ts
// src/repository/financial/dre.repository.ts
// antes: DreMockDataSource
// depois:
import { DreApiDataSource } from "@/src/sources/financial/dre/dre-api.data-source";

export const dreMetricRepository = new MetricRepository(
  new DreApiDataSource()
);
```

### 4. Adaptar as páginas para aceitar um `period` dinâmico

Se o período não vier do lado servidor (por exemplo, seleção do usuário), a página inicial pode renderizar com um valor default e depois deixar a lógica de busca para o cliente.

#### 4.1 SSR inicial com período padrão

```tsx
// app/protected/financial/dre/page.tsx
import { MetricCards } from "@/src/components/metric-cards";
import { dreMetricRepository } from "@/src/repository/financial/dre.repository";

export default async function FinancialDrePage() {
  const defaultPeriod = { startDate: "2026-01-01", endDate: "2026-01-31" };
  const metrics = await dreMetricRepository.getMetrics(defaultPeriod);

  return <MetricCards metrics={metrics} />;
}
```

#### 4.2 Componente de controle no cliente

Se permitirmos ao usuário alterar o período, temos duas abordagens:

1. **Re-render no servidor com querystring** (link ou formulário que recarrega a página). Isto mantém SSR, mas faz uma navegação completa.
2. **Fetch client‑side** usando `useEffect`/`fetch` ou SWR/React Query. A página já renderiza e o componente pedido se atualiza dinamicamente.

##### Exemplo com cliente usando hooks

```tsx
// src/components/metrics-viewer.tsx
import { useState, useEffect } from "react";
import { MetricCards } from "@/src/components/metric-cards";
import { DateRange } from "@/src/types/date-range";
import { MetricDTO } from "@/src/types/dtos/metric.dto";

type Props = {
  initialMetrics: MetricDTO[];
  defaultPeriod: DateRange;
};

export function MetricsViewer({ initialMetrics, defaultPeriod }: Props) {
  const [period, setPeriod] = useState(defaultPeriod);
  const [metrics, setMetrics] = useState<MetricDTO[]>(initialMetrics);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function load() {
      setLoading(true);
      const query = new URLSearchParams(period as any).toString();
      const resp = await fetch(`/api/financial/dre/metrics?${query}`);
      setMetrics(await resp.json());
      setLoading(false);
    }

    if (!period) return;
    load();
  }, [period]);

  return (
    <>
      <PeriodSelector value={period} onChange={setPeriod} />
      {loading ? <Spinner /> : <MetricCards metrics={metrics} />}
    </>
  );
}
```

A página usaria `MetricsViewer` em que o `initialMetrics` veio do servidor (SSR) e só depois atualiza no cliente.

### 5. Servir a UI de seleção de período

Crie componente simples para permitir escolher mês/intervalo. Pode ser um `<input type="month" />` ou calendário personalizado; ao alterar, ele ajusta o estado `period` no `MetricsViewer` acima.

### 6. Manter SSR quando possível

- A primeira visita continua renderizada no servidor com `getMetrics(defaultPeriod)`.
- A requisição subsequente do usuário (via hook) ocorre no cliente; isso **não perde SSR**, apenas tira vantagem da revalidação dinâmica.
- Se quiser um comportamento pure-Router (através de querystring), basta adicionar parâmetros à URL e usar `useSearchParams` no page para disparar novo `getMetrics` no servidor em cada navegação.

### 7. Testar

- Assegure-se que os mocks ainda possam ser utilizados em ambiente de desenvolvimento/teste, usando a mesma interface.
- Garanta que o componente de cliente trate `metrics` vazios/undefined (já está ok com `buildMetricCards`).

---

## ⚖️ SSR vs CSR: o que você perde/ganha?

| Situação | Resultado | Quando usar | Como manter SSR? |
|----------|-----------|-------------|-----------------|
| Busca inicial com período padrão | Página totalmente renderizada no servidor | Qualquer visita sem filtros | Padrão com `await repository.getMetrics` dentro da page |
| Seleção de período com navegação | SSR renovado a cada mudança | Interação leve que pode recarregar a página | Link/form com querystring (pessoas recarregam o HTML) |
| Seleção de período com fetch client | Apenas parte do HTML atualiza | UX mais fluida, evita full reload | use o hook para buscar e renderizar; componente principal pode ainda vir SSR com dados iniciais |

🔹 Você **não perde SSR** automaticamente: ele só deixa de ocorrer quando o dado é carregado no cliente após a montagem. A página ainda pode ser prerenderizada com um conjunto default de métricas.

🔹 Ao misturar SSR e CSR, você obtém melhor SEO/primeiro carregamento sem sacrificar interatividade posterior.

---

## 💡 Recomendações adicionais

- Utilize cache ou SWR/React Query para evitar chamadas repetidas ao backend quando o período não mudar.
- Valide e sanitize o `period` no servidor (API) para evitar erros de consulta.
- Adicione estados de carregamento e mensagem de erro para melhor experiência.
- Mantenha os *data sources* e o repositório intactos; apenas altere a implementação concreta.
- Em ambientes de teste, um switch de variável (`USE_MOCKS`) pode ser usado para alternar entre o `MockDataSource` e o `ApiDataSource`.

---

### Exemplo completo de fluxo futuro

1. Page SSR: chama `dashboardMetricRepository.getMetrics(defaultPeriod)` e renderiza `MetricsViewer initialMetrics={metrics}`.
2. Usuário escolhe novo mês com `PeriodSelector`.
3. `MetricsViewer` faz `fetch(`/api/financial/dre/metrics?startDate=...&endDate=...`)` e atualiza `metrics` no estado.
4. `MetricCards` re-renderiza com os novos dados.
5. O repositório e serviços nunca sabem qual é a fonte real dos dados.

---

Migrar para chamadas reais é, na prática, **trocar apenas a implementação do data source e adicionar uma rota/cliente HTTP**. O restante da arquitetura permanece inalterado e continua compatível com SSR sempre que for usado em páginas do Next.js.