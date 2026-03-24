"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/src/components/ui/sidebar";
import { RiDashboardFill, RiMoneyDollarCircleFill } from "react-icons/ri";
import {
  BiSolidReport,
  BiSolidWallet,
  BiSolidBarChartSquare,
} from "react-icons/bi";
import { AiFillFileAdd, AiFillWarning } from "react-icons/ai";
import { MdCreateNewFolder } from "react-icons/md";
import { useParams, usePathname } from "next/navigation";
import Link from "next/link";
import { cn } from "@/src/lib/utils";
import { JwtPayload } from "@supabase/supabase-js";
import { LogoutButton } from "../../auth/logout-button";
import { LogOut } from "lucide-react";
import { useEffect } from "react";
import { CustomTrigger } from "../../ui/sidebar-trigger";

const financialMenuItems: {
  title: string;
  getHref: (companyId: string) => string;
  icon: React.ComponentType;
}[] = [
  {
    title: "Dashboard",
    getHref: (companyId) => `/protected/${companyId}/financial/dashboard`,
    icon: () => <RiDashboardFill />,
  },
  {
    title: "DRE",
    getHref: (companyId) => `/protected/${companyId}/financial/dre`,
    icon: () => <BiSolidReport />,
  },
  {
    title: "DFC",
    getHref: () => "#",
    /*   href: "/protected/financial/dfc", */
    icon: () => <BiSolidWallet />,
  },
  {
    title: "Lançamentos",
    getHref: () => "#",
    /*    href: "/protected/financial/entries", */
    icon: () => <AiFillFileAdd />,
  },
  {
    title: "Orçamento",
    getHref: () => "#",
    /*    href: "/protected/financial/budget", */
    icon: () => <BiSolidBarChartSquare />,
  },
  {
    title: "Inadimplência",
    getHref: () => "#",
    /*     href: "/protected/financial/delinquents", */
    icon: () => <AiFillWarning />,
  },
  {
    title: "Precificação",
    getHref: () => "#",
    /*   href: "/protected/financial/pricing", */
    icon: () => <RiMoneyDollarCircleFill />,
  },
  {
    title: "Cadastros",
    getHref: (companyId) => `/protected/${companyId}/financial/registrations`,
    icon: () => <MdCreateNewFolder />,
  },
  {
    title: "Endividamento",
    getHref: () => "#",
    /*  href: "/protected/financial/indebtedness", */
    icon: () => <BiSolidBarChartSquare />,
  },
];

export interface FinancialSidebarProps {
  claims: JwtPayload | undefined;
}

export default function FinancialSidebar({ claims }: FinancialSidebarProps) {
  const {
    state,
    open,
    setOpen,
    openMobile,
    setOpenMobile,
    isMobile,
    toggleSidebar,
  } = useSidebar();

  useEffect(() => {
    if (isMobile) {
      setOpen(true);
    }
  }, [isMobile, setOpen]);

  const pathname = usePathname();
  const params = useParams();
  const companyId = params.companyId as string;

  if (!companyId) return null;

  function isActive(href: string) {
    return pathname.startsWith(href);
  }

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader
        className={cn(
          "items-end justify-end",
          "max-w-full mb-2",
          isMobile ? "mt-2 min-h-12" : "mt-2 min-h-12",
        )}
      >
        <CustomTrigger />
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu className="border-t-2">
          {financialMenuItems.map((item) => {
            const href = item.getHref(companyId);
            const active = isActive(href);

            return (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton
                  className={cn(
                    open
                      ? "flex items-center justify-start m-2 w-[90%]"
                      : "flex items-center justify-center m-2 w-[90%]",
                  )}
                  size="lg"
                  isActive={active}
                  asChild
                >
                  <Link href={href}>
                    <item.icon />
                    {open && <span>{item.title}</span>}
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter className="border-t-2">
        <SidebarGroup className="flex flex-col gap-6">
          <SidebarGroupLabel className="text-md text-black ">
            {claims
              ? `${claims.user_metadata?.display_name.split(" ")[0]}`
              : "Info"}
          </SidebarGroupLabel>
          <SidebarGroupContent
            className={cn(
              open
                ? "flex items-center justify-start m-2 w-[90%]"
                : "flex items-center justify-center m-2 w-[40%]",
            )}
          >
            <div className="flex flex-col">
              <LogoutButton
                variant="ghost"
                icon={LogOut}
                label="Sair"
                collapsed={!open}
              />
            </div>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarFooter>
    </Sidebar>
  );
}
