// =============================================================
// DASHBOARD LAYOUT — The shell that wraps all dashboard pages.
//
// Structure:
// ┌──────────┬─────────────────────────┐
// │          │     Top Navbar          │
// │ Sidebar  ├─────────────────────────┤
// │          │                         │
// │          │    Page Content          │
// │          │    (children)           │
// │          │                         │
// └──────────┴─────────────────────────┘
//
// The sidebar is:
// - Always visible on desktop (lg+)
// - Hidden by default on mobile, shown via a Sheet overlay
// =============================================================

"use client";

import { useState } from "react";
import { Sidebar } from "@/components/dashboard/sidebar";
import { TopNavbar } from "@/components/dashboard/top-navbar";
import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Controls whether the mobile sidebar sheet is open
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      {/* ---- Desktop Sidebar (always visible on lg+ screens) ---- */}
      <aside className="hidden lg:flex lg:w-64 lg:flex-col lg:border-r lg:bg-card">
        <Sidebar />
      </aside>

      {/* ---- Mobile Sidebar (sheet overlay, shown when hamburger is clicked) ---- */}
      <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
        <SheetContent side="left" className="w-64 p-0">
          <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
          <Sidebar onLinkClick={() => setSidebarOpen(false)} />
        </SheetContent>
      </Sheet>

      {/* ---- Main Content Area ---- */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Top navigation bar */}
        <TopNavbar onMenuClick={() => setSidebarOpen(true)} />

        {/* Page content — scrollable */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
