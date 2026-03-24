import Link from "next/link";
import { Button } from "@/src/components/ui/button";
import { ArrowRight, CheckCircle2 } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 right-0 w-150 h-150 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-100 h-100 bg-primary/10 rounded-full blur-3xl" />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
            </span>
            Simplifique suas finanças empresariais
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground tracking-tight text-balance">
            O controle financeiro que sua empresa precisa para{" "}
            <span className="text-primary">crescer</span>
          </h1>

          <p className="mt-6 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto text-pretty leading-relaxed">
            Organize receitas, despesas e relatórios em um único lugar. Tenha
            visão clara do seu negócio e tome decisões mais inteligentes.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button size="lg" className="text-base px-8 h-12" asChild>
              <Link href="/auth/sign-up">
                Criar Conta 
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="text-base px-8 h-12 bg-transparent"
              asChild
            >
              <Link href="/auth/login">Fazer Login</Link>
            </Button>
          </div>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-primary" />
              <span>Configuração em minutos</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-primary" />
              <span>Suporte especializado</span>
            </div>
          </div>
        </div>

        <div className="mt-16 md:mt-20">
          <div className="relative mx-auto max-w-5xl">
            <div className="absolute -inset-4 bg-primary/20 rounded-2xl blur-2xl" />
            <div className="relative rounded-xl border border-border bg-card shadow-2xl overflow-hidden">
              <div className="flex items-center gap-2 px-4 py-3 bg-muted border-b border-border">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-400" />
                  <div className="w-3 h-3 rounded-full bg-yellow-400" />
                  <div className="w-3 h-3 rounded-full bg-green-400" />
                </div>
                <span className="text-xs text-muted-foreground ml-2">
                  Dashboard - 4ps
                </span>
              </div>
              <div className="p-6 md:p-8 bg-card">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <DashboardCard
                    title="Receita Mensal"
                    value="R$ 124.580"
                    trend="+12.5%"
                    positive
                  />
                  <DashboardCard
                    title="Despesas"
                    value="R$ 48.320"
                    trend="-8.3%"
                    positive
                  />
                  <DashboardCard
                    title="Lucro Líquido"
                    value="R$ 76.260"
                    trend="+23.1%"
                    positive
                  />
                </div>
                <div className="h-40 md:h-48 bg-muted rounded-lg flex items-end justify-around gap-2 p-4">
                  {[65, 45, 80, 55, 90, 70, 85, 60, 95, 75, 88, 92].map(
                    (height, i) => (
                      <div
                        key={i}
                        className="w-full max-w-8 bg-primary rounded-t-md transition-all duration-300"
                        style={{ height: `${height}%` }}
                      />
                    )
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function DashboardCard({
  title,
  value,
  trend,
  positive,
}: {
  title: string;
  value: string;
  trend: string;
  positive: boolean;
}) {
  return (
    <div className="bg-muted rounded-lg p-4">
      <p className="text-sm text-muted-foreground">{title}</p>
      <p className="text-2xl font-bold text-foreground mt-1">{value}</p>
      <p
        className={`text-sm mt-1 ${positive ? "text-blue-600" : "text-red-600"}`}
      >
        {trend} este mês
      </p>
    </div>
  );
}
