import { MetricDTO } from "@/src/types/dtos/metric.dto";
import { MetricCardViewModel } from "@/src/types/metric-card-view-model.type";

import {
  DollarSign,
  TrendingUp,
  TriangleAlert,
  Users,
  Clock,
  Percent,
  BanknoteX,
  Scale,
  Target,
  PiggyBank,
  ArrowDownUp,
  Wallet,
  CircleAlert,
  CircleCheckBig,
  Package,
  PackageIcon,
  UsersIcon,
  ScaleIcon,
  WalletIcon,
  LandmarkIcon,
} from "lucide-react";

import { formatMetricValue } from "@/src/util/format-currency";

const iconMap: Record<string, React.ElementType> = {
  "Lucro Bruto": TrendingUp,
  Faturamento:  DollarSign,
  "Receita Líquida": DollarSign,
  "Lucro Líquido": WalletIcon,
  Inadimplência: TriangleAlert,
  "Margem Líquida": Users,
  "Margem Bruta": TriangleAlert,
  "Total em Atraso": TriangleAlert,
  "Taxa de Inadimplência": Percent,
  "Tempo Médio de Atraso": Clock,
  "Clientes Inadimplentes": Users,
  "Total a Pagar": TriangleAlert,
  "Pagamentos no Mês": Scale,
  "Pagamentos em Atraso": BanknoteX,
  "Fornecedores Ativos": Users,
  "Saldo Final": Wallet,
  "Geração Operacional": TrendingUp,
  "Variação Líquida": ArrowDownUp,
  Investimentos: PiggyBank,
  "Orçamento Total": Target,
  "Realizado Total": TrendingUp,
  "Taxa de Execução": CircleAlert,
  "Categorias no Orçamento": CircleCheckBig,
  "Margem Bruta Média": Percent,
  "Margem Líquida Média": TrendingUp,
  "CMV Total": DollarSign,
  "CMV": PackageIcon,
  "Produtos Saudáveis": Package,
  "EBITDA": UsersIcon,
  "Ponto de Equilíbrio": ScaleIcon,
  "Endividamento": LandmarkIcon
};

export function mapMetricToCard(
  metric: MetricDTO
): MetricCardViewModel {
  return {
    title: metric.title,

    icon: iconMap[metric.title],

    mainValue: formatMetricValue(
      metric.value,
      metric.valueUnit
    ),

    comparison: metric.comparison,
    comparisonUnit: metric.comparisonUnit,

    trendingValue:
      metric.trend && metric.trendUnit
        ? formatMetricValue(metric.trend, metric.trendUnit)
        : undefined,

    goalProgress: metric.goalProgress,
  };
}
