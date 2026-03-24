import BackgroundSlider from "@/src/components/background-slider";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";

import { CircleX } from "lucide-react";
import Link from "next/link";

export default function Page() {
  return (
    <BackgroundSlider>
      <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
        <div className="w-full max-w-sm">
          <div className="flex flex-col gap-6">
            <Card>
              <CardHeader className="text-center">
                <CardTitle className="text-2xl">
                  Obrigado por se cadastrar!
                </CardTitle>
                <CardDescription>
                  Verifique seu email para confirmar
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex gap-2 items-center">
                  <div className="flex items-center justify-center bg-gray-100 rounded-full p-2">
                    <CircleX className="text-red-500 w-8 h-8" />
                  </div>
                  <div className="flex flex-col">
                    <h1>Confirmar E-mail</h1>
                    <p className="text-sm text-muted-foreground">
                      Cheque sua caixa de entrada para confirmar seu e-mail.
                    </p>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Link href="/auth/login" className="self-end">
                  Voltar ao Login
                </Link>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </BackgroundSlider>
  );
}
