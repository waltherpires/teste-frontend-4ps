"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/src/components/ui/button";
import { Menu, X } from "lucide-react";

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg">
              <span className="text-xl font-semibold p-2 bg-primary rounded-full text-white">
                4ps
              </span>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-8">
            <Link
              href="#beneficios"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Benefícios
            </Link>
            <Link
              href="#como-funciona"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Como Funciona
            </Link>
            <Link
              href="#recursos"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Recursos
            </Link>
          </nav>

          <div className="hidden md:flex items-center gap-3">
            <Button className="cursor-pointer" variant="ghost" asChild>
              <Link href="/auth/login">Fazer Login</Link>
            </Button>
            <Button className="cursor-pointer" asChild>
              <Link href="/auth/sign-up">Criar Conta</Link>
            </Button>
          </div>

          <button
            type="button"
            className="md:hidden p-2 text-muted-foreground hover:text-foreground"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? "Fechar menu" : "Abrir menu"}
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden border-t border-border bg-background">
          <div className="px-4 py-4 space-y-3">
            <Link
              href="#beneficios"
              className="block text-sm font-medium text-muted-foreground hover:text-foreground"
              onClick={() => setMobileMenuOpen(false)}
            >
              Benefícios
            </Link>
            <Link
              href="#como-funciona"
              className="block text-sm font-medium text-muted-foreground hover:text-foreground"
              onClick={() => setMobileMenuOpen(false)}
            >
              Como Funciona
            </Link>
            <Link
              href="#recursos"
              className="block text-sm font-medium text-muted-foreground hover:text-foreground"
              onClick={() => setMobileMenuOpen(false)}
            >
              Recursos
            </Link>
            <div className="pt-3 flex flex-col gap-2">
              <Button
                variant="outline"
                className="w-full bg-transparent"
                asChild
              >
                <Link href="/auth/login">Fazer Login</Link>
              </Button>
              <Button className="w-full" asChild>
                <Link href="/auth/sign-up">Criar Conta</Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
