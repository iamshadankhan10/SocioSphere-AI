// =============================================================
// RESIDENTS DUMMY DATA — Mock data for the Residents Module.
//
// This file contains 12 dummy residents with realistic details.
// Each resident has related data: family, vehicles, payments,
// complaints, and visitors.
//
// When you connect a real backend, replace this with API calls.
// =============================================================

import type { Resident } from "@/lib/types";

// ---------------------------
// Helper: Generate initials from a name (used as avatar fallback)
// e.g., "Rahul Sharma" → "RS"
// ---------------------------
export function getInitials(name: string): string {
  return name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

// ---------------------------
// Tower options for filters and forms
// ---------------------------
export const towerOptions = ["A", "B", "C", "D"];

// ---------------------------
// 12 Dummy Residents
// ---------------------------
export const initialResidents: Resident[] = [
  {
    id: "RES-001",
    fullName: "Rahul Sharma",
    email: "rahul.sharma@email.com",
    phone: "+91 98765 43210",
    flatNumber: "A-401",
    tower: "A",
    dateOfBirth: "1988-03-15",
    residentType: "Owner",
    status: "Active",
    familyMembersCount: 4,
    vehicleNumber: "MH 01 AB 1234",
    emergencyContact: "+91 98765 43211",
    moveInDate: "2020-06-15",
    profilePhoto: "",
    familyMembers: [
      { id: "FM-001", name: "Priya Sharma", relation: "Spouse", age: 35 },
      { id: "FM-002", name: "Aarav Sharma", relation: "Son", age: 10 },
      { id: "FM-003", name: "Anaya Sharma", relation: "Daughter", age: 7 },
    ],
    vehicles: [
      { id: "V-001", type: "Car", number: "MH 01 AB 1234", color: "White", model: "Hyundai i20" },
      { id: "V-002", type: "Bike", number: "MH 01 CD 5678", color: "Black", model: "Royal Enfield Classic 350" },
    ],
    payments: [
      { id: "P-001", month: "June 2026", amount: 5500, status: "Paid", paidDate: "2026-06-05" },
      { id: "P-002", month: "May 2026", amount: 5500, status: "Paid", paidDate: "2026-05-03" },
      { id: "P-003", month: "April 2026", amount: 5500, status: "Paid", paidDate: "2026-04-07" },
    ],
    complaints: [
      { id: "C-001", title: "Water leakage in bathroom", category: "Plumbing", status: "Resolved", createdDate: "2026-05-20" },
      { id: "C-002", title: "Parking space dispute", category: "Parking", status: "Open", createdDate: "2026-06-10" },
    ],
    visitors: [
      { id: "VIS-001", name: "Amit Kumar", purpose: "Guest", visitDate: "2026-06-28", inTime: "10:30 AM", outTime: "12:00 PM" },
      { id: "VIS-002", name: "Amazon Delivery", purpose: "Delivery", visitDate: "2026-06-27", inTime: "2:15 PM", outTime: "2:20 PM" },
    ],
  },
  {
    id: "RES-002",
    fullName: "Sneha Patel",
    email: "sneha.patel@email.com",
    phone: "+91 87654 32109",
    flatNumber: "B-202",
    tower: "B",
    dateOfBirth: "1992-07-22",
    residentType: "Tenant",
    status: "Active",
    familyMembersCount: 2,
    vehicleNumber: "MH 02 EF 9012",
    emergencyContact: "+91 87654 32110",
    moveInDate: "2023-01-10",
    profilePhoto: "",
    familyMembers: [
      { id: "FM-004", name: "Rohan Patel", relation: "Spouse", age: 34 },
    ],
    vehicles: [
      { id: "V-003", type: "Car", number: "MH 02 EF 9012", color: "Silver", model: "Maruti Swift" },
    ],
    payments: [
      { id: "P-004", month: "June 2026", amount: 4500, status: "Pending", paidDate: null },
      { id: "P-005", month: "May 2026", amount: 4500, status: "Paid", paidDate: "2026-05-08" },
      { id: "P-006", month: "April 2026", amount: 4500, status: "Paid", paidDate: "2026-04-05" },
    ],
    complaints: [
      { id: "C-003", title: "Lift not working", category: "Electrical", status: "In Progress", createdDate: "2026-06-25" },
    ],
    visitors: [
      { id: "VIS-003", name: "Swiggy Delivery", purpose: "Delivery", visitDate: "2026-06-28", inTime: "1:00 PM", outTime: "1:05 PM" },
    ],
  },
  {
    id: "RES-003",
    fullName: "Vikram Malhotra",
    email: "vikram.m@email.com",
    phone: "+91 76543 21098",
    flatNumber: "C-103",
    tower: "C",
    dateOfBirth: "1985-11-08",
    residentType: "Owner",
    status: "Active",
    familyMembersCount: 5,
    vehicleNumber: "MH 03 GH 3456",
    emergencyContact: "+91 76543 21099",
    moveInDate: "2019-03-20",
    profilePhoto: "",
    familyMembers: [
      { id: "FM-005", name: "Meera Malhotra", relation: "Spouse", age: 38 },
      { id: "FM-006", name: "Arjun Malhotra", relation: "Son", age: 14 },
      { id: "FM-007", name: "Kavya Malhotra", relation: "Daughter", age: 11 },
      { id: "FM-008", name: "Kamla Malhotra", relation: "Mother", age: 65 },
    ],
    vehicles: [
      { id: "V-004", type: "Car", number: "MH 03 GH 3456", color: "Red", model: "Honda City" },
      { id: "V-005", type: "Scooter", number: "MH 03 IJ 7890", color: "Blue", model: "Honda Activa" },
    ],
    payments: [
      { id: "P-007", month: "June 2026", amount: 5500, status: "Paid", paidDate: "2026-06-02" },
      { id: "P-008", month: "May 2026", amount: 5500, status: "Paid", paidDate: "2026-05-01" },
      { id: "P-009", month: "April 2026", amount: 5500, status: "Paid", paidDate: "2026-04-03" },
    ],
    complaints: [],
    visitors: [
      { id: "VIS-004", name: "Ravi Plumber", purpose: "Service", visitDate: "2026-06-20", inTime: "9:00 AM", outTime: "10:30 AM" },
    ],
  },
  {
    id: "RES-004",
    fullName: "Priya Nair",
    email: "priya.nair@email.com",
    phone: "+91 65432 10987",
    flatNumber: "D-501",
    tower: "D",
    dateOfBirth: "1995-01-30",
    residentType: "Tenant",
    status: "Active",
    familyMembersCount: 1,
    vehicleNumber: "",
    emergencyContact: "+91 65432 10988",
    moveInDate: "2024-08-01",
    profilePhoto: "",
    familyMembers: [],
    vehicles: [],
    payments: [
      { id: "P-010", month: "June 2026", amount: 4000, status: "Paid", paidDate: "2026-06-10" },
      { id: "P-011", month: "May 2026", amount: 4000, status: "Paid", paidDate: "2026-05-12" },
      { id: "P-012", month: "April 2026", amount: 4000, status: "Overdue", paidDate: null },
    ],
    complaints: [
      { id: "C-004", title: "AC not cooling", category: "Electrical", status: "Open", createdDate: "2026-06-28" },
    ],
    visitors: [],
  },
  {
    id: "RES-005",
    fullName: "Aditya Joshi",
    email: "aditya.joshi@email.com",
    phone: "+91 54321 09876",
    flatNumber: "A-302",
    tower: "A",
    dateOfBirth: "1990-09-12",
    residentType: "Owner",
    status: "Active",
    familyMembersCount: 3,
    vehicleNumber: "MH 01 KL 2345",
    emergencyContact: "+91 54321 09877",
    moveInDate: "2021-02-28",
    profilePhoto: "",
    familyMembers: [
      { id: "FM-009", name: "Neha Joshi", relation: "Spouse", age: 32 },
      { id: "FM-010", name: "Vivaan Joshi", relation: "Son", age: 5 },
    ],
    vehicles: [
      { id: "V-006", type: "Car", number: "MH 01 KL 2345", color: "Grey", model: "Tata Nexon" },
    ],
    payments: [
      { id: "P-013", month: "June 2026", amount: 5500, status: "Paid", paidDate: "2026-06-01" },
      { id: "P-014", month: "May 2026", amount: 5500, status: "Paid", paidDate: "2026-05-02" },
    ],
    complaints: [],
    visitors: [
      { id: "VIS-005", name: "Flipkart Delivery", purpose: "Delivery", visitDate: "2026-06-29", inTime: "11:00 AM", outTime: "11:10 AM" },
    ],
  },
  {
    id: "RES-006",
    fullName: "Kavita Deshmukh",
    email: "kavita.d@email.com",
    phone: "+91 43210 98765",
    flatNumber: "B-104",
    tower: "B",
    dateOfBirth: "1978-04-05",
    residentType: "Owner",
    status: "Active",
    familyMembersCount: 4,
    vehicleNumber: "MH 04 MN 6789",
    emergencyContact: "+91 43210 98766",
    moveInDate: "2018-11-15",
    profilePhoto: "",
    familyMembers: [
      { id: "FM-011", name: "Suresh Deshmukh", relation: "Spouse", age: 50 },
      { id: "FM-012", name: "Manish Deshmukh", relation: "Son", age: 22 },
      { id: "FM-013", name: "Pooja Deshmukh", relation: "Daughter", age: 19 },
    ],
    vehicles: [
      { id: "V-007", type: "Car", number: "MH 04 MN 6789", color: "Black", model: "Toyota Innova" },
      { id: "V-008", type: "Scooter", number: "MH 04 OP 1234", color: "Red", model: "TVS Jupiter" },
    ],
    payments: [
      { id: "P-015", month: "June 2026", amount: 5500, status: "Paid", paidDate: "2026-06-04" },
      { id: "P-016", month: "May 2026", amount: 5500, status: "Paid", paidDate: "2026-05-05" },
    ],
    complaints: [
      { id: "C-005", title: "Garbage not collected", category: "Cleanliness", status: "Resolved", createdDate: "2026-06-01" },
    ],
    visitors: [
      { id: "VIS-006", name: "Dr. Mehta", purpose: "Guest", visitDate: "2026-06-25", inTime: "4:00 PM", outTime: "6:00 PM" },
    ],
  },
  {
    id: "RES-007",
    fullName: "Arjun Reddy",
    email: "arjun.reddy@email.com",
    phone: "+91 32109 87654",
    flatNumber: "C-305",
    tower: "C",
    dateOfBirth: "1993-12-18",
    residentType: "Tenant",
    status: "Active",
    familyMembersCount: 2,
    vehicleNumber: "MH 05 QR 5678",
    emergencyContact: "+91 32109 87655",
    moveInDate: "2025-04-01",
    profilePhoto: "",
    familyMembers: [
      { id: "FM-014", name: "Divya Reddy", relation: "Spouse", age: 30 },
    ],
    vehicles: [
      { id: "V-009", type: "Bike", number: "MH 05 QR 5678", color: "Yellow", model: "KTM Duke 390" },
    ],
    payments: [
      { id: "P-017", month: "June 2026", amount: 4500, status: "Pending", paidDate: null },
      { id: "P-018", month: "May 2026", amount: 4500, status: "Overdue", paidDate: null },
    ],
    complaints: [
      { id: "C-006", title: "Noisy neighbours", category: "Other", status: "Open", createdDate: "2026-06-15" },
    ],
    visitors: [],
  },
  {
    id: "RES-008",
    fullName: "Meena Kapoor",
    email: "meena.kapoor@email.com",
    phone: "+91 21098 76543",
    flatNumber: "D-201",
    tower: "D",
    dateOfBirth: "1982-06-25",
    residentType: "Owner",
    status: "Inactive",
    familyMembersCount: 3,
    vehicleNumber: "MH 06 ST 9012",
    emergencyContact: "+91 21098 76544",
    moveInDate: "2017-09-10",
    profilePhoto: "",
    familyMembers: [
      { id: "FM-015", name: "Raj Kapoor", relation: "Spouse", age: 45 },
      { id: "FM-016", name: "Sanya Kapoor", relation: "Daughter", age: 16 },
    ],
    vehicles: [
      { id: "V-010", type: "Car", number: "MH 06 ST 9012", color: "Blue", model: "Kia Seltos" },
    ],
    payments: [
      { id: "P-019", month: "June 2026", amount: 5500, status: "Pending", paidDate: null },
      { id: "P-020", month: "May 2026", amount: 5500, status: "Pending", paidDate: null },
    ],
    complaints: [],
    visitors: [],
  },
  {
    id: "RES-009",
    fullName: "Sanjay Gupta",
    email: "sanjay.gupta@email.com",
    phone: "+91 10987 65432",
    flatNumber: "A-102",
    tower: "A",
    dateOfBirth: "1975-08-03",
    residentType: "Owner",
    status: "Active",
    familyMembersCount: 5,
    vehicleNumber: "MH 07 UV 3456",
    emergencyContact: "+91 10987 65433",
    moveInDate: "2016-05-01",
    profilePhoto: "",
    familyMembers: [
      { id: "FM-017", name: "Sunita Gupta", relation: "Spouse", age: 48 },
      { id: "FM-018", name: "Rohit Gupta", relation: "Son", age: 25 },
      { id: "FM-019", name: "Nisha Gupta", relation: "Daughter", age: 22 },
      { id: "FM-020", name: "Ramesh Gupta", relation: "Father", age: 72 },
    ],
    vehicles: [
      { id: "V-011", type: "Car", number: "MH 07 UV 3456", color: "White", model: "Mahindra XUV700" },
      { id: "V-012", type: "Car", number: "MH 07 WX 7890", color: "Black", model: "BMW 3 Series" },
    ],
    payments: [
      { id: "P-021", month: "June 2026", amount: 5500, status: "Paid", paidDate: "2026-06-01" },
      { id: "P-022", month: "May 2026", amount: 5500, status: "Paid", paidDate: "2026-05-01" },
    ],
    complaints: [
      { id: "C-007", title: "Street light not working", category: "Electrical", status: "Resolved", createdDate: "2026-04-10" },
    ],
    visitors: [
      { id: "VIS-007", name: "Sharma Family", purpose: "Guest", visitDate: "2026-06-22", inTime: "6:00 PM", outTime: "9:00 PM" },
    ],
  },
  {
    id: "RES-010",
    fullName: "Anjali Singh",
    email: "anjali.singh@email.com",
    phone: "+91 09876 54321",
    flatNumber: "B-403",
    tower: "B",
    dateOfBirth: "1998-02-14",
    residentType: "Tenant",
    status: "Active",
    familyMembersCount: 1,
    vehicleNumber: "",
    emergencyContact: "+91 09876 54322",
    moveInDate: "2025-09-15",
    profilePhoto: "",
    familyMembers: [],
    vehicles: [
      { id: "V-013", type: "Bicycle", number: "N/A", color: "Green", model: "Hero Sprint" },
    ],
    payments: [
      { id: "P-023", month: "June 2026", amount: 4000, status: "Paid", paidDate: "2026-06-08" },
      { id: "P-024", month: "May 2026", amount: 4000, status: "Paid", paidDate: "2026-05-10" },
    ],
    complaints: [],
    visitors: [
      { id: "VIS-008", name: "Zomato Delivery", purpose: "Delivery", visitDate: "2026-06-29", inTime: "8:00 PM", outTime: "8:05 PM" },
    ],
  },
  {
    id: "RES-011",
    fullName: "Deepak Verma",
    email: "deepak.verma@email.com",
    phone: "+91 98712 34567",
    flatNumber: "C-501",
    tower: "C",
    dateOfBirth: "1987-10-20",
    residentType: "Owner",
    status: "Inactive",
    familyMembersCount: 3,
    vehicleNumber: "MH 08 YZ 1234",
    emergencyContact: "+91 98712 34568",
    moveInDate: "2019-07-01",
    profilePhoto: "",
    familyMembers: [
      { id: "FM-021", name: "Pooja Verma", relation: "Spouse", age: 36 },
      { id: "FM-022", name: "Krish Verma", relation: "Son", age: 8 },
    ],
    vehicles: [
      { id: "V-014", type: "Car", number: "MH 08 YZ 1234", color: "Silver", model: "Volkswagen Polo" },
    ],
    payments: [
      { id: "P-025", month: "June 2026", amount: 5500, status: "Pending", paidDate: null },
      { id: "P-026", month: "May 2026", amount: 5500, status: "Overdue", paidDate: null },
    ],
    complaints: [
      { id: "C-008", title: "Drain blockage near entrance", category: "Plumbing", status: "In Progress", createdDate: "2026-06-20" },
    ],
    visitors: [],
  },
  {
    id: "RES-012",
    fullName: "Nisha Agarwal",
    email: "nisha.agarwal@email.com",
    phone: "+91 87612 34567",
    flatNumber: "D-302",
    tower: "D",
    dateOfBirth: "1991-05-28",
    residentType: "Tenant",
    status: "Active",
    familyMembersCount: 3,
    vehicleNumber: "MH 09 AB 5678",
    emergencyContact: "+91 87612 34568",
    moveInDate: "2024-01-15",
    profilePhoto: "",
    familyMembers: [
      { id: "FM-023", name: "Kunal Agarwal", relation: "Spouse", age: 34 },
      { id: "FM-024", name: "Ishaan Agarwal", relation: "Son", age: 4 },
    ],
    vehicles: [
      { id: "V-015", type: "Car", number: "MH 09 AB 5678", color: "Orange", model: "Tata Harrier" },
      { id: "V-016", type: "Bike", number: "MH 09 CD 9012", color: "Black", model: "Bajaj Pulsar" },
    ],
    payments: [
      { id: "P-027", month: "June 2026", amount: 4500, status: "Paid", paidDate: "2026-06-06" },
      { id: "P-028", month: "May 2026", amount: 4500, status: "Paid", paidDate: "2026-05-04" },
    ],
    complaints: [
      { id: "C-009", title: "Intercom not working", category: "Electrical", status: "Resolved", createdDate: "2026-05-15" },
    ],
    visitors: [
      { id: "VIS-009", name: "Babysitter Rekha", purpose: "Service", visitDate: "2026-06-28", inTime: "9:00 AM", outTime: "1:00 PM" },
      { id: "VIS-010", name: "Grandparents", purpose: "Guest", visitDate: "2026-06-20", inTime: "10:00 AM", outTime: "5:00 PM" },
    ],
  },
];
