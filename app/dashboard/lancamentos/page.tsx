import { Header } from "@/components/dashboard/header"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { TitulosAReceber } from "@/components/lancamentos/titulos-a-receber"
import { TitulosAPagar } from "@/components/lancamentos/titulos-a-pagar"
import { TransferenciaEntreBancos } from "@/components/lancamentos/transferencia-entre-bancos"

export default function LancamentosPage() {
  return (
    <div className="flex flex-col h-full">
      <Header title="Lançamentos" description="Gestão de títulos a receber, títulos a pagar e transferências bancárias" />

      <div className="flex-1 p-6 space-y-6">
        <Tabs defaultValue="titulos-receber" className="w-full">
          <TabsList className="bg-secondary">
            <TabsTrigger value="titulos-receber">Títulos a Receber</TabsTrigger>
            <TabsTrigger value="titulos-pagar">Títulos a Pagar</TabsTrigger>
            <TabsTrigger value="transferencias">Transferência entre Bancos</TabsTrigger>
          </TabsList>

          <TabsContent value="titulos-receber" className="mt-6">
            <TitulosAReceber />
          </TabsContent>

          <TabsContent value="titulos-pagar" className="mt-6">
            <TitulosAPagar />
          </TabsContent>

          <TabsContent value="transferencias" className="mt-6">
            <TransferenciaEntreBancos />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
