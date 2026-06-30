// =============================================================
// RECENT ACTIVITIES — Shows a feed of latest society activities.
//
// Each activity has:
// - A colored dot (based on type: resident, visitor, etc.)
// - A description
// - A timestamp
//
// Data comes from dummy-data.ts
// =============================================================

import { recentActivities } from "@/lib/dummy-data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

// Color map for the activity dot based on type
const dotColorMap: Record<string, string> = {
  resident: "bg-blue-500",
  visitor: "bg-green-500",
  complaint: "bg-orange-500",
  payment: "bg-purple-500",
  event: "bg-pink-500",
  notice: "bg-yellow-500",
};

export function RecentActivities() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Recent Activities</CardTitle>
      </CardHeader>
      <CardContent>
        {/* Activity List */}
        <div className="space-y-4">
          {recentActivities.map((activity) => (
            <div
              key={activity.id}
              className="flex items-start gap-3 rounded-lg p-3 transition-colors hover:bg-muted/50"
            >
              {/* Colored Dot — indicates activity type */}
              <div
                className={cn(
                  "mt-1.5 h-2.5 w-2.5 shrink-0 rounded-full",
                  dotColorMap[activity.type] || "bg-gray-500"
                )}
              />

              {/* Activity Content */}
              <div className="flex-1 min-w-0">
                <p className="text-sm leading-relaxed">
                  {activity.description}
                </p>
                <p className="mt-1 text-xs text-muted-foreground">
                  {activity.time}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
