// =============================================================
// RESIDENTS FILTERS — Search bar and filter dropdowns.
//
// Features:
// - Text search (by name or flat number)
// - Tower filter dropdown
// - Resident type filter dropdown
// - Status filter dropdown
// - "Add Resident" button
//
// This is a client component because it manages filter state.
// =============================================================

"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Search, Plus } from "lucide-react";
import { towerOptions } from "@/lib/residents-data";

// Props: filter values and their setter functions
interface ResidentsFiltersProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  towerFilter: string;
  onTowerChange: (value: string) => void;
  typeFilter: string;
  onTypeChange: (value: string) => void;
  statusFilter: string;
  onStatusChange: (value: string) => void;
  onAddClick: () => void;
}

export function ResidentsFilters({
  searchQuery,
  onSearchChange,
  towerFilter,
  onTowerChange,
  typeFilter,
  onTypeChange,
  statusFilter,
  onStatusChange,
  onAddClick,
}: ResidentsFiltersProps) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      {/* ---- Left side: Search & Filters ---- */}
      <div className="flex flex-1 flex-col gap-3 sm:flex-row sm:items-center">
        {/* Search Input */}
        <div className="relative w-full sm:max-w-xs">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search by name or flat..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Filter Dropdowns */}
        <div className="flex flex-wrap gap-2">
          {/* Tower Filter */}
          <Select value={towerFilter} onValueChange={onTowerChange}>
            <SelectTrigger className="w-[120px]">
              <SelectValue placeholder="Tower" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Towers</SelectItem>
              {towerOptions.map((tower) => (
                <SelectItem key={tower} value={tower}>
                  Tower {tower}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Type Filter */}
          <Select value={typeFilter} onValueChange={onTypeChange}>
            <SelectTrigger className="w-[120px]">
              <SelectValue placeholder="Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="Owner">Owner</SelectItem>
              <SelectItem value="Tenant">Tenant</SelectItem>
            </SelectContent>
          </Select>

          {/* Status Filter */}
          <Select value={statusFilter} onValueChange={onStatusChange}>
            <SelectTrigger className="w-[120px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="Active">Active</SelectItem>
              <SelectItem value="Inactive">Inactive</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* ---- Right side: Add Button ---- */}
      <Button onClick={onAddClick} className="gap-2">
        <Plus className="h-4 w-4" />
        Add Resident
      </Button>
    </div>
  );
}
