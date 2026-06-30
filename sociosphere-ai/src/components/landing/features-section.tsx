// =============================================================
// FEATURES SECTION — Shows what SocioSphere AI can do.
//
// Displays a grid of 6 feature cards, each with:
// - An icon
// - A title
// - A description
//
// The feature data comes from dummy-data.ts
// =============================================================

import { features } from "@/lib/dummy-data";
import {
  Users,
  UserCheck,
  MessageSquareWarning,
  Wrench,
  CreditCard,
  Megaphone,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

// Map icon names (strings) to actual Lucide icon components
// This lets us store icon names as strings in our data file
const iconMap: Record<string, LucideIcon> = {
  Users,
  UserCheck,
  MessageSquareWarning,
  Wrench,
  CreditCard,
  Megaphone,
};

export function FeaturesSection() {
  return (
    <section id="features" className="py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* ---- Section Header ---- */}
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-primary">
            Features
          </p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
            Everything You Need to Manage Your Society
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Comprehensive tools designed to make society management effortless
            and efficient.
          </p>
        </div>

        {/* ---- Feature Cards Grid ---- */}
        <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => {
            // Get the icon component from our map
            const Icon = iconMap[feature.icon];

            return (
              <div
                key={feature.title}
                className="group relative rounded-2xl border border-border/50 bg-card p-8 transition-all duration-300 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5"
              >
                {/* Icon Container */}
                <div className="mb-5 inline-flex rounded-xl bg-primary/10 p-3 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                  {Icon && <Icon className="h-6 w-6" />}
                </div>

                {/* Feature Title */}
                <h3 className="text-lg font-semibold">{feature.title}</h3>

                {/* Feature Description */}
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
