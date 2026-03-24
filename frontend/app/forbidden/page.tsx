import { Button } from "@/src/components/ui/button";
import Image from "next/image";
import { redirect } from "next/navigation";

export default function Forbidden() {
  return (
    <div className="mx-auto flex min-h-dvh flex-col items-center justify-center gap-8 p-8 md:gap-12 md:p-16">
      <Image
        src="403.svg"
        alt="placeholder image"
        width={200}
        height={200}
        className="aspect-video w-240 rounded-xl object-cover dark:brightness-[0.95] dark:invert"
      />
      <div className="text-center">
        <h1 className="mb-2 text-3xl font-bold">Você não tem acesso a esta página</h1>
        <p>Opa! Parece que você não tem acesso a este conteúdo</p>
        <div className="mt-6 flex items-center justify-center gap-4 md:mt-8">
          <Button className="cursor-pointer">Voltar</Button>
        </div>
      </div>
    </div>
  );
}