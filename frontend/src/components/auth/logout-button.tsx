"use client";

import { createClient } from "@/src/lib/client";
import { Button } from "@/src/components/ui/button";
import { useRouter } from "next/navigation";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog";

export interface LogoutButtonProps {
  variant?: "ghost" | "outline" | "default";
  className?: string;
  icon?: React.ComponentType<{ className?: string }>;
  label: string;
  collapsed?: boolean;
}

export function LogoutButton({
  variant = "ghost",
  className,
  icon,
  label,
  collapsed = false,
}: LogoutButtonProps) {
  const router = useRouter();

  const logout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/auth/login");
  };

  const Icon = icon;

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant={variant} className={className}>
          {Icon && <Icon />}
          {collapsed ? "" : label}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Sair</AlertDialogTitle>
          <AlertDialogDescription>
            Tem certeza que deseja sair?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="cursor-pointer">
            Cancelar
          </AlertDialogCancel>
          <AlertDialogAction className="cursor-pointer" onClick={logout}>
            Sair
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
