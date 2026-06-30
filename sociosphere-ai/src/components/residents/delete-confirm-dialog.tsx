// =============================================================
// DELETE CONFIRM DIALOG — Asks for confirmation before deleting.
//
// Shows:
// - Warning message with resident name and flat number
// - "Cancel" button (closes dialog)
// - "Delete" button (destructive style, confirms deletion)
//
// This prevents accidental deletions.
// =============================================================

"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";
import type { Resident } from "@/lib/types";

// Props
interface DeleteConfirmDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;           // Called when "Delete" is clicked
  resident: Resident | null;        // The resident to be deleted
}

export function DeleteConfirmDialog({
  open,
  onOpenChange,
  onConfirm,
  resident,
}: DeleteConfirmDialogProps) {
  // Handle the delete action
  const handleDelete = () => {
    onConfirm();
    onOpenChange(false); // Close the dialog
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          {/* Warning Icon */}
          <div className="mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-destructive/10">
            <AlertTriangle className="h-6 w-6 text-destructive" />
          </div>

          <DialogTitle className="text-center">Delete Resident</DialogTitle>

          <DialogDescription className="text-center">
            Are you sure you want to delete{" "}
            <span className="font-semibold text-foreground">
              {resident?.fullName}
            </span>{" "}
            from Flat{" "}
            <span className="font-semibold text-foreground">
              {resident?.flatNumber}
            </span>
            ? This action cannot be undone.
          </DialogDescription>
        </DialogHeader>

        {/* Action Buttons */}
        <DialogFooter className="sm:justify-center">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button variant="destructive" onClick={handleDelete}>
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
