import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { BgProvider } from "@/src/context/bg-context";
import { Toaster } from "@/src/components/ui/sonner";

const _inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Gestão Financeira Empresarial",
  description:
    "Sistema de gestão financeira e análise de desempenho para consultoria empresarial",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={`${_inter.className}  antialiased`}>
        <BgProvider>{children}</BgProvider>
        <Toaster />
      </body>
    </html>
  );
}
