import HeaderFinancial from "@/src/components/financial/header";
import FinancialRegistrationTabs from "./tabs";

export default function FinancialRegistrationsPage() {
  return (
    <>
      <HeaderFinancial
        title="Cadastros"
        description="Gerencie tipos de receita, despesas, clientes, fornecedores e mais"
      />
      <div className="flex flex-col w-full mt-4">
        <FinancialRegistrationTabs />
      </div>
    </>
  );
}
