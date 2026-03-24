import Link from "next/link";
import { Button } from "@/src/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";

export function FinalCTA() {
  return (
    <section className="py-20 md:py-28 bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl bg-primary px-8 py-16 md:px-16 md:py-20">
          <div className="absolute inset-0 -z-10">
            <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full blur-2xl" />
          </div>

          <div className="relative text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 text-primary-foreground text-sm font-medium mb-6">
              <Sparkles className="h-4 w-4" />
              Comece hoje mesmo
            </div>

            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary-foreground text-balance">
              Transforme a gestão financeira da sua empresa
            </h2>

            <p className="mt-6 text-lg md:text-xl text-primary-foreground/80 max-w-2xl mx-auto text-pretty leading-relaxed">
              Cadastre-se e comece a ter controle total.
            </p>

            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button
                size="lg"
                variant="secondary"
                className="cursor-pointer text-base px-8 h-12 bg-white text-primary hover:bg-white/90"
                asChild
              >
                <Link href="/auth/sign-up">
                  Criar Conta
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
