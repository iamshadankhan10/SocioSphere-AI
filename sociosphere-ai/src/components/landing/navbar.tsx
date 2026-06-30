// =============================================================
// LANDING NAVBAR — Top navigation bar for the public landing page.
//
// Features:
// - Logo on the left
// - Navigation links in the center
// - Login/Signup buttons on the right
// - Mobile hamburger menu using Shadcn Sheet component
// =============================================================

"use client";

import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from "@/components/ui/sheet";
import { Menu, Building2 } from "lucide-react";

// Navigation links — easy to add or remove items
const navLinks = [
  { label: "Features", href: "#features" },
  { label: "Pricing", href: "#pricing" },
  { label: "Contact", href: "#contact" },
];

export function LandingNavbar() {
  // State to control the mobile menu open/close
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border/50 bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* ---- Logo ---- */}
        <Link href="/" className="flex items-center gap-2">
          <Building2 className="h-7 w-7 text-primary" />
          <span className="text-xl font-bold tracking-tight">
            SocioSphere <span className="text-primary">AI</span>
          </span>
        </Link>

        {/* ---- Desktop Navigation Links (hidden on mobile) ---- */}
        <div className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* ---- Desktop Auth Buttons (hidden on mobile) ---- */}
        <div className="hidden items-center gap-3 md:flex">
          <Button variant="ghost" render={<Link href="/login" />}>
            Log In
          </Button>
          <Button render={<Link href="/signup" />}>
            Get Started
          </Button>
        </div>

        {/* ---- Mobile Hamburger Menu ---- */}
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger
            className="md:hidden"
            render={<Button variant="ghost" size="icon" />}
          >
            <Menu className="h-5 w-5" />
            <span className="sr-only">Open menu</span>
          </SheetTrigger>
          <SheetContent side="right" className="w-72">
            <SheetTitle className="flex items-center gap-2 px-2">
              <Building2 className="h-5 w-5 text-primary" />
              <span className="font-bold">SocioSphere AI</span>
            </SheetTitle>
            <div className="mt-6 flex flex-col gap-4">
              {/* Mobile nav links */}
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
                >
                  {link.label}
                </Link>
              ))}
              {/* Mobile auth buttons */}
              <div className="mt-4 flex flex-col gap-2 border-t pt-4">
                <Button
                  variant="outline"
                  render={<Link href="/login" onClick={() => setIsOpen(false)} />}
                >
                  Log In
                </Button>
                <Button
                  render={<Link href="/signup" onClick={() => setIsOpen(false)} />}
                >
                  Get Started
                </Button>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  );
}
