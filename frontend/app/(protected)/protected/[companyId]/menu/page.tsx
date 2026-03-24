import { CompaniesTable } from "@/src/components/companies/companies-table";
import { CompanyUsersTable } from "@/src/components/companies/companies-users-table";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/src/components/ui/tabs";
import { RegisterCompanyForm } from "@/src/forms/menu/create-company";
import { Company } from "@/src/schemas/company.schema";
import { getCompaniesServer } from "@/src/services/company.service";

type Params = {
  companyId: string;
};

export default async function CompanyPage({
  params,
}: {
  params: Params | Promise<Params>;
}) {
  const resolvedParams = await params;
  const { companyId } = resolvedParams;
  const companies = await getCompaniesServer();

  const company = companies.filter((c) => c.company_id === companyId)[0];

  return (
    <div className="flex flex-col p-6 gap-6 justify-center items-center">
      <Card className="w-full md:w-1/2">
        <CardHeader>
          <CardTitle>Empresa(s)</CardTitle>
          <CardDescription>
            Gerencie as empresas associadas à sua conta.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <CompanyTabs company={company} />
        </CardContent>
      </Card>
    </div>
  );
}

function CompanyTabs({ company }: { company: Company }) {
  return (
    <Tabs defaultValue="company-list">
      <TabsList>
        <TabsTrigger value="company-list">Empresas</TabsTrigger>
        <TabsTrigger value="add-company">Adicionar Empresa</TabsTrigger>
        <TabsTrigger value="company-users">Funcionários</TabsTrigger>
      </TabsList>
      <CompanyList />
      <AddCompany />
      <CompanyUsersList company={company} />
    </Tabs>
  );
}

function CompanyUsersList({ company }: { company: Company }) {
  return (
    <TabsContent value="company-users">
      {company && (
        <div className="flex my-4">
          <p className="rounded-sm border border-blue-600 p-1 text-sm">
            Empresa: {company.name}{" "}
          </p>
        </div>
      )}
      <CompanyUsersTable companyId={company.company_id} />
    </TabsContent>
  );
}

function CompanyList() {
  return (
    <TabsContent value="company-list">
      <h1 className="text-muted-foreground text-sm p-2">
        Selecione uma empresa para visualizar os módulos.
      </h1>
      <CompaniesTable />
    </TabsContent>
  );
}

function AddCompany() {
  return (
    <TabsContent value="add-company">
      <Card className="w-full border-0 shadow-none">
        <CardHeader>
          <CardTitle>Nova Empresa</CardTitle>
          <CardDescription>Cadastre uma empresa</CardDescription>
        </CardHeader>
        <CardContent>
          <RegisterCompanyForm />
        </CardContent>
      </Card>
    </TabsContent>
  );
}
