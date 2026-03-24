import { LogoutButton } from "@/src/components/auth/logout-button";
import Image from "next/image";
import BackgroundSlider from "@/src/components/background-slider";


export default async function NoCompaniesLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <BackgroundSlider>
      <nav className="flex justify-between w-full bg-black/20 py-4 px-6 items-center">
        <div className="flex flex-row items-center gap-2">
          <Image
            src="/logo.svg"
            width={20}
            height={20}
            className="w-10"
            alt="Logo 4ps"
          />
          <span className="text-white text-2xl">|</span>
          <span className="text-white text-md">Gestão</span>
        </div>

        <div className="flex gap-2">
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
