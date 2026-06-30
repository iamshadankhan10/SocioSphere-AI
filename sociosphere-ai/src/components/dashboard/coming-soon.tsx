// =============================================================
// COMING SOON — Reusable placeholder for pages not yet built.
//
// Shows:
// - A module icon
// - The module name
// - A "Coming Soon" message
// - A subtle animated decoration
//
// Usage: <ComingSoon title="Residents" icon="Users" />
// =============================================================

import {
  Users,
  UserCheck,
  MessageSquareWarning,
  Wrench,
  CreditCard,
  Megaphone,
  CalendarDays,
  Settings,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

// Map icon names to Lucide components
const iconMap: Record<string, LucideIcon> = {
  Users,
  UserCheck,
  MessageSquareWarning,
  Wrench,
  CreditCard,
  Megaphone,
  CalendarDays,
  Settings,
};

// Props for the component
interface ComingSoonProps {
  title: string;    // Module name, e.g., "Residents"
  icon: string;     // Icon name from Lucide, e.g., "Users"
  description?: string; // Optional custom message
}

export function ComingSoon({ title, icon, description }: ComingSoonProps) {
  const Icon = iconMap[icon];

  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center">
      {/* Decorative background glow */}
      <div className="absolute h-64 w-64 rounded-full bg-primary/5 blur-3xl" />

      {/* Icon */}
      <div className="relative mb-6 rounded-2xl bg-primary/10 p-6">
        {Icon && <Icon className="h-12 w-12 text-primary" />}
      </div>

      {/* Title */}
      <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
        {title}
      </h1>

      {/* Message */}
      <p className="mt-3 max-w-md text-center text-muted-foreground">
        {description ||
          `The ${title} module is under development. It will be available in the next update.`}
      </p>

      {/* Animated dots */}
      <div className="mt-6 flex gap-1.5">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="h-2 w-2 animate-bounce rounded-full bg-primary/50"
            style={{ animationDelay: `${i * 0.15}s` }}
          />
        ))}
      </div>
    </div>
  );
}
