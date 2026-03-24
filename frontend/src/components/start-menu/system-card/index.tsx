import { cn } from "@/src/lib/utils";
import Link from "next/link";
import { ReactNode } from "react";

type SystemCardProps = {
  icon: ReactNode;
  color?: string;
  title: string;
  description?: string;
  disabled?: boolean;
  href?: string;
};

/**
 * @params icon: ReactNode - O ícone a ser exibido no cartão.
 * @params color: string - A cor de fundo do cartão (padrão: "white").
 * @params title: string - O título a ser exibido no cartão.
 * @params description: string - Uma descrição opcional para o cartão.
 * @params disabled: boolean - Indica se o cartão está desabilitado (padrão: false).
 * @params href: string - O link para onde o cartão deve redirecionar (padrão: "#").
 *
 * O componente SystemCard é um cartão estilizado que pode ser usado para representar diferentes sistemas ou funcionalidades em um menu de início. Ele aceita um ícone, um título, uma cor de fundo e um link para redirecionamento. O cartão pode ser desabilitado, o que altera sua aparência e impede a interação do usuário.
 */
export default function SystemCard({
  href = "#",
  icon,
  color = "bg-white",
  title,
  disabled = false,
  description
}: SystemCardProps) {
  return (
    <Link
      href={href}
      className={cn("transition duration-300 flex flex-col justify-between rounded-md sm:w-100 min-h-32 lg:h-38 shadow px-4 py-6", color, disabled ? "opacity-60 cursor-not-allowed hover:bg-gray-300" : "")}
    >
      <div className="flex flex-row w-full justify-between text-white">
        <span className="mt-1">{title}</span>
        {icon}
      </div>

      {description && <p className="text-sm text-white/80">{description}</p>}
    </Link>
  );
}
