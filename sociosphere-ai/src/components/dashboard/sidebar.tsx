// =============================================================
// SIDEBAR — Left-side navigation for the dashboard.
//
// Features:
// - Logo at the top
// - Navigation links with icons
// - Active link highlighting (based on current URL)
// - Collapsible on mobile (controlled by parent layout)
//
// This is a client component because it uses usePathname()
// to detect the active route.
// =============================================================

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { sidebarNavItems } from "@/lib/dummy-data";
import { cn } from "@/lib/utils";
import {
  Building2,
  LayoutDashboard,
  Users,
  UserCheck,
  MessageSquareWarning,
  Wrench,
  CreditCard,
  Megaphone,
  CalendarDays,
  Settings,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

// Map icon names (strings from dummy data) to actual Lucide components
const iconMap: Record<string, LucideIcon> = {
  LayoutDashboard,
  Users,
  UserCheck,
  MessageSquareWarning,
  Wrench,
  CreditCard,
  Megaphone,
  CalendarDays,
  Settings,
};

// Props: onLinkClick is called when a link is clicked (to close mobile sidebar)
interface SidebarProps {
  onLinkClick?: () => void;
}

export function Sidebar({ onLinkClick }: SidebarProps) {
  // Get the current URL path to highlight the active nav item
  const pathname = usePathname();

  return (
    <div className="flex h-full flex-col">
      {/* ---- Logo Section ---- */}
      <div className="flex h-16 items-center gap-2 border-b px-6">
        <Building2 className="h-6 w-6 text-primary" />
        <span className="text-lg font-bold">
          SocioSphere <span className="text-primary">AI</span>
        </span>
      </div>

      {/* ---- Navigation Links ---- */}
      <nav className="flex-1 space-y-1 px-3 py-4">
        {sidebarNavItems.map((item) => {
          // Get the icon component for this nav item
          const Icon = iconMap[item.icon];

          // Check if this link is the currently active page
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onLinkClick}
              className={cn(
                // Base styles for all nav items
                "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200",
                // Active vs inactive styles
                isActive
                  ? "bg-primary/10 text-primary"               // Active: highlighted
                  : "text-muted-foreground hover:bg-accent hover:text-foreground" // Inactive: subtle
              )}
            >
              {Icon && <Icon className="h-5 w-5" />}
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* ---- Bottom Section (optional help link) ---- */}
      <div className="border-t p-4">
        <p className="text-xs text-muted-foreground">
          SocioSphere AI v1.0
        </p>
      </div>
    </div>
  );
}
