export const dynamic = "force-dynamic";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/src/components/ui/dialog";
import { RegisterCompanyForm } from "@/src/forms/menu/create-company";
import { Building2Icon, HourglassIcon } from "lucide-react";
import { getCompaniesServer } from "@/src/services/company.service";
import { redirect } from "next/navigation";

export default async function NoCompanies() {
  const companies = await getCompaniesServer();

  if (companies.length > 0) redirect("/protected");

  return (
    <div className="flex flex-col p-6 gap-6 justify-center items-center">
      <Card className="w-full md:w-1/2">
        <CardHeader>
          <CardTitle>Sem empresas</CardTitle>
          <CardDescription>
            Registre sua empresa ou aguarde algum convite.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid grid-cols-7">
          <Dialog>
            <DialogTrigger asChild>
              <button className="col-span-3 cursor-pointer flex flex-col  items-center gap-6 rounded-sm border p-8 text-center hover:bg-gray-300 transition duration-300">
                <Building2Icon className="w-8 h-8" />
                <h1 className="text-sm">Cadastre uma empresa</h1>
              </button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-sm">
              <DialogHeader>
                <DialogTitle></DialogTitle>
              </DialogHeader>
              <RegisterCompanyForm />
            </DialogContent>
          </Dialog>

          <div className="col-span-1 flex h-full items-center justify-center">
            <h1 className="text-center font-semibold text-lg">Ou</h1>
          </div>
          <button className="col-span-3 flex flex-col items-center gap-6 rounded-sm border p-8 text-center ">
            <HourglassIcon className="w-8 h-8" />
            <h1 className="text-sm">Aguarde até receber um convite.</h1>
          </button>
        </CardContent>
      </Card>
    </div>
  );
}
