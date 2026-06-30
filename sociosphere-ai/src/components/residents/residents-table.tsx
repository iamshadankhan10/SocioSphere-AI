// =============================================================
// RESIDENTS TABLE — Displays residents in a responsive data table.
//
// Columns:
// - Avatar (initials), Name, Flat, Tower, Phone, Email,
//   Family Members, Type, Status, Actions (View/Edit/Delete)
//
// Features:
// - Horizontal scroll on mobile for responsiveness
// - Color-coded status and type badges
// - Action buttons emit events to parent via callbacks
// - Empty state when no residents match filters
// =============================================================

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Eye, Pencil, Trash2, Users } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Resident } from "@/lib/types";
import { getInitials } from "@/lib/residents-data";

// Props: residents to display + action callbacks
interface ResidentsTableProps {
  residents: Resident[];
  onView: (resident: Resident) => void;
  onEdit: (resident: Resident) => void;
  onDelete: (resident: Resident) => void;
}

export function ResidentsTable({
  residents,
  onView,
  onEdit,
  onDelete,
}: ResidentsTableProps) {
  // ---- Empty State ----
  if (residents.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-lg border border-dashed py-16">
        <Users className="h-12 w-12 text-muted-foreground/50" />
        <h3 className="mt-4 text-lg font-semibold">No residents found</h3>
        <p className="mt-1 text-sm text-muted-foreground">
          Try adjusting your search or filter criteria.
        </p>
      </div>
    );
  }

  return (
    // Wrapper for horizontal scroll on small screens
    <div className="rounded-lg border overflow-x-auto">
      <Table>
        {/* ---- Table Header ---- */}
        <TableHeader>
          <TableRow>
            <TableHead className="w-[250px]">Resident</TableHead>
            <TableHead>Flat</TableHead>
            <TableHead>Tower</TableHead>
            <TableHead className="hidden md:table-cell">Phone</TableHead>
            <TableHead className="hidden lg:table-cell">Email</TableHead>
            <TableHead className="hidden sm:table-cell">Family</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>

        {/* ---- Table Body ---- */}
        <TableBody>
          {residents.map((resident) => (
            <TableRow
              key={resident.id}
              className="cursor-pointer hover:bg-muted/50"
              onClick={() => onView(resident)}
            >
              {/* Resident Name + Avatar */}
              <TableCell>
                <div className="flex items-center gap-3">
                  <Avatar className="h-9 w-9">
                    <AvatarFallback className="bg-primary/10 text-primary text-xs font-medium">
                      {getInitials(resident.fullName)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{resident.fullName}</p>
                    <p className="text-xs text-muted-foreground md:hidden">
                      {resident.phone}
                    </p>
                  </div>
                </div>
              </TableCell>

              {/* Flat Number */}
              <TableCell className="font-medium">{resident.flatNumber}</TableCell>

              {/* Tower */}
              <TableCell>{resident.tower}</TableCell>

              {/* Phone (hidden on mobile) */}
              <TableCell className="hidden md:table-cell">
                {resident.phone}
              </TableCell>

              {/* Email (hidden on small screens) */}
              <TableCell className="hidden lg:table-cell text-muted-foreground">
                {resident.email}
              </TableCell>

              {/* Family Members Count (hidden on very small screens) */}
              <TableCell className="hidden sm:table-cell">
                {resident.familyMembersCount}
              </TableCell>

              {/* Resident Type Badge */}
              <TableCell>
                <Badge
                  className={cn(
                    "text-xs",
                    resident.residentType === "Owner"
                      ? "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400"
                      : "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400"
                  )}
                >
                  {resident.residentType}
                </Badge>
              </TableCell>

              {/* Status Badge */}
              <TableCell>
                <Badge
                  className={cn(
                    "text-xs",
                    resident.status === "Active"
                      ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                      : "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
                  )}
                >
                  {resident.status}
                </Badge>
              </TableCell>

              {/* Action Buttons */}
              <TableCell className="text-right">
                <div className="flex items-center justify-end gap-1">
                  {/* View Button */}
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={(e) => {
                      e.stopPropagation(); // Prevent row click
                      onView(resident);
                    }}
                    className="text-muted-foreground hover:text-foreground"
                  >
                    <Eye className="h-4 w-4" />
                    <span className="sr-only">View</span>
                  </Button>

                  {/* Edit Button */}
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={(e) => {
                      e.stopPropagation();
                      onEdit(resident);
                    }}
                    className="text-muted-foreground hover:text-foreground"
                  >
                    <Pencil className="h-4 w-4" />
                    <span className="sr-only">Edit</span>
                  </Button>

                  {/* Delete Button */}
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={(e) => {
                      e.stopPropagation();
                      onDelete(resident);
                    }}
                    className="text-muted-foreground hover:text-destructive"
                  >
                    <Trash2 className="h-4 w-4" />
                    <span className="sr-only">Delete</span>
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
