// =============================================================
// TYPES — TypeScript interfaces for the Residents Module.
//
// These types define the "shape" of our data. Think of them as
// blueprints that tell TypeScript what fields each object should have.
//
// Keeping types in a separate file makes them reusable across
// components, pages, and data files.
// =============================================================

// ---------------------------
// Resident — The main resident object
// ---------------------------
export interface Resident {
  id: string;                    // Unique identifier (e.g., "RES-001")
  fullName: string;              // Full name of the resident
  email: string;                 // Email address
  phone: string;                 // Phone number
  flatNumber: string;            // e.g., "A-401"
  tower: string;                 // e.g., "A", "B", "C", "D"
  dateOfBirth: string;           // ISO date string (e.g., "1990-05-15")
  residentType: "Owner" | "Tenant"; // Whether they own or rent
  status: "Active" | "Inactive";    // Current occupancy status
  familyMembersCount: number;    // Total family members
  vehicleNumber: string;         // Primary vehicle plate number
  emergencyContact: string;      // Emergency phone number
  moveInDate: string;            // When they moved in (ISO date)
  profilePhoto: string;          // URL to profile photo (or initials)

  // Related data for the detail page
  familyMembers: FamilyMember[];
  vehicles: Vehicle[];
  payments: PaymentRecord[];
  complaints: ComplaintRecord[];
  visitors: VisitorRecord[];
}

// ---------------------------
// Family Member — People living with the resident
// ---------------------------
export interface FamilyMember {
  id: string;
  name: string;
  relation: string;   // e.g., "Spouse", "Son", "Daughter", "Parent"
  age: number;
}

// ---------------------------
// Vehicle — Vehicles registered to the resident
// ---------------------------
export interface Vehicle {
  id: string;
  type: "Car" | "Bike" | "Scooter" | "Bicycle";
  number: string;     // License plate number
  color: string;
  model: string;      // e.g., "Hyundai i20", "Honda Activa"
}

// ---------------------------
// Payment Record — Maintenance payment history
// ---------------------------
export interface PaymentRecord {
  id: string;
  month: string;        // e.g., "June 2026"
  amount: number;       // Amount in INR
  status: "Paid" | "Pending" | "Overdue";
  paidDate: string | null;  // null if not yet paid
}

// ---------------------------
// Complaint Record — Complaints raised by the resident
// ---------------------------
export interface ComplaintRecord {
  id: string;
  title: string;        // e.g., "Water leakage in bathroom"
  category: string;     // e.g., "Plumbing", "Electrical"
  status: "Open" | "In Progress" | "Resolved";
  createdDate: string;
}

// ---------------------------
// Visitor Record — Visitors who came for this resident
// ---------------------------
export interface VisitorRecord {
  id: string;
  name: string;
  purpose: string;     // e.g., "Delivery", "Guest", "Service"
  visitDate: string;
  inTime: string;      // e.g., "10:30 AM"
  outTime: string;     // e.g., "11:15 AM"
}

// ---------------------------
// Form Data — Used by the Add/Edit form (subset of Resident)
// This doesn't include related data like family, vehicles, etc.
// ---------------------------
export interface ResidentFormData {
  fullName: string;
  email: string;
  phone: string;
  flatNumber: string;
  tower: string;
  dateOfBirth: string;
  residentType: "Owner" | "Tenant";
  familyMembersCount: number;
  vehicleNumber: string;
  emergencyContact: string;
  status: "Active" | "Inactive";
}
