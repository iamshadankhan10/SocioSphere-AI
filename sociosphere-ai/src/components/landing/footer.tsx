// =============================================================
// FOOTER — Bottom section of the landing page.
//
// Layout:
// - 4 columns: Brand, Product links, Company links, Contact info
// - Copyright bar at the bottom
// - Responsive: stacks vertically on mobile
// =============================================================

import Link from "next/link";
import { Building2 } from "lucide-react";

export function Footer() {
  return (
    <footer id="contact" className="border-t bg-card">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        {/* ---- Footer Content Grid ---- */}
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* Column 1: Brand */}
          <div>
            <Link href="/" className="flex items-center gap-2">
              <Building2 className="h-6 w-6 text-primary" />
              <span className="text-lg font-bold">
                SocioSphere <span className="text-primary">AI</span>
              </span>
            </Link>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              Making society management smarter, simpler, and more efficient
              with the power of AI.
            </p>
          </div>

          {/* Column 2: Product Links */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider">
              Product
            </h4>
            <ul className="mt-4 space-y-3">
              {["Features", "Pricing", "Integrations", "Changelog"].map(
                (item) => (
                  <li key={item}>
                    <Link
                      href="#"
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {item}
                    </Link>
                  </li>
                )
              )}
            </ul>
          </div>

          {/* Column 3: Company Links */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider">
              Company
            </h4>
            <ul className="mt-4 space-y-3">
              {["About Us", "Blog", "Careers", "Contact"].map((item) => (
                <li key={item}>
                  <Link
                    href="#"
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact Info */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider">
              Contact
            </h4>
            <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
              <li>hello@sociosphere.ai</li>
              <li>+91 98765 43210</li>
              <li>Mumbai, India</li>
            </ul>
          </div>
        </div>

        {/* ---- Copyright Bar ---- */}
        <div className="mt-12 border-t pt-8 text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} SocioSphere AI. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
