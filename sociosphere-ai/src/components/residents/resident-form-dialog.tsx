// =============================================================
// RESIDENT FORM DIALOG — Add or Edit a resident.
//
// This is a single reusable dialog that works in two modes:
// 1. "Add" mode — opens with empty fields
// 2. "Edit" mode — opens pre-filled with existing resident data
//
// Features:
// - Frontend validation (required fields, email/phone format)
// - Error messages shown under invalid fields
// - Uses Shadcn Dialog, Input, Select, Label, Button
//
// HOW IT WORKS:
// - The parent passes `open`, `onOpenChange`, `onSave`, and optionally `resident`
// - If `resident` is provided → Edit mode (pre-fills the form)
// - If `resident` is null → Add mode (empty form)
// =============================================================

"use client";

import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { towerOptions } from "@/lib/residents-data";
import type { Resident, ResidentFormData } from "@/lib/types";

// ---------------------------
// Props
// ---------------------------
interface ResidentFormDialogProps {
  open: boolean;                              // Whether dialog is visible
  onOpenChange: (open: boolean) => void;      // Toggle dialog visibility
  onSave: (data: ResidentFormData) => void;   // Called when form is submitted
  resident?: Resident | null;                 // If provided, pre-fill for editing
}

// ---------------------------
// Empty form data — used for "Add" mode
// ---------------------------
const emptyFormData: ResidentFormData = {
  fullName: "",
  email: "",
  phone: "",
  flatNumber: "",
  tower: "A",
  dateOfBirth: "",
  residentType: "Owner",
  familyMembersCount: 1,
  vehicleNumber: "",
  emergencyContact: "",
  status: "Active",
};

// ---------------------------
// Validation errors type
// ---------------------------
type FormErrors = Partial<Record<keyof ResidentFormData, string>>;

export function ResidentFormDialog({
  open,
  onOpenChange,
  onSave,
  resident,
}: ResidentFormDialogProps) {
  // Form state — holds all field values
  const [formData, setFormData] = useState<ResidentFormData>(emptyFormData);

  // Validation errors — shows messages under fields
  const [errors, setErrors] = useState<FormErrors>({});

  // When the dialog opens, either fill with resident data or reset to empty
  useEffect(() => {
    if (open) {
      if (resident) {
        // Edit mode: pre-fill with existing data
        setFormData({
          fullName: resident.fullName,
          email: resident.email,
          phone: resident.phone,
          flatNumber: resident.flatNumber,
          tower: resident.tower,
          dateOfBirth: resident.dateOfBirth,
          residentType: resident.residentType,
          familyMembersCount: resident.familyMembersCount,
          vehicleNumber: resident.vehicleNumber,
          emergencyContact: resident.emergencyContact,
          status: resident.status,
        });
      } else {
        // Add mode: start with empty form
        setFormData(emptyFormData);
      }
      setErrors({}); // Clear any previous errors
    }
  }, [open, resident]);

  // ---------------------------
  // Update a single form field
  // ---------------------------
  const updateField = (field: keyof ResidentFormData, value: string | number) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear the error for this field when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  // ---------------------------
  // Validate the form before saving
  // Returns true if valid, false if there are errors
  // ---------------------------
  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    // Required field checks
    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      // Simple email format check
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (formData.phone.replace(/\D/g, "").length < 10) {
      // Must have at least 10 digits
      newErrors.phone = "Phone number must have at least 10 digits";
    }

    if (!formData.flatNumber.trim()) {
      newErrors.flatNumber = "Flat number is required";
    }

    if (!formData.emergencyContact.trim()) {
      newErrors.emergencyContact = "Emergency contact is required";
    }

    setErrors(newErrors);
    // Form is valid if there are no errors
    return Object.keys(newErrors).length === 0;
  };

  // ---------------------------
  // Handle form submission
  // ---------------------------
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      onSave(formData);
      onOpenChange(false); // Close the dialog
    }
  };

  // Are we in edit mode?
  const isEditing = !!resident;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {isEditing ? "Edit Resident" : "Add New Resident"}
          </DialogTitle>
          <DialogDescription>
            {isEditing
              ? "Update the resident's details below."
              : "Fill in the details to add a new resident."}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* ---- Row 1: Full Name ---- */}
          <div className="space-y-2">
            <Label htmlFor="fullName">
              Full Name <span className="text-destructive">*</span>
            </Label>
            <Input
              id="fullName"
              value={formData.fullName}
              onChange={(e) => updateField("fullName", e.target.value)}
              placeholder="e.g., Rahul Sharma"
            />
            {errors.fullName && (
              <p className="text-xs text-destructive">{errors.fullName}</p>
            )}
          </div>

          {/* ---- Row 2: Email & Phone ---- */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="email">
                Email <span className="text-destructive">*</span>
              </Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => updateField("email", e.target.value)}
                placeholder="you@example.com"
              />
              {errors.email && (
                <p className="text-xs text-destructive">{errors.email}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">
                Phone <span className="text-destructive">*</span>
              </Label>
              <Input
                id="phone"
                value={formData.phone}
                onChange={(e) => updateField("phone", e.target.value)}
                placeholder="+91 98765 43210"
              />
              {errors.phone && (
                <p className="text-xs text-destructive">{errors.phone}</p>
              )}
            </div>
          </div>

          {/* ---- Row 3: Flat Number & Tower ---- */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="flatNumber">
                Flat Number <span className="text-destructive">*</span>
              </Label>
              <Input
                id="flatNumber"
                value={formData.flatNumber}
                onChange={(e) => updateField("flatNumber", e.target.value)}
                placeholder="e.g., A-401"
              />
              {errors.flatNumber && (
                <p className="text-xs text-destructive">{errors.flatNumber}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label>Tower</Label>
              <Select
                value={formData.tower}
                onValueChange={(val) => updateField("tower", val)}
              >
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {towerOptions.map((tower) => (
                    <SelectItem key={tower} value={tower}>
                      Tower {tower}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* ---- Row 4: DOB & Resident Type ---- */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="dateOfBirth">Date of Birth</Label>
              <Input
                id="dateOfBirth"
                type="date"
                value={formData.dateOfBirth}
                onChange={(e) => updateField("dateOfBirth", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label>Resident Type</Label>
              <Select
                value={formData.residentType}
                onValueChange={(val) => updateField("residentType", val)}
              >
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Owner">Owner</SelectItem>
                  <SelectItem value="Tenant">Tenant</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* ---- Row 5: Family Members & Vehicle ---- */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="familyMembersCount">Family Members</Label>
              <Input
                id="familyMembersCount"
                type="number"
                min={1}
                max={20}
                value={formData.familyMembersCount}
                onChange={(e) =>
                  updateField("familyMembersCount", parseInt(e.target.value) || 1)
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="vehicleNumber">Vehicle Number</Label>
              <Input
                id="vehicleNumber"
                value={formData.vehicleNumber}
                onChange={(e) => updateField("vehicleNumber", e.target.value)}
                placeholder="e.g., MH 01 AB 1234"
              />
            </div>
          </div>

          {/* ---- Row 6: Emergency Contact & Status ---- */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="emergencyContact">
                Emergency Contact <span className="text-destructive">*</span>
              </Label>
              <Input
                id="emergencyContact"
                value={formData.emergencyContact}
                onChange={(e) => updateField("emergencyContact", e.target.value)}
                placeholder="+91 98765 43211"
              />
              {errors.emergencyContact && (
                <p className="text-xs text-destructive">
                  {errors.emergencyContact}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <Label>Status</Label>
              <Select
                value={formData.status}
                onValueChange={(val) => updateField("status", val)}
              >
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Active">Active</SelectItem>
                  <SelectItem value="Inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* ---- Action Buttons ---- */}
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button type="submit">
              {isEditing ? "Save Changes" : "Add Resident"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
