import {
  UserPlus,
  FileSpreadsheet,
  BarChart3,
  Lightbulb,
  TrendingUp,
} from "lucide-react";

const steps = [
  {
    icon: UserPlus,
    title: "Cadastro Rápido",
    description:
      "Crie sua conta em menos de 2 minutos. Sem burocracia, sem complicação.",
  },
  {
    icon: FileSpreadsheet,
    title: "Organize suas Finanças",
    description:
      "Registre receitas e despesas de forma simples e categorizada automaticamente.",
  },
  {
    icon: BarChart3,
    title: "Visualize Relatórios",
    description:
      "Acompanhe gráficos e relatórios que mostram a real situação do seu negócio.",
  },
  {
    icon: Lightbulb,
    title: "Tome Decisões Inteligentes",
    description:
      "Com dados claros, você sabe exatamente onde investir e onde economizar.",
  },
  {
    icon: TrendingUp,
    title: "Cresça seu Negócio",
    description:
      "Empresas organizadas crescem mais rápido. O controle financeiro é o primeiro passo.",
  },
];

export function JourneyTimeline() {
  return (
    <section id="como-funciona" className="py-20 md:py-28 bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground text-balance">
            Sua jornada para o controle financeiro
          </h2>
          <p className="mt-4 text-lg text-muted-foreground text-pretty">
            Em poucos passos, você terá visibilidade total das finanças da sua
            empresa
          </p>
        </div>

        <div className="relative">
          {/* Timeline line - desktop */}
          <div className="hidden md:block absolute top-16 left-0 right-0 h-0.5 bg-border" />

          <div className="grid md:grid-cols-5 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="relative">
                {/* Mobile timeline */}
                <div className="md:hidden absolute left-6 top-12 bottom-0 w-0.5 bg-border" />

                <div className="flex md:flex-col items-start md:items-center gap-4 md:gap-0">
                  {/* Step number */}
                  <div className="relative z-10 flex-shrink-0">
                    <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary text-primary-foreground font-bold text-lg shadow-lg shadow-primary/25">
                      {index + 1}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="md:mt-6 md:text-center">
                    <div className="inline-flex md:mx-auto items-center justify-center w-10 h-10 rounded-lg bg-primary/10 mb-3">
                      <step.icon className="h-5 w-5 text-primary" />
                    </div>
                    <h3 className="text-lg font-semibold text-foreground">
                      {step.title}
                    </h3>
                    <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
