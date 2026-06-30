// =============================================================
// ADMIN DASHBOARD HOME — The main dashboard overview page.
//
// Shows:
// 1. Page title with welcome message
// 2. Stats overview cards (4 cards in a grid)
// 3. Charts (bar chart + pie chart side by side)
// 4. Recent activities feed
//
// All data is dummy data from dummy-data.ts
// =============================================================

import { dashboardStats } from "@/lib/dummy-data";
import { StatsCard } from "@/components/dashboard/stats-card";
import { RecentActivities } from "@/components/dashboard/recent-activities";
import {
  MonthlyCollectionChart,
  ComplaintCategoryChart,
} from "@/components/dashboard/charts";

export default function DashboardHomePage() {
  return (
    <div className="space-y-8">
      {/* ---- Page Header ---- */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
          Dashboard
        </h1>
        <p className="mt-1 text-muted-foreground">
          Welcome back, Shadan! Here&apos;s what&apos;s happening in your
          society.
        </p>
      </div>

      {/* ---- Stats Overview Cards ---- */}
      {/* 
        Grid layout:
        - 1 column on mobile
        - 2 columns on small screens
        - 4 columns on large screens 
      */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {dashboardStats.map((stat) => (
          <StatsCard
            key={stat.id}
            label={stat.label}
            value={stat.value}
            change={stat.change}
            trend={stat.trend}
            icon={stat.icon}
          />
        ))}
      </div>

      {/* ---- Charts Section ---- */}
      {/* Two charts side by side on large screens, stacked on mobile */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <MonthlyCollectionChart />
        <ComplaintCategoryChart />
      </div>

      {/* ---- Recent Activities ---- */}
      <RecentActivities />
    </div>
  );
}
