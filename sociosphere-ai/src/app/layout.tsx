// =============================================================
// ROOT LAYOUT — The outermost wrapper for the entire app.
//
// Responsibilities:
// 1. Load Google Fonts (Inter for headings, Geist Mono for code)
// 2. Set up SEO metadata (title, description)
// 3. Wrap everything in ThemeProvider for dark/light mode
// =============================================================

import type { Metadata } from "next";
import { Inter, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";

// Load Inter font — clean, modern, and highly readable
const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

// Load Geist Mono — for any code/monospace elements
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// SEO Metadata — shown in browser tabs and search results
export const metadata: Metadata = {
  title: "SocioSphere AI — Smart Society Management",
  description:
    "Modern society management platform powered by AI. Manage residents, visitors, complaints, maintenance, and payments all in one place.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning // Required by next-themes to avoid hydration mismatch
    >
      <body className="min-h-full flex flex-col">
        {/* ThemeProvider enables dark/light mode switching across the app */}
        <ThemeProvider
          attribute="class"        // Adds .dark class to <html> for dark mode
          defaultTheme="system"    // Follows user's OS preference by default
          enableSystem             // Allow system theme detection
          disableTransitionOnChange // Prevent flash when switching themes
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
