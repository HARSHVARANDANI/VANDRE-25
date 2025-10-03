import { Outlet } from "react-router-dom";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { ThemeToggle } from "@/components/ThemeToggle";
import { useState } from "react";

export const MainApp = () => {
  const [billDraft, setBillDraft] = useState({
    products: [],
    finalPrice: 0,
  });

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        <div className="flex-1 flex flex-col">
          <header className="h-16 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-40">
            <div className="flex items-center justify-between h-full px-4">
              <SidebarTrigger />
              <ThemeToggle />
            </div>
          </header>
          <main className="flex-1 p-6">
            <Outlet context={{ billDraft, setBillDraft }} />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};
