"use client"

import React from "react"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { XCircle, RefreshCw } from "lucide-react"

export default function AwaitingConfirmationPage() {
  const email = "seu@email.com"
  const emailConfirmed = false
  const adminApproved = false

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <Card className="w-full max-w-lg border-border bg-card">
        <CardHeader className="text-center">
          <div className="flex justify-center">
            <div className="flex items-center gap-2 text-primary">
              <span className="text-2xl font-bold text-foreground">4ps</span>
            </div>
          </div>
          <CardTitle className="text-2xl text-foreground">Aguardando confirmação</CardTitle>
          <CardDescription className="text-muted-foreground">Enviamos um e-mail para <strong className="text-foreground">{email}</strong>. Aguarde a confirmação do e-mail e a liberação pelo administrador.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="size-10 flex items-center justify-center rounded-full bg-muted">
                <XCircle className="h-6 w-6 text-destructive" />
              </div>
              <div>
                <div className="font-medium text-foreground">Confirmar e-mail</div>
                <div className="text-sm text-muted-foreground">Clique no link enviado para confirmar seu e-mail.</div>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="size-10 flex items-center justify-center rounded-full bg-muted">
                <XCircle className="h-6 w-6 text-destructive" />
              </div>
              <div>
                <div className="font-medium text-foreground">Liberação por administrador</div>
                <div className="text-sm text-muted-foreground">Aguarde o administrador aprovar sua conta.</div>
              </div>
            </div>

            <div className="flex items-center justify-between gap-2">
              <Button variant="outline" disabled>
                <RefreshCw className="mr-2 h-4 w-4" /> Atualizar status
              </Button>
              <div className="flex gap-2">
                <Link href="/login">
                  <Button variant="ghost">Voltar ao login</Button>
                </Link>
                <Button variant="outline" disabled>
                  Reenviar e-mail
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
