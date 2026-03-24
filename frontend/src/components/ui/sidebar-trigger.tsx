"use client";

import { useSidebar } from "@/src/components/ui/sidebar";
import { Button } from "./button";
import { ArrowRight, Menu } from "lucide-react";
import { cn } from "@/src/lib/utils";
import { useIsMobile } from "@/src/hooks/use-mobile";

export interface CustomTriggerProps extends React.ComponentProps<
  typeof Button
> {
  classname?: string;
}

export function CustomTrigger({ classname, ...props }: CustomTriggerProps) {
  const { toggleSidebar, open } = useSidebar();
  const isMobile = useIsMobile();

  let style;
  if (isMobile) {
    style = cn(
      "bg-transparent hover:bg-xtet-white text-primary w-8 h-8",
      classname,
    );
  } else {
    style = cn(
      "not-dark:bg-gray-300 text-black w-8 h-8",
      classname,
    );
  }

  let iconStyle;
  if (isMobile) {
    iconStyle = cn("transition-transform");
  } else {
    iconStyle = cn("transition-transform", open ? "rotate-180" : "");
  }

  return (
    <Button className={style} onClick={toggleSidebar}>
      {!isMobile && <ArrowRight className={iconStyle} />}
      {isMobile && <Menu  className={iconStyle} />}
    </Button>
  );
}
