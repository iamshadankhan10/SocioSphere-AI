// =============================================================
// PRICING SECTION — Shows the 3 pricing tiers.
//
// Features:
// - 3 pricing cards (Starter, Professional, Enterprise)
// - "Popular" badge on the recommended plan
// - Feature checklist for each plan
// - CTA button on each card
//
// Data comes from dummy-data.ts
// =============================================================

import Link from "next/link";
import { pricingPlans } from "@/lib/dummy-data";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check } from "lucide-react";

export function PricingSection() {
  return (
    <section id="pricing" className="py-20 sm:py-28 bg-muted/30">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* ---- Section Header ---- */}
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-primary">
            Pricing
          </p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
            Simple, Transparent Pricing
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Choose the plan that fits your society. No hidden charges.
          </p>
        </div>

        {/* ---- Pricing Cards ---- */}
        <div className="mt-16 grid grid-cols-1 gap-8 lg:grid-cols-3">
          {pricingPlans.map((plan) => (
            <div
              key={plan.name}
              className={`relative flex flex-col rounded-2xl border p-8 transition-all duration-300 ${
                plan.popular
                  ? "border-primary bg-card shadow-xl shadow-primary/10 scale-[1.02]" // Highlighted card
                  : "border-border/50 bg-card hover:border-primary/30 hover:shadow-lg"
              }`}
            >
              {/* "Popular" Badge — only on the recommended plan */}
              {plan.popular && (
                <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1">
                  Most Popular
                </Badge>
              )}

              {/* Plan Name */}
              <h3 className="text-lg font-semibold">{plan.name}</h3>

              {/* Price */}
              <div className="mt-4 flex items-baseline gap-1">
                <span className="text-4xl font-bold">{plan.price}</span>
                {plan.period && (
                  <span className="text-sm text-muted-foreground">
                    {plan.period}
                  </span>
                )}
              </div>

              {/* Description */}
              <p className="mt-2 text-sm text-muted-foreground">
                {plan.description}
              </p>

              {/* Feature List */}
              <ul className="mt-8 flex-1 space-y-3">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3 text-sm">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              {/* CTA Button */}
              <Button
                className="mt-8 w-full"
                variant={plan.popular ? "default" : "outline"}
                size="lg"
                render={<Link href="/signup" />}
              >
                {plan.cta}
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
