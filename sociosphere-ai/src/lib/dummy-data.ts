// =============================================================
// DUMMY DATA — All mock data for the application lives here.
// When you connect a real backend, replace these with API calls.
// =============================================================

// ---------------------------
// Dashboard Stats (overview cards)
// ---------------------------
export const dashboardStats = [
  {
    id: "total-residents",
    label: "Total Residents",
    value: "1,248",
    change: "+12%",        // percentage change from last month
    trend: "up" as const,  // "up" = positive, "down" = negative
    icon: "Users",         // Lucide icon name
  },
  {
    id: "total-visitors",
    label: "Total Visitors",
    value: "342",
    change: "+8%",
    trend: "up" as const,
    icon: "UserCheck",
  },
  {
    id: "pending-complaints",
    label: "Pending Complaints",
    value: "23",
    change: "-5%",
    trend: "down" as const,
    icon: "MessageSquareWarning",
  },
  {
    id: "monthly-collection",
    label: "Monthly Collection",
    value: "₹4,85,000",
    change: "+15%",
    trend: "up" as const,
    icon: "IndianRupee",
  },
];

// ---------------------------
// Recent Activities (dashboard feed)
// ---------------------------
export const recentActivities = [
  {
    id: 1,
    description: "New resident Rahul Sharma moved into Flat A-401",
    time: "2 minutes ago",
    type: "resident" as const,
  },
  {
    id: 2,
    description: "Visitor pass generated for Amit Kumar (Flat B-202)",
    time: "15 minutes ago",
    type: "visitor" as const,
  },
  {
    id: 3,
    description: "Complaint #1042 resolved — Water leakage in Block C",
    time: "1 hour ago",
    type: "complaint" as const,
  },
  {
    id: 4,
    description: "Maintenance payment received from Flat D-103 — ₹5,500",
    time: "2 hours ago",
    type: "payment" as const,
  },
  {
    id: 5,
    description: "New event posted — Annual Society Meeting on 15th July",
    time: "3 hours ago",
    type: "event" as const,
  },
  {
    id: 6,
    description: "Notice published — Parking lot maintenance on Sunday",
    time: "5 hours ago",
    type: "notice" as const,
  },
];

// ---------------------------
// Monthly Collection Chart Data (Bar Chart)
// ---------------------------
export const monthlyCollectionData = [
  { month: "Jan", amount: 380000 },
  { month: "Feb", amount: 420000 },
  { month: "Mar", amount: 395000 },
  { month: "Apr", amount: 450000 },
  { month: "May", amount: 485000 },
  { month: "Jun", amount: 470000 },
];

// ---------------------------
// Complaint Categories (Pie Chart)
// ---------------------------
export const complaintCategoryData = [
  { category: "Plumbing", count: 35, fill: "var(--chart-1)" },
  { category: "Electrical", count: 28, fill: "var(--chart-2)" },
  { category: "Cleanliness", count: 20, fill: "var(--chart-3)" },
  { category: "Parking", count: 15, fill: "var(--chart-4)" },
  { category: "Other", count: 12, fill: "var(--chart-5)" },
];

// ---------------------------
// Landing Page Features
// ---------------------------
export const features = [
  {
    icon: "Users",
    title: "Resident Management",
    description:
      "Manage all resident details, flat allocations, and family members in one centralized platform.",
  },
  {
    icon: "UserCheck",
    title: "Visitor Tracking",
    description:
      "Track visitor entries and exits with digital passes. Enhance society security effortlessly.",
  },
  {
    icon: "MessageSquareWarning",
    title: "Complaint System",
    description:
      "Residents can raise and track complaints. Admins can assign, prioritize, and resolve them.",
  },
  {
    icon: "Wrench",
    title: "Maintenance Tracking",
    description:
      "Schedule and track maintenance activities for common areas, amenities, and individual flats.",
  },
  {
    icon: "CreditCard",
    title: "Online Payments",
    description:
      "Collect maintenance fees, parking charges, and other dues with integrated payment processing.",
  },
  {
    icon: "Megaphone",
    title: "Notices & Events",
    description:
      "Publish notices, announce events, and keep all society members informed in real-time.",
  },
];

// ---------------------------
// Landing Page Pricing Plans
// ---------------------------
export const pricingPlans = [
  {
    name: "Starter",
    price: "Free",
    description: "Perfect for small societies getting started.",
    features: [
      "Up to 50 residents",
      "Basic complaint management",
      "Visitor log",
      "Email notifications",
      "Community support",
    ],
    cta: "Get Started",
    popular: false,
  },
  {
    name: "Professional",
    price: "₹2,999",
    period: "/month",
    description: "Ideal for medium-sized societies.",
    features: [
      "Up to 500 residents",
      "Advanced complaint tracking",
      "Visitor pass generation",
      "Online payment collection",
      "Notice board & events",
      "Reports & analytics",
      "Priority support",
    ],
    cta: "Start Free Trial",
    popular: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    description: "For large housing complexes and townships.",
    features: [
      "Unlimited residents",
      "Multi-society management",
      "Custom integrations",
      "Dedicated account manager",
      "SLA guarantee",
      "On-premise deployment option",
      "24/7 phone support",
    ],
    cta: "Contact Sales",
    popular: false,
  },
];

// ---------------------------
// Sidebar Navigation Items
// ---------------------------
export const sidebarNavItems = [
  { label: "Dashboard", href: "/dashboard", icon: "LayoutDashboard" },
  { label: "Residents", href: "/dashboard/residents", icon: "Users" },
  { label: "Visitors", href: "/dashboard/visitors", icon: "UserCheck" },
  { label: "Complaints", href: "/dashboard/complaints", icon: "MessageSquareWarning" },
  { label: "Maintenance", href: "/dashboard/maintenance", icon: "Wrench" },
  { label: "Payments", href: "/dashboard/payments", icon: "CreditCard" },
  { label: "Notice Board", href: "/dashboard/notice-board", icon: "Megaphone" },
  { label: "Events", href: "/dashboard/events", icon: "CalendarDays" },
  { label: "Settings", href: "/dashboard/settings", icon: "Settings" },
];
