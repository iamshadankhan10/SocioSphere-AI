// =============================================================
// STATS CARD — Reusable card component for dashboard metrics.
//
// Displays:
// - An icon on the left
// - A label (e.g., "Total Residents")
// - A value (e.g., "1,248")
// - A trend indicator (e.g., "+12% ▲" in green)
//
// Used on the Admin Dashboard Home page.
// =============================================================

import { Card, CardContent } from "@/components/ui/card";
import {
  Users,
  UserCheck,
  MessageSquareWarning,
  IndianRupee,
  TrendingUp,
  TrendingDown,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

// Map icon names to Lucide components
const iconMap: Record<string, LucideIcon> = {
  Users,
  UserCheck,
  MessageSquareWarning,
  IndianRupee,
};

// Define the shape of data this component expects
interface StatsCardProps {
  label: string;
  value: string;
  change: string;
  trend: "up" | "down";
  icon: string;
}

export function StatsCard({ label, value, change, trend, icon }: StatsCardProps) {
  const Icon = iconMap[icon];

  return (
    <Card className="transition-all duration-300 hover:shadow-lg hover:shadow-primary/5">
      <CardContent className="flex items-center gap-4 p-6">
        {/* Icon Container */}
        <div className="rounded-xl bg-primary/10 p-3">
          {Icon && <Icon className="h-6 w-6 text-primary" />}
        </div>

        {/* Text Content */}
        <div className="flex-1">
          {/* Label */}
          <p className="text-sm text-muted-foreground">{label}</p>

          {/* Value + Trend */}
          <div className="flex items-center gap-2">
            <p className="text-2xl font-bold">{value}</p>

            {/* Trend Badge (green for up, red for down) */}
            <span
              className={cn(
                "inline-flex items-center gap-0.5 rounded-full px-2 py-0.5 text-xs font-medium",
                trend === "up"
                  ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                  : "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
              )}
            >
              {trend === "up" ? (
                <TrendingUp className="h-3 w-3" />
              ) : (
                <TrendingDown className="h-3 w-3" />
              )}
              {change}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
