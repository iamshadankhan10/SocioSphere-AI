// =============================================================
// RESIDENT STATS — Dashboard cards for the Residents Module.
//
// Shows 4 stat cards at the top of the residents page:
// 1. Total Residents
// 2. Owners
// 3. Tenants
// 4. Active Residents
//
// The counts are computed from the residents array passed as a prop.
// =============================================================

import { Card, CardContent } from "@/components/ui/card";
import { Users, Home, Key, UserCheck } from "lucide-react";
import type { Resident } from "@/lib/types";

// Props: receives the current list of residents
interface ResidentStatsProps {
  residents: Resident[];
}

export function ResidentStats({ residents }: ResidentStatsProps) {
  // Calculate counts from the residents array
  const totalResidents = residents.length;
  const owners = residents.filter((r) => r.residentType === "Owner").length;
  const tenants = residents.filter((r) => r.residentType === "Tenant").length;
  const activeResidents = residents.filter((r) => r.status === "Active").length;

  // Define the 4 stat cards with their data
  const stats = [
    {
      label: "Total Residents",
      value: totalResidents,
      icon: Users,
      color: "bg-blue-500/10 text-blue-600 dark:text-blue-400",
    },
    {
      label: "Owners",
      value: owners,
      icon: Home,
      color: "bg-purple-500/10 text-purple-600 dark:text-purple-400",
    },
    {
      label: "Tenants",
      value: tenants,
      icon: Key,
      color: "bg-orange-500/10 text-orange-600 dark:text-orange-400",
    },
    {
      label: "Active Residents",
      value: activeResidents,
      icon: UserCheck,
      color: "bg-green-500/10 text-green-600 dark:text-green-400",
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <Card
          key={stat.label}
          className="transition-all duration-300 hover:shadow-lg hover:shadow-primary/5"
        >
          <CardContent className="flex items-center gap-4 p-6">
            {/* Icon */}
            <div className={`rounded-xl p-3 ${stat.color}`}>
              <stat.icon className="h-6 w-6" />
            </div>

            {/* Text */}
            <div>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
              <p className="text-2xl font-bold">{stat.value}</p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
