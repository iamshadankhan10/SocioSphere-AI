// =============================================================
// RESIDENT PROFILE HEADER — Top section of the detail page.
//
// Shows:
// - Large avatar with initials
// - Resident name, flat, tower
// - Badges for Type and Status
// - Quick contact info (phone, email)
// - "Back" button to return to residents list
// =============================================================

import Link from "next/link";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, Mail, Phone, MapPin } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Resident } from "@/lib/types";
import { getInitials } from "@/lib/residents-data";

interface ResidentProfileHeaderProps {
  resident: Resident;
}

export function ResidentProfileHeader({ resident }: ResidentProfileHeaderProps) {
  return (
    <div className="space-y-4">
      {/* ---- Back Button ---- */}
      <Button variant="ghost" className="gap-2" render={<Link href="/dashboard/residents" />}>
        <ArrowLeft className="h-4 w-4" />
        Back to Residents
      </Button>

      {/* ---- Profile Card ---- */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col items-center gap-6 sm:flex-row sm:items-start">
            {/* Large Avatar */}
            <Avatar className="h-20 w-20 text-2xl">
              <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                {getInitials(resident.fullName)}
              </AvatarFallback>
            </Avatar>

            {/* Info Section */}
            <div className="flex-1 text-center sm:text-left">
              {/* Name */}
              <h1 className="text-2xl font-bold">{resident.fullName}</h1>

              {/* Flat & Tower */}
              <div className="mt-1 flex items-center justify-center gap-2 text-muted-foreground sm:justify-start">
                <MapPin className="h-4 w-4" />
                <span>
                  Flat {resident.flatNumber}, Tower {resident.tower}
                </span>
              </div>

              {/* Badges */}
              <div className="mt-3 flex items-center justify-center gap-2 sm:justify-start">
                <Badge
                  className={cn(
                    resident.residentType === "Owner"
                      ? "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400"
                      : "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400"
                  )}
                >
                  {resident.residentType}
                </Badge>
                <Badge
                  className={cn(
                    resident.status === "Active"
                      ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                      : "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
                  )}
                >
                  {resident.status}
                </Badge>
              </div>

              {/* Contact Details */}
              <div className="mt-4 flex flex-col items-center gap-3 sm:flex-row sm:items-start">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Phone className="h-4 w-4" />
                  {resident.phone}
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Mail className="h-4 w-4" />
                  {resident.email}
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
