// =============================================================
// RESIDENTS PAGE — The main Residents Management page.
//
// This is the "brain" of the Residents module. It:
// 1. Holds all state (residents list, filters, dialog visibility)
// 2. Composes the reusable components together
// 3. Handles CRUD operations (Add, Edit, Delete)
//
// Layout:
// - Page header
// - Stat cards (Total, Owners, Tenants, Active)
// - Search & filter bar
// - Residents data table
// - Dialogs (Add/Edit form, Delete confirmation)
//
// All data is in-memory using React state (no backend).
// =============================================================

"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { initialResidents } from "@/lib/residents-data";
import type { Resident, ResidentFormData } from "@/lib/types";

// Import our reusable components
import { ResidentStats } from "@/components/residents/resident-stats";
import { ResidentsFilters } from "@/components/residents/residents-filters";
import { ResidentsTable } from "@/components/residents/residents-table";
import { ResidentFormDialog } from "@/components/residents/resident-form-dialog";
import { DeleteConfirmDialog } from "@/components/residents/delete-confirm-dialog";

export default function ResidentsPage() {
  const router = useRouter();

  // ---------------------------
  // STATE: Residents list (starts with dummy data)
  // ---------------------------
  const [residents, setResidents] = useState<Resident[]>(initialResidents);

  // ---------------------------
  // STATE: Filter values
  // ---------------------------
  const [searchQuery, setSearchQuery] = useState("");
  const [towerFilter, setTowerFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  // ---------------------------
  // STATE: Dialog visibility and selected resident
  // ---------------------------
  const [formDialogOpen, setFormDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedResident, setSelectedResident] = useState<Resident | null>(null);

  // ---------------------------
  // FILTERED RESIDENTS
  // useMemo recalculates only when filters or residents change.
  // This is more efficient than filtering on every render.
  // ---------------------------
  const filteredResidents = useMemo(() => {
    return residents.filter((resident) => {
      // Search filter: match name or flat number
      const matchesSearch =
        searchQuery === "" ||
        resident.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        resident.flatNumber.toLowerCase().includes(searchQuery.toLowerCase());

      // Tower filter
      const matchesTower =
        towerFilter === "all" || resident.tower === towerFilter;

      // Type filter
      const matchesType =
        typeFilter === "all" || resident.residentType === typeFilter;

      // Status filter
      const matchesStatus =
        statusFilter === "all" || resident.status === statusFilter;

      // Resident must match ALL filters
      return matchesSearch && matchesTower && matchesType && matchesStatus;
    });
  }, [residents, searchQuery, towerFilter, typeFilter, statusFilter]);

  // ---------------------------
  // ACTION: View resident detail page
  // ---------------------------
  const handleView = (resident: Resident) => {
    router.push(`/dashboard/residents/${resident.id}`);
  };

  // ---------------------------
  // ACTION: Open "Add" dialog
  // ---------------------------
  const handleAdd = () => {
    setSelectedResident(null); // No resident selected = Add mode
    setFormDialogOpen(true);
  };

  // ---------------------------
  // ACTION: Open "Edit" dialog with pre-filled data
  // ---------------------------
  const handleEdit = (resident: Resident) => {
    setSelectedResident(resident);
    setFormDialogOpen(true);
  };

  // ---------------------------
  // ACTION: Open "Delete" confirmation
  // ---------------------------
  const handleDeleteClick = (resident: Resident) => {
    setSelectedResident(resident);
    setDeleteDialogOpen(true);
  };

  // ---------------------------
  // ACTION: Save resident (Add or Edit)
  // ---------------------------
  const handleSave = (formData: ResidentFormData) => {
    if (selectedResident) {
      // EDIT MODE: Update the existing resident
      setResidents((prev) =>
        prev.map((r) =>
          r.id === selectedResident.id
            ? { ...r, ...formData } // Merge form data into existing resident
            : r
        )
      );
    } else {
      // ADD MODE: Create a new resident with a generated ID
      const newResident: Resident = {
        id: `RES-${String(residents.length + 1).padStart(3, "0")}`,
        ...formData,
        moveInDate: new Date().toISOString().split("T")[0], // Today's date
        profilePhoto: "",
        familyMembers: [],
        vehicles: [],
        payments: [],
        complaints: [],
        visitors: [],
      };
      setResidents((prev) => [newResident, ...prev]); // Add to top of list
    }
  };

  // ---------------------------
  // ACTION: Confirm deletion
  // ---------------------------
  const handleDeleteConfirm = () => {
    if (selectedResident) {
      setResidents((prev) => prev.filter((r) => r.id !== selectedResident.id));
      setSelectedResident(null);
    }
  };

  // ---------------------------
  // RENDER
  // ---------------------------
  return (
    <div className="space-y-6">
      {/* ---- Page Header ---- */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
          Residents
        </h1>
        <p className="mt-1 text-muted-foreground">
          Manage all residents, their details, and occupancy information.
        </p>
      </div>

      {/* ---- Stat Cards ---- */}
      <ResidentStats residents={residents} />

      {/* ---- Search & Filters ---- */}
      <ResidentsFilters
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        towerFilter={towerFilter}
        onTowerChange={setTowerFilter}
        typeFilter={typeFilter}
        onTypeChange={setTypeFilter}
        statusFilter={statusFilter}
        onStatusChange={setStatusFilter}
        onAddClick={handleAdd}
      />

      {/* ---- Residents Table ---- */}
      <ResidentsTable
        residents={filteredResidents}
        onView={handleView}
        onEdit={handleEdit}
        onDelete={handleDeleteClick}
      />

      {/* ---- Add/Edit Dialog ---- */}
      <ResidentFormDialog
        open={formDialogOpen}
        onOpenChange={setFormDialogOpen}
        onSave={handleSave}
        resident={selectedResident}
      />

      {/* ---- Delete Confirmation Dialog ---- */}
      <DeleteConfirmDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        onConfirm={handleDeleteConfirm}
        resident={selectedResident}
      />
    </div>
  );
}
