import { BanksTable } from "@/src/components/financial/registrations/banks/banks-table";
import { Button } from "@/src/components/ui/button";
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
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/src/components/ui/dialog";
import { TabsContent } from "@/src/components/ui/tabs";
import { RegisterBankForm } from "@/src/forms/financial/registration/bank/create-bank";
import { Plus } from "lucide-react";

export default function TabBanks() {
  return (
    <TabsContent value="banks" className="w-full">
      <Card>
        <div className="flex flex-row justify-between items-center min-w-full">
          <CardHeader className="flex-1">
            <CardTitle>Bancos</CardTitle>
            <CardDescription>
              Cadastre seus bancos para monitorar suas movimentações.
            </CardDescription>
          </CardHeader>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="default" className="mr-4">
                <Plus /> Novo
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Novo Banco</DialogTitle>
              <DialogDescription>Adicione um novo banco</DialogDescription>
              </DialogHeader>
              <RegisterBankForm />
            </DialogContent>
          </Dialog>
        </div>

        <CardContent>
          <BanksTable />
        </CardContent>
      </Card>
    </TabsContent>
  );
}
