// =============================================================
// LANDING PAGE — The main public-facing page of SocioSphere AI.
//
// Assembled from 5 components:
// 1. Navbar (sticky top navigation)
// 2. Hero Section (headline + CTA)
// 3. Features Section (6 feature cards)
// 4. Pricing Section (3 pricing plans)
// 5. Footer (links + contact info)
// =============================================================

import { LandingNavbar } from "@/components/landing/navbar";
import { HeroSection } from "@/components/landing/hero-section";
import { FeaturesSection } from "@/components/landing/features-section";
import { PricingSection } from "@/components/landing/pricing-section";
import { Footer } from "@/components/landing/footer";

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Sticky navigation bar */}
      <LandingNavbar />

      {/* Main content sections */}
      <main className="flex-1">
        <HeroSection />
        <FeaturesSection />
        <PricingSection />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
