"use client";

import { useSidebar } from "../../ui/sidebar";
import { CustomTrigger } from "../../ui/sidebar-trigger";

export default function SidebarTriggerMobile() {
  const {
    state,
    open,
    setOpen,
    openMobile,
    setOpenMobile,
    isMobile,
    toggleSidebar,
  } = useSidebar();

  if (!isMobile) return;

  return (
    <div>
      <CustomTrigger />
    </div>
  );
}
