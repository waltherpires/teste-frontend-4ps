"use client";

import * as React from "react";
import Link from "next/link";
import { Grid2X2, Building2, LucideProps, BoxIcon } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../ui/dropdown-menu";
import { Button } from "../../ui/button";

type Props = {
  companyId: string;
};

const components: {
  title: string;
  href: (companyId: string) => string;
  icon: React.ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>
  >;
}[] = [
  {
    title: "Empresas",
    href: (companyId: string) => `/protected/${companyId}/menu`,
    icon: Building2,
  },
  {
    title: "Módulos",
    href: (companyId: string) => `/protected/${companyId}`,
    icon: BoxIcon,
  },
];

export function MenuNav({ companyId }: Props) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="cursor-pointer text-primary bg-white hover:bg-gray-200">
          <Grid2X2 className="w-12 h-12" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <div className="flex flex-col gap-2 justify-center">
          {components.map((component) => {
            const href = component.href(companyId);

            return (
              <ListItem
                key={component.title}
                title={component.title}
                href={href}
                icon={component.icon}
              />
            );
          })}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export function ListItem({
  title,
  href,
  icon: IconComponent,
  ...props
}: {
  title: string;
  href: string;
  icon: React.ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>
  >;
}) {
  return (
    <div {...props}>
      <DropdownMenuItem asChild>
        <Link href={href}>
          <div className="flex items-center gap-2 text-sm">
            <IconComponent className="h-4 w-4" />
            <div className="leading-none font-medium">{title}</div>
          </div>
        </Link>
      </DropdownMenuItem>
    </div>
  );
}
