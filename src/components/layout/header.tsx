"use client";

import { SidebarTrigger } from "@/components/ui/sidebar";
import { useIsMobile } from "@/hooks/use-mobile";

export function AppHeader() {
  const isMobile = useIsMobile();
  return (
    <header className="flex h-14 items-center gap-4 border-b bg-card px-4 lg:h-[60px] lg:px-6">
       <SidebarTrigger />
       <div className="flex-1">
        {/* Can add breadcrumbs or page title here */}
       </div>
    </header>
  );
}
