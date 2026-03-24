import { Tabs, TabsList, TabsTrigger } from "@/src/components/ui/tabs";
import TabBanks from "./banks";

export default function FinancialRegistrationTabs() {
  return (
    <Tabs defaultValue="registrations" className="max-w-full mx-4">
      <TabsList className="flex items-center justify-start flex-wrap h-auto space-y-1">
        <TabsTrigger
          value="income"
          className="data-[state=active]:border data-[state=active]:border-gray-400"
        >
          Receitas
        </TabsTrigger>
        <TabsTrigger
          value="expenses"
          className="data-[state=active]:border data-[state=active]:border-gray-400"
        >
          Gastos
        </TabsTrigger>
        <TabsTrigger
          value="customers"
          className="data-[state=active]:border data-[state=active]:border-gray-400"
        >
          Clientes
        </TabsTrigger>
        <TabsTrigger
          value="suppliers"
          className="data-[state=active]:border data-[state=active]:border-gray-400"
        >
          Fornecedores
        </TabsTrigger>
        <TabsTrigger
          value="products"
          className="data-[state=active]:border data-[state=active]:border-gray-400"
        >
          Produtos
        </TabsTrigger>
        <TabsTrigger
          value="banks"
          className="data-[state=active]:border data-[state=active]:border-gray-400"
        >
          Bancos
        </TabsTrigger>
        <TabsTrigger
          value="projects"
          className="data-[state=active]:border data-[state=active]:border-gray-400"
        >
          Projetos
        </TabsTrigger>
        <TabsTrigger
          value="payments"
          className="data-[state=active]:border data-[state=active]:border-gray-400"
        >
          Formas de Pagamento
        </TabsTrigger>
      </TabsList>
      <TabBanks />
    </Tabs>
  );
}
