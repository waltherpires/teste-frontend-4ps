import { AlertCircle, ArrowRight, CheckCircle } from "lucide-react";

export function ProblemSolution() {
  const problems = [
    "Planilhas confusas e desatualizadas",
    "Falta de visão do fluxo de caixa",
    "Dificuldade em identificar gastos excessivos",
    "Decisões baseadas em achismo",
  ];

  const solutions = [
    "Dados organizados e sempre atualizados",
    "Visão completa e em tempo real",
    "Relatórios que mostram onde economizar",
    "Decisões baseadas em dados concretos",
  ];

  return (
    <section id="beneficios" className="py-20 md:py-28 bg-card">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground text-balance">
            Chega de perder tempo com processos financeiros confusos
          </h2>
          <p className="mt-4 text-lg text-muted-foreground text-pretty">
            Sabemos como é difícil gerenciar as finanças de uma empresa sem as
            ferramentas certas. A 4ps foi criada para resolver isso.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 lg:gap-16 items-center">
          <div className="bg-red-50 rounded-2xl p-8 border border-red-100">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-red-100 rounded-lg">
                <AlertCircle className="h-6 w-6 text-red-600" />
              </div>
              <h3 className="text-xl font-semibold text-red-900">Os Problemas</h3>
            </div>
            <ul className="space-y-4">
              {problems.map((problem, index) => (
                <li key={index} className="flex items-start gap-3">
                  <span className="mt-1.5 h-2 w-2 rounded-full bg-red-400 shrink-0" />
                  <span className="text-red-800">{problem}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="relative">

            <div className="bg-green-50 rounded-2xl p-8 border border-green-100">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-green-100 rounded-lg">
                  <CheckCircle className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold text-green-900">
                  As Soluções
                </h3>
              </div>
              <ul className="space-y-4">
                {solutions.map((solution, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle className="mt-0.5 h-5 w-5 text-green-600 shrink-0" />
                    <span className="text-green-800">{solution}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
