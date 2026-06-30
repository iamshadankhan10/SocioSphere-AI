// =============================================================
// HERO SECTION — The first thing visitors see on the landing page.
//
// Features:
// - Bold headline with gradient text
// - Subheadline explaining the product
// - Two CTA buttons (Get Started, Watch Demo)
// - Animated gradient background with floating decorative shapes
// =============================================================

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Play } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden">
      {/* ---- Gradient Background ---- */}
      <div className="gradient-bg absolute inset-0 opacity-5" />

      {/* ---- Decorative Floating Circles ---- */}
      <div className="absolute top-20 left-10 h-72 w-72 rounded-full bg-primary/10 blur-3xl animate-float" />
      <div
        className="absolute bottom-20 right-10 h-96 w-96 rounded-full bg-primary/5 blur-3xl animate-float"
        style={{ animationDelay: "1.5s" }}
      />

      {/* ---- Main Content ---- */}
      <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8 lg:py-40">
        <div className="mx-auto max-w-3xl text-center">
          {/* Badge / Tagline */}
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-sm font-medium text-primary">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
            </span>
            Now with AI-Powered Insights
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
            Smart Society Management{" "}
            <span className="bg-gradient-to-r from-primary via-purple-500 to-pink-500 bg-clip-text text-transparent">
              Made Simple
            </span>
          </h1>

          {/* Subheadline */}
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground sm:text-xl">
            Manage your residential society effortlessly. From visitor tracking
            to maintenance payments — everything in one intelligent platform.
          </p>

          {/* CTA Buttons */}
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button size="lg" className="gap-2 px-8 text-base" render={<Link href="/signup" />}>
              Get Started Free
              <ArrowRight className="h-4 w-4" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="gap-2 px-8 text-base"
            >
              <Play className="h-4 w-4" />
              Watch Demo
            </Button>
          </div>

          {/* Social Proof */}
          <p className="mt-8 text-sm text-muted-foreground">
            Trusted by{" "}
            <span className="font-semibold text-foreground">500+</span>{" "}
            societies across India
          </p>
        </div>
      </div>
    </section>
  );
}
