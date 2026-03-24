import {
  FileText,
  PieChart,
  Database,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/src/components/ui/card";

const benefits = [

  {
    icon: FileText,
    title: "Relatórios Automáticos",
    description:
      "Relatórios financeiros gerados automaticamente, prontos para análise ou apresentação.",
  },
  {
    icon: PieChart,
    title: "Visão de Lucros e Despesas",
    description:
      "Gráficos claros que mostram para onde vai seu dinheiro e de onde ele vem.",
  },
  {
    icon: Database,
    title: "Centralização de Dados",
    description:
      "Todas as informações financeiras da empresa em um único lugar seguro.",
  },
];

export function BenefitsCards() {
  return (
    <section id="recursos" className="py-20 md:py-28 bg-card">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground text-balance">
            Tudo que você precisa para gerenciar suas finanças
          </h2>
          <p className="mt-4 text-lg text-muted-foreground text-pretty">
            Ferramentas simples de usar para empresas
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {benefits.map((benefit, index) => (
            <Card
              key={index}
              className="group hover:shadow-lg transition-all duration-300 border-border hover:border-primary/30"
            >
              <CardHeader>
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-xl bg-primary/10 group-hover:bg-primary/20 transition-colors">
                    <benefit.icon className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-lg">{benefit.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  {benefit.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
