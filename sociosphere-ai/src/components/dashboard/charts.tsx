// =============================================================
// DASHBOARD CHARTS — Bar chart and Pie chart for the dashboard.
//
// Uses Shadcn's <Chart> component (built on top of Recharts).
//
// 1. MonthlyCollectionChart — Bar chart of monthly maintenance collection
// 2. ComplaintCategoryChart — Pie chart of complaint categories
//
// This is a client component because Recharts needs the browser.
// =============================================================

"use client";

import {
  monthlyCollectionData,
  complaintCategoryData,
} from "@/lib/dummy-data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  Bar,
  BarChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Pie,
  PieChart,
  Cell,
} from "recharts";

// ---------------------------
// Chart configuration — tells Shadcn how to style the charts
// ---------------------------

// Bar chart config: defines the "amount" data series
const barChartConfig = {
  amount: {
    label: "Collection (₹)",
    color: "var(--chart-1)",
  },
};

// Pie chart config: defines each complaint category
const pieChartConfig = {
  Plumbing: { label: "Plumbing", color: "var(--chart-1)" },
  Electrical: { label: "Electrical", color: "var(--chart-2)" },
  Cleanliness: { label: "Cleanliness", color: "var(--chart-3)" },
  Parking: { label: "Parking", color: "var(--chart-4)" },
  Other: { label: "Other", color: "var(--chart-5)" },
};

// ---------------------------
// Monthly Collection Bar Chart
// ---------------------------
export function MonthlyCollectionChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Monthly Collection</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={barChartConfig} className="h-[300px] w-full">
          <BarChart data={monthlyCollectionData}>
            {/* Grid lines for readability */}
            <CartesianGrid strokeDasharray="3 3" className="stroke-border" />

            {/* X-axis: month names */}
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              className="text-xs"
            />

            {/* Y-axis: collection amount */}
            <YAxis
              tickLine={false}
              axisLine={false}
              className="text-xs"
              tickFormatter={(value) => `₹${(value / 1000).toFixed(0)}k`}
            />

            {/* Tooltip on hover */}
            <ChartTooltip content={<ChartTooltipContent />} />

            {/* The actual bars */}
            <Bar
              dataKey="amount"
              fill="var(--chart-1)"
              radius={[6, 6, 0, 0]} // Rounded top corners
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}

// ---------------------------
// Complaint Category Pie Chart
// ---------------------------
export function ComplaintCategoryChart() {
  // Colors for each pie slice
  const COLORS = [
    "var(--chart-1)",
    "var(--chart-2)",
    "var(--chart-3)",
    "var(--chart-4)",
    "var(--chart-5)",
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Complaints by Category</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={pieChartConfig} className="h-[300px] w-full">
          <PieChart>
            <ChartTooltip content={<ChartTooltipContent />} />
            <Pie
              data={complaintCategoryData}
              dataKey="count"
              nameKey="category"
              cx="50%"
              cy="50%"
              innerRadius={60}   // Makes it a donut chart
              outerRadius={100}
              paddingAngle={3}   // Gap between slices
            >
              {/* Color each slice differently */}
              {complaintCategoryData.map((_, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
          </PieChart>
        </ChartContainer>

        {/* Legend — shows category names with colors */}
        <div className="mt-4 flex flex-wrap justify-center gap-4">
          {complaintCategoryData.map((item, index) => (
            <div key={item.category} className="flex items-center gap-2 text-sm">
              <div
                className="h-3 w-3 rounded-full"
                style={{ backgroundColor: COLORS[index] }}
              />
              <span className="text-muted-foreground">{item.category}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
