// =============================================================
// ThemeProvider — Wraps the app to enable dark/light mode toggle.
// Uses the "next-themes" library under the hood.
// This is a client component because it uses React context.
// =============================================================

"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";

// We define the props type manually to keep things simple.
// It accepts the same props as NextThemesProvider.
type ThemeProviderProps = React.ComponentProps<typeof NextThemesProvider>;

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}
