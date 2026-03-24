// modules.config.ts
import {
  ChartNoAxesCombined,
  UsersRoundIcon,
  Package2Icon,
  NotebookPenIcon,
  LucideIcon,
  UserStarIcon,
  Megaphone,
} from "lucide-react";

type ModuleConfig = {
  title: string;
  icon: LucideIcon;
  color: string;
  description: string;
  href?: (companyId: string) => string;
};

// configura dados e links dos cards de modulos
export const MODULES_CONFIG: Record<string, ModuleConfig> = {
  owner: {
    title: "Tela do Dono",
    icon: UserStarIcon,
    color: "bg-gray-600 hover:bg-gray-700",
    description:
      "Visualize os principais indicadores da sua empresa e tome decisões melhores.",
  },
  finance: {
    title: "Finanças",
    icon: ChartNoAxesCombined,
    color: "bg-emerald-600 hover:bg-emerald-700",
    href: (companyId: string) => `/protected/${companyId}/financial/dashboard`,
    description:
      "Controle receitas, despesas e resultados para manter a saúde financeira da empresa.",
  },
  hr: {
    title: "Recursos Humanos",
    icon: UsersRoundIcon,
    color: "bg-purple-600",
    description:
      "Gerencie colaboradores, cargos e informações essenciais da sua equipe.",
  },
  processes: {
    title: "Processos",
    icon: Package2Icon,
    color: "bg-sky-500",
    description:
      "Organize e acompanhe fluxos operacionais para aumentar eficiência e produtividade.",
  },
  planning: {
    title: "Planejamento",
    icon: NotebookPenIcon,
    color: "bg-orange-600",
    description:
      "Defina metas, estratégias e acompanhe indicadores para decisões mais assertivas",
  },
  marketing: {
    title: "Marketing e Comercial",
    icon: Megaphone,
    color: "bg-red-500 hover:bg-red-600",
    description:
      "Gerencie campanhas, analise resultados e impulsione o crescimento e as vendas da sua empresa.",
  },
};
