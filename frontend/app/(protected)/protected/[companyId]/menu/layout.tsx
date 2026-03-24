import { LogoutButton } from "@/src/components/auth/logout-button";
import BackgroundSlider from "@/src/components/background-slider";
import { CompanySwitcher } from "@/src/components/company-switcher";
import { MenuNav } from "@/src/components/start-menu/menu-nav";
import Image from "next/image";
import Link from "next/link";

export default async function MenuLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ companyId: string }>;
}>) {
  const { companyId } = await params;

  return (
    <BackgroundSlider>
      <nav className="flex justify-between w-full bg-black/20 py-4 px-6 items-center">
        <Link
          href={`/protected/${companyId}/menu`}
          className="flex gap-2 items-center"
        >
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
          <MenuNav companyId={companyId}/>
          <CompanySwitcher />
          <LogoutButton
            className="cursor-pointer text-white hover:text-white hover:bg-blue-800"
            label="Sair"
          />
        </div>
      </nav>
      <div className="flex flex-col gap-6">{children}</div>
    </BackgroundSlider>
  );
}
