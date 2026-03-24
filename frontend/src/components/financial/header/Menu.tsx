"use client";

import * as React from "react";
import { Button } from "@/src/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/src/components/ui/dropdown-menu";
import { ListItem } from "@/src/components/start-menu/menu-nav";
import { Grid2X2 } from "lucide-react";
import { useParams } from "next/navigation";

interface HeaderMenuProps {
  userInitial: string;
}

export function HeaderMenu({ userInitial }: HeaderMenuProps) {
  const params = useParams();
  const selectedCompanyId = params.companyId as string;

  return (
    <div className="flex flex-row justify-center items-baseline">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button className="bg-primary hover:bg-blue-800 text-white rounded-full h-10 w-10">
            {userInitial}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <ListItem title="Menu" icon={Grid2X2} href={`/protected/${selectedCompanyId}/menu`} />
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
