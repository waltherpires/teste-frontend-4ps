import { createClient } from "@/src/lib/server";
import BackgroundSlider from "@/src/components/background-slider";
import Link from "next/link";
import Image from "next/image";
import { MenuNav } from "@/src/components/start-menu/menu-nav";
import { CompanySwitcher } from "@/src/components/company-switcher";
import { LogoutButton } from "@/src/components/auth/logout-button";
import { getModulesServer } from "@/src/services/company.service";
import { ModulesList } from "@/src/components/start-menu/system-card/list-cards";

type Params = {
  companyId: string;
};

export default async function ProtectedPage({
  params,
}: {
  params: Params | Promise<Params>;
}) {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getClaims();

  const resolvedParams = await params;
  const { companyId } = resolvedParams;

  let link;
  let modules;
  let activeModulesMap;
  if (companyId === undefined) {
    link = `/protected/${companyId}/menu`;
  } else {
    link = `/protected/${companyId}`;
    modules = await getModulesServer({ companyId });
    activeModulesMap = new Map(modules.map((m) => [m.slug, m.is_active]));
  }

  return (
    <BackgroundSlider>
      <nav className="flex justify-between w-full bg-black/20 py-4 px-6 items-center">
        <Link href={link} className="flex gap-2 items-center">
          <Image
            src="/logo.svg"
            width={20}
            height={20}
            className="w-10"
            alt="Logo 4ps"
          />
          <span className="text-white text-2xl">|</span>
          <span className="text-white text-md">Gestão</span>
        </Link>
        <div className="flex gap-2">
          <MenuNav companyId={companyId} />
          <CompanySwitcher />
          <LogoutButton
            className="cursor-pointer text-white hover:text-white hover:bg-blue-800"
            label="Sair"
          />
        </div>
      </nav>
      <div className="flex flex-col gap-6">
        <div className="flex flex-col p-6 gap-6">
          <p className="text-white px-4 py-2 bg-black/50 rounded-md max-w-max text-wrap">
            Bem vindo,{" "}
            <span>
              {data ? `${data.claims.user_metadata?.display_name}!` : ""} O que
              vamos fazer hoje?
            </span>
          </p>
          {companyId !== undefined && (
            <ModulesList
              companyId={companyId}
              activeModulesMap={activeModulesMap}
            />
          )}
        </div>
      </div>
    </BackgroundSlider>
  );
}
